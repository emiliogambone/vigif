import Ember from 'ember';

export default Ember.Route.extend({
  model(){

    this.storage.clear();

    return this.modelFor('report');
    
  }

});
