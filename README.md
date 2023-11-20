# Matchmaker front-end

Semester 7 project voor NHL Stenden HBO-ICT.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run unittest
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run e2etest
# Runs the tests only on Chromium
npm run e2etest -- --project=chromium
# Runs the tests of a specific file
npm run e2etest -- tests/example.spec.ts
# Runs the tests in debug mode
npm run e2etest -- --debug
```
