'use strict';

var grunt = require('grunt');
var fs = require('fs');
/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.pipe = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  foo: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/foo');
    var expected = grunt.file.read('test/expected/foo');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  dom_mode: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dom_mode');
    var expected = grunt.file.read('test/expected/dom_mode');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
  dom_mode_body: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dom_mode_body');
    var expected = grunt.file.read('test/expected/dom_mode_body');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
  ignore_empty: function(test) {
    test.expect(1);
    test.ok(!fs.existsSync("tmp/ignore_empty"));
    test.done();
  },
  not_ignore_empty: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/not_ignore_empty');
    var expected = grunt.file.read('test/expected/not_ignore_empty');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
  multifiles: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multifiles');
    var expected = grunt.file.read('test/expected/multifiles');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
