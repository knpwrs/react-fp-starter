import React from 'react';
import g from 'glamorous';
import { pure } from 'recompose';
import StyledLink from './styled-link';

const HeaderLink = StyledLink({
  textDecoration: 'none',
  marginLeft: '1em',
  fontSize: '2em',
  color: 'grey',
  ':hover': {
    color: 'black',
  },
});

const Header = () => (
  <g.Header
    display="flex"
    alignItems="center"
  >
    <h1>React FP Starter</h1>
    <g.Nav
      marginLeft="auto"
    >
      <HeaderLink to="/home">Home</HeaderLink>
      <HeaderLink to="/about">About</HeaderLink>
    </g.Nav>
  </g.Header>
);

export default pure(Header);
