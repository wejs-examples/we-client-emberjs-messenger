import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  weMessenger: Ember.inject.service('weMessenger'),
  socketio: Ember.inject.service('socketio'),
  notification: Ember.inject.service('notification'),

  onlyAuthenticated: function() {
    var token = Ember.get(this, 'session.session.authenticated.access_token');
    var socketio = this.get('socketio');

    if (token) {
      Ember.$.ajaxSetup({
        headers: {
          Authorization: 'Bearer '+ token
        }
      });
    } else {
      Ember.$.ajaxSetup({
        Authorization: null
      });
    }

    window.io.socket = window.io.connect(
      we.messenger.host
    );

    socketio.set('socket', window.io.socket);

    socketio.onConnectAuthenticated();
  }.observes('session.isAuthenticated'),

  afterModel: function afterModel() {
    var notification = this.get('notification');
    notification.checkIfHaveNewNotifications();
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});