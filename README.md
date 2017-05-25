# react-fp-starter

An opinionated starter project for React. All of the major decisions are made
for you, but the boilerplate itself is still lightweight and the build internals
are not hidden from you if you want to change anything.

## Features

### [`react`], [`redux`], and [`redux-saga`]

[`react`] and [`redux`] are the tried and true combination. [`redux-saga`] is
side effect pattern for [`redux`] which has a steeper initial learning curve
than [`redux-thunk`] but is ultimately more flexible and easier to test.
[`redux`] action creators and reducers are made using the excellent
[`redux-actions`] library. [`redux`] is bootstrapped to support debugging with
[`redux-devtools-extension`].

### [`plop`] generators for components, reducers, sagas, and actions

Run `yarn plop` to get a menu of generators. You can also run `yarn plop
<generator>` (e.g., `yarn plop reducer`) to skip directly to a generator. New
files will be created with correct casings no matter what you enter for the
name. When you generate reducers and sagas they will automatically be imported
and inserted into the root reducers and sagas in alphabetical order.

### [`direnv`] node layout

If you have [`direnv`] installed you can use the executables in
`node_modules/.bin` directly. Instead of running `yarn plop reducer` you can
just run `plop reducer`.

### [`yarn`]

There is a `yarn.lock` file in the root of this repo that is guaranteed to
resolve dependencies that work with each other. If you want to update your
dependencies you can `rm yarn.lock` and run `yarn`.

### Functional components with [`recompose`]

[`recompose`] is a collection of higher-order components which enables powerful
techniques for functional components.

### [`babel`] with [`babel-preset-env`] and [`babel-preset-react`]

[`babel-preset-env`] acts like autoprefixer for JavaScript, only using the
[`babel`] plugins required to work in the browsers you are targeting. Edit the
`browsers` line in `.babelrc` to change the browsers you support according to
[`browserslist`].

### Routing with [`react-router`]

I've tried a number of routing solutions for [`react`] and always end up back at
[`react-router`].

### Styles with [`glamor`], [`glamorous`], and [`sanitize.css`]

One of [`react`]'s initial innovations was taking DOM structure out of HTML and
moving it to JavaScript. In that same spirit a number of CSS-in-JS frameworks
have cropped up. I've settled on [`glamor`] and [`glamorous`], the latter of
which is like [`styled-components`] but built on top of [`glamor`] instead of
tagged template strings. [`sanitize.css`] is also included as an entry point in
the [`webpack`] configuration.

### Testing with [`ava`] and code coverage with [`nyc`]

[`ava`] is a fast and straightforward testing framework that enforces best
practices for functional programming by automatically running your tests in
parallel. Code coverage reports are generated using [`nyc`]. React components
are tested using [snapshots][ava-snapshots]. To run tests and generate coverage
reports, use `yarn test`. To run tests continually while you code run `yarn run
test:watch`.

### Linting with [`eslint`] and [`eslint-config-airbnb`]

Airbnb has published a comprehensive style guide and best practice document for
JavaScript and [`react`] components. They have also published their rules as an
[`eslint`] config preset. This project follows their rules and conventions.

### Single file [`webpack`] configuration

I haven't found multi-file [`webpack`] configuration to be worthwhile. I have
one file set up to define a base configuration that is then modified for
development or production respectively.

### Production minification with [`babili`]

[`babili`] is a next-generation JavaScript minifier based on [`babel`].
[`babili`] is used since [it is possible for WebPack to output code with dynamic
`import` statements][webpack-dynamic-import] (which are removed by [`babili`] in
production).

### Hot Loading

Components and reducers are hot loaded while you code. Hot loading is not the
same as live reloading, your application is updated in place and state is
maintained.

## License

MIT

[`ava`]: https://github.com/avajs/ava "ava"
[`babel-preset-env`]: https://babeljs.io/docs/plugins/preset-env/ "babel-preset-env"
[`babel-preset-react`]: https://babeljs.io/docs/plugins/preset-react/ "babel-preset-react"
[`babel`]: http://babeljs.io/ "babel"
[`babili`]: https://github.com/babel/babili "babili"
[`browserslist`]: https://www.npmjs.com/package/browserslist "browserslist"
[`direnv`]: https://direnv.net/ "direnv"
[`eslint-config-airbnb`]: https://github.com/airbnb/javascript "eslint-config-airbnb"
[`eslint`]: http://eslint.org/ "eslint"
[`glamor`]: https://www.npmjs.com/package/glamor "glamor"
[`glamorous`]: https://www.npmjs.com/package/glamorous "glamorous"
[`nyc`]: https://www.npmjs.com/package/nyc "nyc"
[`plop`]: https://www.npmjs.com/package/plop
[`react-router`]: https://reacttraining.com/react-router/web "react-router-dom"
[`react`]: https://facebook.github.io/react/ "React"
[`recompose`]: https://github.com/acdlite/recompose "recompose"
[`redux-actions`]: https://www.npmjs.com/package/redux-actions "redux-actions"
[`redux-devtools-extension`]: https://github.com/zalmoxisus/redux-devtools-extension
[`redux-saga`]: https://github.com/redux-saga/redux-saga "redux-saga"
[`redux-thunk`]: https://github.com/gaearon/redux-thunk "redux-thunk"
[`redux`]: http://redux.js.org/ "Redux"
[`sanitize.css`]: https://www.npmjs.com/package/sanitize.css
[`styled-components`]: https://www.npmjs.com/package/styled-components "styled-components"
[`webpack`]: https://webpack.js.org/ "webpack"
[`yarn`]: https://yarnpkg.com/ "yarn"
[ava-snapshots]: https://github.com/avajs/ava#snapshot-testing "AVA Snapshot Testing"
[webpack-dynamic-import]: https://github.com/webpack-contrib/babili-webpack-plugin/pull/39 "babili-webpack-plugin #39"
