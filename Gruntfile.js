//TODO: double validation on files path after one level more was added (Folder  "core")

// Generated on 2015-03-28 using generator-angular-feature 0.6.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-less');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      // Application path will be read from config.json file (this.config.app.path).
      app: 'app',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['src/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['src/**/tests/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: [
          'app/src/core/styles/{,*/}*.css',
          'app/src/core/styles/less/{,*/}*.less'
        ],
        tasks: [
          'newer:copy:styles',
          'autoprefixer',
          'less:development'
        ]
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'src/**/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Config Less
    less: {
      development: {
        options: {
          paths: ['app/src/core/styles/less'],
          sourceMap : true
        },
        files: {
          'app/src/core/styles/myfp.css': 'app/src/core/styles/less/myfp.less'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/**/tests/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      unnecessary: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'src',
            '<%= yeoman.dist %>/vendor',
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
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

    // Automatically inject Bower components into the app
    'bower-install': {
      app: {
        html: '<%= yeoman.app %>/index.html',
        ignorePath: '<%= yeoman.app %>/'
      }
    },





    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            //'<%= yeoman.dist %>/src/{,*/}*.js',
            '<%= yeoman.dist %>/src/core/{,*/}*.js',
            '<%= yeoman.dist %>/src/webcontent/{,*/}*.js',
            //'<%= yeoman.dist %>/src/webcomponent/{,*/}*.js',
            '<%= yeoman.dist %>/src/scripts.js',
            //'<%= yeoman.dist %>/src/config/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/**/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/**/assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // DEPRECATED
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    // ngmin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '.tmp/concat/scripts',
    //       src: '*.js',
    //       dest: '.tmp/concat/scripts'
    //     }]
    //   }
    // },

    ngAnnotate: {
      dist: {
        options: {
            add: true,
            remove: false,
            singleQuotes: false
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: 'src/**/*.js',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'src/**/views/{,*/}*.html',
            'src/**/views/templates/**/{,*/}*.html',
            'src/**/views/templates/**/**',
            'src/config/{,*/}*.js',
            'src/webcomponent/{,*/}*.js',
            'vendor/bower_components/**/*',
            'src/**/assets/images/{,*/}*.{webp,png,jpg,jpeg,gif,svg}',
            'src/**/assets/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: 'src/**/assets/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        //'copy:webcomponents',
        'imagemin',
        'svgmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    concat: {
      dist: {}
    },

    // Append a timestamp to config.js (to avoid cache) which are both located in 'index.html'
    cachebreaker: {
      dev: {
        options: {
          match: ['src/config/config.js'],
        },
        files: {
          src: ['<%= yeoman.app %>/index.html']
        }
      },
      dist: {
        options: {
          match: ['src/config/config.js'],
        },
        files: {
          src: ['<%= yeoman.dist %>/index.html']
        }
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bower-install',
      'less:development',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'cachebreaker:dev', //creates random number to avoid cache on config.js
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bower-install',
    'less:development',
    
    //useminPrepare task updates the grunt configuration to apply a configured transformation
    //flow to tagged files (i.e. blocks). By default the transformation flow is composed of concat
    //and uglify for JS files, but it can be configured.
    'useminPrepare',
    //------------------


    //Running slow tasks like Coffee and Sass concurrently can potentially improve your
    //build time significantly. This task is also useful if you need to run multiple blocking
    //tasks like nodemon and watch at once.
    'concurrent:dist',
    //------------------

    //Parse CSS and add vendor-prefixed CSS properties using the 'Can I Use' database.
    //Based on Autoprefixer.
    'autoprefixer',
    //------------------

    //'ngmin',

    //Add, remove and rebuild angularjs dependency injection annotations
    'ngAnnotate',
    //------------------

    'concat', //Concatenate files.
    'copy:dist', //Copy files and folders.
    'cachebreaker:dist', //creates random number to avoid cache on config.js
    //Grunt plugin for finding and modifying static resource URLs
    //The task looks through your specified files for URLs to rewrite
    'cdnify',
    //------------------

    'cssmin', //Compress CSS files
    'uglify', //Minify files with UglifyJS
    //'rev', //Static file asset revisioning through content hashing

    //Replaces references to non-optimized scripts or stylesheets into a set of HTML files
    //(or any templates/views)
    'usemin',
    //------------------

    'htmlmin', // Minify HTML
    'clean:unnecessary'
  ]);

  grunt.registerTask('build-prefix', [
    'clean:dist',
    'bower-install',
    'less:development',

    //useminPrepare task updates the grunt configuration to apply a configured transformation
    //flow to tagged files (i.e. blocks). By default the transformation flow is composed of concat
    //and uglify for JS files, but it can be configured.
    'useminPrepare',
    //------------------


    //Running slow tasks like Coffee and Sass concurrently can potentially improve your
    //build time significantly. This task is also useful if you need to run multiple blocking
    //tasks like nodemon and watch at once.
    'concurrent:dist',
    //------------------

    //Parse CSS and add vendor-prefixed CSS properties using the 'Can I Use' database.
    //Based on Autoprefixer.
    'autoprefixer',
    //------------------

    //'ngmin',

    //Add, remove and rebuild angularjs dependency injection annotations
    'ngAnnotate',
    //------------------

    'concat', //Concatenate files.
    'copy:dist', //Copy files and folders.
    'cachebreaker:dist', //creates random number to avoid cache on config.js
    //Grunt plugin for finding and modifying static resource URLs
    //The task looks through your specified files for URLs to rewrite
    'cdnify',
    //------------------

    'cssmin', //Compress CSS files
    'uglify', //Minify files with UglifyJS
    'rev', //Static file asset revisioning through content hashing

    //Replaces references to non-optimized scripts or stylesheets into a set of HTML files
    //(or any templates/views)
    'usemin',
    //------------------

    'htmlmin', // Minify HTML
    'clean:unnecessary'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
