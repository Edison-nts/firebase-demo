
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
        return await this.obterLista('morador', undefined);
    }

    async obterLista(collection: string, query: any) {
        try {
            if (db === undefined) {
                this.open();
            }
            if (db === undefined) {
                return {sucesso: false, mensagem: 'abertura do db falhou, db [NULL]'}
            }

            const ref = db.collection(collection);
            var response = query === undefined ? await ref.get() : await ref.query(query).get();

            if (response.empty) {
                return {sucesso: false, mensagem: 'nenhum registro encontrado'}
            }

            var docs:any[] = [];

            response.docs.forEach((doc: any) => {
                const data = doc.data();
                docs.push({id: doc.id, data})
            });

            return {sucesso: true, mensagem: 'OK', docs};

        } catch (error: any) {
            return {sucesso: false, mensagem: 'EXCEPTION:' + error.message};
        }
    }
}

const fireLib = new Firebase();

export default fireLib;