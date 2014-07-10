module.exports = function(grunt){

	/**
	* Setup config
	*/

	var config = {
		
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
			},
			build: ['src/**/*.js']
		},

		uglify: {
			options: {
				banner: "/**\n* <%= pkg.name %>\n* <%= grunt.template.today('yyyy-mm-dd') %>\n*/\n"
			},
			build: {
				files: {
					'bin/js/cells/cells.min.js': 'src/cells.js',
					'bin/js/cells/toolbar.min.js': 'src/toolbar.js'
				}
			}
		},

		copy: {
			build: {
				src: 'src/cells.html',
				dest: 'bin/index.html',
			}
		},

		sass: {
			build: {
				options: {
					style: 'expanded',
				},
				files: {
					'bin/css/cells/cells.min.css': 'src/cells.scss',
				}
			}
		},

		watch: {

			stylesheets: {
				files: 'src/**/*.scss',
				tasks: ['sass'],
			},

			scripts: {
				files: 'src/**/*.js',
				tasks: ['jshint', 'uglify'],
			},

			html: {
				files 'src/cells.html',
				tasks: ['copy'],
			}

		},

	}

	grunt.initConfig(config);

	/**
	* Load Grunt plugins
	*/

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');

	/**
	* Register tasks
	*/

	grunt.registerTask('default', ['jshint', 'uglify', 'copy', 'sass']);

}