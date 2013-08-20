require.config

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
  },
  'tip':{
    deps: ['noty']
  }


  },
  paths: {
  'bootstrap': 'bootstrap',
  'jquery': 'jquery-1.10.2.min',
  'rails': 'rails',

  'underscore': 'underscore-min',
  'noty': 'noty/jquery.noty',
  'noty-top': 'noty/layouts/top',
  'noty-topCenter': 'noty/layouts/topCenter',
  'noty-default': 'noty/themes/default'

  }


require ['jquery', 'underscore','bootstrap','noty','noty-top','noty-topCenter','noty-default'], ($,_) ->
  $ ->
    tipInfoType = $('#tip-info-type').val()
    tipInfo  = $('#tip-info').val()


    generate = (type,layout,message)  ->
      n = noty({
        text: message,
        type: type,
        dismissQueue: false,
        layout: layout,
        theme: 'defaultTheme'
      });
      setTimeout ->
        n.close()
      ,3000

    success = (message)->
      generate('success','topCenter',message)


    error = (message) ->
      generate('error','topCenter',message)

    if(tipInfoType == 'ERROR')
      error tipInfo
    else
      success tipInfo

