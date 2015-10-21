import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    findNewContacts: function (query, deferred){
      this.store.find('user', { q: query.term })
      .then(function (r){
        deferred.resolve(r.map(function (u){
          return {
            text: ( Ember.get(u, 'displayName') || Ember.get(u, 'username') ),
            id: u.id
          };
        }));
      }, deferred.reject);
    },

    requestContact: function() {
      var self = this;
      var userId = this.get('model.userId');

      if (!userId) {
        return;
      }

      we.messenger.contact.request(userId)
      .then(function (){
        self.set('requestSend', true);
        self.set('model.userId', null);
      });
    },

    requestOther: function() {
      this.set('requestSend', false);
    }
  }
});