import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  session: Ember.inject.service('session'),

  unReadCount: 0,

  notificationsUnread: null,
  notificationsRead: null,

  since: null,
  // 10 secconds
  delay: 20*1000,

  checkIfHaveNewNotifications: function checkIfHaveNewNotifications() {
    var self = this;

    var data = { read: false };

    if (this.since) {
      data.since = this.since;
    }

    Ember.$.ajax({
      type: 'GET',
      url: we.messenger.host + '/api/v1/notify/notification',
      cache: false,
      data: data
    }).then(function (r){
      // set since for dont get old records
      self.since = new Date();

      if (r.notification && r.notification.length) {
        self.get('store').pushPayload(r);
      }

      if (r.meta && r.meta.count) {
        self.set('unReadCount', r.meta.count);
      }
    }).always(function(){
      Ember.run.later(self, self.checkIfHaveNewNotifications, self.get('delay'));
    });
  },

  init: function() {
    this._super();
    this.setNotificatioLists();

    window.io.on('notification:update:read', function(data) {
      console.log('notification:update:read',data);
    });
  },

  setNotificatioLists: function() {
    var userId = this.get('session.session.authenticated.user.id');
    var store = this.get('store');

    if (!userId) {
      this.set('notificationsUnread', null);
      this.set('notificationsRead', null);
    } else {
      this.set('notificationsUnread', store.filter('notification', function (n){
        return (!n.get('read'));
      }));
      this.set('notificationsRead', store.filter('notification', function (n){
        return n.get('read');
      }));
    }
  }
});