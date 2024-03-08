const spawn = require('child_process').spawn;
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'builds',
      message: '打包类型',
      choices: ['IE', 'NONE'],
    },
  ])
  .then((answers) => {
    spawn(
      /^win/.test(process.platform) ? 'cross-env.cmd' : 'cross-env',
      ["MODE='build'", `COMPATIBLE=${answers.builds}`, 'max', 'build'],
      {
        stdio: 'inherit',
      },
    );
    return true;
  })
  .catch((error) => {
    console.log('[debug]: error', error);
  });
