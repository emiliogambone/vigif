import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(){
    var temp = this.modelFor('report');

    temp.reports.set('data_compilazione', new Date());

    temp.reports.set('step',6);

    temp.reports.getTreatments(this.storage, temp.reports);

    return temp;
  }
});
