/* eslint-disable import/no-extraneous-dependencies */
const R = require('ramda');
const fs = require('fs');
const fp = require('lodash/fp');

const relativeImportPattern = /import .+? from '\.\/.+?';/;
const fileOptions = { encoding: 'utf8' };
const namePrompt = {
  type: 'input',
  name: 'name',
  message: 'Name',
};

const insertSorted = (pattern, contents, line) => {
  const test = R.test(pattern);
  const lines = contents.split('\n');
  const start = R.findIndex(test, lines);
  const end = R.findLastIndex(test, lines) + 1;
  const unsorted = R.slice(start, end, lines);
  unsorted.push(line);
  const sorted = unsorted.sort();
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
    }, ({ name }) => {
      process.chdir(plop.getPlopfilePath());
      const file = 'src/reducers/index.js';
      const rootReducerContents = fs.readFileSync(file, fileOptions);
      let newContents = insertSorted(relativeImportPattern, rootReducerContents, `import ${fp.camelCase(name)} from './${fp.kebabCase(name)}';`);
      newContents = insertSorted(/ {2}.+?,/, newContents, `  ${fp.camelCase(name)},`);
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
    }, ({ name }) => {
      process.chdir(plop.getPlopfilePath());
      const file = 'src/sagas/index.js';
      const rootSagaContents = fs.readFileSync(file, fileOptions);
      let newContents = insertSorted(relativeImportPattern, rootSagaContents, `import ${fp.camelCase(name)}Saga from './${fp.kebabCase(name)}';`);
      newContents = insertSorted(/yield fork\(.+?\);/, newContents, `  yield fork(${fp.camelCase(name)}Saga);`);
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
