//jshint esversion:6
// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(officeNumber) {
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    console.log(this.officeNumber);
    return this.officeNumber;
  }

  getRole() {
    console.log("Manager");
    return "Manager";
  }
}

module.exports = Manager;
