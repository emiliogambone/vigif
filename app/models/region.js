import DS from 'ember-data';

export default DS.Model.extend({
  report: DS.hasMany('report'),
  name: DS.attr('string'),
  aifa: DS.attr('string')

});
