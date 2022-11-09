//Requiring dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const jest = require("jest");

//Requiring constructors
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//Path to output responses
const DIST_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(DIST_DIR, "index.html");

const render = require("./src/pageTemplate");

// Create empty arrays for team and id as place holders
const teamArr = [];
const idArr = [];

// Starting the application
function initApp() {
  function addManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the manager's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the manager's name.";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the manager's ID?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the manager's ID.";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the manager's email?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the manager's email.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the manager's office number?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the manager's office number.";
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamArr.push(manager);
        idArr.push(answers.managerId);
        addTeam();
      });
  }

  //After finished with manager, this function will start to begin adding team members
  function addTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message:
            "Please choose either which member you'd like to add next or end the app.",
          choices: ["Engineer", "Intern", "End App"],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            generateHTML();
        }
      });
  }

  //Function to add an engineer
  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the engineer's name.";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the engineer's ID?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the engineer's ID.";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is the engineer's email?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the engineer's email.";
          },
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is the engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the engineer's GitHub username.";
          },
        },
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub
        );
        teamArr.push(engineer);
        idArr.push(answers.engineerId);
        addTeam();
      });
  }

  // Function for adding an intern
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the intern's name.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is the intern's ID?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the intern's ID.";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is the intern's email?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the intern's email.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is the intern's school?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter the intern's school.";
          },
        },
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        teamArr.push(intern);
        idArr.push(answers.internId);
        addTeam();
      });
  }

  function generateHTML() {
    fs.writeFileSync(outputPath, render(teamArr), "utf-8");
  }

  addManager();
}

initApp();
