'use strict';

var fs = require('fs');

var array = fs.readdirSync('src/components/', ['*']);

// Filter 'App' out
array = array.filter(val => {
  return val !== 'App';
});

var componentObjectArray = array.reduce((total, curr, index) => {
  total += `\n  {\n    name: "${curr}",\n    path: "/${curr}",\n    component: ${curr}\n  }`;
  if (index !== array.length - 1) {
    total += ',';
  }
  return total;
}, ``);

var componentsArray = `[${componentObjectArray}\n]`;

array = array.map(val => {
  return {
    name: val,
    // Don't forget quotes here for path
    path: `'components/${val}'`,
  };
});

var ret =
  'import React from "react";\nimport { Link } from "react-router-dom";\n';

// The <li> for each of the components
var listitems = ``;
// add import statements
array.forEach(({ name, path }) => {
  ret += `import ${name} from ${path};\n`;
  listitems += `    <li>\n      <Link to={"/${name}"}>${name}</Link>\n    </li>\n`;
});

// add export statement to export all as one object
ret += '\n';
ret += `const ComponentsList = () => (
  <ul div="components-list">\n${listitems}  </ul>
);

ComponentsList.components = ${componentsArray};

export default ComponentsList;
`;

fs.writeFile('src/components/App/ComponentsList.js', ret, err => {
  if (err) {
    throw err;
  }
  console.log('Components List created!');
});
