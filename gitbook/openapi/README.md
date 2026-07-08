# iFunny API OpenAPI Specification

This directory contains the OpenAPI 3.1 specification for the iFunny API (`ifunny-api.yaml`) and tooling to build static documentation.

## Building the Documentation

### Option 1: Using Nix (Reproducible, Recommended)

Nix provides a reproducible, offline build environment that guarantees consistent results across machines.

#### Prerequisites
- [Nix](https://nixos.org) installed on your system

#### Commands

```bash
# Enter a development shell with Bun and Node.js available
nix develop

# Build the static Redoc documentation site
nix build

# The built documentation will be available at: result/index.html
```

The Nix build:
- Uses Bun as the JavaScript runtime and package manager
- Builds dependencies reproducibly via `bun2nix` (from `bun.lock`)
- Produces static HTML output in `_site/index.html`
- Is completely offline after initial setup (no network calls at build time)

### Option 2: Using Node.js/npm locally (Quick, Network-dependent)

If you don't have Nix, you can use the existing GitHub Actions workflow pattern locally.

```bash
# Lint the OpenAPI spec
npx --yes @redocly/cli@1.25.5 lint gitbook/openapi/ifunny-api.yaml

# Build the static Redoc site
mkdir -p _site
npx --yes @redocly/cli@1.25.5 build-docs gitbook/openapi/ifunny-api.yaml -o _site/index.html
```

Or if you have Node.js/npm/bun installed locally:

```bash
# Install dependencies
npm install
# or: bun install

# Lint
npm run lint
# or: bun run lint

# Build
npm run build
# or: bun run build
```

### Option 3: Using the GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/openapi.yml`) that automatically:
- Lints the OpenAPI spec on every push and PR
- Builds and deploys the static documentation site to GitHub Pages on push to `main`

## Development Workflow

### With Nix

```bash
nix develop
bun install       # Install/update dependencies
bun run build     # Build the docs
bun run lint      # Lint the spec
```

### Without Nix

```bash
npm install
npm run build
npm run lint
```

## File Structure

- `ifunny-api.yaml` - The OpenAPI 3.1 specification file (the source of truth)
- `package.json` - Node.js/npm dependencies and build scripts (in repository root)
- `bun.lock` / `bun.lock.md` - Bun lockfile and notes on generation (in repository root)
- `flake.nix` - Nix flake definition for reproducible builds (in repository root)
- `default.nix` - Nix derivation for the static site build (in repository root)
- `bun.nix` - Auto-generated Nix expressions from `bun.lock` via bun2nix (in repository root)

## First-time Setup Notes

If `bun.lock` does not exist in the repository:

1. Install Bun: https://bun.sh
2. From the repository root, run: `bun install`
3. Commit the resulting `bun.lock` file
4. To regenerate the Nix derivations, run: `bun2nix -o bun.nix`

See `bun.lock.md` for detailed instructions.

## Redoc Output

The build process generates:
- `_site/index.html` - The main interactive Redoc documentation page
- `_site/ifunny-api.yaml` - A copy of the OpenAPI spec for reference

The static site can be:
- Served locally (e.g., `python -m http.server 8000` in `_site/`)
- Deployed to any static hosting (GitHub Pages, Netlify, etc.)
- Embedded in applications that need offline API documentation

## Tools and Technologies

- **OpenAPI 3.1** - API specification standard
- **Redocly CLI** - Linting and static documentation generation
- **Bun** - JavaScript runtime and package manager
- **Nix** - Declarative build system for reproducibility
- **bun2nix** - Generates Nix derivations from Bun lockfiles

## References

- [OpenAPI 3.1 Specification](https://spec.openapis.org/oas/v3.1.0)
- [Redocly CLI](https://github.com/Redocly/redocly-cli)
- [Bun](https://bun.sh)
- [Nix](https://nixos.org)
- [bun2nix](https://github.com/nix-community/bun2nix)
