import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBDDy5T4Uj2CIvQOirK45GmRKXv6i8YsJk",
  authDomain: "eshop-db-b6555.firebaseapp.com",
  databaseURL: "https://eshop-db-b6555.firebaseio.com",
  projectId: "eshop-db-b6555",
  storageBucket: "eshop-db-b6555.appspot.com",
  messagingSenderId: "1030438523372",
  appId: "1:1030438523372:web:57a78b0f0d3fa6d38a30c9",
  measurementId: "G-WCZGHMWVTD"
};

firebase.initializeApp(config);



export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch()
    
    objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set (newDocRef,obj);
    });

    return await batch.commit();
};


export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const {title , items} = doc.data();
    
        return {
            routeName: encodeURI (title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    // return transformedCollections;

    return transformedCollections.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
      }, {}
    );
};


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
