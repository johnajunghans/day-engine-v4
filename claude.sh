#!/bin/bash
set -e

docker run -it --rm \
  -e ANTHROPIC_API_KEY \
  -e ANTHROPIC_BASE_URL \
  -e ANTHROPIC_MODEL \
  -e CLAUDE_CODE_MID_CONVERSATION_SYSTEM \
  -e DISABLE_AUTOUPDATER=1 \
  -e HTTPS_PROXY="http://host.docker.internal:8080" \
  -e NODE_EXTRA_CA_CERTS="/root/.mitmproxy/mitmproxy-ca-cert.pem" \
  -v "$(pwd):/app" \
  -v "$HOME/.claude:/root/.claude" \
  -v "$HOME/.mitmproxy:/root/.mitmproxy" \
  de-v4 \
  "$@"
