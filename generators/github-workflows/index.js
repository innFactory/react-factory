"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const capitalize = require("lodash/capitalize");
const figlet = require("figlet");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("includeCypressTestsWorkflow");
    this.option("includeBuildAndDeploy");

    this.argument("githubCommitEmail", {
      type: String,
      required: this.options.includeCypressTestsWorkflow
    });
    this.argument("firebaseProjectId", {
      type: String,
      required: this.options.includeBuildAndDeploy
    });

    this.initialData = {
      firebaseProjectId: this.arguments[1],
      githubCommitEmail: this.arguments[0]
    };
  }

  prompting() {
    this.data = Object.assign({}, this.initialData);
  }

  writing() {
    const filesArray = [];
    if (this.options.includeBuildAndDeploy) {
      filesArray.push({
        src: "_build-and-deploy.yml",
        dest: ".github/workflows/build-and-deploy.yml"
      });
    }

    if (this.options.includeCypressTestsWorkflow) {
      filesArray.push({
        src: "_cypress-chrome.yml",
        dest: ".github/workflows/cypress-chrome.yml"
      });
    }

    filesArray.forEach(file => {
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        {} // templateOptions    // not here
      );
    });
  }
};
