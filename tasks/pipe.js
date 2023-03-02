/*
 * grunt-pipe
 * https://github.com/suisho/grunt-pipe
 *
 * Copyright (c) 2013 suisho
 * Licensed under the MIT license.
 */

'use strict';
var cheerio = require('cheerio');
var defaultProcess = function(content, filepath, grunt) {
  return content;
};

var defaultHtmlProcess = function($, filepath, grunt) {
  return $.html();
};

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('pipe', 'simple input and output.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      ignoreEmpty : true,
      process : null,
      domMode : false
    });
    var pipeProcess = options.process || defaultProcess;
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var contents =[];
      var filepaths = [];
      var dests = [];
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath){
        var content = grunt.file.read(filepath);

        if(options.domMode){
          content = cheerio.load(content);
        }
        // processing
        var dest = pipeProcess(content, filepath, grunt);

        if(!dest && options.ignoreEmpty){
          grunt.log.debug("ignore " + filepath + " because dest false");
          return;
        }
        dests.push(dest);
      });


      // Write the destination file.
      var destJoined = dests.join("");
      if(!destJoined && options.ignoreEmpty){
        grunt.log.debug("ignore because dest false");
        return;
      }
      grunt.file.write(f.dest, destJoined);
      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');

    });
  });

};
