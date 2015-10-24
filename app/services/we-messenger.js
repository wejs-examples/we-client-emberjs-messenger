import Ember from 'ember';

var WeMessenger = Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),

  contacts: null,
  contactsRequested: null,

  init: function() {
    this._super();
    var userId = this.get('session.session.authenticated.user.id');

    this.setContacts();

    if (userId) {
      // first load
      this.get('store').find('contact');
      this.get('store').find('contact', { status: 'requested' });
    }
  },

  setContacts: function() {
    var userId = this.get('session.session.authenticated.user.id');
    var store = this.get('store');

    if (!userId) {
      this.set('contacts', null);
      this.set('contactsRequested', null);
    } else {
      this.set('contacts', store.filter('contact', function (c){
        return c.get('status') == 'accepted';
      }));
      this.set('contactsRequested', store.filter('contact', function (c){
        return (
          (c.get('status') == 'requested') &&
          (c.get('from') != userId)
        );
      }));
    }
  }
});

export default WeMessenger;