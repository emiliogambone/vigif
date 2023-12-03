import DS from 'ember-data';

export default DS.Model.extend({
  report: DS.hasMany('report'),
  name: DS.attr('string'),
  codice_azienda: DS.attr('string'),
  codice_regione: DS.attr('string')

});
