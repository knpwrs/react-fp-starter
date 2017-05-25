/* eslint-disable import/no-extraneous-dependencies */
const R = require('ramda');
const fs = require('fs');
const fp = require('lodash/fp');

const fileOptions = { encoding: 'utf8' };
const namePrompt = {
  type: 'input',
  name: 'name',
  message: 'Name',
};

const sortBlock = (pattern, contents) => {
  const test = R.test(pattern);
  const lines = contents.split('\n');
  const start = R.findIndex(test, lines);
  const end = R.findLastIndex(test, lines) + 1;
  const sorted = R.slice(start, end, lines).sort();
  lines.splice(start, end - start, ...sorted);
  return lines.join('\n');
};

module.exports = (plop) => {
  plop.addHelper('kebabCase', fp.kebabCase);
  plop.addHelper('camelCase', fp.camelCase);
  plop.addHelper('upperCamelCase', fp.compose(fp.upperFirst, fp.camelCase));

  plop.setGenerator('component', {
    description: 'Reusable Component',
    prompts: [namePrompt],
    actions: [{
      type: 'add',
      path: 'src/components/{{ kebabCase name }}.jsx',
      templateFile: 'templates/component.txt',
      abortOnFail: true,
    }, {
      type: 'add',
      path: 'src/components/{{ kebabCase name }}.test.js',
      templateFile: 'templates/component.test.txt',
      abortOnFail: true,
    }],
  });

  plop.setGenerator('glamorous component', {
    description: 'Reusable Glamorous Component',
    prompts: [namePrompt],
    actions: [{
      type: 'add',
      path: 'src/components/{{ kebabCase name }}.jsx',
      templateFile: 'templates/glamorous-component.txt',
      abortOnFail: true,
    }, {
      type: 'add',
      path: 'src/components/{{ kebabCase name }}.test.js',
      templateFile: 'templates/component.test.txt',
      abortOnFail: true,
    }],
  });

  plop.setGenerator('reducer', {
    description: 'Redux Reducer',
    prompts: [namePrompt],
    actions: [{
      type: 'add',
      path: 'src/reducers/{{ kebabCase name }}.js',
      templateFile: 'templates/reducer.txt',
      abortOnFail: true,
    }, {
      type: 'add',
      path: 'src/reducers/{{ kebabCase name }}.test.js',
      templateFile: 'templates/reducer.test.txt',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: 'src/reducers/index.js',
      pattern: /((?:import .+? from '\.\/.+?;\n)+)/,
      template: "$1import {{ camelCase name }} from './{{ kebabCase name }}';\n",
      abortOnFail: true,
    }, {
      type: 'modify',
      path: 'src/reducers/index.js',
      pattern: /(combineReducers\(\{)/,
      template: '$1\n  {{ camelCase name }},',
    }, () => {
      process.chdir(plop.getPlopfilePath());
      const file = 'src/reducers/index.js';
      const rootReducerContents = fs.readFileSync(file, fileOptions);
      let newContents = sortBlock(/import .+? from '\.\/.+?';/, rootReducerContents);
      newContents = sortBlock(/ {2}.+?,/, newContents);
      fs.writeFileSync(file, newContents);
      return 'Done!';
    }],
  });

  plop.setGenerator('saga', {
    description: 'Redux Saga',
    prompts: [namePrompt],
    actions: [{
      type: 'add',
      path: 'src/sagas/{{ kebabCase name }}.js',
      templateFile: 'templates/saga.txt',
      abortOnFail: true,
    }, {
      type: 'add',
      path: 'src/sagas/{{ kebabCase name }}.test.js',
      templateFile: 'templates/saga.test.txt',
      abortOnFail: true,
    }, {
      type: 'modify',
      path: 'src/sagas/index.js',
      pattern: /((?:import .+? from '\.\/.+?;\n)+)/,
      template: "$1import {{ camelCase name }}Saga from './{{ kebabCase name }}';\n",
      abortOnFail: true,
    }, {
      type: 'modify',
      path: 'src/sagas/index.js',
      pattern: /(yield fork\(.+?\);)/,
      template: '$1\n  yield fork({{ camelCase name }}Saga);',
      abortOnFail: true,
    }, () => {
      process.chdir(plop.getPlopfilePath());
      const file = 'src/sagas/index.js';
      const rootSagaContents = fs.readFileSync(file, fileOptions);
      let newContents = sortBlock(/import .+? from '\.\/.+?';/, rootSagaContents);
      newContents = sortBlock(/yield fork\(.+?\);/, newContents);
      fs.writeFileSync(file, newContents);
      return 'Done!';
    }],
  });

  plop.setGenerator('actions', {
    description: 'Redux Action Creators',
    prompts: [namePrompt],
    actions: [{
      type: 'add',
      path: 'src/actions/{{ kebabCase name}}.js',
      templateFile: 'templates/actions.txt',
      abortOnFail: true,
    }, {
      type: 'add',
      path: 'src/actions/{{ kebabCase name}}.test.js',
      templateFile: 'templates/actions.test.txt',
      abortOnFail: true,
    }],
  });

  plop.setGenerator('container', {
    description: 'Container Component',
    prompts: [namePrompt, {
      type: 'input',
      name: 'reducer',
      message: 'Reducer',
    }, {
      type: 'input',
      name: 'actions',
      message: 'Actions',
    }],
    actions: [{
      type: 'add',
      path: 'src/containers/{{ kebabCase name }}.jsx',
      templateFile: 'templates/container.txt',
      abortOnFail: true,
    }],
  });
};
