import Ember from 'ember';

var host = 'http://localhost:4000';

export default Ember.Route.extend({
  auth: Ember.inject.service('auth'),

  model: function(params) {
    return Ember.RSVP.hash({
      newText: 'teste',
      room: this.store.findRecord('room',  params.id),
      messages: this.store.query('message', { roomId: params.id }),
      roomId: params.id
    });
  },

  actions: {
    sendMessage: function() {
      var text = this.get('currentModel.newText');
      var messages = this.get('currentModel.messages');
      window.ttt = messages;
console.log('>>', messages); return;
      if (!text) { return; }

      var self = this;

      var record = {
        content: text,
        roomId: this.get('currentModel.roomId'),
        creatorId: this.get('auth').currentUser.id,
        createdAt: new Date(),
        status: 'sending'
      };

      Ember.$.post( host + '/message', record)
      .done(function(r) {

        // r.message[0].room = self.store.findRecord('room', r.message[0].room);
        // r.message[0].creator = self.store.findRecord('user', r.message[0].creator);
window.teste = self.store;
        var rs = self.store.push('message', r.message[0]);
        messages.pushObject(rs._internalModel);
        // r.message[0]
        // alert( "second success" );
      })
      // .fail(function() {
      //   alert( "error" );
      // })
      // .always(function() {
      //   alert( "finished" );
      // });
    }
  }
});