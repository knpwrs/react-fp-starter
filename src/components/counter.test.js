/* eslint-disable react/jsx-filename-extension */
// https://github.com/avajs/ava/issues/631
import test from 'ava';
import R from 'ramda';
import React from 'react';
import render from 'react-test-renderer';
import { Bare as Counter } from './counter';

test('counter', (t) => {
  const tree = render.create(
    <Counter
      increment={R.T}
      decrement={R.T}
      incrementAsync={R.T}
      decrementAsync={R.T}
      counter={15}
    />,
  );
  t.snapshot(tree);
});
