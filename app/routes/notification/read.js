import Ember from 'ember';

export default Ember.Route.extend({
  notification: Ember.inject.service('notification'),

  model: function model() {
    return Ember.RSVP.hash({
      notifications: this.get('notification.notificationsRead')
    });
  }
});