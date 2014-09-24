'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var appConfig = {
    app: 'src',
    dist: 'dist'
  };

  grunt.initConfig({
    dragNDrop: appConfig,

     watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      coffee: {
        files: ['<%= dragNDrop.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: ['newer:coffee:dist', 'concat', 'ngAnnotate', 'copy:dist', 'uglify']
      },
      compass: {
        files: ['<%= dragNDrop.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer', 'concat', 'copy:dist', 'cssmin']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

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
          '<%= dragNDrop.dist %>/angular-dragndrop-object.js': [
            '.tmp/scripts/{,*/}*.js'
          ]
        }
      }
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/scripts',
          src: ['*.js'],
          dest: '.tmp/scripts'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dragNDrop.app %>',
          dest: '<%= dragNDrop.dist %>',
          src: [
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= dragNDrop.app %>/stylesheets',
        dest: '.tmp/stylesheets/',
        src: '{,*/}*.css'
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= dragNDrop.dist %>/angular-dragndrop-object.css': [
            '.tmp/styles/{,*/}*.css'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= dragNDrop.dist %>/angular-dragndrop-object.js': [
            '<%= dragNDrop.dist %>/angular-dragndrop-object.js'
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
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};