import Ember from 'ember';

export default Ember.Mixin.create({
  session: Ember.inject.service('session'),

  onlyAuthenticated: function() {
    var session = this.get('session');

    if (Ember.get(session, 'isAuthenticated')) {
      this.transitionTo('/');
    }
  }.observes('session.isAuthenticated')
});
