import Ember from 'ember';

export default Ember.Route.extend({
  notification: Ember.inject.service('notification'),

  model: function model() {
    this.store.find('notification', { read: true });

    return Ember.RSVP.hash({
      notifications: this.get('notification.notificationsRead'),
      notificator: this.get('notification')
    });
  }
});