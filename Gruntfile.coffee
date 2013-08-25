module.exports = (grunt) ->
  cssFiles = ['public/stylesheets/bootstrap.css',
              'public/stylesheets/bootstrap-responsive.css',
              'public/stylesheets/bootstrap-icons.css',
              'public/stylesheets/font-awesome.min.css',
              'public/stylesheets/font-awesome.ie7.min.css',
              'public/stylesheets/jquery.fileupload-ui.css',
              'public/stylesheets/jquery.toolbars.css',
              'public/stylesheets/show.css',
              'public/stylesheets/application.css']
  delOptions = {
    force: true
  };
  grunt.initConfig
    pkg:[grunt.file.readJSON('package.json')]
  #grunt.file.delete('./public/build',delOptions)
    concat :
      css:
        src: cssFiles
        dest: 'public/stylesheets/application-all.css'
    cssmin:
      css:
        src:  'public/stylesheets/application-all.css'
        dest: 'public/stylesheets/application-all-min.css'

    watch:
      scripts:
        files: cssFiles,
        tasks: ['concat', 'cssmin'],
        options:
          nospawn: true

    requirejs:
      compile:
        options:
        # appDir:'public/javascripts/app'
          mainConfigFile: 'public/javascripts/app/requirejs-config.js'
          done: (done, output) ->
            #console.log 'start'
            #grunt.file.recurse 'public/javascripts/build', (abspath, rootdir, subdir, filename) ->
            #console.log rootdir
            #console.log subdir
            #grunt.file.delete('./public/build',delOptions)
            done

          baseUrl: "public/javascripts"
          dir:'public/build'
          fileExclusionRegExp: /.coffee$/


          modules:[
            {name:'app/embeded'},
            {name:'app/home'},
            {name:'app/post'},
            {name:'app/post-index'},
            {name:'app/show'},
            {name:'app/tip-info'}

          ]

    clean:

      src: ['public/build'],

      filter: (filepath)->
        console.log filepath
        if(grunt.file.exists(filepath) && !grunt.file.isDir(filepath) )
          grunt.file.delete(filepath,delOptions)


  grunt.loadNpmTasks('grunt-contrib-requirejs')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-css')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.registerTask 'css', ['concat', 'cssmin']
  grunt.registerTask 'default', ['concat', 'cssmin','requirejs','clean']