import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  /*
    *Reindirizzamento alla homepage
    */
  redirect() {
      this.transitionTo('report.homepage');
  }
});
