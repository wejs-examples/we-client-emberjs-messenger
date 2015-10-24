import Ember from 'ember';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notification: Ember.inject.service('notification'),

  model: function model() {
    return Ember.RSVP.hash({
      notifications: this.get('notification.notificationsUnread')
    });
  }
});