import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service('auth'),
  weMessenger: Ember.inject.service('weMessenger'),

  beforeModel: function() {
    var self = this;
    var Auth = this.get('auth');
    var WeMessenger = this.get('weMessenger');

    return Ember.RSVP.hash({
      // get current user
      currentUser: Ember.$.getJSON( WeMessenger.options.accounts + '/account' )
      .done(function afterLoadCurrentUser(data) {
        if (data.user) {
          if (data.user.length) {
            Auth.set('currentUser', self.store.push('user', data.user[0]));
          } else {
            Auth.set('currentUser', self.store.push('user', data.user));
          }
        }
      }).fail(function (data) {
        Ember.Logger.error('Error on get current user data' , data);
      })
    });
  }
});