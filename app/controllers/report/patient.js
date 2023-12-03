import Ember from 'ember';

const {
  Controller
} = Ember;
/**
  *funzione che setta il campo patient_age_group, in base ai campi patient_age e patient_age_uom
  *@function setAgeGroup
  *@augments model
  */
function setAgeGroup(model){
  let uom = model.reports.get('patient_age_uom');
  let age = model.reports.get('patient_age');
  if(!uom || !age){
    model.reports.set('patient_age_group', undefined);
  }else if((uom == "Giorni" && age <= 31) || (uom == "Mesi" && age <= 1) || (uom == "Anni" && age <= 0)) {
    model.reports.set('patient_age_group', "Neonato");
  } else if((uom == "Giorni") || (uom == "Mesi" && age <= 24) || (uom == "Anni" && age <= 2)) {
    model.reports.set('patient_age_group', "Infante");
  } else if((uom == "Mesi" && age <= 132) || (uom == "Anni" && age <= 11)) {
    model.reports.set('patient_age_group', "Bambino");
  }else if((uom == "Mesi") || (uom == "Anni" && age <= 18)) {
    model.reports.set('patient_age_group', "Adolescente");
  } else if(uom == "Anni" && age <= 64){
    model.reports.set('patient_age_group', "Adulto");
  } else if(uom == "Anni") {
    model.reports.set('patient_age_group', "Anziano");
  } else {
    model.reports.set('patient_age_group', undefined);
  }
}

/**
  *Controller associato alla route e al template "patient"
  *
  *Controller che gestisce le action dello step "patient"
  *@argument Ember/Controller
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
      let radios = document.getElementsByName(name);

      if(name == 'patient_age'){
        radios[0].value = this.get('model').reports.get('patient_age');
      }else{
        for(let i = 0; i < radios.length; i++){
          if(radios[i].checked){
            this.get('model').reports.set(name, radios[i].value);
          }
        }
      }

      setAgeGroup(this.get('model'));
    },
    /**
      *azione che setta l'elemento corrispondente al campo selezionato dedicato allo slider
      *@function actions:setSliderElement
      *@argument name
      */
    setSliderElement(name){

      let model = this.get('model');
      var slider = document.getElementsByName(name);
      model.reports.set(name, slider[0].value);
      setAgeGroup(this.get('model'));
    },
    /**
      *Funzione di identificazione del campo che genera un errore nelle validazioni del model
      *@function action:identifyError
      *@argument name
      */
    identifyError(name){
      let error = document.getElementById('patient-error');
      switch(name) {
          case 'patient_age':
            error.innerHTML = 'Selezionare l\'età del paziente.';
            break;
          case 'patient_age_uom':
            error.innerHTML = 'Selezionare un\'unità di misura.';
            break;
          default:
            error.innerHTML = name;
            break;
      }
      error.style.display = "block";
    }
  }
});
