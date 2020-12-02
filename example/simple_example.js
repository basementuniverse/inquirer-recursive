'use strict';

var inquirer = require('inquirer');
inquirer.registerPrompt('recursive', require('..'));

inquirer
.prompt([
  {
    type: 'recursive',
    message: 'Add another user?',
    initialMessage: 'Add a new user?',
    name: 'users',
    default: false,
    autoStart: false,
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the user\'s name?',
        validate: function (value) {
          if ((/.+/).test(value)) {
            return true;
          }
          return 'Name cannot be empty';
        }
      }, {
        type: 'input',
        name: 'age',
        message: 'How old is the user?',
        validate: function (value) {
          var digitsOnly = /\d+/;
          if (digitsOnly.test(value)) {
            return true;
          }
          return 'Age must be numeric';
        }
      }
    ]
  }
])
.then(answers => {
  console.log(answers);
});
