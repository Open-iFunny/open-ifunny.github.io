# Bun Lockfile Generation

The `bun.lock` file for this project has NOT been generated in this worktree because Bun is not available in the current environment.

## For Maintainers

To generate the lockfile:

1. Install Bun (https://bun.sh)
2. Run `bun install` in the root directory of this repository
3. This will generate `bun.lock` (or `bun.lockb` binary format)
4. Commit the generated lockfile

The Nix flake and bun2nix tooling will then be able to build the project reproducibly.

## Why This Matters

- The `bun.lock` file contains exact version pinning and dependency resolution
- bun2nix uses this lockfile to generate `bun.nix` via `bun2nix -o bun.nix`
- The Nix build system uses `bun.nix` to provide reproducible, offline builds
- Without this lockfile, the flake will not build successfully

## Current Status

The flake.nix and all supporting Nix files are ready to use once `bun.lock` is committed.

## Keeping `bun.nix` in sync

Once `bun.lock` exists, don't hand-edit `bun.nix`. A pre-commit hook
(`.githooks/pre-commit`, wired up automatically by `nix develop` -- see
`flake.nix`) regenerates it from `bun.lock` via `bun2nix -o bun.nix`
whenever `bun.lock` or `package.json` are part of a commit, and stages
the result into that same commit. If `bun2nix` can't produce a valid
`bun.nix` (e.g. `bun.lock` is missing or malformed), the commit is
blocked rather than silently going through with a stale file.
