
const spawn = require('child_process').spawn;
const inquirer = require('inquirer');
const proxyMap = require('../config/proxy.js');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'proxy',
      message: '🎢 请选择接口代理：',
      choices: Object.keys(proxyMap),
    },
  ])
  .then((answers) => {
    spawn(
      /^win/.test(process.platform) ? 'cross-env.cmd' : 'cross-env',
      [
        "MODE='dev'",
        `COMPATIBLE=${answers.start}`,
        `PROXY=${answers.proxy}`,
        'max',
        'dev',
      ],
      {
        stdio: 'inherit',
      },
    );
    return true;
  })
  .catch((error) => {
    console.log('[debug]: error', error);
  });

