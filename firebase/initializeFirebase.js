import firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyCSWXbrT_iNNDUpjAHfo0dsq5Ow_Aagszk',
  authDomain: 'fluxoviva.firebaseapp.com',
  databaseURL: 'https://fluxoviva.firebaseio.com',
  projectId: 'fluxoviva',
  storageBucket: 'fluxoviva.appspot.com',
  messagingSenderId: '5549515426'
}

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app())
