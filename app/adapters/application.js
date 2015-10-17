import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  host: 'http://localhost:4000',
  pathForType: function(type) {
    var camelized = Ember.String.camelize(type);
    return Ember.String.singularize(camelized);
  }
});
