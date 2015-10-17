import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      rooms: this.store.query('room', { my: true })
    });
  }
});
