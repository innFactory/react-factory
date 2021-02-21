"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const capitalize = require("lodash/capitalize");
const utils = require("./utils");
const figlet = require("figlet");

const featureChoices = [
  {
    name: "Tests for UI (Cypress)",
    answerName: "includeCypress",
    checked: false
  },
  {
    name: "Sub Library (lib)",
    answerName: "includeLib",
    checked: false
  },
  {
    name: "IE 11 PolyFills",
    answerName: "includeIE11Polyfills",
    checked: false
  },
  {
    name: "Firebase",
    answerName: "includeFirebase",
    checked: false
  },
  {
    name: "Snackbar State and Component",
    answerName: "includeSnackbars",
    checked: false
  },
  {
    name: "Service Worker",
    answerName: "includeServiceWorker",
    checked: false
  },
  {
    name: "Include Github Actions",
    answerName: "includeGithubActions",
    checked: false
  }
];

const projects = utils.getProjects();

const prompts = [
  {
    type: "input",
    name: "githubUser",
    message: "Github Username",
    default: "testuser",
    store: true
  },
  {
    type: "input",
    name: "appName",
    message: "App Name",
    default: "my-react-app",
    store: true
  },
  {
    type: "input",
    name: "appVersion",
    message: "App Version",
    default: "1.0.0",
    store: true
  },
  {
    type: "list",
    name: "selectedLicense",
    message: "Which license do you want to choose?",
    default: 0,
    choices: [
      {
        name: "None"
      },
      {
        name: "MIT License"
      }
    ]
  },
  {
    type: "checkbox",
    message: "Other Features To Include:",
    name: "otherFeatures",
    choices: featureChoices,
    store: true
  },
  {
    type: "confirm",
    name: "firebaseProjectCreated",
    message: "Was a Firebase-Project created for this app?",
    default: false
  },

  {
    type: "input",
    name: "firebaseProjectId",
    message: "Firebase Project Id",
    default: "my-firebase-project-id",
    store: true,
    when: answers =>
      answers.otherFeatures.includes("Firebase") &&
      !answers.firebaseProjectCreated
  },
  {
    type: "list",
    name: "firebaseProjectId",
    message: "Select Firebase Project",
    store: true,
    choices: projects.map(p => ({
      name: `${p.name} (${p.id})`,
      value: p.id
    })),
    when: answers =>
      answers.otherFeatures.includes("Firebase") &&
      answers.firebaseProjectCreated
  },
  {
    type: "input",
    name: "githubCommitEmail",
    message: "Email to identify commits for code-coverage badges",
    default: "info@info.com",
    store: true,
    when: answers => {
      return (
        answers.otherFeatures.includes("Include Github Actions") &&
        answers.otherFeatures.includes("Tests for UI (Cypress)")
      );
    }
  }
];

