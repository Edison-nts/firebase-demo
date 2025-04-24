
// var admin = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

var serviceAccount = require("./condominio-data.json");
var db: any = undefined;

class Firebase {

    openError: any = {};
     
    open() {

        if (db !== undefined)
            return;

        try {
            const app = initializeApp({
                credential: cert(serviceAccount)
            });
            // const db = getFirestore(app, "garavelo-teste");
            db = getFirestore(app, "garavelo-teste");
        } catch (error: any) {
            this.openError = {error: error.message}
        }
    }

    async obterMoradores () {
        try {
            if (db === undefined) {
                this.open();
            }
            if (db === undefined) {
                return {error: 'abertura do db falhou, db [NULL]'}
            }
            var colletions = await db.listCollections();
            console.log('colletions:', colletions);

            const moradoresRef = db.collection('morador');
            var moradores = await moradoresRef.get();
 
            return {moradores, colletions};
        } catch (error: any) {
            return {error: error.message, origem: 'obterMoradores exception'};
        }
    }
}

const fireLib = new Firebase();

export default fireLib;