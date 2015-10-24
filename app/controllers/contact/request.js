import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    findNewContacts: function (query, deferred){
      Ember.$.ajax({
        type: 'GET',
        url: we.messenger.host + '/api/v1/get-user-to-add',
        cache: false,
        data: { q: query.term }
      }).then(function (r){
        deferred.resolve(r.user.map(function (u){
          return {
            text: ( Ember.get(u, 'displayName') || Ember.get(u, 'username') ),
            id: u.id
          };
        }));
      }).fail(deferred.reject);
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