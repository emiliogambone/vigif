import Ember from 'ember';

/**
  *Funzione che crea una stringa HTMLsafe rappresentante i select delle strutture
  *@argument current_value {String} valore del campo
  *@argument modello {model} model a cui si fa riferimento
  *@argument region_id {String} id della regione selezionata
  *@return {String}
  */
export function selectStructure([current_value, modello, region_id]) {

  let model = modello.toArray();
  var array = new Array();
  for (var i=0; i<model.length; i++){
    array.push([model[i].get('id'), model[i].get('name')]);
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

  var out = `<select id="healthcare_structure_id"` + ` name="healthcare_structure_id" class="adjust"` + (region_id == "null" ? `disabled`:``) +`>`;
  let text = `Selezionare un'opzione`;

  out += `<option value="" disabled selected>` + text + `</option>`;

  if(array){
    for(var j=0; j<array.length; j++){
      if(array[j][0].substring(0,3) == region_id){
        out += `<option value="` + array[j][0].substring(3,6) + `"` + (array[j][0].substring(3,6)==current_value ? ` selected="selected"`: ``) + `>`+ array[j][1] + `</option>`;
      }
    }
  }

  out += `</select>`;

  return Ember.String.htmlSafe(out);
}

/**
  *Helper dei select delle strutture
  *@augments Ember/Helper
  *@argument selectStructure {String}
  */
export default Ember.Helper.helper(selectStructure);
