import Ember from 'ember';

/**
  *Funzione che crea una stringa HTMLsafe rappresentante i radio button group dell'età
  *@argument value {String} valore del campo
  *@argument lista {Array.<String>} lista che contiene i nomi da visualizzare
  *@return {String}
  */
export function etaButtonGroup([value, lista]) {
  let arr = lista;
  var out = ``;
  var i;

  for(i=0; i<arr.length; i++) {
    out += `<label class="col-4 eta"> <input type="radio" name="patient_age_uom" value="` + arr[i].nome + `"` + (arr[i].nome == value ? ` checked="checked"`: ``) + `> `+ arr[i].nome + `</label>`;
  }

  return Ember.String.htmlSafe(out);
}

/**
  *Helper dei radio button group dell'età
  *@augments Ember/Helper
  *@argument etaButtonGroup {String}
  */
export default Ember.Helper.helper(etaButtonGroup);
