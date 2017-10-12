'use strict';

var fs = require('fs');

var array = fs.readdirSync('src/components/', ['*']);

// Filter 'App'
array = array.filter(val => {
  return val !== 'App';
});

var componentsString = array.join(', ');
var exportMapping = `{ ${componentsString} }`;

array = array.map(val => {
  return {
    name: val,
    // Don't forget quotes here for path
    path: `'components/${val}'`,
  };
});

var ret = '';

// add import statements
array.forEach(({ name, path }) => {
  ret += `import ${name} from ${path};\n`;
});

// add export statement to export all as one object
ret += '\n';
ret += `export ${exportMapping};`;

fs.writeFile('src/components/App/ComponentsList.js', ret, err => {
  if (err) {
    throw err;
  }
  console.log('Components List created!');
});
