import Ember from 'ember';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return Ember.RSVP.hash({
      rooms: this.store.find('room')
    });
  }
});
