import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAbft38alwTXN5Q67jvs74DhddRR0nCUCs",
    authDomain: "rnfirebXXX-XXXX.firebaseapp.com",
    databaseURL: "https://twinkkk.firebaseio.com/",
    projectId: "twinkkk",
    storageBucket: "rnfirebase-XXXX.appspot.com",
    messagingSenderId: "XXXXXXX"
  };
  
  export default class Firebase {
    static auth;
  
    static init() {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
      }
    }
  }
  