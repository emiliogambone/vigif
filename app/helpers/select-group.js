import Ember from 'ember';

/**
  *Funzione che crea una stringa HTMLsafe rappresentante i select
  *@argument current_value {String} valore del campo
  *@argument field_name {String} nome del campo
  *@argument modello {model} model a cui si fa riferimento
  *@argument placeholder {String} stringa da stampare come placeholder
  *@argument gravita {Boolean} opzionale, può essere serious o seriousness_criterium_id dipende da chi chiama l'helper
  *@return {String}
  */
export function selectGroup([current_value, field_name , modello, placeholder, gravita]) {

  let model = modello.toArray();
  var array = new Array();
  for (var i=0; i<model.length; i++){
    array.push([model[i].get('aifa'), model[i].get('name')]);
  }
  array.sort(sortPerNome);

  /*funzione per ordinare un array multidimensionale*/
  function sortPerNome(a, b){
    if(a[1] == b[1]){
      return 0;
    }
    else {
      return (a[1] < b[1]) ? -1 : 1;
    }
  }

  var out = `<select id="`+ field_name +`"` + ` name="`+ field_name +`" class="adjust"` +
    ((gravita == false || gravita == 'false')  ? `disabled`:``) + `>`;
  let text;
  if(placeholder)
    text = placeholder;
  else {
    text = `Selezionare un'opzione`;
    }

  out += `<option value="" disabled selected>` + text + `</option>`;

  if(array){
    for(var j=0; j<array.length; j++){
      if(! ( field_name == 'seriousness_criterium_id' && (array[j][0] == '-' || array[j][0] == 'N') ) ){
        if (gravita == 'M'){
          if (array[j][1] != 'decesso'){
            out += `<option value="` + array[j][0] + `"` +` disabled`+ `>` + array[j][1] + `</option>`;
          }
          else {
            out += `<option value="` + array[j][0] + `" selected="selected"` + `>`+ array[j][1] + `</option>`;
          }
        }else{
          out += `<option value="` + array[j][0] + `"` + (array[j][0]==current_value ? ` selected="selected"`: ``) + `>`+ array[j][1] + `</option>`;
        }
      }
    }
  }

  out += `</select>`;

  return Ember.String.htmlSafe(out);
}

/**
  *Helper dei select
  *@augments Ember/Helper
  *@argument selectGroup {String}
  */
export default Ember.Helper.helper(selectGroup);
