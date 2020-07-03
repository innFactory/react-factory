const chalk = require("chalk");
const childProcess = require("child_process");

module.exports = {
  validateFirebaseName: function(input) {
    if (!input) return false;
    if (input.match("http") || input.match("firebaseio.com")) {
      return chalk.red("Just include the Firebase name, not the entire URL");
    }
    if (!input.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
      return chalk.red(
        "Your Firebase name may only contain [a-z], [0-9], and hyphen (-). " +
          "It may not start or end with a hyphen."
      );
    }
    return true;
  },
  getProjects: function() {
    try {
      const projects = childProcess
        .execSync(`firebase projects:list`, {
          stdio: "pipe"
        })
        .toString();
      const regex = /^│ (?!Project Display Name)([\w\d\s-]*) │ (?!Project ID)([\w\d\s-]*) │/gm;

      const projectList = [];

      let match;
      while ((match = regex.exec(projects)) !== null) {
        const projectName = match[1].trim();
        const projectId = match[2].trim();

        projectList.push({
          id: projectId,
          name: projectName
        });
      }

      return projectList;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
};
