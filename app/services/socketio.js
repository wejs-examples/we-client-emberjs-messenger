import Ember from 'ember';

export default Ember.Service.extend({
  socket: null,

  onConnectAuthenticated: function() {
    var socket = this.get('socket');


    socket.on('contact:request', function(data) {
      console.log('contact:request>',data);
    });

    socket.on('contact:requested', function(data) {
      console.log('contact:requested>',data);
    });
  }
});