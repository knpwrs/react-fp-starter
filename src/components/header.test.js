/* eslint-disable react/jsx-filename-extension */
// https://github.com/avajs/ava/issues/631
import test from 'ava';
import R from 'ramda';
import React from 'react';
import render from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { withContext } from 'recompose';
import { Bare as Header } from './header';

const routerContext = withContext(Link.contextTypes, () => ({
  router: {
    history: {
      push: R.T,
      replace: R.T,
      createHref: R.T,
    },
  },
}));

test('counter', (t) => {
  const H = routerContext(Header);
  const tree = render.create(<H />);
  t.snapshot(tree);
});
