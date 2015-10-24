import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  session: Ember.inject.service('session'),

  title: DS.attr('string'),
  text: DS.attr('string'),

  user_id: DS.attr('number'),

  locale: DS.attr('string'),

  status: DS.attr('string'),

  read: DS.attr('boolean', {
    defaultValue: false,
  }),

  emailSend: DS.attr('boolean', {
    defaultValue: false,
  }),

  modelName: DS.attr('string'),
  modelId: DS.attr('string'),

  actions: DS.attr()
});