'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var appConfig = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    dragNDrop: appConfig,

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js'
        ]
      }
    },

    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dragNDrop.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      }
    },

    compass: {
      options: {
        sassDir: '<%= dragNDrop.app %>/styles',
        cssDir: '.tmp/styles',
        javascriptsDir: '<%= dragNDrop.app %>/scripts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= dragNDrop.dist %>/{,*/}*',
            '!<%= dragNDrop.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dragNDrop.app %>',
          dest: '<%= dragNDrop.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= dragNDrop.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= dragNDrop.app %>/stylesheets',
        dest: '.tmp/stylesheets/',
        src: '{,*/}*.css'
      }
    },

    concurrent: {
      server: [
        'coffee:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'compass'
      ],
      dist: [
        'coffee:dist',
        'compass:dist'
      ]
    },

    autoprefixer: {
      options: {
        // browsers: ['last 2 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    concat: {
      dist: {
        files: {
          '<%= dragNDrop.dist %>/dragndrop-object.js': [
            '.tmp/scripts/{,*/}*.js'
          ]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= dragNDrop.dist %>/dragndrop-object.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= dragNDrop.dist %>/dragndrop-object.js': [
            '<%= dragNDrop.dist %>/dragndrop-object.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cssmin',
    'uglify',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};