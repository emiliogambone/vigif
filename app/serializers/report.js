import DS from 'ember-data';

/**
  *Serializer dei report
  *
  *Serializer che prepara un documento XML da inviare al server.
  *@augments DS/Serializer
  *@argument DS/EmbeddedRecordsMixin
  */
export default DS.Serializer.extend(DS.EmbeddedRecordsMixin, {
  /**
    *Funzione che crea il documento XML
    *
    *Ogni tag del documento XML deve essere creato tramite il metodo ".createElement" che prende come parametro il nome del tag;
    per aggiungere delle stringhe (i dati effettivi) si crea un TextNode, recuperando i dati dallo snapshot;
    dopo averlo creato, si seleziona il tag "padre"(.getElementsByTagName che ritorna un array e quindi si seleziona il primo valore [0]);
    con appendChild si inserisce il tag passato come parametro all'interno del tag "padre"
    *@function
    *@argument snapshot
    *@return {XMLdocument}
    */
  serialize(snapshot){
    var report = this.get('store').peekAll('report');
    var modello = report.toArray()[0];
    if(modello == undefined || modello.get('step') != 6){
      return this._super(snapshot);
    }else{
      var newEle, newText, append;

      var doc = (new DOMParser()).parseFromString('<Segnalazioni/>', 'text/xml');

      newEle = doc.createElement('Scheda_adr');
      append = doc.getElementsByTagName('Segnalazioni');
      append[0].appendChild(newEle);

      newEle = doc.createElement('eta');
      newText = doc.createTextNode(snapshot._attributes.patient_age);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      newEle = doc.createElement('eta_periodo');
      let eta_periodo = snapshot._attributes.patient_age_uom.toString();
      newText = doc.createTextNode(eta_periodo[0]);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      newEle = doc.createElement('sesso');
      newText = doc.createTextNode(snapshot._attributes.patient_sex);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      if(snapshot._attributes.adrs_start_date){
      newEle = doc.createElement('data_reazione');
      newText = doc.createTextNode(snapshot._attributes.adrs_start_date.substring(0,10));
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);
      }

      newEle = doc.createElement('descrizione_reazione');
      newText = doc.createTextNode(snapshot._attributes.adrs_description);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      newEle = doc.createElement('gravita_tutte_voci');
      if(snapshot._attributes.serious){
        newText = doc.createTextNode(snapshot._attributes.seriousness_criterium_id);
      } else {
        newText = doc.createTextNode("N");
      }
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      if(snapshot._attributes.outcome_id){
        newEle = doc.createElement('esito');
        newText = doc.createTextNode(snapshot._attributes.outcome_id);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('Scheda_adr');
        append[0].appendChild(newEle);
      }

 
        newEle = doc.createElement('fonte');
        newText = doc.createTextNode('1');
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('Scheda_adr');
        append[0].appendChild(newEle);
      

      newEle = doc.createElement('segnalatore');
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      newEle = doc.createElement('dati_segnalatore');
      append = doc.getElementsByTagName('segnalatore');
      append[0].appendChild(newEle);

      if(snapshot._attributes.reporter_name){
        newEle = doc.createElement('nome');
        newText = doc.createTextNode(snapshot._attributes.reporter_name);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('dati_segnalatore');
        append[0].appendChild(newEle);
      }

      newEle = doc.createElement('cognome');
      newText = doc.createTextNode(snapshot._attributes.reporter_surname);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('dati_segnalatore');
      append[0].appendChild(newEle);

      if(snapshot._attributes.reporter_phone_fax){
        newEle = doc.createElement('telefono_fax');
        newText = doc.createTextNode(snapshot._attributes.reporter_phone_fax);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('dati_segnalatore');
        append[0].appendChild(newEle);
      }

      newEle = doc.createElement('e_mail');
      newText = doc.createTextNode(snapshot._attributes.reporter_email);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('dati_segnalatore');
      append[0].appendChild(newEle);

      newEle = doc.createElement('codice_regione');
      newText = doc.createTextNode(snapshot._attributes.region_id);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('dati_segnalatore');
      append[0].appendChild(newEle);

      newEle = doc.createElement('az_sanitaria');
      newText = doc.createTextNode(snapshot._attributes.healthcare_structure_id);
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('dati_segnalatore');
      append[0].appendChild(newEle);

      newEle = doc.createElement('data_compilazione');
      newText = doc.createTextNode(snapshot._attributes.data_compilazione.toISOString().substring(0,10));
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

        if(snapshot._attributes.sender_notes){
        newEle = doc.createElement('commento_segnalatore');
        newText = doc.createTextNode(snapshot._attributes.sender_notes);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('Scheda_adr');
        append[0].appendChild(newEle);
      }


      newEle = doc.createElement('Classificazione');
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);  

      newEle = doc.createElement('tipo_segnalazione');
      //CAMBIARE "A" CON IL NOME CORRETTO
      newText = doc.createTextNode("1");
      newEle.appendChild(newText);
      append = doc.getElementsByTagName('Classificazione');
      append[0].appendChild(newEle);


      newEle = doc.createElement('Prodotti');
      append = doc.getElementsByTagName('Scheda_adr');
      append[0].appendChild(newEle);

      var treatment = snapshot.hasMany('treatments');
      for(var i=0; i < treatment.length; i++){
        newEle = doc.createElement('SM_PA');
        append = doc.getElementsByTagName('Prodotti');
        append[0].appendChild(newEle);

        newEle = doc.createElement('tipo_somministrazione');
        newText = doc.createTextNode(treatment[i]._attributes.role);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('SM_PA');
        append[i].appendChild(newEle);

        newEle = doc.createElement('farmaco');
        append = doc.getElementsByTagName('SM_PA');
        append[i].appendChild(newEle);

        newEle = doc.createElement('prodotto_medicinale');
        append = doc.getElementsByTagName('farmaco');
        append[i].appendChild(newEle);

        newEle = doc.createElement('nome_farmaco');
        newText = doc.createTextNode(treatment[i]._attributes.name);
        newEle.appendChild(newText);
        append = doc.getElementsByTagName('prodotto_medicinale');
        append[i].appendChild(newEle);

        if(treatment[i]._attributes.start_date){
          newEle = doc.createElement('data_inizio_terapia');
          newText = doc.createTextNode(treatment[i]._attributes.start_date.substring(0,10));
          newEle.appendChild(newText);
          append = doc.getElementsByTagName('SM_PA');
          append[i].appendChild(newEle);
        }

        if(treatment[i]._attributes.therapeutic_indication){
          newEle = doc.createElement('indicazione_terapeutica');
          append = doc.getElementsByTagName('SM_PA');
          append[i].appendChild(newEle);
          newEle = doc.createElement('descrizione');
          newText = doc.createTextNode(treatment[i]._attributes.therapeutic_indication);
          newEle.appendChild(newText);
          append = doc.getElementsByTagName('indicazione_terapeutica');
          append[append.length-1].appendChild(newEle);
        }

      }
      console.log(doc);
      return doc;
    }
  },

  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    return this.normalize(primaryModelClass, payload);
  },

  normalize(primaryModelClass, payload){
    var key;
    var xml = (new DOMParser()).parseFromString(payload, 'text/xml');
    var data = {};

    if(xml.getElementsByTagName('vigifarmaco-id')[0]){
      key = xml.getElementsByTagName('vigifarmaco-id')[0].childNodes[0].nodeValue;
      data = {
        id: key,
        type: 'primaryModelClass.modelName'
      }
    }
    return {data : data};
  }

  });
