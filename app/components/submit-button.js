import Ember from 'ember';
const {
  get,
  computed,
  Component
} = Ember;
/**
  *Component che crea il submit button
  *
  *Component, associato ad un template, che crea un button, dedicato al salvataggio e al passaggio da un form al successivo
  *@augments Ember/Component
  *@argument posizione {String}
  *@argument window {Window}
  *@argument destinazione {String}
  *@argument model {Object}
  *@argument text {String} testo del bottone (facoltativo)
  *@argument undo {String} (facoltativo)
  */
const SubmitButtonComponent = Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  /**@type{String} indica la classe per il tag div, calcolata in base alla posizione*/
  classe: computed('params.[]', function(){
    let cl = get(this, 'params')[0];
    if(cl == "left")
        return "btn btn-link btn-nav pull-left";
    else if(cl == "bottom")
        return "btn btn-block btn-primary";
    else if (cl == "right")
        return "btn btn-link btn-nav pull-right";
    else {
        return "btn btn-negative btn-block";
    }
  }),

  /**@type{String} indica l'id per il tag div, calcolato in base alla posizione e alla destinazione*/
  id: computed('params.[]', function(){
    let type = get(this, 'params')[0];
    let route = get(this, 'params')[2];
        if (type == "undo")
            return "small-btn";
        else if (route == "reaction" && type == "bottom")
            return "submit-patient";
        else return "";
  }),
  /**@type{String} indica la posizione dell'icona in alla posizione (può non essere presente)*/
  left_icon: computed('params.[]', function(){
      if(get(this, 'params')[0] == "left")
        return Ember.String.htmlSafe(`<span class="icon icon-left-nav"></span>`);
      else
        return ``;
  }),
  /**@type{String} indica la posizione dell'icona in alla posizione (può non essere presente)*/
  right_icon: computed('params.[]', function(){
      if(get(this, 'params')[0] == "right")
        return Ember.String.htmlSafe(`<span class="icon icon-right-nav"></span>`);
  }),
  /**@type{Window} indica la finestra in cui il bottone si troverà*/
  mywindow: computed('params.[]', function(){
    return get(this, 'params')[1];
  }),
  /**@type{String} indica la route di destinazione*/
  destination: computed('params.[]', function(){
    return get(this, 'params')[2];
  }),
  /**@type{model} indica il modello relativo (può essere report o treatment)*/
  model: computed('params.[]', function(){
    return get(this, 'params')[3];
  }),
  /**@type{String} testo del bottone, se non inserito viene settato come "Avanti"*/
  text: computed('params.[]', function(){
    return get(this, 'params')[4] || "Avanti";
  }),
  /**@type{String} funzione di eliminazione
  N.B. Usata solamente nella route treatment
  */
  undo: computed('params.[]', function(){
    return get(this, 'params')[5] || false;
  }),

  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions: {
    /**
    * metodo check()
    *   se undo è true elimina il treatment e torna a all-treatments
    *   se destination è index elimina il record inviato e torna alla homepage
    *   altrimenti controlla le validazioni e passa alla route indicata da destination
    * @function actions:check
    */
    check(){
      if(get(this, 'undo')){
        get(this,'model').deleteRecord();
        get(this, 'mywindow').transitionToRoute('report.' + get(this, 'destination'));
      } else if (get(this, 'destination') == 'index'){
            var record = get(this, 'model');
            record.deleteRecord();
            get(this, 'mywindow').transitionToRoute(get(this, 'destination'));
          } else{
              get(this,'model').validate().then(({validations}) => {
                if(!validations.get('isValid')) {
                  this.sendAction('identifyError', validations.get('message'));
                } else {
                  /**
                  salvataggio dei dati in locale
                  */
                  this.storage.set("report", get(this, "model"));
                  if(get(this, "model").get("treatments")){
                    this.storage.set("treatments", get(this, "model").get("treatments").toArray());
                  }
                  get(this, 'mywindow').transitionToRoute('report.' + get(this, 'destination'));
                }
              });
            }
    },

  }
});

/**
metodo necessario per caricare i parametri di ordinamento
*/
SubmitButtonComponent.reopenClass({
  positionalParams: 'params'
});

export default SubmitButtonComponent;
