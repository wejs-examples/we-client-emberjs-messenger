import Ember from 'ember';
import UnauthenticatedRouteMixin from '../mixins/un-authenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  beforeModel: function() {
    var session = this.get('session');

    if (Ember.get(session, 'isAuthenticated')) {
      this.transitionTo('/');
    }
  }
});