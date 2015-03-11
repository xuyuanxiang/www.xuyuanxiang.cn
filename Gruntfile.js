module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            all: ["dist/*"],
            css: ["dist/css/*"],
            image: ["dist/img/*"],
            js: ["dist/js/*"],
            tpl: ["dist/js/*tpl.js"],
            html: ["dist/*.html"],
            biz: ['dist/js/<%= pkg.name %>-<%= pkg.version %>.application.js',
                'dist/js/<%= pkg.name %>-<%= pkg.version %>.resources.js',
                'dist/js/<%= pkg.name %>-<%= pkg.version %>.services.js'
            ],
            navbar: ['dist/js/ui-navbar*.js'],
            modal: ['dist/js/ui-modal*.js'],
            home: ['dist/js/home*.js'],
            channel: ['dist/js/channel*.js'],
            user: ['dist/js/user*.js'],
            message: ['dist/js/message*.js']
        },

        sass: {                              // Task
            base: {                            // Target
                options: {                       // Target options
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {                         // Dictionary of files
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.core.min.css': 'src/sass/main.scss'      // 'destination': 'source'
                }
            },
            theme: {
                options: {                       // Target options
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {                         // Dictionary of files
                    'dist/css/<%= pkg.name %>-<%= pkg.version %>.theme.min.css': 'src/sass/theme/theme-ios.scss'      // 'destination': 'source'
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
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.resources.js',
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.services.js',
                    'dist/js/ui-navbar-<%=  pkg.version %>.min.js',
                    'dist/js/ui-modal-<%=  pkg.version %>.min.js',
                    'dist/js/home-<%=  pkg.version %>.min.js',
                    'dist/js/channel-<%=  pkg.version %>.min.js',
                    'dist/js/user-<%=  pkg.version %>.min.js',
                    'dist/js/message-<%=  pkg.version %>.min.js',
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.application.js'

                ],
                dest: "dist/js/<%= pkg.name %>-<%= pkg.version %>.all.min.js"
            }
        },

        uglify: {//压缩JS
            application: {//业务逻辑代码
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.application.js': [
                        'src/app/*.js'
                    ]
                }
            },
            services: {
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.services.js': [
                        'src/common/services/**/*.js'
                    ]
                }
            },
            resources: {
                files: {
                    'dist/js/<%= pkg.name %>-<%= pkg.version %>.resources.js': [
                        'src/common/resources/**/*.js'
                    ]
                }
            },
            home: {//模板代码
                files: {
                    'dist/js/home-<%=  pkg.version %>.min.js': [
                        'src/app/home/**/*.js',
                        'dist/js/home.tpl.js'
                    ]
                }
            },
            channel: {//模板代码
                files: {
                    'dist/js/channel-<%=  pkg.version %>.min.js': [
                        'src/app/channel/**/*.js',
                        'dist/js/channel.tpl.js'
                    ]
                }
            },
            user: {//模板代码
                files: {
                    'dist/js/user-<%=  pkg.version %>.min.js': [
                        'src/app/user/**/*.js',
                        'dist/js/user.tpl.js'
                    ]
                }
            },
            message: {//模板代码
                files: {
                    'dist/js/message-<%=  pkg.version %>.min.js': [
                        'src/app/message/**/*.js',
                        'dist/js/message.tpl.js'
                    ]
                }
            },
            navbar: {//模板代码
                files: {
                    'dist/js/ui-navbar-<%=  pkg.version %>.min.js': [
                        'src/common/directives/navbar/**/*.js',
                        'dist/js/navbar.tpl.js'
                    ]
                }
            },
            modal: {//模板代码
                files: {
                    'dist/js/ui-modal-<%=  pkg.version %>.min.js': [
                        'src/common/directives/modal/**/*.js',
                        'dist/js/modal.tpl.js'
                    ]
                }
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

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['clean:html', 'htmlmin']
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['clean:css', 'sass']
            },
            img: {
                files: ['src/assets/img/**'],
                tasks: ['clean:image', 'imagemin']
            },
            biz: {
                files: ['src/common/resources/**/*.js', 'src/common/services/**/*.js', 'src/app/*.js'],
                tasks: ['uglify:business']
            },
            navbar: {
                files: ['src/common/directives/navbar/**/*'],
                tasks: ['navbar']
            }
        },

        htmlmin: {
            web: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'src/dist.html'
                }
            }
        },

        copy: {
            product: {
                files: [
                    {expand: true, cwd: 'bower_components/ratchet/fonts/', src: ['*'], dest: 'dist/fonts/'}
                ]
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
                cwd: 'src/common/directives/navbar',
                src: '**/*.tpl.html',
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
                cwd: 'src/common/directives/modal',
                src: '**/*.tpl.html',
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

    grunt.registerTask('build', ['clean:all', 'sass', 'imagemin', 'htmlmin', 'ngtemplates', 'uglify', 'clean:tpl', 'concat',
        'clean:navbar', 'clean:modal', 'clean:home', 'clean:channel', 'clean:user', 'clean:message', 'clean:biz', 'copy']);

    grunt.registerTask('publish', ['clean:product', 'ngtemplates', 'sass', 'uglify', 'imagemin', 'htmlmin', 'concat']);
    grunt.registerTask('devlop', ['build', 'watch']);
};