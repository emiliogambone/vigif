import Ember from 'ember';

/**
  *Funzione che crea una stringa HTMLsafe rappresentante i radio button group
  *@argument value {String} valore del campo
  *@argument name {String} nome del campo
  *@argument lista {Array.<String>} lista che contiene i nomi da visualizzare
  *@return {String}
  */
export function radioButtonGroup([value, name, lista]) {
    let arr = lista;
    var out = ``;
    var i;

    if (name == 'patient_age_group') {
        for(i=0; i<arr.length; i++) {
          out += `<label class="col-xs-12 col-6 radio` + (i%2==0 ? ` left` : ` right`) +
          `">` + `<input type="radio" name="`+ name +`" value="` +
           arr[i].valore + `"` + (arr[i].valore==value ? ` checked="checked"`: ``) +
            `> `+ arr[i].nome + ` <span class="xs-description description">` + arr[i].descrizione + `</span></label>`;
        }
    } else if(name == 'patient_sex') {
         for(i=0; i<arr.length; i++) {
           out += `<label class="col-xs-12 col-6 radio` + (i%2==0 ? ` left` : ` right`) +
           `">` + `<input type="radio" name="`+ name +`" value="` +
            arr[i].valore + `"` + (arr[i].valore==value ? ` checked="checked"`: ``) +
             `> `+ arr[i].nome + `</label>`;
         }
     }else { /* role */
        for(i=0; i<arr.length; i++) {
          out += `<label class="col-12 radio">` +
           `<input type="radio" name="`+ name +`" value="` +
           arr[i].valore + `"` + (arr[i].valore==value ? ` checked="checked"`: ``) +
           `> `+ arr[i].nome + `<br><span class="description">` + arr[i].descrizione + `</span></label>`;
       }
    }

  return Ember.String.htmlSafe(out);
}

/**
  *Helper dei radio button group
  *@augments Ember/Helper
  *@argument radioButtonGroup {String}
  */
export default Ember.Helper.helper(radioButtonGroup);
