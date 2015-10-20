import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function() {
      var room = this.get('model');

      if (room.id) {
        // update

      } else {
        // create
      }
    }
  }
});