{ pkgs ? import <nixpkgs> { }, bun2nixLib }:

# This file is called by flake.nix via pkgs.callPackage.
# It defines the reproducible build for the Redoc static documentation site.
#
# Note: This requires bun.lock and bun.nix to be committed in the repository.
# See bun.lock.md for instructions on generating these files.

let
  pname = "ifunny-api-docs";
  version = "1.0.0";
  src = ./.;

  # Fetch Bun dependencies using bun2nix
  # The bun.nix file should be generated via: bun2nix -o bun.nix
  bunDeps = bun2nixLib.fetchBunDeps {
    inherit src;
    bunNix = ./bun.nix;
  };
in
bun2nixLib.mkDerivation {
  inherit pname version src;

  bunDeps = bunDeps;

  buildPhase = ''
    export HOME=$(mktemp -d)

    # Run the build script from package.json
    bun run build
  '';

  installPhase = ''
    mkdir -p $out
    cp -r _site/* $out/
    cp gitbook/openapi/ifunny-api.yaml $out/
  '';

  meta = with pkgs.lib; {
    description = "iFunny API documentation - OpenAPI 3.1 spec with Redoc";
    homepage = "https://github.com/Open-iFunny/api-docs";
    license = licenses.gpl3;
    maintainers = [];
  };
}
