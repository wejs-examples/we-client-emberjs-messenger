import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.$.ajaxSetup({
  headers: {
    'Authorization': 'Bearer ad4f00c7bde86ca7887ecd1316f292e822dce775aba6697b9f',
    'Accept': 'application/json'
  }
});

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
