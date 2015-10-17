import Ember from 'ember';
var $ = Ember.$;

var WeMessenger = Ember.Service.extend({
  options: {
    accounts: 'http://localhost:4000'
  }
});

WeMessenger.initialize = function (options){
  var opts = options || {};
  // opts.server = opts.server || 'http://localhost:1420';
  // opts.accounts = opts.accounts || 'http://localhost:2430';

  WeMessenger.options = opts;

  App.UserAvatarComponent.reopen({
    init: function () {
      this._super();
      this.set('defaultSrc', WeMessenger.options.server + '/core/images/avatars/user-avatar.png');
    },
  });

  App.WeMessengerPublicBoxComponent.reopen({
    cdpLoading: WeMessenger.options.server + '/core/images/loading.gif'
  });

  App.BoxController.reopen({
    cdpLoading: WeMessenger.options.server + '/core/images/loading.gif',
    cdpOnline: WeMessenger.options.server + '/core/images/connected.png',
    cdpOffline: WeMessenger.options.server + '/core/images/disconnected.png'
  });

  App.ContactController.reopen({
    cdpOnline: WeMessenger.options.server + '/core/images/connected.png'
  });

  if ( window.createjs ) {
    // Load new-message.mp3 sound to be played on every new private message
    window.createjs.Sound.registerSound('/sounds/new-message.mp3', 'new-message');
    window.createjs.Sound.on('fileload', function (e){
      WeMessenger.sounds = WeMessenger.sounds || {};
      WeMessenger.sounds[e.id] = window.createjs.Sound.createInstance(e.id);
    });
  } else {
    console.log('Warn:: SoundJs library could not be found, mp3 file could not be loaded');
  }

  window.jQuery( window.document ).ready(function () {
    /**
     * Add Accept and Header in all request
     */
    var token = '';

    var authTokenName = opts.authTokenName;
    if ( typeof authTokenName === 'string' ) {
      authTokenName = authTokenName;
    } else {
      authTokenName = 'wetoken';
    }

    if ( options.wetoken ) {
      token = options.wetoken;
    } else {
      token = $.cookie(authTokenName);
    }

    if ( !token ) {
      console.log('WeMessenger:: No authenticated cookie nor token could be inferred');
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      console.log('Options::', options, opts);
      App.set('auth.isAuthenticated', false);
      return;
    }

    $.ajaxPrefilter(function( options ) {
      if ( !options.beforeSend ) {
        options.beforeSend = function (xhr) {
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.setRequestHeader('Authorization','Bearer ' + token);
        };
      }
    });

    $.getJSON(WeMessenger.options.accounts + '/account')
    .done(function (data) {
      App.get('auth').setProperties({
        isAuthenticated: true,
        authToken: token
      });
      window.io.socket = window.io.sails.connect(opts.server);
      App.advanceReadiness();
      // Start timeago countdown
      setInterval(function () {
        $('[data-moment]').each(function (index, item) {
          var $this = $(item);
          var createdAt = $this.data('moment');
          var ago = $this.data('ago') === undefined;
          $this.text(moment(createdAt).fromNow(ago));
        });
      }, 60000);
    })
    .fail(function (error){
      console.log('WeMessenger:: Access Denied');
      console.log('WeMessenger:: You gotta login first on CdP server');
      // App.set('auth.isAuthenticated', false);
      return;
    });
  });
};


export default WeMessenger;