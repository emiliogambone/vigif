import DS from 'ember-data';

/**
  *Serializer degli strutture
  *
  *Serializer che fa il parsing della risposta del server da XML a JSON API
  *@augments DS/Serializer
  */
export default DS.Serializer.extend({

    /**
      funzione che fa il parsing della risposta del server da XML a JSON API
      @function
      @override
      @return {Object}
    */
  normalizeResponse(store, primaryModelClass, payload){
    var xmlDoc = payload;

    var json = {
      jsonapi: {
        version: "1.0"
       },
      data: [
      ]
    };


  var nomi= xmlDoc.getElementsByTagName('name');
  var code = xmlDoc.getElementsByTagName('aifa-code')
  for(var i=0; i<nomi.length; i++){

    json.data.push({"id":code[i].childNodes[0].nodeValue, "type":"structure", attributes:{"name":nomi[i].childNodes[0].nodeValue, "codice_azienda":code[i].childNodes[0].nodeValue.substring(3,6), "codice_regione":code[i].childNodes[0].nodeValue.substring(0,3)}});

  }


  return json;

}
});
