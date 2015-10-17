import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {});
  this.route('contact', {});
  this.route('message', {});
  this.route('image', {});
  this.route('login');

  this.route('room', { path: '/room' }, function() {
    this.route('view', { path: ':id' }, function() {


    });
  });
  // this.route('room', {});
});

export default Router;
