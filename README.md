# Playwright TS – HyperExecute Assignment

Implements all **three scenarios** and runs locally or on **LambdaTest HyperExecute**.

## Local Run

# Playwright TS – HyperExecute Assignment

Implements all **three scenarios** and runs locally or on **LambdaTest HyperExecute**.

## Local Run

```bash
npm ci
npm test
npx playwright show-report
```

## HyperExecute (local or CLI) Run

1. Create the secrets `LT_USERNAME` and `LT_ACCESS_KEY` in the HyperExecute dashboard (Secret Management).
2. Run the HyperExecute CLI from the repo root:

```bash
hyperexecute --config .hyperexecute.yaml
```

This repository contains a sample `.hyperexecute.yaml` that demonstrates:

- a 2-environment matrix (Windows and Linux + Chrome)
- pre-steps (`npm ci`, `npx playwright install --with-deps`)
- simple dependency caching for `node_modules`
- artifacts collection (`playwright-report`, `test-results`)
- secret and environment variable injection

## GitHub Actions integration

A sample GitHub Actions workflow is provided at `.github/workflows/hyperexecute.yml`.

- Add `LT_USERNAME` and `LT_ACCESS_KEY` to this repository's **GitHub Secrets** (Settings → Secrets). The workflow will expose them as environment variables to the HyperExecute run.
- The workflow installs dependencies, optionally installs the HyperExecute CLI, and runs `npx hyperexecute --config .hyperexecute.yaml`.

## Files added

- `.hyperexecute.yaml` — example HyperExecute configuration (matrix, artifacts, caching, secrets).
- `.github/workflows/hyperexecute.yml` — example GitHub Actions workflow to trigger HyperExecute.

## Where to update credentials

- HyperExecute dashboard (Secret Management): add `LT_USERNAME` + `LT_ACCESS_KEY`.
- GitHub Actions: add `LT_USERNAME` + `LT_ACCESS_KEY` as **Repository Secrets**.
- Local testing (zsh):

```bash
export LT_USERNAME="your_username"
export LT_ACCESS_KEY="your_access_key"
npm test
```

## Notes and next steps

- The `.hyperexecute.yaml` and workflow are example templates. HyperExecute's YAML schema and CLI name/version may change — if the CLI package name differs in your environment, update the workflow accordingly.
- If you want, I can:
  - customize the matrix to run different browsers (Chrome, Edge) and versions,
  - add more artifact paths (videos, traces) depending on where Playwright emits them,
  - add a small step to publish the combined artifact bundle to HyperExecute storage or an S3 bucket.

Generated on 2025-12-12
