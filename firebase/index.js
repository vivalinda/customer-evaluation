import './initializeFirebase'
import firebase from 'firebase/app'
import 'firebase/firestore'

const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
const fireTime = firebase.firestore.FieldValue.serverTimestamp()

db.settings(settings)

export { db, fireTime }
