# get-started

> Install by npm.

## install

```shell
npm i -S glob
```

## basic usage

```js
var glob = require('glob');
var files = glob.sync('{**,.*}', { ignore: 'node_modules/**' });

console.log(files);
```

## resources

- [node-glob](https://github.com/isaacs/node-glob)
- [config-glob](http://fis.baidu.com/fis3/docs/api/config-glob.html)
- [globs](http://yangbo5207.github.io/gulp/2016/08/10/new.html)
- [gulp-globs-options](https://gulpjs.org/API.html#gulp-src-globs-options)
