const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamArray = [];

const promptManager = () => {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the team manager?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the team manager?'
          },        
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the team manager?'
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the office number of the team manager?'
          },
      ])
      .then(answers => {
        console.log(answers);
        const manager = new Manager (answers.name, answers.id, answers.email, answers.officeNumber);

        teamArray.push(manager); 
        promptMenu();
      });
    };

const promptMenu = () => {
  return inquirer.prompt([
    {
      type:'list',
      name:'choices',
      message:'What would you like to do next?',
      choices:['Add an engineer','Add an intern','Finish building the team']
    }])
    .then(userChoice => {
      switch (userChoice.choices){
        case 'Add an engineer':
          promptEngineer();
          break;
        case 'Add an intern':
          promptIntern();
          break;
        default:
          buildTeam();
      }
    });
};

const promptEngineer = () => {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the engineer?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the engineer?'
          },        
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the engineer?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is the github username of the engineer?'
          },
      ])
      .then(answers => {
        console.log(answers);
        const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);

        teamArray.push(engineer); 
        promptMenu();
      });
    };

    const promptIntern = () => {
      return inquirer
        .prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of the intern?'
          },
          {
              type: 'input',
              name: 'id',
              message: 'What is the id of the intern?'
            },        
          {
              type: 'input',
              name: 'email',
              message: 'What is the email of the intern?'
          },
          {
              type: 'input',
              name: 'school',
              message: 'What is the school of the intern?'
            },
        ])
        .then(answers => {
          console.log(answers);
          const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
  
          teamArray.push(intern); 
          promptMenu();
        });
      };

const buildTeam = () => {
  // check if the file exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFileSync(outputPath, render(teamArray), "utf-8");
}

promptManager();
