
module.exports = function(grunt) {

  grunt.initConfig({

    browserify: {
      dist: {
        files: {
          "./bin/bundle.js": ["src/app.js"]
        }
      }
    },

    watch: {
      files: ["src/**/*.js"],
      tasks: ["browserify"]
    }

  });


  grunt.registerTask('default', ['browserify', 'watch']);

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

};