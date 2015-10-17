import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'img',

  // default configs
  // width: '100%',
  attributeBindings: ['src','width', 'data-lightbox', 'dataToggle:data-toggle', 'dataPlacement:data-placement', 'title'],
  webp: 'auto',
  // medium | thumbnail | original | large
  size: 'medium',
  classNameBindings: ['clickClass'],
  src: null,
  url: null,

  user: null,

  onClick: null,

  // init: function () {
  //   this._super();
  //   // this.set('defaultSrc', WeMessenger.options.server + '/core/images/avatars/user-avatar.png');
  //   this.set('defaultSrc', WeMessenger.options.server + '/');
  // },

  // observer to change image after resolves the image object promisse
  refreshImage: function refreshImage() {
    this.set('src',  'http://localhost:4000/avatar/' + this.get('user.id') );
    this.set('width', this.get('imgWidth') || '50');
  }.observes('user.avatar').on('init'),
  // optional onClick event
  click: function() {
    if (this.get('onClick')) {
      this.sendAction('onClick', this.get('user'), this);
    }
  }
});
