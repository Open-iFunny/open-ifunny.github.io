{
  description = "iFunny API documentation - OpenAPI 3.1 spec with Redoc static site generation";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    bun2nix.url = "github:nix-community/bun2nix";
    bun2nix.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-substituters = [
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };

  outputs = { self, nixpkgs, flake-utils, bun2nix }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            bun
            nodejs
            bun2nix.packages.${system}.bun2nix
          ];

          shellHook = ''
            if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
              toplevel="$(git rev-parse --show-toplevel)"
              git config extensions.worktreeConfig true
              git config --worktree core.hooksPath "$toplevel/.githooks"
              chmod +x "$toplevel/.githooks/pre-commit" 2>/dev/null || true
            fi

            echo "iFunny API Docs Development Environment"
            echo "Available commands:"
            echo "  bun install       - Install dependencies"
            echo "  bun run build     - Build Redoc static site"
            echo "  bun run lint      - Lint OpenAPI spec"
            echo "  bun2nix -o bun.nix - Regenerate Nix deps from bun.lock (auto-run on commit)"
            echo "  nix build         - Build docs reproducibly via Nix"
          '';
        };

        packages.default =
          let
            bun2nixLib = bun2nix.packages.${system}.default;
          in
          pkgs.callPackage ./default.nix {
            inherit bun2nixLib;
          };

        packages.docs = self.packages.${system}.default;
      }
    );
}
