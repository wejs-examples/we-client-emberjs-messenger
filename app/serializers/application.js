import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  /*
    @method serializeIntoHash
    @param {Object} hash
    @param {subclass of DS.Model} type
    @param {DS.Model} record
    @param {Object} options
  */
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  },

  warnMessageNoModelForKey: function(prop, typeKey) {
    return 'Encountered "' + prop + '" in payload, but no model was found for model name "' + typeKey + '" (resolved model name using ' + this.constructor.toString() + '.typeForRoot("' + prop + '"))';
  }

});
