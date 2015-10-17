import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({
      room: this.store.findRecord('room',  params.id),
      messages: this.store.query('message', { roomId: params.id })
    });
  }
});
