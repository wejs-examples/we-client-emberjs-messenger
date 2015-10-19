import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service('session'),
  weMessenger: Ember.inject.service('weMessenger'),

  onlyAuthenticated: function() {
    var token = Ember.get(this, 'session.session.authenticated.access_token');

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
  }.observes('session.isAuthenticated'),

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});