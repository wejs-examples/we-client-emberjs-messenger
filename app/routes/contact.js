import Ember from 'ember';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  weMessenger: Ember.inject.service('weMessenger'),

  model: function() {
    return Ember.RSVP.hash({
      contacts: this.get('weMessenger.contacts'),
      contactsPending: this.get('weMessenger.contactsRequested')
    });
  },

  actions: {
    acceptContact: function(userId, contact) {
      we.messenger.contact.accept(userId)
      .then(function (r) {
        contact.set('status', r.contact.status);
      });
    }
  }
});

