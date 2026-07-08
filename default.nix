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

  # --linker=isolated matches bun2nix's own default install flags (see
  # nix/mk-derivation/hook.nix in the bun2nix source); we have to repeat it
  # here since setting this attribute at all replaces the hook's defaults
  # rather than extending them. --frozen-lockfile stops bun from trying to
  # rewrite bun.lock. This is a plain (unquoted, space-separated) string
  # rather than a Nix list: this derivation isn't built with
  # __structuredAttrs, so a list here would not actually become a bash array
  # -- verified this directly (a Nix list produced a single escaped-space
  # string and broke --linker).
  #
  # NOTE: as of bun2nix 2.1.1 / bun 1.3.13, `nix build` on this package still
  # fails with "ConnectionRefused downloading package manifest @redocly/cli",
  # even with these flags and a fully populated bunDeps cache. This is a
  # known, open upstream bun2nix limitation, not something fixable from
  # here: bun2nix's fetchBunDeps only populates bun's extracted-package
  # tarball cache, not bun's separate `*.npm` manifest-cache files, and
  # bun's dependency resolution step needs the manifest cache (or network
  # access) regardless of --frozen-lockfile or exact version pins. See
  # https://github.com/nix-community/bun2nix/issues/77 for the same failure
  # signature reported against a different project, and bun2nix's own
  # tracking of bun's upstream --offline flag (oven-sh/bun#26227), which
  # would still require manifest caches to exist.
  #
  # This does not block the actual publishing pipeline: GitHub Actions
  # builds the site with plain `npx @redocly/cli` (real network access, no
  # Nix sandbox), so `.github/workflows/openapi.yml` is unaffected. `nix
  # build .#docs` remains broken until bun2nix fixes this upstream, or
  # someone reimplements the install phase to bypass `bun install` entirely.
  bunInstallFlags = "--linker=isolated --frozen-lockfile";

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
