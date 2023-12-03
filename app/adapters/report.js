import DS from 'ember-data';
import Ember from 'ember';
import RSVP from 'rsvp';
import {apikey_write, url_write} from './apikey';
const { Promise } = RSVP;
/**
  *Adapter dei report
  *
  *Adapter che si occupa dell'invio dei dati relativi al report al server
  *@augments DS/Adapter
  */
export default DS.Adapter.extend({

  defaultSerializer: 'report',

  /**
    funzione per recuperare tutti i record di tipo "report" dallo store
    @function
    @override
    @return {Promise}
  */
  findAll(store){
    return new Ember.RSVP.Promise(function(resolve, reject) {
      let report = store.peekAll('report');
      resolve(report);
    })
  },

  deleteRecord(store, type, snapshot){
    return true;
  },

  /**
    metodo per inviare il record al server, viene chiamato dal metodo save() e richiama il serializer
    @function
    @override
    @return {Promise}
  */             



  createRecord(store, type, snapshot){
    var report = this.get('store').peekAll('report');
    var modello = report.toArray()[0];
    if(modello == undefined || modello.get('step') == 1){
      let ls = store.peekAll('localstorage').toArray()[0];
      return ls.save();
    }else if(modello.get('step') != 6){
      let ls = store.peekAll('localstorage').toArray()[0];
      return ls.save();
    }else{
        function createCORSRequest(method, url){
              var xhr = new XMLHttpRequest();
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
              return xhr;
            }
      let data = this.serialize(snapshot);

      //return new Promise(function(resolve, reject){

        return new Promise(function(resolve, reject){
        // a ogni cambiamento di stato viene chiamata la funzione alertContents()
                var method = 'POST';
        var url = url_write + "submit";
        var xhr = createCORSRequest('POST', url);

        if(!xhr){
          alert('CORS not supported');
          return null;
        }
        console.log(xhr);
        xhr.onreadystatechange = alertContents;
        xhr.setRequestHeader("Vigifarmaco-Api-Key", apikey_write);
        xhr.setRequestHeader("Content-type" , "text/xml");
        xhr.send(data);



        /*
           funzione che risolve la promessa con la risposta in XML se lo stato è 200
           altrimenti la rigetta con l'errore inviato dal server
        */
        function alertContents() {
          if (this.readyState == 4){
            if(this.status == 200){
                resolve(this.response);
              }

            else{
              reject(xhr.responseXML.getElementsByTagName('errors')[0].children[0].firstChild.nodeValue);
            }
          }
        }


            });
        }
      }

    });
