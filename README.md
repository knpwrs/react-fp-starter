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

## How-To...

### Get Started

Install and run [`yarn`] to install dependencies and then run `yarn dev` to
start a development server. The server is configured to use port `8080` by
default. You can set the port in `webpack.config.babel.js`.

### Add New Features

Use `yarn plop` to generate (glamorous) components, reducers, sagas, action
creators, or containers. When you generate a reducer or saga import statements
will automatically be added in alphabetical order to the respective root reducer
or saga files and the reducer or saga will be added in alphabetical order to the
root reducer or saga.

### Understanding What's Going On

#### Action Creators

Action creators are stored in `src/actions`. They are functions which return
flux standard actions (JavaScript objects with up to three properties: `type`,
`payload`, and optionally `error`). These actions are dispatched into [`redux`]
reducers which return new or old state. See [`redux-actions`] for more
information.

#### Reducers

Reducers are stored in `src/reducers`. They are functions which take the current
state and an action and return either a new state or the old state. Reducers
never mutate their state argument. Reducers are all combined into a single root
reducer in `src/reducers/index.js`. This single root reducer is what [`redux`]
uses to create the store. The reducers in this project are created with helper
functions from [`redux-actions`]. See [`redux`] and [`redux-actions`] for more
information.

#### Sagas

Sagas are generator functions which can `yield` effects. The [`redux-saga`]
middleware will handle actions before they reach the [`redux`] reducers. Sagas
are most useful for handling side effects, including asynchronous side effects,
in a simple, flexible, and testable way. See [`redux-saga`] for more
information.

#### Components

React components are stored in `src/components`. Components in this project are
pure, stateless functions which accept a single props argument representing the
component's props. Components can be enhanced with higher-order components from
the [`recompose`] library.

#### Containers

Containers are just components which listen to the [`redux`] store. Most
components in your application should be functional stateless components which
receive information via their props argument. Containers are bound to the
[`redux`] store using the [`react-redux`] library. The [`react-redux`] library
provides a `Provider` component which makes the store available to connected
components. Components become connected via the `connect` higher-order component
provided by [`react-redux`].

#### Example: Increment Button

First, take a look at `src/actions/counter.js`. The action we are interested in
is `increment`, an exported constant. The action creator is defined with
`createAction` from the [`redux-actions`] package. The first argument defines
the type of action the action creator will create. The second argument is a
payload customizer function. We use `R.T`, a function from [`ramda`] which
always returns `true`. We use this as our payload customizer so that any
arguments passed to the action creator are ignored. The side effect of using
`R.T` is that the payload will literally be `true`, which is fine for our
purposes. Without a payload customizer the first argument passed to the action
creator will become the action's payload. When used with React as an event
handler, that means React's synthetic event will become the payload. We want to
avoid this because it is not safe to keep React's synthetic events around. This
is why we use `R.T` as the payload customizer.

Next, take a look at the home route / counter container at
`src/containers/home.jsx`. A container, you will recall, is just a component
which is bound to a redux store. Binding to the [`redux`] store is done in
combination with the `Provider` component and `connect` higher-order component
from the [`react-redux`] package. The `Provider` component is used in
`src/index.jsx` whereas the `connect` higher-order component is used directly in
the container files.

The container is made of three parts: a component, a function which maps
[`redux`] store state to props on the component, and a function which maps
action creators to props on the component. The first function,
`mapStateToProps`, takes the entire state from [`redux`] and returns an object,
the key/value pairs of which will be passed as props to the component. The
second function, `mapDispatchToProps`, takes one argument, the `dispatch`
function from the [`redux`] store, and returns an object, the key/value pairs of
which will be passed as props to the component. The values returned from the
second function should be functions that dispatch actions into the redux store,
using the passed `dispatch` function. There is a function exported from
[`redux`], `bindActionCreators`, which helps with this. See the implementation
of `mapDispatchToProps` for details.

The `Home` container passes the state from [`redux`] as well as the bound action
creators to the `Counter` component defined in `src/components/counter.jsx`. The
`Counter` component then takes the bound `increment` action creator and uses it
as a click handler for the `+1` button. When the user presses `+1`, an
`INCREMENT` action will be dispatched into the [`redux`] store.

The [`redux`] store is powered by the root reducer defined in
`src/reducers/index.js`. A reducer is just a function which takes the state and
an action as arguments and returns either the old state or a new state. A
reducer never mutates the state. The root reducer is defined with the
`combineReducers` function from [`redux`] by constructing an object of reducers.
The root reducer is just like any other reducer, except it passes all actions
passed to it to child reducers and sets

// TODO: Rewrite that last paragraph

#### Example: Asynchronous Increment Button

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
[`react-redux`]: https://www.npmjs.com/package/react-redux "react-redux"
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
