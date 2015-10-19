import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {}, function(){
    this.route('view', { path: ':id' }, function() {

    });
  });
  this.route('contact', {}, function(){
    this.route('view', { path: ':id' }, function() {

    });
  });
  this.route('message', {});
  this.route('image', {});
  this.route('login');

  this.route('room', { path: '/room' }, function() {
    this.route('create', { path: 'create' });

    this.route('item', { path: ':id' }, function() {
      this.route('edit', { path: 'edit' }, function() {

      });
    });
  });
  // this.route('room', {});
});

export default Router;
