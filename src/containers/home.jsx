import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';
import * as counterActions from '../actions/counter';
import Counter from '../components/counter';

const Home = ({ counter, actions }) => (
  <Counter
    increment={actions.increment}
    incrementAsync={actions.incrementAsync}
    decrement={actions.decrement}
    decrementAsync={actions.decrementAsync}
    counter={counter}
  />
);

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  counter: PropTypes.number.isRequired,
};

const mapStateToProps = ({ counter }) => ({
  counter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(counterActions, dispatch),
});

export default compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
