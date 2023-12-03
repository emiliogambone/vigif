import Ember from 'ember';
const {
  Controller
 } = Ember;

 /**
   *Controller associato alla route e al template "final-check"
   *
   *Controller che gestisce le action dello step "final-check"
   *@augments Ember/Controller
   */
export default Controller.extend({
  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions:{
    /**
      * azione che salva il report sul server
      * in caso di successo della promessa passa all'ultima pagina del form
      * in caso venga rigettata stampa il motivo del rifiuto
      * @function actions:submit
      */
    submit(){
      var that = this;
      this.get('model').reports.save().then(function(value){
        alert('segnalazione inviata');
        alert(value);
        that.transitionToRoute('report.reportSent');

      }, function(error){
        alert('OPS! Qualcosa è andato storto..');
        let errore = document.getElementById('final-error');
        errore.innerHTML = error;
        errore.style.display="block";

      });
    },
    /**
      *azione che setta l'elemento corrispondente al campo selezionato
      *@function actions:setElement
      *@argument name
      */
    setElement(name){
      let select = document.getElementById(name);
      this.get('model').reports.set(name, select.value);

    }
  }

});
