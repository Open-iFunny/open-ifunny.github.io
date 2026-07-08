{
  description = "iFunny API documentation - OpenAPI 3.1 spec with MkDocs Material static site generation";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Python env with mkdocs + the Material theme + the pymdown
        # extensions that mkdocs.yml enables. Kept as one withPackages
        # closure so `mkdocs build` sees mkdocs-material as an installed
        # sibling package (running mkdocs and mkdocs-material from
        # separate `nix shell` args puts them in disjoint site-packages
        # trees and mkdocs then can't find the theme).
        mkdocsEnv = pkgs.python3.withPackages (ps: [
          ps.mkdocs
          ps.mkdocs-material
          ps.pymdown-extensions
        ]);

        # $out/ is the generated-docs source tree (docs/ with the API
        # reference pages rendered in place).
        docs = pkgs.callPackage ./default.nix { };

        # Static site: run `mkdocs build` against the generated docs
        # tree, producing the HTML deployed to GitHub Pages.
        site = pkgs.stdenv.mkDerivation {
          pname = "ifunny-api-site";
          version = "1.0.0";
          src = ./.;

          nativeBuildInputs = [ mkdocsEnv ];

          buildPhase = ''
            runHook preBuild
            # Replace the checked-in docs/ tree with the freshly
            # generated one so mkdocs sees the up-to-date API reference.
            rm -rf docs
            cp -rL ${docs} docs
            chmod -R u+w docs
            mkdocs build --strict --site-dir $out
            runHook postBuild
          '';

          installPhase = "true"; # $out is populated by --site-dir.
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            yarn
            nodejs
            mkdocsEnv
          ];

          shellHook = ''
            echo "iFunny API Docs Development Environment"
            echo "Available commands:"
            echo "  yarn install      - Install dependencies"
            echo "  yarn build        - Regenerate docs/reference/api/ from the OpenAPI spec"
            echo "  yarn lint         - Lint OpenAPI spec"
            echo "  mkdocs serve      - Live-preview the MkDocs Material site"
            echo "  mkdocs build      - Build the static site into ./site"
            echo "  nix build .#site  - Build the static site reproducibly via Nix"
          '';
        };

        packages.default = docs;
        packages.docs = docs;
        packages.site = site;
      }
    );
}
