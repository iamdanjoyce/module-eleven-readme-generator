const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// first questions to ask the user
const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title of your repository? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your repository title.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is the description of your repository? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter a description of the repository.');
        return false;
      }
    }
    },
  //confirm whether or not there is a installation process for the applcation
  {
    type: 'confirm',
    name: 'confirmInstallation',
    message: 'Is there an installation process?'
    },
  {
    type: 'input',
    name: 'installation',
    message: 'Please list installation instructions.',
    when: ({ confirmInstallation }) => {
      if (confirmInstallation) {
        return true;
      } else {
        return false;
      }
    }
  },
  { //confirm
    type: 'confirm',
    name: 'confirmUsage',
    message: 'Would you like to give instructions for using your application?'
  },
  { //if confirmed
    type: 'input',
    name: 'instructions',
    message: 'Please list instructions for using your application. It is recommended to add descriptive images later as well.',
    when: ({ confirmUsage }) => {
      if (confirmUsage) {
        return true;
      } else {
        return false;
      }
    }
  },

  { //checkbox for selecting a license
    type: 'checkbox',
    name: 'license',
    message: 'Please choose a license.',
    choices: ['GNU AGPLv3', 'GNU GPLv3',
      'GNU LGPLv3', 'Mozilla Public License 2.0',
      'Apache License 2.0', 'MIT License', 'Boost Software License 1.0',
      'The Unlicense'],
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please select a license.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Please explain how other developers may contribute to your project.',
    when: ({ confirmContribution }) => {
      if (confirmContribution) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'username',
    message: 'What is your GitHub username? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your GitHub username.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required)',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your email.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'questions',
    message: 'Please list instructions for those who wish to contact you.',
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        return false;
      }
    }
  }];
// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then((answers) => {
        writeToFile("README.md", generateMarkdown(answers));
    });
}

// function call to initialize program
init();

