import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service('auth'),

  beforeModel: function() {
    var auth = this.get('auth');

    if (auth.get('isAuthenticated')) {
      this.transitionTo('room');
    } else {
      this.transitionTo('login');
    }
  }
});