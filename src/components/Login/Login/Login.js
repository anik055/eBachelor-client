// import React, { useContext } from 'react';
// import firebase from "firebase/compat/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import jwt_decode from "jwt-decode";
// import firebaseConfig from './firebase.config';
// import { UserContext } from '../../../App';
// import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from '../../Shared/Navbar/Navbar';
// import LoginForm from './LoginForm';
// // import LoginBg from '../../../images/loginBg.png';

// const Login = () => {
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();



//   // let setLoggedInUser= {};
//   // console.log(useContext(UserContext));
//   const { setLoggedInUser} = useContext(UserContext) || {};
//   const history = useNavigate();
//   // console.log(useLocation());
//   // let location = useLocation();
//   // console.log(history);
//   // eslint-disable-next-line no-restricted-globals
//   const { from } = location.state || { from: { pathname: "/" } };

//   // if (firebase.apps.length === 0) {
//   //   firebase.initializeApp(firebaseConfig);
//   // }

//   const handleSignOut = () => {
//     return firebase
//         .auth()
//         .signOut()
//         .then(() => {
//             localStorage.removeItem('token');
//             const signedOutUser = {
//                 isSignedIn: false,
//                 userName: '',
//                 email: '',
//                 userPhoto: ''
//             }
//             return signedOutUser;
//         })
//         .catch(error => console.log(error.message))
// }

//   const setJWTToken = () => {
//     return firebase
//         .auth().currentUser
//         .getIdToken(true)
//         .then(idToken => {
//             localStorage.setItem('token', idToken)
//         })
//   }

//   // const handleGoogleSignIn = () => {
//   //   signInWithPopup(auth, provider)
//   //     .then((result) => {
//   //       // This gives you a Google Access Token. You can use it to access the Google API.
//   //       const credential = GoogleAuthProvider.credentialFromResult(result);
//   //       const token = credential.accessToken;
//   //       // The signed-in user info.
//   //       const { displayName, photoURL, email } = result.user;
//   //       const signedInUser = { image: photoURL, name: displayName, email };
//   //       // setLoggedInUser(signedInUser);
//   //       // storeAuthToken();
//   //       // setJWTToken(signedInUser);
//   //       history.push("/");
//   //       // ...
//   //     })
//   //     .catch((error) => {
//   //       // Handle Errors here.
//   //       const errorCode = error.code;
//   //       const errorMessage = error.message;
//   //       // The email of the user's account used.
//   //       const email = error.email;
//   //       // The AuthCredential type that was used.
//   //       const credential = GoogleAuthProvider.credentialFromError(error);
//   //       // ...
//   //     });
//   // }



//   // const handleGoogleSignIn = () => {
//   //   var provider = new firebase.auth.GoogleAuthProvider();
//   //   firebase.auth().signInWithPopup(provider).then(function (result) {
//   //     console.log(result);
//   //     const { displayName, photoURL, email } = result.user;
//   //     const signedInUser = {image: photoURL, name: displayName, email }
//   //     setLoggedInUser(signedInUser);
//   //     storeAuthToken();
//   //     setJWTToken(signedInUser);
//   //     history.push("/");
//   //   }).catch(function (error) {
//   //     const errorMessage = error.message;
//   //     console.log(errorMessage);
//   //   });
//   // }

//   // const storeAuthToken = () => {
//   //   auth.currentUser.getIdToken(/* forceRefresh */ true)
//   //     .then(function (idToken) {
//   //       sessionStorage.setItem('token', idToken);
//   //       // history.replace(from);
//   //     }).catch(function (error) {
//   //       // Handle error
//   //     });
//   // }

//   return (
//     <div className="login-page container">
//       {/* <Navbar></Navbar> */}
//       <LoginForm>

//       </LoginForm>


//     </div>
//   );
// };

// export default Login;

// export const getDecodedUser = () => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//       return {};
//   }
//   const { name, picture, email } = jwt_decode(token);
//   const decodedUser = {
//       isSignedIn: true,
//       name: name,
//       email: email,
//       photo: picture || "https://i.ibb.co/5GzXkwq/user.png"
//   }
//   console.log(decodedUser);
//   return decodedUser;
// }