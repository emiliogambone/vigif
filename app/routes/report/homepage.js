import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model(){
    var temp = this.modelFor('report').reports;

		return temp;
  }
});
