// modello per ogni treatment di una singola segnalazione
import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;


// VALIDAZIONI

const Validations = buildValidations({
  name:
    validator('presence', {
      presence: true,
      message: 'name',
      attributeDescription: 'name'
    }),
  role: [
    validator('presence', true),
    validator('inclusion', {
      in: ['S', 'C']
    })
  ],
  report:
    validator('belongs-to'),

  therapeutic_indication:
    validator('format', {
      //accetta se stringa vuota
      allowBlank: true,
      message: 'therapeutic_indication',
      attributeDescription: 'therapeutic_indication'
    }),

  // la data di inizio di somministrazione del farmaco deve essere minore della data di inizio della reazione avversa
  start_date:
    validator('date', {
      allowBlank: true,
      message: 'start_date',
      attributeDescription: 'start_date',
      onOrBefore: computed('model.report' ,function(){

        if(this.get('model.report').get('adrs_start_date') != undefined){
          return this.get('model.report').get('adrs_start_date');
        }
        else {
          return 'now';
        }
      })
    })
  })


export default Model.extend(Validations, {

  name: attr('string'),
  aic_code: attr('string'),
  start_date: attr('date'),
  role: attr('string', { defaultValue: 'S' }),
  therapeutic_indication: attr('string'),

  report: belongsTo('report'),

  role_list: computed(function(){
    return [{valore: 'S', nome: 'Sospetto', descrizione: '(se si ritiene il farmaco causa della reazione avversa)'},
            {valore: 'C', nome: 'Concomitante', descrizione: '(se il farmaco è stato assunto nello stesso periodo di uno o più sospetti)'}];
  })

});
