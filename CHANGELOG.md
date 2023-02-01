# @guardian/discussion-rendering

## 13.0.0

### Major Changes

- bcd2a21: This release introduces a change in its peer dependencies, which is a always a
  breaking change.

  - @guardian/libs@^12.0.0 (from ^10.0.0)

  Consumers should consider upgrading their local versions of libs, which only
  brings two major changes:

  - [Formats update in v12](https://github.com/guardian/csnx/blob/main/libs/%40guardian/libs/CHANGELOG.md#1200)
  - [Specified typescript version in v11](https://github.com/guardian/csnx/blob/main/libs/%40guardian/libs/CHANGELOG.md#1100)

## 12.0.0

### Major Changes

- 22c1d98: ### What
  Add required prop `idApiUrl` to the discussion App. The url is coming from CAPI and passed via DCR.

  ### Why

  The previous version of discussion-rendering had the prod identity url hardcoded and was hitting this regardless of environment. This was causing CORS errors when trying to post a comment as `https://m.code.dev-theguardian.com/` is not one of the allowed domains to hit the prod api.

  ### How to consume

  This change handles the consumption of `idApiUrl` by the application.

## 11.0.3

### Patch Changes

- 18ac401: Drop sourcemaps from build

## 11.0.2

### Patch Changes

- d1ca477: Fix Emotion class names

## 11.0.1

### Patch Changes

- 33e5bc7: Externalise react-is and react/jsx-runtime

## 11.0.0

### Major Changes

- 17eb3f3: Bring in the latest Source packages, which bring major visual changes to:
  - Line height, which is now a little bit tighter
  - `Link` & `LinkButton`, which no longer have a subdued setting and come with
    an underline for accessibility
  - Pillar colours, which have been tweaked to provide higher contrast

## 10.3.1

### Patch Changes

- 25b84b2: Use Vite’s library mode for bundling the package. No expected change.

## 10.3.0

### Minor Changes

- 8341d18: No underlines on Link

## 10.2.2

### Patch Changes

- f3c8e7f: Align peer and direct dependencies with dev ones.

## 10.2.1

### Patch Changes

- 9767c2e: Usage of `timeAgo` from @guardian/libs. No visual change.
- 72e9682: Keep `devDependencies` where they should be

## 10.2.0

### Minor Changes

- a8655b3028f654d7ff700903011f2b3e4f537941: Use a dot to separate hours and minutes
- c5659d044692b939677611f79b0f23c5d9652ea8: Show the second comment box less
