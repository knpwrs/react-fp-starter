import React from 'react';
import g from 'glamorous';
import { Link } from 'react-router-dom';

export default g(({ children, ...other }) => (
  <Link {...other}>{children}</Link>
));
