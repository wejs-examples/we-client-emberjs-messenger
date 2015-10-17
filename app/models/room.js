import DS from 'ember-data';

export default DS.Model.extend({
  // members_id: DS.attr('array'),

  identifier: DS.attr('string'),

  name: DS.attr('string'),
  description: DS.attr('string'),

  type: DS.attr('string'),

  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
