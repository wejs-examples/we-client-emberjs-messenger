import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:oauth2',

  host: 'http://localhost:4000',
  pathForType: function(type) {
    var camelized = Ember.String.camelize(type);
    return Ember.String.singularize(camelized);
  }
});
