//jshint esversion:6
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let questions = [
  {
    type: "list",
    name: "role",
    message: "What is the Employee's role?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "name",
    message: "What is the Employee's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the Employee's ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Employee's email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the Manager's office phone number?",
    when: function (answers) {
      return answers.role === "Manager";
    },
    validate: function (value) {
      var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
      );
      if (pass) {
        return true;
      }
      return "Please enter a valid phone number";
    },
  },
  {
    type: "input",
    name: "github",
    message: "What is the Engineer's GitHub username?",
    when: function (answers) {
      return answers.role === "Engineer";
    },
  },
  {
    type: "input",
    name: "school",
    message: "What school does the Intern attend?",
    when: function (answers) {
      return answers.role === "Intern";
    },
  },
  {
    type: "confirm",
    name: "repeat",
    message: "Enter another employee?",
  },
];

let employees = [];
let repeat = false;

function getEmployee() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      repeat = answers.repeat;
      switch (answers.role) {
        case "Manager":
          const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
          );
          employees.push(manager);
          break;

        case "Engineer":
          const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
          );
          employees.push(engineer);
          break;

        case "Intern":
          const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
          );
          employees.push(intern);
          break;

        default:
          const employee = new Employee(
            answers.name,
            answers.id,
            answers.email
          );
          employees.push(employee);
          break;
      }
    })
    .then(() => {
      if (repeat) {
        getEmployee();
      } else {
        // After the user has input all employees desired, call the `render` function (required
        // above) and pass in an array containing all employee objects; the `render` function will
        // generate and return a block of HTML including templated divs for each employee!

        // console.log(employees);
        fs.writeFile(outputPath, render(employees), function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("HTML written to ./output/team.html");
        });
      }
    });
}

getEmployee();
