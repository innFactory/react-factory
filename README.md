# generator-react-factory

## Installation

First, install [Yeoman](http://yeoman.io) and generator-innfactory-react using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-react-factory
```

Then generate your new project:

```bash
yo react-factory
```

## Contains

The CLI lets you configure a template with following features:
Everything except the base project is optional.

- [x] Cypress-Tests-Environment
- [x] Firebase-Integration
- [x] Github Actions (cypress-test, build-and-deploy to firebase)
- [x] Snackbars
- [x] Subfolder Library
- [x] Service Worker
- [x] PolyFills (IE11)

## Subgenerators

### GithubWorkflows

-- includeCypressTestsWorkflow = Creates Cypress Test action

-- includeBuildAndDeploy = Creates BuildAndDeploy action

"info@info.com" = githubCommitEmail => REQUIRED

"test-proj" = firebaseProjectId => REQUIRED

yo react-factory:github-workflows "info@info.com" "test-proj" --includeCypressTestsWorkflow --includeBuildAndDeploy

## Getting To Know Yeoman

- Yeoman has a heart of gold.
- Yeoman is a person with feelings and opinions, but is very easy to work with.
- Yeoman can be too opinionated at times but is easily convinced not to be.
- Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [patsta32](https://github.com/patsta32) [innFactory](https://github.com/innFactory)
