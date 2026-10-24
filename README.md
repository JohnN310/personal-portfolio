# John Nguyen — Personal Portfolio

Live site: https://johnn310.github.io/personal-portfolio/

Built with Next.js, TypeScript, and Motion.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Publishing

Push to `main` to build and deploy automatically through GitHub Actions.
GitHub Pages serves the static `out` directory. The workflow supplies the production site URL and repository base path. Local development uses the root path.

```sh
npm run typecheck
npm run build
```
