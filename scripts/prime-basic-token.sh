#!/usr/bin/env bash
# Generate an iFunny Basic Token, prime it against the API, and print it
# to stdout. Intended for shell-first workflows (curl, HTTPie, one-off
# scripts) where pulling in a full SDK is overkill.
#
# Usage:
#   BASIC=$(./scripts/prime-basic-token.sh)
#   curl -H "Authorization: Basic $BASIC" \
#        -H "Ifunny-Project-Id: iFunny" \
#        -H "User-Agent: iFunny/8.15.1(1130736) Android/14 (google; Pixel 8; google)" \
#        https://api.ifunny.mobi/v4/counters
#
# Requires: openssl, base64, sha1sum-or-openssl-dgst. No external SDKs.

set -euo pipefail

API_ROOT="${IFUNNY_API_ROOT:-https://api.ifunny.mobi/v4}"
CLIENT_ID="${IFUNNY_CLIENT_ID:-MsOIJ39Q28}"
CLIENT_SECRET="${IFUNNY_CLIENT_SECRET:-PTDc3H8a)Vi=UYap}"
USER_AGENT="${IFUNNY_USER_AGENT:-iFunny/8.15.1(1130736) Android/14 (google; Pixel 8; google)}"

# 32 uppercase hex chars — the shape both official-adjacent SDKs use.
UUID=$(openssl rand -hex 16 | tr '[:lower:]' '[:upper:]')

# Basic token layout (matches ifunny-go and ifunny.ts):
#   base64( "<UUID>_<client_id>:" || hex(sha1("<UUID>:<client_id>:<secret>")) )
PREFIX="${UUID}_${CLIENT_ID}:"
SUFFIX=$(printf '%s' "${UUID}:${CLIENT_ID}:${CLIENT_SECRET}" \
         | openssl dgst -sha1 -hex | awk '{print $NF}')
BASIC=$(printf '%s%s' "${PREFIX}" "${SUFFIX}" | base64 | tr -d '\n')

# Priming: any authenticated GET works; /counters is what the SDKs use.
# The server takes ~15s to activate the token; anything earlier 401s.
curl --fail --silent --show-error --output /dev/null \
     -H "Authorization: Basic ${BASIC}" \
     -H "Ifunny-Project-Id: iFunny" \
     -H "User-Agent: ${USER_AGENT}" \
     "${API_ROOT}/counters"

sleep 15

printf '%s\n' "${BASIC}"
