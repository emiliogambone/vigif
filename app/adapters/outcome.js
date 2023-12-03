import DS from 'ember-data';
import RSVP from 'rsvp';
import {apikey_read, url_read} from './apikey';
const { Promise } = RSVP;
/**
  *Adapter degli esiti
  *
  *Adapter che recupera dal server i valori degli esiti di una reazione(outcome)
  *@augments DS/Adapter
  */
export default DS.Adapter.extend({

  defaultSerializer: 'outcome',

  /**
    funzione per recuperare i dati dal server
    @function
    @override
    @return {Promise}
  */
  findAll(){

    return new Promise(function(resolve,reject){
      let xhr = new XMLHttpRequest();
      var method = 'GET';
      var url = url_read + "outcomes";

      if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS not supported.
        xhr = null;
      }

      if (!xhr) {
        alert('CORS not supported');
        return;
      }

      // ogni volta che lo stato della connessione cambia viene chiamato il metodo alertContents()
      xhr.onreadystatechange = alertContents;
      xhr.setRequestHeader("Vigifarmaco-Api-Key", apikey_read);
      xhr.send();

      /*
         funzione che risolve la promessa con la risposta in XML se lo stato è 200
         altrimenti la rigetta con l'errore inviato dal server
      */
      function alertContents() {
        if (xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(this.responseXML);
          }
          else {
          reject(new Error('getOutcomes: `' + url + '` failed with status: [' + this.status + ']'+ 'failed with readyState:' + this.readyState+''));
          }
        }
      }

    });

  }

});
