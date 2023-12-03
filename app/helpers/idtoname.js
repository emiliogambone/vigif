import Ember from 'ember';

/**
  *Funzione che associa all'id(valore salvato nel modello) il corrispondente nome (utile per l'interfaccia)
  *@argument id {String} id salvato nel model
  *@argument table {Model} modello corrispondente alla tabella
  *@return {String}
  */
export function idtoname([id, table]) {
  let i;
  let arr = table.toArray();

  for(i = 0; i < arr.length; i++){
    if(arr[i].get('aifa') == id ){
      let string = arr[i].get('name');
      /*ritorna una stringa con l'iniziale maiuscola*/
      return ``+ string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  return ``;
}

/**
  *Helper della conversione id-nome
  *@augments Ember/Helper
  *@argument idtoname {String}
  */
export default Ember.Helper.helper(idtoname);
