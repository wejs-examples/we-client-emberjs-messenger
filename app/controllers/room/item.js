import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleBody: function (){
      this.toggleProperty('isExpanded');
    }
  }
});