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
  }

  prompting() {}

  writing() {
    const filesArray = [];

    filesArray.push(
      {
        src: "lib/**",
        dest: "lib"
      },
      {
        src: "_gittemplate",
        dest: "lib/.gitignore"
      },
      {
        src: "lib/.storybook/**",
        dest: "lib/.storybook"
      },
      {
        src: "lib/src/**",
        dest: "lib/src"
      },
      {
        src: "lib/tsconfig.json",
        dest: "lib/tsconfig.json"
      },
      {
        src: "lib/tsconfig.test.json",
        dest: "lib/tsconfig.test.json"
      },
      {
        src: "lib/rollup.config.js",
        dest: "lib/rollup.config.js"
      },
      {
        src: "lib/README.md",
        dest: "lib/README.md"
      },
      {
        src: "lib/package.json",
        dest: "lib/package.json"
      }
    );

    filesArray.forEach(file => {
      return this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data,
        { globOptions: { dot: true } } // templateOptions    // not here
      );
    });
  }
};
