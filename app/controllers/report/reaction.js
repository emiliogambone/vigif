import Ember from 'ember';

const {
  Controller
} = Ember;

/**
  *Controller associato alla route e al template "reaction"
  *
  *Controller che gestisce le action dello step "reaction"
  *@augments Ember/Controller
  */
export default Controller.extend({
  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions:{

    /**
      *azione che setta l'elemento corrispondente al campo selezionato
      *@function actions:setElement
      *@argument name
      */
    setElement(name){
      let select = document.getElementById(name);

      // se seriousness_criterium_id è settato a decesso anche outcome_id deve esserlo
      if(name == 'seriousness_criterium_id' && select.options[select.selectedIndex].text == 'decesso'){
        this.get('model').reports.set(name, select.value);
        var outcomes = this.get('store')._identityMap._map.outcome._models;
          for (var j=0; j<outcomes.length; j++){
            if (outcomes[j]._data.name == 'decesso'){
              this.get('model').reports.set('outcome_id', outcomes[j]._data.aifa);
            }
          }

      }
        this.get('model').reports.set(name, select.value);
    },

    /**
      *azione che setta la gravità
      *@function actions:seriousStatus
      *@argument status
      */
    seriousStatus(status){
      this.get('model').reports.set('serious', status);

      // se lo stato torna a false, seriousness_criterium_id torna ad essere undefined
      if(!status){
        this.get('model').reports.set('seriousness_criterium_id', undefined);
      }
    },

    /**
      *azione che setta la data
      *@function actions:setDate
      *@argument name
      */
      setDate(){
      let value = document.getElementById('adrs_start_date').value;

      this.get('model').reports.set('adrs_start_date',value);
    },

    /**
      *Funzione di identificazione del campo che genera un errore nelle validazioni del model
      *@function action:identifyError
      *@argument name
      */
    identifyError(name){
      let error = document.getElementById('reaction-error');

      switch(name) {
        case 'adrs_description':
          error.innerHTML = 'Inserire una descrizione.';
          break;
        case 'adrs_start_date':
          error.innerHTML = 'Inserire una data di insorgenza corretta.';
          break;
        case 'seriousness_criterium_id':
          error.innerHTML = 'Selezionare un criterio di gravità.';
          break;
        case 'outcome_id':
          error.innerHTML = 'Il campo "Esito" deve avere il valore "decesso" come il campo "Criterio di gravità".'
          break;
        case 'serious':
          error.innerHTML = 'Selezionare gravità della reazione.'
          break;
        case 'patient_age_group':
          error.innerHTML = 'selezionare range di eta'
          break;
        default:
          error.innerHTML = name;
          break;
      }
      error.style.display="block";
    }
  }
});
