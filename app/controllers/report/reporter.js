import Ember from 'ember';
//import {apikey_g_maps} from '../../adapters/apikey'
const {
  Controller
} = Ember;

var controller;

/**
  *Funzione che analizza, tramite le GoogleAPIs, la posizione e ritorna la regione
  *@function getRegion
  *@argument position
  */



function getRegion(position) {
  let i;
  let latlng = position.coords.latitude + ", " + position.coords.longitude;

  let url =   "https://maps.googleapis.com/maps/api/geocode/xml?latlng=" + latlng + "&sensor=false";

  var request = new XMLHttpRequest();
  request.open("GET", url, true);  // deprecation
  request.timeout= 3000;
  request.onload = function() {

  var xml = request.responseXML;
  console.log(xml);
  let address_component = xml.getElementsByTagName("address_component");
  for(i = 0; i< address_component.length; i++){
    /*administrative_area_level_1 indica la regione*/
    if(address_component[i].getElementsByTagName("type")[0].childNodes[0].data == "administrative_area_level_1"){
      let tag_region = address_component[i].getElementsByTagName("long_name");
      let regione = tag_region[0].childNodes[0].data;

      /*Se la regione è trentino seleziona la provincia*/
      if(regione == "Trentino-Alto Adige"){
        tag_region = address_component[i-1].getElementsByTagName("long_name");
        regione = tag_region[0].childNodes[0].data;
      }

      /*necessario perchè in Google le regioni hanno '-' come separatore di parole, mentre in AIFA ha ' '*/
      regione = regione.replace("-", " ");

      controller.send("setLocation", regione);
      break; 
    }
  }
  
  };

  request.ontimeout = function(e){
    console.log(e.getMessage());
  }

  request.send();

}
/**
*azione che stampa l'errore di geolocalizzazione
*/
function errore( err){
  console.warn(err.message);
}

/**
  *Controller associato alla route e al template "reporter"
  *
  *Controller che gestisce le action dello step "reporter"
  *@augments Ember/Controller
  */
export default Controller.extend({
  // -------------------------------------------------------------------------
  // Actions

  /** @type {Object} */
  actions:{
    /**
      *azione che setta l'elemento corrispondente al campo selezionato
      *@function actions:setElement
      *@argument name
      */
    setElement(name){
      let select = document.getElementById(name);
      this.get('model').reports.set(name, select.value);

      // quando la regione cambia la struttura sanitaria viene impostata a null
      if(name == "region_id" && select.value != this.get('model').reports.region_id){
        this.get('model').reports.set('healthcare_structure_id', null);
      }

    },
    /**
      *azione che ritorna la geolocation
      *@function actions:getLocation
      */
    getLocation(){
      controller = this;
      var x = document.getElementById("location");
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getRegion, errore);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
    },

    /**
      *azione che setta la regione dal nome
      *@function actions:setLocation
      *@argument name
      */
    setLocation(name){
      let zona;
      if(name == "Provincia di Trento"){
        zona = "042";
      }else if(name == "Provincia di Bolzano") {
        zona = "041";
      } else {
        let zone = this.get('model').regions.toArray();
        let i;
        for(i = 0; i < zone.length; i++){
          if(zone[i].get("name") == name){
            zona = zone[i].get("aifa");
          }
        }
      }
      this.get('model').reports.set("region_id", zona);
    },
    /**
      *Funzione di identificazione del campo che genera un errore nelle validazioni del model
      *@function action:identifyError
      *@argument name
      */
    identifyError(name){
      let error = document.getElementById('reporter-error');
      switch(name) {
          case 'reporter_email':
            error.innerHTML = 'Inserire una email.';
            break;
          case 'reporter_email_valid':
            error.innerHTML = 'Email non valida.';
          break;
          case 'reporter_name':
            error.innerHTML = 'Inserire un nome.';
            break;
          case 'reporter_surname':
            error.innerHTML = 'Inserire un cognome';
            break;
          case 'reporter_phone_fax':
            error.innerHTML = 'Recapito telefonico non valido';
            break;
          case 'region_id':
            error.innerHTML = 'Selezionare regione';
            break;
          case 'healthcare_structure_id':
            error.innerHTML = 'Selezionare struttura sanitaria';
            break;
          default:
            error.innerHTML = name;
            break;
      }

      error.style.display="block";
    }


}



});
