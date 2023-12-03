import Ember from 'ember';

const { get, Route } = Ember;

export default Route.extend({
  /*
    *campo per settare l'id
    */
  queryParams: {
    id: {
      replace: true
    }
  },
  /*
    *ritorna il model relativo al treatments richiesto
    */
  model(params){
    var m = this.modelFor('report');
    m.reports.set('step',4);
    var treatments = m.reports.get('treatments').toArray();
    for(let i = 0; i < treatments.length; i++){
      if(get(treatments[i], 'id') == params.id){
        return treatments[i];
      }
    }
    let temp = Math.floor(Date.now() / 10000);
    return this.get("store").createRecord('treatment', {id: temp,
    report: m.reports});
  }
});
