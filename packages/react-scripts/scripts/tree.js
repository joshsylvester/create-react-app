'use strict';

var fs = require('fs');

// Create components list
(() => {
  var array = fs.readdirSync('src/components/', ['*']);

  // Filter 'App' out
  array = array.filter(val => {
    return val !== 'App';
  });

  var componentObjectArray = array.reduce((total, curr) => {
    total += `\n  {\n    name: '${curr}',\n    path: '/components/${curr}',\n    component: ${curr},\n  },`;
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

  var ret = `import React from 'react';\nimport { Link } from 'react-router-dom';\n`;

  // The <li> for each of the components
  var listitems = ``;
  // add import statements
  array.forEach(({ name, path }) => {
    ret += `import ${name} from ${path};\n`;
    listitems += `    <li>\n      <Link to={'/components/${name}'}>${name}</Link>\n    </li>\n`;
  });

  // add export statement to export all as one object
  ret += '\n';
  ret += `const ComponentsList = () => (\n  <ul className="components-list">\n${listitems}  </ul>\n);

ComponentsList.components = ${componentsArray};

export default ComponentsList;
`;

  fs.writeFile('src/components/App/ComponentsList.js', ret, err => {
    if (err) {
      throw err;
    }
    console.log('Components List created!');
  });
})();

// Create containers list
// Same logic as components list
(() => {
  var array = fs.readdirSync('src/containers/', ['*']);

  // Filter 'App' out
  array = array.filter(val => {
    return val !== 'PageContainer';
  });

  var containersObjectArray = array.reduce((total, curr) => {
    total += `\n  {\n    name: '${curr}',\n    path: '/containers/${curr}',\n    container: ${curr},\n  },`;
    return total;
  }, ``);

  var containersArray = `[${containersObjectArray}\n]`;

  array = array.map(val => {
    return {
      name: val,
      // Don't forget quotes here for path
      path: `'containers/${val}'`,
    };
  });

  var ret = `import React from 'react';\nimport { Link } from 'react-router-dom';\n`;

  // The <li> for each of the components
  var listitems = ``;
  // add import statements
  array.forEach(({ name, path }) => {
    ret += `import ${name} from ${path};\n`;
    listitems += `    <li>\n      <Link to={'/containers/${name}'}>${name}</Link>\n    </li>\n`;
  });

  // add export statement to export all as one object
  ret += '\n';
  ret += `const ContainersList = () => (\n  <ul className="containers-list">\n${listitems}  </ul>\n);

ContainersList.containers = ${containersArray};

export default ContainersList;
`;

  fs.writeFile('src/components/App/ContainersList.js', ret, err => {
    if (err) {
      throw err;
    }
    console.log('Containers List created!');
  });
})();
