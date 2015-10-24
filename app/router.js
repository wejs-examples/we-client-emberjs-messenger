import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', {}, function(){
    this.route('view', { path: ':id' });
  });
  this.route('contact', {}, function(){
    this.route('request');

    this.route('item', { path: ':id' });
  });
  this.route('message', {});
  this.route('image', {});
  this.route('login');

  this.route('room', { path: '/room' }, function() {
    this.route('create', { path: 'create' });

    this.route('item', { path: ':id' }, function() {
      this.route('edit', { path: 'edit' });
    });
  });

  this.route('notification', function(){
    this.route('read');
  });
});

export default Router;