const filesArray = [
  { src: "_README.md", dest: "README.md" },
  { src: "_package.json", dest: "package.json" },
  { src: ".prettierrc.json", dest: ".prettierrc.json" },
  { src: ".prettierignore", dest: ".prettierignore" },
  {
    src: "gittemplate",
    dest: ".gitignore"
  },
  { src: "screenshot.png", dest: "screenshot.png" },
  { src: "react_factory.png", dest: "react_factory.png" },
  { src: "tsconfig.json", dest: "tsconfig.json" },
  { src: "tsconfig.prod.json", dest: "tsconfig.prod.json" },
  { src: "tsconfig.test.json", dest: "tsconfig.test.json" },
  { src: "vscode_snippet0.png", dest: "vscode_snippet0.png" },
  { src: "vscode_snippet1.png", dest: "vscode_snippet1.png" },
  { src: "vscode_snippet2.png", dest: "vscode_snippet2.png" },
  { src: "public/**", dest: "public" },
  { src: ".vscode/**", dest: ".vscode" },
  // SRC
  { src: "src/actions/index.ts", dest: "src/actions/index.ts" },
  { src: "src/actions/config.ts", dest: "src/actions/config.ts" },
  { src: "src/actions/todo.ts", dest: "src/actions/todo.ts" },


  { src: "src/components/Drawer.tsx", dest: "src/components/Drawer.tsx" },
  { src: "src/components/HomeBox.tsx", dest: "src/components/HomeBox.tsx" },
  { src: "src/components/index.ts", dest: "src/components/index.ts" },
  { src: "src/components/TodoDialog.tsx", dest: "src/components/TodoDialog.tsx" },
  { src: "src/components/TodoTable.tsx", dest: "src/components/TodoTable.tsx" },

  { src: "src/model/config.ts", dest: "src/model/config.ts" },
  { src: "src/model/todo.ts", dest: "src/model/todo.ts" },
  { src: "src/model/_index.ts", dest: "src/model/index.ts" },

  { src: "src/pages/**", dest: "src/pages" },

  {
    src: "src/reducers/createReducer.ts",
    dest: "src/reducers/createReducer.ts"
  },
    { src: "src/reducers/config.ts", dest: "src/reducers/config.ts" },
  { src: "src/reducers/todo.ts", dest: "src/reducers/todo.ts" },
  { src: "src/reducers/_index.ts", dest: "src/reducers/index.ts" },

  { src: "src/_App.tsx", dest: "src/App.tsx" },

  { src: "src/_index.tsx", dest: "src/index.tsx" },
  { src: "src/configureStore.tsx", dest: "src/configureStore.tsx" },
  { src: "src/typings.d.ts", dest: "src/typings.d.ts" },
  { src: "src/ReduxRoot.tsx", dest: "src/ReduxRoot.tsx" },
  { src: "src/Router.tsx", dest: "src/Router.tsx" },
  { src: "src/withRoot.tsx", dest: "src/withRoot.tsx" }
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", { type: String, required: false });
    this.argument("skipInstall", { type: Boolean, required: false });
    this.initialData = {
      appVersion: "1.0.0",
      appName: "",
      firebasePublicVapidKey: null,
      includeFirebase: false,
      firebaseProjectId: null,
      includeCypress: false,
      includeIE11Polyfills: false,
      includeLib: false,
      appPath: this.env.options.appPath
    };
  }

  prompting() {
    this.log(
      chalk.white(figlet.textSync("ReactFactory", { horizontalLayout: "full" }))
    );
    this.log(chalk.red("by innFactory\n"));

    return this.prompt(prompts).then(props => {
      this.answers = props;
      // Map features array to answerNames
      if (props.otherFeatures) {
        featureChoices.forEach(choice => {
          const matching = props.otherFeatures.find(
            feature => choice.name === feature
          );
          this.answers[choice.answerName] = !!matching;
        });
      }
      this.data = Object.assign({}, this.initialData, this.answers);
    });
  }

  writing() {
    const ignorePaths = [];

    if (this.answers.includeGithubActions) {
      this.composeWith(require.resolve("../github-workflows"), {
        includeCypressTestsWorkflow: this.answers.includeCypress,
        includeBuildAndDeploy: this.answers.includeFirebase,
        arguments: [
          this.answers.githubCommitEmail,
          this.answers.firebaseProjectId
        ]
      });
    }

    if (this.answers.includeSnackbars) {
      filesArray.push(
        {
          src: "src/actions/snackbarEvent.ts",
          dest: "src/actions/snackbarEvent.ts"
        },
        {
          src: "src/model/snackbarEvent.ts",
          dest: "src/model/snackbarEvent.ts"
        },
        {
          src: "src/reducers/snackbarEvent.ts",
          dest: "src/reducers/snackbarEvent.ts"
        },
        {
          src: "src/components/Snackbar.tsx",
          dest: "src/components/Snackbar.tsx"
        }
      );
    }

    // UI Tests
    if (this.answers.includeCypress) {
      filesArray.push(
        { src: "cypress/**", dest: "cypress" },
        { src: "cypress.json" }
      );
    }

    // LICENSE
    if (this.answers.selectedLicense === 1) {
      filesArray.push({ src: "MIT_LICENSE", dest: "LICENSE" });
    }

    if (this.answers.includeFirebase) {
      filesArray.push(
        { src: "firebase.json", dest: "firebase.json" },
        { src: "_.firebaserc", dest: ".firebaserc" },
        { src: "src/cheet.d.ts", dest: "src/cheet.d.ts" },
        { src: "src/firebase/**", dest: "src/firebase" }
      );
    }

    if (this.answers.includeServiceWorker) {
      filesArray.push({
        src: "src/registerServiceWorker.js",
        dest: "src/registerServiceWorker.js"
      });
    }

    if (this.answers.includeLib) {
      this.composeWith(require.resolve("../lib-gen"));
    }

    filesArray.forEach(file => {
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        {}, // templateOptions    // not here
        { globOptions: { ignore: ignorePaths, dot: true } } // < but here
      );
    });
  }

  install() {
    /* eslint-disable no-console */
    console.log(chalk.blue("\nProject Generated successfully"));
    const installCommand = "npmInstall";
    const depManagerName = "NPM";
    if (!this.options.skipInstall) {
      console.log(`Installing dependencies using ${depManagerName}...`);
      // Promise chaining used since this.npmInstall.then not a function
      return Promise.resolve()
        .then(() => {
          return this[installCommand]();
        })
        .then(() => {
          console.log(
            chalk.blue(
              `Dependencies successfully installed using ${depManagerName}...`
            )
          );
        });
      /* eslint-enable no-console */
    }
  }
};
