module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* Created by <%= pkg.author %>, <%= grunt.template.today("yyyy") %> */\n',
		jade: {
			files: {
				expand: true,
				cwd: 'dev/jade/',
				src: ['*.jade'],
				dest: 'dest',
				ext: '.html',
			},
			options: {
				pretty: true,
			}
		},
		stylus: {
			options: {
				banner: '<%= banner %>',
				use: [
					function() {
            			return require('autoprefixer-stylus')('last 2 versions', 'ie 8', 'ie 9');
            		},
					require('csso-stylus'),
				]
			},
			compile: {
				files: [{
					cwd: 'dev/stylus/',
					src: '*.styl',
					dest: 'dest/css',
					expand: true,
					ext: '.css',
				}]
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'dev/img',
					src: ['*.{jpg, png, gif}'],
					dest: 'dest/img',
				}]
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'dest',
					hostname: "0.0.0.0",
					livereload: true,
				}
 			}
		},
		newer: {
			options: {
				override: function(detail, include) {
					if (detail.task === 'jade') {
          				return include(true);
        			} else {
						return include(false);
					}
				}
			}
		},
		watch: {
			options: {
				spawn: false,
				livereload: true,
			},
			jade: {
				files: ['dev/jade/*.jade', 'dev/jade/templates/*.jade'],
				tasks: ['newer:jade'],
			},
			stylus: {
				files: ['dev/stylus/*.styl'],
				tasks: ['newer:stylus'],
			},
			imagemin: {
				files: ['dev/img/*.{jpg, png, gif}'],
				tasks: ['newer:imagemin'],
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', [
		'connect',
		'jade',
		'stylus',
		'imagemin',
		'watch'
	]);
}