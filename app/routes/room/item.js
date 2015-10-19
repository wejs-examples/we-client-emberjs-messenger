import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route';

var host = 'http://localhost:4000';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model: function(params) {
    return Ember.RSVP.hash({
      newText: null,
      room: this.store.findRecord('room',  params.id),
      messages: Ember.$.get( host + '/room/'+params.id+'/message').then(function(r){
        return  r.message;
      }),
      contact: null,
      roomId: params.id
    });
  },

  afterModel: function(model) {
    if (model.room.type === 'contact') {
      model.contact = true;
    }
  },

  actions: {
    sendMessage: function() {
      var text = this.get('currentModel.newText');
      var room = this.get('currentModel.room');
      var currentUser = this.get('session.session.authenticated.user');
      var messages = this.get('currentModel.messages');

      if (!text) { return; }

      var self = this;

      var record = {
        content: text,
        roomId: this.get('currentModel.roomId'),
        creatorId: currentUser.id,
        createdAt: new Date(),
        status: 'sending'
      };

      self.set('currentModel.newText', null);

      Ember.$.post( host + '/room/'+room.id+'/message', record)
      .done(function (res) {
        Ember.$.get( host + '/room/'+room.id+'/message/'+res.message.id )
        .then(function (r){
          self.store.pushPayload(r);
          var rs = self.store.peekRecord('message', r.message.id);
          messages.pushObject(rs);
        });
      });
      // .fail(function() {
      //   alert( "error" );
      // })
      // .always(function() {
      //   alert( "finished" );
      // });
    }
  }
});
