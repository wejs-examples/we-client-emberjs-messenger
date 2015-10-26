import Ember from 'ember';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notification: Ember.inject.service('notification'),

  model: function model() {
    return Ember.RSVP.hash({
      notifications: this.get('notification.notificationsUnread'),
      notificator: this.get('notification')
    });
  },

  actions: {
    setReadStatus: function (read, notification) {
      var store = this.get('store');

      if (read) {
        this.get('notification')
        .decrementProperty('unReadCount');
      } else {
        this.get('notification')
        .incrementProperty('unReadCount');
      }

      we.messenger.notification.setReadStatus(notification.id, read)
      .then(function (r){
        store.pushPayload(r);
      });
    }
  }
});