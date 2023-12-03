// modello con i valori per la segnalazione

import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const { Model, attr, belongsTo, hasMany } = DS;
const { computed } = Ember;


// VALIDAZIONI
const patient_validation = buildValidations({
  patient_sex: [
    validator('presence', {
      presence: true,
      attributeDescription: 'patient_sex',
      message: 'patient_sex'
    }),
    validator('inclusion',{
      in: ['M', 'F']
    })
  ],
  patient_age:[
    validator('presence', {
      presence: true,
      attributeDescription: 'patient_age',
      message: 'patient_age'
    }),
    validator('number', {
      //maggiore o uguale a 0
      positive: true,
      //intero
      integer: true,
      //minore o uguale a 150
      lte: 150,
      allowString: true
    })
  ],
  patient_age_uom:[
    validator('presence', {
      presence: true,
      attributeDescription: 'patient_age_uom',
      message: 'patient_age_uom'
    }),
    validator('inclusion', {
      in: ['Anni', 'Mesi', 'Giorni']
    })
  ],

},{
  disabled: computed('model.step',function(){
    return this.get('model.step') < 1;
  })
});

const reaction_validation = buildValidations({

  adrs_start_date:
    validator('date', {
      //accetta se stringa vuota
      allowBlank: true,
      //accetta se data minore o uguale ad now (adesso)
      onOrBefore: 'now',
      attributeDescription: 'adrs_start_date',
      message: 'adrs_start_date'
    }),

  adrs_description: [
    validator('presence', {
      presence: true,
      attributeDescription: 'adrs_description',
      message: 'adrs_description'
    }),
    validator('length', {
        max: 255
    })
    ],
  serious:
    validator('presence', {
      presence: true,
      attributeDescription: 'serious',
      message: 'serious'
    }),

  seriousness_criterium_id: [
    validator('presence', {
      /*Validazione che obbliga la presenza di questo campo solamente se il campo "serious" è true*/
      presence: computed('model.serious', function(){
        return this.get('model.serious');
      }),
      attributeDescription: 'seriousness_criterium_id',
      message: 'seriousness_criterium_id'
    })
],
  outcome_id: [
    validator('format', {
      //accetta se stringa vuota
      allowBlank: true,
      attributeDescription: 'outcome_id',
      message: 'outcome_id'
  }),
    /*Validazione che restringe l'insieme dei valori possibili a 'E' (decesso), nel caso il campo "seriousness_criterium_id" sia uguale a 'M' (decesso)*/
    validator('inclusion', {
      in: computed('model.seriousness_criterium_id', function(){
        if(this.get('model.seriousness_criterium_id') == 'M')
        return ['E'];
      }),
      attributeDescription: 'outcome_id',
      message: 'outcome_id'
    })
  ]

},{
  disabled: computed('model.step', function(){
    return this.get('model.step') < 2;
  })
});

const treatments_validation = buildValidations({
  treatments:
    validator('has-many')
},{
  disabled: computed('model.step',function(){
    return this.get('model.step') < 3;
  })
});

const treatment_validation = buildValidations({
},{
  disabled: computed('model.step',function(){
    return this.get('model.step') < 4;
  })
});

const reporter_validation = buildValidations({
  reporter_name:
    validator('format', {
      //accetta se stringa vuota
      allowBlank: true,
      attributeDescription: 'reporter_name',
      message: 'reporter_name'
    }),
  reporter_phone_fax:
    validator('number', {
      //accetta se valore undefined/null
      allowNone: true,
      //accetta se stringa vuota
      allowBlank: true,
      //accetta stringa rappresentante numero
      allowString: true,
      integer: true,
      attributeDescription: 'reporter_phone_fax',
      message: 'reporter_phone_fax'
    }),
    reporter_email:[
      validator('format', {
        presence: true,
        attributeDescription: 'reporter_email',
        message: 'reporter_email'
      }),
      validator('format', {
        type: 'email',
        attributeDescription: 'reporter_email_valid',
        message: 'reporter_email_valid'
      })],
    reporter_surname:
      validator('presence', {
        presence: true,
        attributeDescription: 'reporter_surname',
        message: 'reporter_surname'
        }),

    healthcare_structure_id:
      validator('presence' , {
        presence: true,
        attributeDescription: 'healthcare_structure_id',
        message: 'healthcare_structure_id'
      }),

    region_id:
    validator('presence' , {
      presence: true,
      attributeDescription: 'region_id',
      message: 'region_id'
    }),

},{
  disabled: computed('model.step',function(){
    return this.get('model.step') < 5;
  })
});

const final_validation = buildValidations({
  sender_notes: validator('length', {
    max: 2000,
    attributeDescription: 'sender_notes',
    message: 'sender_notes'
  })
},{
  disabled: computed('model.step',function(){
    return this.get('model.step') < 6;
  })
});


export default Model.extend(patient_validation,reaction_validation,treatments_validation,treatment_validation,reporter_validation,final_validation,{

  //relazioni tra modelli

  treatments: hasMany('treatment'),
  outcome: belongsTo('outcome'),
  seriousness: belongsTo('seriousness'),
  region: belongsTo('region'),
  structure: belongsTo('structure'),

  //numero dello step in cui si sta lavorando
  step: attr('number'),
  hasSavedTreatment: attr('boolean', {defaultValue: false}),

  outcome_id: attr('string'),
  seriousness_criterium_id: attr('string'),
  region_id: attr('string'),
  healthcare_structure_id: attr('string'),

  patient_sex: attr('string', { defaultValue: 'M' }),
  //patient_age_group: attr('string'),
  patient_age_group: attr('string'),

  patient_age: attr('string'),
  patient_age_uom: attr('string'),

  reporter_name: attr('string'),
  reporter_surname: attr('string'),
  reporter_phone_fax: attr('string'),
  reporter_email: attr('string'),

  adrs_description: attr('string'),
  adrs_start_date: attr('date', {format: "D M YYYY"}),

  sender_notes: attr('string'),

  serious: attr('string', { defaultValue: false }),


  data_compilazione: attr('date'),



  patient_sex_list: computed(function(){
    return [{valore: 'M', nome: 'Maschio'}, {valore: 'F', nome: 'Femmina'}];
  }),

  // I valori dei range di eta sono impostati con un valore costante compreso in ogni range finche il server non viene aggiornato
  patient_age_group_list: computed(function(){
    return [{valore: '1', nome: 'Neonato', descrizione: '(meno di un mese)'},
    {valore: '2', nome: 'Infante', descrizione: '(meno di due anni)'},
    {valore: '5', nome: 'Bambino', descrizione: '(2-11 anni)'},
    {valore: '15', nome: 'Adolescente', descrizione: '(12-18 anni)'},
    {valore: '30', nome: 'Adulto', descrizione: '(18-64 anni)'},
    {valore: '70', nome: 'Anziano', descrizione: '(65 anni e oltre)'}];
  }),

  patient_age_uom_list: computed(function(){
    return [{nome: 'Anni'},
    {nome: 'Mesi'},
    {nome: 'Giorni'}];
  }),

  getTreatments: function(storage, report_ref){
    if(this.get('hasSavedTreatment')){
      let array = storage.get("treatments");
      let i;
      let name;
      for(i=0; i < array.length; i++){
        let temp = this.get("store").createRecord('treatment');
        for(name in array[i]){
          temp.set(name,eval("array[i]." + name));
        }
        temp.set("report", report_ref);
      }
      this.set('hasSavedTreatment', false);
    }
  }


});
