/*
 * grunt-pipe
 * https://github.com/suisho/grunt-pipe
 *
 * Copyright (c) 2013 suisho
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    pipe: {
      default_options: {
        options: {
          process : function(content, filepath, grunt){
            return content.replace(/baz/,"foo");
          }
        },
        files: {
          'tmp/foo': 'test/fixtures/foo'
        },
      },
      dom_mode: {
        options: {
          domMode : true,
          process : function($, filepath, grunt){
            $('div').attr('foo','baz');
            return $.html();
          }
        },
        files: {
          'tmp/dom_mode': 'test/fixtures/dom_mode'
        },
      },
      dom_mode_body: {
        options: {
          domMode : true,
          process : function($, filepath, grunt){
            $('div').attr('foo','baz');
            return $('body').html();
          }
        },
        files: {
          'tmp/dom_mode_body': 'test/fixtures/dom_mode_body'
        },
      },
      ignore_empty: {
        options: {
         process : function(content, filepath, grunt){
            return;
          }
        },
        files: {
          'tmp/ignore_empty': 'test/fixtures/foo'
        },
      },
      not_ignore_empty: {
        options: {
          ignoreEmpty : false,
          process : function(content, filepath, grunt){
            return;
          }
        },
        files: {
          'tmp/not_ignore_empty': 'test/fixtures/not_ignore_empty'
        },
      },
      multifiles : {
        options: {
          process : function(content, filepath, grunt){
            return "filepath:" + filepath + "\n" + "content:" + content + "\n";
          }
        },
        files: {
          'tmp/multifiles': ['test/fixtures/foo', 'test/fixtures/dom_mode']
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'pipe', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
