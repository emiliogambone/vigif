import Ember from 'ember';

/**
  *Funzione che ritorna la stringa corrispondente al valore del "role"
  *@argument role {String} ruolo
  *@return {String}
  */
export function fullRole(role) {
    return (role == 'S') ? 'Sospetto' : 'Concomitante';
}

/**
  *Helper del ruolo
  *@augments Ember/Helper
  *@argument fullRole {String}
  */
export default Ember.Helper.helper(fullRole);
