# inquirer-recursive

Recursive prompt for [inquirer](https://github.com/SBoudrias/Inquirer.js)

Forked from https://github.com/nathanloisel/inquirer-recursive

## Changes in this fork

* Now accepts a `default` option, so we can default to 'No' when asking if we should start/continue the loop
* Includes `inquirer-autocomplete-prompt` so we can embed auto-complete prompts in the recursive loop
* Fixes the issue where lines would be repeated instead of over-written (see https://github.com/nathanloisel/inquirer-recursive/issues/1)
* Adds `initialMessage` option that replaces `message` on the first iteration of the loop
* Adds `autoStart` option, if true then skip the first prompt and start looping automatically

## Installation

```
npm install github:basementuniverse/inquirer-recursive
```

## Usage

```javascript
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

inquirer.prompt({
  type: 'recursive',
  message: message
  prompts: prompts
})
```

Change `recursive` to whatever you might prefer.

### Options
- **message:** (String|Function) The question that will be asked for iterating over prompts, default: Would you like to loop?
- **initialMessage:** (String) The question that will be asked on the first iteration of the loop
- **prompts:** (Object) Prompts that will be asked multiple times (Required)
- **autoStart** (boolean) If true, will automatically start the loop without asking

#### Example

```javascript
inquirer.registerPrompt('recursive', require('inquirer-recursive'));

inquirer.prompt([
  {
    type: 'recursive',
    message: 'Add another user?',
    initialMessage: 'Add a new user?',
    name: 'users',
    default: false,
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
]).then(answers => {
  console.log(answers.users);
  /*
  OUTPUT :
  [
    {
      name: 'Brendan Eich',
      age: '42',
    }, {
      name: 'Jordan Walke',
      age: '13',
    },
    ...
  ]
  */
});
```

## Credits
[Nathan Loisel](https://github.com/nathanloisel/)

## License
MIT
