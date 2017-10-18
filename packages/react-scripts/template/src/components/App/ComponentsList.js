import React from 'react';
import { Link } from 'react-router-dom';
import AppHello from 'components/AppHello';
import Hello from 'components/Hello';

const ComponentsList = () => (
  <ul className="components-list">
    <li>
      <Link to={'/components/AppHello'}>AppHello</Link>
    </li>
    <li>
      <Link to={'/components/Hello'}>Hello</Link>
    </li>
  </ul>
);

ComponentsList.components = [
  {
    name: 'AppHello',
    path: '/components/AppHello',
    component: AppHello,
  },

  {
    name: 'Hello',
    path: '/components/Hello',
    component: Hello,
  },
];

export default ComponentsList;
