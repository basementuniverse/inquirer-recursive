var inquirer = require("inquirer");
var Base = require("inquirer/lib/prompts/base");

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

class Prompt extends Base {
  constructor(question, rl, answers) {
    super(question, rl, answers);
    this.responses = [];
  }

  askForLoop() {
    if (this.opt.autoStart && this.responses.length === 0) {
      this.askNestedQuestion();
    } else {
      const message = ('initialMessage' in this.opt && this.responses.length === 0)
        ? this.opt.initialMessage
        : this.opt.message;
      inquirer.prompt({
        default: 'default' in this.opt ? this.opt.default : true,
        type: 'confirm',
        name: 'loop',
        message: message || 'Would you like to loop?'
      }).then(result => {
        if (result.loop) {
          this.askNestedQuestion();
        } else {
          this.done(this.responses);
        }
      });
    }
  }

  askNestedQuestion() {
    inquirer.prompt(this.opt.prompts).then(result => {
      this.responses.push(result);
      this.askForLoop();
    });
  }

  _run(cb) {
    this.done = cb;
    this.render();
    this.askForLoop();
    return this;
  }

  render() {
    this.screen.render('');
    process.stdout.write('\x1b[1A\r');
  }
}

module.exports = Prompt;
