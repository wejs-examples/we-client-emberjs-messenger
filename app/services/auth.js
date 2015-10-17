import Ember from 'ember';

export default Ember.Service.extend({
  currentUser: null,
  isAuthenticated: Ember.computed('currentUser', function() {
    if (this.get('currentUser.id')) {
      return true;
    } else {
      return false;
    }
  }),
  authToken: null,
  // accounts: opts.accounts,
  // server: opts.server
});