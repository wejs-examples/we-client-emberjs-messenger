import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),

  beforeModel: function() {
    if (Ember.get(this, 'session.isAuthenticated')) {
      this.transitionTo('room');
    } else {
      this.transitionTo('login');
    }
  }
});