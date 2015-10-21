import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    save: function() {
      var self = this;
      var room = this.get('model');
      var currentUser = this.get('session.session.authenticated.user');

      if (room.id) {
        // update
        room.save().then(function(){
          self.transitionTo('room.item', room.id);
        });
      } else {
        // create
        var record = {
          name: room.name,
          descrioption: room.description,
          createdAt: new Date()
        };

        var rInstance = this.store.createRecord('room', record);
        rInstance.set('creator', this.store.peekRecord('user', currentUser.id));

        rInstance.save().then(function (r) {
          self.transitionTo('room.item', r.id);
        });
      }
    }
  }
});