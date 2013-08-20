// Generated by CoffeeScript 1.6.2
(function() {
  require.config({
    baseUrl: '/javascripts',
    waitSeconds: 30,
    shim: {
      'underscore': {
        exports: '_'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'noty': {
        deps: ['jquery']
      },
      'noty-top': {
        deps: ['noty']
      },
      'noty-topCenter': {
        deps: ['noty']
      },
      'noty-default': {
        deps: ['noty']
      },
      'tip': {
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
  });

  require(['jquery', 'underscore', 'bootstrap', 'noty', 'noty-top', 'noty-topCenter', 'noty-default'], function($, _) {
    return $(function() {
      var error, generate, success, tipInfo, tipInfoType;

      tipInfoType = $('#tip-info-type').val();
      tipInfo = $('#tip-info').val();
      generate = function(type, layout, message) {
        var n;

        n = noty({
          text: message,
          type: type,
          dismissQueue: false,
          layout: layout,
          theme: 'defaultTheme'
        });
        return setTimeout(function() {
          return n.close();
        }, 3000);
      };
      success = function(message) {
        return generate('success', 'topCenter', message);
      };
      error = function(message) {
        return generate('error', 'topCenter', message);
      };
      if (tipInfoType === 'ERROR') {
        return error(tipInfo);
      } else {
        return success(tipInfo);
      }
    });
  });

}).call(this);

/*
//@ sourceMappingURL=tip-info.map
*/
