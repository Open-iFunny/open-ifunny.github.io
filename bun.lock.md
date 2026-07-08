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
