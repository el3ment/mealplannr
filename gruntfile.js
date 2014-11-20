module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: { // Task
			dist: {
				options: {
				style: 'compressed'
				},
				files: [{
				expand: true,
				cwd: 'style',
				src: ['**/*.scss'],
				dest: 'dist/css',
				ext: '.css'
				}]
			}
			},
		watch: {
			
			scripts : {
				files : 'js/**/*.js',
				tasks : ['clean:js', 'uglify'],
				options : { livereload: false },
			},
			sass : {
				files : 'style/**/*.scss',
				tasks : ['clean:css', 'sass'],
				options : { nospawn : true, livereload: true }
			}
		},

		clean: {
			all : {
				src: ["dist"]
			},
			js : {
				src: ["dist/js"]
			},
			css : {
				src: ["dist/css"]
			}
		},
		uglify: {
			options : {
				report : 'gzip',
				mangle : true,
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'js',
					src: ['**/*.js',
						'!vendors/**/*'],
					dest: 'dist/js'
				}]
			}
		},
		// docco: {
		//   debug: {
		//     src: ['js/**/*.js', 'style/**/*.scss'],
		//     options: {
		//       output: 'docs/'
		//     }
		//   }
		// }
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-docco');

	// Default task(s).
	grunt.registerTask('default', ['clean:all', 'sass', 'uglify', 'watch']);

};