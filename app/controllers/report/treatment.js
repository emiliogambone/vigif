import Ember from 'ember';

const {
  get,
  set,
  Controller
} = Ember;

/**
  *Controller associato alla route e al template "treatment"
  *
  *Controller che gestisce le action dello step "treatment"
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
      let model = this.get('model');
      var radios = document.getElementsByName(name);

      for(let i = 0; i < radios.length; i++)
        if(radios[i].checked)
          set(model, name, radios[i].value);
    },
    /**
      *azione che setta la data
      *@function actions:setDate
      *@argument name
      */
    setDate(){
      let model = get(this, 'model');
      let value = document.getElementById('start_date').value;
      set(model, 'start_date', value);
    },
    /**
      *Funzione di identificazione del campo che genera un errore nelle validazioni del model
      *@function action:identifyError
      *@argument name
      */
    identifyError(name){
      let error = document.getElementById('treatment-error');

        switch(name) {
            case 'name':
              error.innerHTML = 'Inserire il nome del farmaco';
              break;
            case 'start_date':
              error.innerHTML = 'La data selezionata non è valida';
              break;
            default:
              error.innerHTML = name;
              break;
        }
      error.style.display="block";
    }
  }
});
