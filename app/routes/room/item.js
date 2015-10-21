import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  model: function(params) {
    return Ember.RSVP.hash({
      newText: null,
      room: this.store.findRecord('room', params.id),
      messages: this.store.find('message', { roomId: params.id }),
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
        createdAt: new Date(),
        status: 'sending'
      };

      self.set('currentModel.newText', null);


      var rInstance = this.store.createRecord('message', record);
      rInstance.set('room', this.store.peekRecord('room', room.id) );
      rInstance.set('creator', this.store.peekRecord('user', currentUser.id));

      rInstance.save().then(function (r) {
        messages.pushObject(r._internalModel);
      });
    }
  }
});
