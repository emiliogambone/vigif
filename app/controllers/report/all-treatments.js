import Ember from 'ember';
const {
  get,
  set,
  computed,
  Controller
} = Ember;
const { sort } = computed;

/**
  *Controller associato alla route e al template "all-treatments"
  *
  *Controller che gestisce le action dello step "all-treatments"
  *@augments Ember/Controller
  */
export default Controller.extend({

  // -------------------------------------------------------------------------
  // Attributes

  /**@type{Array.<String>} attributo necessario per aprire la rute del treatment corrispondente*/
  queryParams: ['id'],
  /**@type{String} id effettivo, settato in base al treatment selezionato*/
  id: null,
  /**@type{Array.<String>} proprietà di ordinamento (ordinamento ascendente secondo il nome)*/
  sortProperties: ['name:asc'],
  /**@type{Array.<Object>} array ordinato secondo il criterio sortProperties*/
  orderedTreatments:  sort('model.reports.treatments', 'sortProperties'),
  /**@type{Boolean} flag che indentifica se siamo nell'ordinamento di default(false) o in uno personalizzato(true)*/
  customOrder: false,
  /**@type{String} tipo di ordinamento*/
  orderName: undefined,

  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions:{
    /**
      *creazione di un nuovo treatment
      *@function actions:add
      */
    add(){
      /*
      crea un timestamp
      */
      let temp = Math.floor(Date.now() / 10000);

      /*
      creazione di un nuovo record per un nuovo treatment
      */
      this.get('store').createRecord('treatment',{
        report: this.get('model').reports,
        id: temp
      });

      this.transitionToRoute('report.treatment', { queryParams: { id: temp }});
    },

    /**
      *apertura della route specifica associata al farmaco, per la modifica
      *
      *@function action:operRoute
      *@argument value
      */
    openRoute(value){
      this.transitionToRoute('report.treatment', { queryParams: { id: value }});
    },
    /**
      *eliminazione di un treatment esistente.
      *N.B. il treatment rimarrà in cache fino al passaggio ad una nuova route
      *
      *@function action:deleteRoute
      *@argument value
      */
    deleteRoute(value){
      let model = this.get('model').reports;
      let treatments = get(model, 'treatments').toArray();
      for(let i = 0; i < treatments.length; i++){
        if(treatments[i].get('id') == value){
          treatments[i].destroyRecord();
        }
      }
    },
    /**
      *Azione che al click ordina i treatments in base alla colonna selezionata
      *1 click = ascendente
      *2 click = descendente
      *3 click = ritorno allo std
      *@function action:order
      *@argument field
      */
    order(field){
      //memorizza il valore di customOrder
      let co = get(this, 'customOrder');
      let type;
      //riprende l'oggetto
      let element = document.getElementById(field);
      if(get(this, 'orderName') == field){ //se l'oggetto non al primo click
        if(get(this, 'customOrder') == true){  //se l'oggetto è al secondo click
          type = ":desc";
          set(this, 'customOrder',false); //si prepara per il terzo click
          element.innerHtml = element.getAttribute('name') +"D";
        }else{  //se l'oggetto è al terzo click
          set(this, 'orderName', undefined); //torna allo stato iniziale
        }
      }else{ //se l'oggetto è al primo click
        type = ":asc";
        set(this, 'orderName', field);
        co = true;
        set(this, 'customOrder', true);
        element.innerHtml = element.getAttribute('name') +"A";
      }
      let sP = co ? [field+type] : ['role:desc', 'start_date:asc'];
      if(!co){
        element.innerHtml = element.getAttribute('name');
      }
      //cambia i parametri di ordinamento
      set(this, 'sortProperties', sP);
    },
    /**
      *Funzione di identificazione del campo che genera un errore nelle validazioni del model
      *@function action:identifyError
      *@argument name
      */
    identifyError(name){
      let element = document.getElementById(name);
      element.classList.add("hasError");
    }
  }
});
