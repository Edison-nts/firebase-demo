
// var admin = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

var db: any = undefined;

const firebaseConfig = {
    apiKey: "AIzaSyD1S08QLIVLSrM70zSQbNiPY_hmsKV9gQ4",
    authDomain: "condominio-garavelo.firebaseapp.com",
    projectId: "condominio-garavelo",
    storageBucket: "condominio-garavelo.firebasestorage.app",
    messagingSenderId: "400006734058",
    appId: "1:400006734058:web:21c91c4d21f12732f43793"
  };

class Firebase {

    openError: any = {};
     
    open() {

        if (db !== undefined)
            return;

        try {
            const app = initializeApp(firebaseConfig);
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
            // var colletions = await db.listCollections();
            // console.log('colletions:', colletions);

            const moradoresRef = db.collection('morador');
            var retorno = await moradoresRef.get();
            var moradores = retorno.docs.map((doc: any) => ({
                ...doc.data(),
                uid: doc.id
            }));
 
            return {moradores : moradores.docs};
        } catch (error: any) {
            return {error: error.message, origem: 'obterMoradores exception'};
        }
    }
}

const fireLib = new Firebase();

export default fireLib;