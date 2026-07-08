{
  description = "iFunny API documentation - OpenAPI 3.1 spec with Redoc static site generation";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            yarn
            nodejs
          ];

          shellHook = ''
            echo "iFunny API Docs Development Environment"
            echo "Available commands:"
            echo "  yarn install      - Install dependencies"
            echo "  yarn build        - Build Redoc static site"
            echo "  yarn lint         - Lint OpenAPI spec"
            echo "  nix build         - Build docs reproducibly via Nix (fetchYarnDeps)"
          '';
        };

        packages.default = pkgs.callPackage ./default.nix { };

        packages.docs = self.packages.${system}.default;
      }
    );
}
