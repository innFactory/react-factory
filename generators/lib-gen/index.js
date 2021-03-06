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
        src: "_gittemplate",
        dest: "lib/.gitignore"
      },
      {
        src: ".storybook/**",
        dest: "lib/.storybook"
      },
      {
        src: "src/**",
        dest: "lib/src"
      },
      {
        src: "tsconfig.json",
        dest: "lib/tsconfig.json"
      },
      {
        src: "tsconfig.test.json",
        dest: "lib/tsconfig.test.json"
      },
      {
        src: "rollup.config.js",
        dest: "lib/rollup.config.js"
      },
      {
        src: "README.md",
        dest: "lib/README.md"
      },
      {
        src: "_package.json",
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
