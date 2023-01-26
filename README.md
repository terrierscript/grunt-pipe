> **Warning**
> This project is not maintained

# grunt-pipe

> Simple file pipe process

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pipe --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pipe');
```

## The "pipe" task

### Overview
In your project's Gruntfile, add a section named `pipe` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pipe: {
    your_target: {
      options: {
        ignoreEmpty : true,
        domMode : false,
        process : function(content, options, grunt, srcFilePath){
          // write your want content
          return content
        }
      },

      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.process
Type: `Function`

Processing function that has below arguments.
- content
  - `String`
  - source file content.
- filepath
  - `String`
  - source file path
- grunt
  - `Object`
  - grunt object

- example
  - this example replace content item
```javascript
function(content, filepath, grunt){
  return content.replace(/baz/,"foo")
}
```


#### options.ignoreEmpty
Type: `Boolean`
Default value: `true`

When this value true and process result is empty value, this task not output anything.

#### options.domMode
Type: `Boolean`
Default value: `false`

If true, convert content to [cheerio](https://npmjs.org/package/cheerio) dom object.

You can handling dom in options.process for example below.

```javascript
function($, filepath, grunt){
  $("div").attr("foo","baz")
  return $.html()
}
```

### Usage Examples
#### Simple usage
In this sample, replace test/fixtures/foo's content's baz to foo.

```js
default_options: {
  options: {
    process : function(content, filepath, grunt){
      return content.replace(/baz/,"foo")
    }
  },
  files: {
    'tmp/foo': 'test/fixtures/foo'
  },
},
```

#### Dom Mode
In this sample, change dom items.

```js
dom_mode: {
  options: {
    domMode : true,
    process : function($, filepath, grunt){
      $("div").attr("foo","baz")
      return $.html()
    }
  },
  files: {
    'tmp/dom_mode': 'test/fixtures/dom_mode'
  },
},
````

#### Multiple sources.
Multiple source file sample.
If files has multiple source file, ouput concat each result.

```js
multifiles : {
  options: {
    process : function(content, filepath, grunt){
      return  "filepath:" + filepath + "\n"
            + "content:" + content + "\n"
    }
  },
  files: {
    'tmp/multifiles': ['test/fixtures/foo', 'test/fixtures/dom_mode']
  },
}
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
