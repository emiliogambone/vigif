import Ember from 'ember';

const { get, Route } = Ember;

export default Route.extend({
  /*
    *ritorna il model relativo al record salvato in memoria, se non presente ne crea uno nuovo
    */
  model(){
    var store = get(this, 'store');
    var temp = undefined;

    /* per ogni report in memoria controllo se le è stato eliminato (cioè gia inviato al server)
      *se tutti i report presenti sono stati eliminati ne creo uno nuovo altrimenti verra usato quello non eliminato
      */
    /*records.forEach(function(item){
      state = records.objectAt(records.indexOf(item)).get('isDeleted');
      if (state == false){
        temp = records.objectAt(records.indexOf(item));
      }
    });*/


    /*
      Se esiste un record salvato in locale lo recupera
    */
    let name;
    if(temp == undefined){
      temp = store.createRecord('report');
      for(name in (this.storage.get("report"))){
        let value = eval("this.storage.get(\"report\")." + name);
        if(value === undefined){
          temp.set(name, undefined);
        }else if(value === null){
          temp.set(name, null);
        }else if(value == "false"){
          temp.set(name, false);
        }else{
          temp.set(name, value.toString());
        }
      }
      if(this.storage.get("treatments")){
        if(this.storage.get("treatments").get("length") > 0){
          temp.set("hasSavedTreatment",true);
        }else{
          temp.set("hasSavedTreatment",false);
        }
      }
    }

      /*
        ritorna una promessa di promesse che verra risolta quando tutte le promesse interne verrano risolte
        Tranne reports tutti gli altri campi fanno una chiamata GET al server
      */
    return Ember.RSVP.hash({
      reports: temp == undefined ? store.createRecord('report') : temp,
      outcomes: store.peekAll('outcome').get('length') == 0 ? store.findAll('outcome') : store.peekAll('outcome'),
      seriousness: store.peekAll('seriousness').get('length') == 0 ? store.findAll('seriousness') : store.peekAll('seriousness'),
      regions: store.peekAll('region').get('length') == 0 ? store.findAll('region') : store.peekAll('region'),
      healthcare_structures: store.peekAll('structure').get('length') == 0 ? store.findAll('structure') : store.peekAll('structure')
    });
  }
});
