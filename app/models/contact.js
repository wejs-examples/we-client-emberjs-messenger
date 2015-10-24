import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  session: Ember.inject.service('session'),

  status: DS.attr('string', {
    defaultValue: 'requested'
  }),

  name: DS.attr('string'),

  user_id: DS.attr('number'),

  // relationship
  // from: DS.attr('string'),
  // to: DS.attr('string'),

  from: DS.belongsTo('user',{
    inverse: 'contactFrom',
    async: true
  }),

  to: DS.belongsTo('user',{
    inverse: 'contactTo',
    async: true
  }),

  isTalking: DS.attr('boolean' ,{
    defaultValue: false
  }),

  // online | offline | away nilzer
  onlineStatus: DS.attr('string', {
    defaultValue: 'offline'
  }),

  hasNews: DS.attr('boolean' ,{
    defaultValue: false
  }),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  // COMPUTED PROPERTYES

  // // requested | requestsToYou | accepted | ignored
  currentUserStatus: function(){
    var cid = this.get('session.session.authenticated.user.id');

    if(
      this.get('from.id') != cid &&
      this.get('status') == 'requested'
    ) {
      return 'requestsToYou';
    } else {
      return this.get('status');
    }
  }.property('status', 'session.session.authenticated.user.id'),

  /**
   * Set contact user get from "to" or "from" fields
   *
   * @return {object} model user object
   */
  contactUser: function() {
    var cid = this.get('session.session.authenticated.user.id');

    // only return a user object if user is authenticated
    if(!cid) {
      return null;
    }

    if( this.get('from.id') != cid ) {
      return this.get('from');
    } else {
      return this.get('to');
    }
  }.property('session.session.authenticated.user.id', 'from', 'to')
});
