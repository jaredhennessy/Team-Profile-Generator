//jshint esversion:6
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(github) {
    this.github = github;
  }
  getGithub() {
    console.log(this.github);
    return this.github;
  }

  getRole() {
    console.log("Engineer");
    return "Engineer";
  }
}

module.exports = Engineer;
