# globby
> User-friendly glob matching.


## install
```shell
npm install -S globby
```

## globbing patterns
> Just a quick overview.
~~~
* matches any number of characters, but not /
? matches a single character, but not /
** matches any number of characters, including /, as long as it's the only thing in a path part
{} allows for a comma-separated list of "or" expressions
~~~

## usage
```js
var glob = require('glob');
var files = globby.sync(['**', '.*', '!node_modules']);

console.log(files);

/*
[ 'LICENSE.txt',
  'README.md',
  'deploy.sh',
  'index.js',
  'package.json',
  'docs/README.md',
  'src/app.js',
  'docs/javascript/001-get-started.md',
  'docs/javascript/002-globby.md',
  '.editorconfig',
  '.gitignore',
  '.npmignore',
  '.npmrc',
  '.prettierrc' ]
*/
```

## resources
- https://github.com/sindresorhus/globby
