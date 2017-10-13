import React from 'react';
import { Link } from 'react-router-dom';
import AppHello from 'components/AppHello';
import Hello from 'components/Hello';

const ComponentsList = () => (
  <ul div="components-list">
    <li>
      <Link to={'/AppHello'}>AppHello</Link>
    </li>
    <li>
      <Link to={'/Hello'}>Hello</Link>
    </li>
  </ul>
);

ComponentsList.components = [
  {
    name: 'AppHello',
    path: '/AppHello',
    component: AppHello,
  },
  {
    name: 'Hello',
    path: '/Hello',
    component: Hello,
  },
];

export default ComponentsList;
