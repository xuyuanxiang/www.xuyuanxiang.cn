module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        sass: {
            base: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.core.min.css': 'src/sass/main.scss'
                }
            },
            theme: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.theme.min.css': 'src/sass/theme/theme-ios.scss'
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: [
                    //'bower_components/angular/angular.min.js',
                    //'bower_components/angular-touch/angular-touch.min.js',
                    //'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/firebase/firebase.js',
                    'bower_components/angularfire/dist/angularfire.min.js',
                    'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
                    //'dist/js/common-<%= pkg.version %>.min.js',
                    //'dist/js/ui-modal-<%= pkg.version %>.min.js',
                    //'dist/js/ui-navbar-<%= pkg.version %>.min.js',
                    //'dist/js/channel-<%= pkg.version %>.min.js',
                    //'dist/js/home-<%= pkg.version %>.min.js',
                    //'dist/js/user-<%= pkg.version %>.min.js',
                    //'dist/js/message-<%= pkg.version %>.min.js'
                ],
                dest: "dist/js/<%= pkg.name %>-<%= pkg.version %>.all.min.js"
            }
        },


        imagemin: {//压缩图片
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/assets/img',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/img'
                    }
                ]
            }
        },


        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/app/dist.html'
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'bower_components/ratchet/fonts/', src: ['*'], dest: 'dist/fonts/'},
                    {expand: true, cwd: 'bower_components/fontawesome/fonts/', src: ['*'], dest: 'dist/fonts/'}
                ]
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            //html: {
            //    files: ['src/app/*.html'],
            //    tasks: ['clean:html', 'htmlmin']
            //},
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['clean:css', 'sass']
            }
            //img: {
            //    files: ['src/assets/img/**'],
            //    tasks: ['clean:image', 'imagemin']
            //},
            //channel: {
            //    files: ['src/app/channel/**/*'],
            //    tasks: ['clean:channel', 'channel']
            //},
            //home: {
            //    files: ['src/app/home/**/*'],
            //    tasks: ['clean:home', 'home']
            //},
            //message: {
            //    files: ['src/app/message/**/*'],
            //    tasks: ['clean:message', 'message']
            //},
            //user: {
            //    files: ['src/app/user/**/*'],
            //    tasks: ['clean:user', 'user']
            //},
            //navbar: {
            //    files: ['src/common/directives/navbar/**/*'],
            //    tasks: ['clean:navbar', 'navbar']
            //},
            //modal: {
            //    files: ['src/common/directives/modal/**/*'],
            //    tasks: ['clean:modal', 'modal']
            //}
        },


        clean: {
            dist: ["dist/*"],
            css: ["dist/css/*"],
            image: ["dist/img/*"],
            html: ["dist/*.html"],
            tpl: ["dist/js/*tpl.js"],
            channel: ['dist/js/channel*.js'],
            home: ['dist/js/home*.js'],
            message: ['dist/js/message*.js'],
            user: ['dist/js/user*.js'],
            navbar: ['dist/js/ui-navbar*.js'],
            modal: ['dist/js/ui-modal*.js']
        },

        uglify: {//压缩JS
            channel: {//业务逻辑代码
                files: {
                    'dist/js/channel-<%= pkg.version %>.min.js': [
                        'src/app/channel/**/*.js',
                        'dist/js/channel.tpl.js'
                    ]
                }
            },
            home: {//业务逻辑代码
                files: {
                    'dist/js/home-<%= pkg.version %>.min.js': [
                        'src/app/home/**/*.js',
                        'dist/js/home.tpl.js'
                    ]
                }
            },
            message: {//业务逻辑代码
                files: {
                    'dist/js/message-<%= pkg.version %>.min.js': [
                        'src/app/message/**/*.js',
                        'dist/js/message.tpl.js'
                    ]
                }
            },
            user: {//业务逻辑代码
                files: {
                    'dist/js/user-<%= pkg.version %>.min.js': [
                        'src/app/user/**/*.js',
                        'dist/js/user.tpl.js'
                    ]
                }
            },
            navbar: {//UI
                files: {
                    'dist/js/ui-navbar-<%= pkg.version %>.min.js': [
                        'src/app/common/directives/navbar/**/*.js',
                        'dist/js/navbar.tpl.js'
                    ]
                }
            },
            modal: {
                files: {
                    'dist/js/ui-modal-<%= pkg.version %>.min.js': [
                        'src/app/common/directives/modal/**/*.js',
                        'dist/js/modal.tpl.js'
                    ]
                }
            },
            common: {
                files: {
                    'dist/js/common-<%= pkg.version %>.min.js': [
                        'src/app/common/*.js'
                    ]
                }
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': [
                        'src/app/**/*.js',
                        'dist/js/*.tpl.js'
                    ]
                }
            }
        },

        ngtemplates: {
            home: {
                cwd: 'src/app',
                src: 'home/**/*.tpl.html',
                dest: 'dist/js/home.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.home").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            },
            channel: {
                cwd: 'src/app',
                src: 'channel/**/*.tpl.html',
                dest: 'dist/js/channel.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.channel").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            },
            user: {
                cwd: 'src/app',
                src: 'user/**/*.tpl.html',
                dest: 'dist/js/user.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.user").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            },
            message: {
                cwd: 'src/app',
                src: 'message/**/*.tpl.html',
                dest: 'dist/js/message.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.message").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            },
            navbar: {
                cwd: 'src/app/common/directives',
                src: 'navbar/**/*.tpl.html',
                dest: 'dist/js/navbar.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.ui.navbar").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            },
            modal: {
                cwd: 'src/app/common/directives',
                src: 'modal/**/*.tpl.html',
                dest: 'dist/js/modal.tpl.js',
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeComments: true// Only if you don't use comment directives!
                    },
                    bootstrap: function (module, script) {
                        return 'angular.module("cn.xuyuanxiang.ui.modal").run(["$templateCache",function($templateCache){' + script + '}]);';
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('navbar', ['clean:navbar', 'ngtemplates:navbar', 'uglify:navbar', 'clean:tpl']);
    grunt.registerTask('modal', ['clean:modal', 'ngtemplates:modal', 'uglify:modal', 'clean:tpl']);
    grunt.registerTask('home', ['clean:home', 'ngtemplates:home', 'uglify:home', 'clean:tpl']);
    grunt.registerTask('user', ['clean:user', 'ngtemplates:user', 'uglify:user', 'clean:tpl']);
    grunt.registerTask('channel', ['clean:channel', 'ngtemplates:channel', 'uglify:channel', 'clean:tpl']);
    grunt.registerTask('message', ['clean:message', 'ngtemplates:message', 'uglify:message', 'clean:tpl']);

    grunt.registerTask('publish', ['clean:dist', 'sass', 'imagemin', 'htmlmin', 'ngtemplates', 'uglify:dist',
        'concat', 'copy', 'clean:tpl']);

    grunt.registerTask('build', ['clean:css', 'sass', 'copy']);
    grunt.registerTask('devlop', ['build', 'watch']);
};