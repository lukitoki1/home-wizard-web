# home-wizard-web

A repository of the Next.js web app (Frontend) for Home Wizard.

## Getting started

`yarn` to install all dependencies.

Optionally `yarn build` to eliminate the error:

> must be built because it never has been before or the last one failed

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

 Common scripts:

1. `yarn dev` - start dev server
2. `yarn fix` - prettify and reformat
3. `yarn test` - perform linting and run all tests

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

## Acknowledgement

This repository is based on a template provided by Mantine: [Template](https://github.com/mantinedev/next-app-template).

The template had preconfigured [Next.js](https://nextjs.org/) app router + [Mantine](https://mantine.dev/).
