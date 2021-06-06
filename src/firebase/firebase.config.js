import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const config={
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  }

  firebase.initializeApp(config)

  export const auth= firebase.auth()
  export const firestore= firebase.firestore() 
  export const firebaseProvider=new firebase.auth.GoogleAuthProvider()
  
  firebaseProvider.setCustomParameters({prompt:'select_account'})
  export const signInWithGmail= ()=> {
    return auth.signInWithPopup(firebaseProvider)
  }
  export const signOutWithGmail = () => auth.signOut()

  export const createUserDoc= async (userAuth, data) =>{
    
    if(!userAuth)
        return
      const userRef= firestore.doc(`/users/${userAuth.uid}`)
      const fetchedData = await userRef.get()

      if(!fetchedData.exists){
        const { email,name,age } =data;
        const createdAt =new Date()
        
        try{
          const res=await userRef.set({
            email,
            name,
            age,
            createdAt,
            uid:userRef.id
          })
          return {
            email,
            name,
            age,
            createdAt,
            uid:userRef.id
          }
        }
        catch(error){
          
          alert('Error creating User')
          return null
        }
      }
  }

  export default firebase

