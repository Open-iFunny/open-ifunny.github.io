{ pkgs ? import <nixpkgs> { } }:

# This file is called by flake.nix via pkgs.callPackage.
# It defines a reproducible build of scripts/generate-docs.js, which reads
# gitbook/openapi/ifunny-api.yaml and renders MkDocs Material-native
# Markdown into docs/reference/api/. `nix build .#docs` produces the full
# docs/ source tree (narrative pages + freshly generated API reference
# pages) as $out - the mkdocs build in CI then consumes that tree to
# produce the static site deployed to GitHub Pages.
#
# Uses nixpkgs' built-in fetchYarnDeps/yarnConfigHook/yarnBuildHook (Yarn
# Classic v1 offline-mirror support), NOT bun2nix or yarn2nix-moretea:
#
# - bun2nix only populates bun's extracted-package/tarball cache, not its
#   separate manifest cache, so `bun install` always needs live network
#   access to resolve dependencies -- a known, open upstream limitation
#   (see nix-community/bun2nix#77).
# - yarn2nix-moretea (the third-party "yarn2nix" package set that used to
#   live at pkgs.yarn2nix-moretea) was removed from nixpkgs upstream on
#   2026-04-25 ("'yarn2nix' and its tooling has been removed as it was
#   unusable within nodePackages. Use the standard yarn v1 hooks available
#   in nixpkgs instead." -- see pkgs/top-level/aliases.nix), which is what
#   we're doing here.
#
# fetchYarnDeps is a fixed-output derivation (network access allowed, hash
# pinned below) that prefetches every tarball referenced by yarn.lock into
# an offline mirror. yarnConfigHook then runs `yarn install --offline
# --frozen-lockfile` against that mirror (no network needed at all in the
# main build), and yarnBuildHook runs `yarn --offline build`, i.e. our
# package.json's own "build" script.

let
  pname = "ifunny-api-docs";
  version = "1.0.0";

  # Filter out node_modules/_site explicitly rather than relying solely on
  # .gitignore: a stray node_modules left over in the worktree (e.g. from
  # running `yarn install` locally to (re)generate yarn.lock) would
  # otherwise get copied in by `./.` and shadow the Nix-built one with
  # unpatched, non-Nix-built files -- this bit us once already.
  src = pkgs.lib.cleanSourceWith {
    src = ./.;
    filter = name: type:
      let base = baseNameOf name; in
      !(builtins.elem base [ "node_modules" "_site" "result" ]);
  };

  offlineCache = pkgs.fetchYarnDeps {
    yarnLock = ./yarn.lock;
    hash = "sha256-B6vsbb+BDtE7M/oj8kkhZZewuG+eearzHCmmWnWmqGo=";
  };
in
pkgs.stdenv.mkDerivation {
  inherit pname version src;

  yarnOfflineCache = offlineCache;

  nativeBuildInputs = with pkgs; [
    nodejs
    yarnConfigHook
    yarnBuildHook
  ];

  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r docs/. $out/
    runHook postInstall
  '';

  meta = with pkgs.lib; {
    description = "iFunny API documentation - OpenAPI 3.1 spec rendered into MkDocs Material Markdown";
    homepage = "https://github.com/Open-iFunny/api-docs";
    license = licenses.gpl3;
    maintainers = [];
  };
}
