require.config({

   baseUrl: '/javascripts',
   waitSeconds: 30,
   shim: {

     'underscore': {
       exports: '_'
     },
     'bootstrap':{
       deps: ['jquery']
     },
     'noty':{
       deps: ['jquery']
     },
     'noty-top':{
       deps: ['noty']
     },
     'noty-topCenter':{
       deps: ['noty']
     },
     'noty-default':{
       deps: ['noty']
     }



   },
   paths: {
     'bootstrap': 'bootstrap',
     'jquery': 'jquery-1.10.2.min',
     'bootstrap-switch': 'bootstrap-switch',
     'rails': 'rails',
     'masonry':'masonry.pkgd.min',
     'underscore': 'underscore-min',
     'noty': 'noty/jquery.noty',
     'noty-top': 'noty/layouts/top',
     'noty-topCenter': 'noty/layouts/topCenter',
     'noty-default': 'noty/themes/default'

   }
});

require ['jquery', 'underscore','bootstrap','noty','noty-top','noty-topCenter','noty-default','bootstrap-switch'], ($,_) ->

  $('a[name="delete-link"]').click ->
    postId = $(this).attr('data-id')
    $('#post-id').val(postId)

  $('#confirm-delete-btn').click ->
    token = $('meta[name="csrf-token"]').attr('content')
    $('#authenticity_token').val(token)
    $('#delete-post-form').submit()
  $('.make-switch').on 'switch-change', (e, data) ->
    publish = $(this).bootstrapSwitch('status')
    token = $('meta[name="csrf-token"]').attr('content')
    postId = $(this).attr('data-id')
    console.log('published: '+publish)
    params =
      authenticity_token: token
      id: postId
      published:publish

    $.ajax({
      type: 'POST',
      url: '/posts/published'
      data: params
      dataType: 'json'
      success: ->

    });









