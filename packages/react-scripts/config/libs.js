const libs = [
  {
    name: '@svmx/ui-components-predix',
    jsIncludePaths: ['lib'],
  },
  {
    name: '@svmx/ui-components-lightning',
    jsIncludePaths: ['lib'],
  },
  {
    name: '@svmx/neocore-ui-components',
    jsIncludePaths: ['lib', 'node_modules/@svmx/ui-components-predix/lib'],
  },
];

module.exports = libs;
