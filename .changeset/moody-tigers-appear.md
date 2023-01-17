---
'@guardian/discussion-rendering': major
---

### What
Add required prop `idApiUrl` to the discussion App. The url is coming from CAPI and passed via DCR.

### Why
The previous version of discussion-rendering had the prod identity url hardcoded and was hitting this regardless of environment. This was causing CORS errors when trying to post a comment as `https://m.code.dev-theguardian.com/` is not one of the allowed domains to hit the prod api.

### How to consume
This change handles the consumption of `idApiUrl` by the application.

