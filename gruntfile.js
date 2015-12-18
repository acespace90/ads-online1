module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Watch
    watch: {
      sass: {
        files: ['source/scss/**/*.scss'],
        tasks: ['sass:dev']
      },
      html: {
        files: ['source/**/*.html'],
        tasks: ['htmlmin:dev']
      },
      concat: {
        files: ['source/js/**/*.js'],
        tasks: 'concat'
      },
      imagemin: {
        files: ['build/img/**/*.{png,jpg,gif}', 'source/img/**/*.{png,jpg,gif}'],
        tasks: 'imagemin'
      },
      autoprefixer: {
        files: ['build/css/app.css'],
        tasks: ['autoprefixer:dev']
      }
    },

    // Sass
    sass: {
      dev: {
        options: {
          style: 'expanded',
          trace: true
        },
        files: {
        'build/css/app.css': 'source/scss/app.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/app.css': 'source/scss/app.scss'
        }
      }
    },

    // Htmlmin
    htmlmin: {                                    
      dist: {                                      
        options: {                                
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'build/index.html': 'source/index.html'             
        }
      },
      dev: {                                       
        files: {
          'build/index.html': 'source/index.html'
        }
      }
    },

    // Concat
    concat: {
      dev: {
        src: 'source/vendor/**/*.js',
        dest: 'build/js/main.js'
      }
    },

    // Autoprefixer
    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
        },
        files: {
          'build/css/app.css': 'build/css/app.css'
        }
      }
    },

    // Uglify
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
        'build/js/main.js': 'build/js/main.js'
        }
      }
    },

    // Bowercopy to build folder
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      scripts: {
        options: {
          destPrefix: 'build/vendor'
        },
        files: {
          'fonts/font-awesome/fonts/': 'font-awesome/fonts',
          'fonts/font-awesome/css/': 'font-awesome/css',
          'bootstrap/js/bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
          'bootstrap/css/bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css',
          'jquery/jquery.min.js' : 'jquery/dist/jquery.min.js',
          'snapsvg/snap.svg-min.js' : 'Snap.svg/dist/snap.svg-min.js'
        }
      }
    },

    // Imagemin
    imagemin: {
      png: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: 'source/img',
          src: ['*.png'],
          dest: 'build/img/',
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'source/img',
          src: ['*.jpg'],
          dest: 'build/img/',
          ext: '.jpg'
        }]
      },
      svg: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'source/img',
          src: ['*.svg'],
          dest: 'build/img/',
          ext: '.svg'
        }]
      }
    },

    // BrowserSync
    browserSync: {
      bsFiles: {
        src : ['build/css/**/*.css', 'build/**/*.html']
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "build"
        }
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks ('grunt-contrib-uglify');
  grunt.loadNpmTasks ('grunt-contrib-concat');
  grunt.loadNpmTasks ('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks ('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks ('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Development task
  grunt.registerTask('dev', ['autoprefixer:dev', 'sass:dev', 'htmlmin:dev', 'concat', 'imagemin', 'bowercopy', 'browserSync', 'watch']);

  // Production task
  grunt.registerTask('prod', ['autoprefixer:dev', 'sass:dist','htmlmin:dist', 'concat', 'imagemin', 'uglify', 'bowercopy']);
};