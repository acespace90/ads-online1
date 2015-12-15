module.exports = function(grunt) {

	grunt.initConfig({

		// SASS
 		sass: {                              // Task 
		    dist: {                            // Target 
		      options: {                       // Target options 
		        style: 'expanded'
		      },
		      files: {                         
		        'build/css/app.min.css': 'source/scss/app.scss'       // 'destination': 'source' 
		      }
		    }
		  },

		// AUTOPREFIXER
		autoprefixer: {
			compile: {
				files: {
				  'build/css/app.min.css': 'build/css/app.min.css'
				},
			},
		},

		// CSSMIN
		cssmin: {
			clean: {
				files: {
				  'build/css/app.min.css': [
				  	'bower_components/bootstrap/dist/css/bootstrap.css',
				  	'build/css/app.min.css']
				}
			}
		},

		// COPY
		copy: {
		  main: {
		    expand: true,
		    cwd: 'source/',
		    src: [
            	'*.html',
            	'fonts/'
            ],
		    dest: 'build/',
		    flatten: true
		  },
		},

		// UGLIFY
		uglify: {
			bower_js_files: {
				files: {
					'build/js/output.min.js': [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/bootstrap/dist/js/bootstrap.js'
					]
				}
			}
		},

		// BOWER COPY
		bowercopy: {
		  options: {
		    srcPrefix: 'bower_components'
		  },
		  scripts: {
		    options: {
		      destPrefix: 'build/vendor'
		    },
		    files: {
		      'font-awesome/fonts/': 'font-awesome/fonts',
		      'font-awesome/css/': 'font-awesome/css'
		    }
		  }
		},		

		// WATCH
		watch: {
			sass: {
				files: [ 'source/scss/*/*.scss' ],
				tasks: [ 'sass', 'autoprefixer']
			},
			html: {
	            files: ['source/*.html'],
	            tasks: ['copy'],
		            options: {
	                livereload: true
	            }
	        }
		},

		// BROWSER SYNC
		browserSync: {
			bsFiles: {
				src : ['build/css/*.css', 'build/*.html']
			},
			options: {
				watchTask: true,
				server: {
				  baseDir: "build"
				}
			}
		}

	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bowercopy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify', 'bowercopy' ,'copy']);
	grunt.registerTask('start', ['copy', 'browserSync', 'watch']);

};