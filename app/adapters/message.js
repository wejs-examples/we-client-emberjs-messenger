import ApplicationAdapter from './application';
import Ember from 'ember';

/**
 * Message adapter
 * Overryde default methods for suport urls like /room/:roomId/message
 */
export default ApplicationAdapter.extend({
  routing: Ember.inject.service('-routing'),
  router: Ember.computed.alias('routing.router'),

  /**
   * Return current roomId
   * @return {Number} the roomId
   */
  getRoomId: function() {
    var params = this.get('router.targetState.routerJsState.params');
    return params['room.item'].id;
  },

  /**
    @method findRecord
    @param {DS.Store} store
    @param {DS.Model} type
    @param {String} id
    @param {DS.Snapshot} snapshot
    @return {Promise} promise
  */
  findRecord: function(store, type, id) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      we.messenger.message.findOne(id).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },
  /**
    @method findAll
    @param {DS.Store} store
    @param {DS.Model} type
    @param {String} sinceToken
    @param {DS.SnapshotRecordArray} snapshotRecordArray
    @return {Promise} promise
  */
  findAll: function(store, type, sinceToken, snapshotRecordArray) {
    console.log('>>', snapshotRecordArray)
    var roomId = this.getRoomId();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      we.messenger.message.findAll(roomId).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  /**
    @method query
    @param {DS.Store} store
    @param {DS.Model} type
    @param {Object} query
    @param {DS.AdapterPopulatedRecordArray} recordArray
    @return {Promise} promise
  */
  query: function(store, type, query) {
    var roomId = (query.roomId || this.getRoomId());

    return new Ember.RSVP.Promise(function(resolve, reject) {
      we.messenger.message.findAll(roomId, {
        data: query
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  /**
    @method createRecord
    @param {DS.Store} store
    @param {DS.Model} type   the DS.Model class of the record
    @param {DS.Snapshot} snapshot
    @return {Promise} promise
  */
  createRecord: function(store, type, snapshot) {
    var roomId = this.getRoomId();
    var data = this.serialize(snapshot, { includeId: false });

    data.roomId = roomId;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      we.messenger.message.create(roomId, {
        data: data
      }).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  }
});
