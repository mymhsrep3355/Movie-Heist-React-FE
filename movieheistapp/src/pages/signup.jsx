import React, { useState } from "react";
import loginbg from "../assets/loginbg.jpg";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../global/Firebase";

import axios from "axios"; 
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import AppHeader from "../components/AppHeader";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  //   console.log(values);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previousVal) => ({
      ...previousVal,
      [name]: value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      navigate("/preference");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };
  
  const handleSignUpClick = async () => {
    try {
      const { email, password } = values;
      const response = await axios.post("http://localhost:7676/api/auth/signup", {
        email,
        password,
        preferences: [] //initailzied as an empty array
      },
      {
        withCredentials: true,
      }
      );
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const { userId } = response.data;
      console.log(response.data); //response from backend
      console.log(userId); //userId from response

      navigate("/preference", {state : {userId}});
      } catch (error) {
        console.error("Error during signup:", error.message);
        // setError("Email Already in Use");
    }
    onAuthStateChanged(firebaseAuth, (user) => { 
      if (user) navigate("/preference");
    });
  };
  return (
    <div className=" w-full h-screen">
      <div>
        <img
          className="sm:block absolute w-full h-screen object-cover"
          src={loginbg}
          alt=""
        />
        <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen" />
        <div className=" fixed w-full">
          <AppHeader login />
          <div className=" h-[520px] max-w-[500px] mx-auto bg-black/70 rounded-lg">
            <div className=" max-w-[330px] mx-auto py-14">
              <h1 className="flex font-sans text-3xl justify-start">Sign Up</h1>
              <form action="" className=" w-full flex flex-col py-4">
                <input
                  type="email"
                  name="email"
                  id=""
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  id=""
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <button
                  onClick={handleSignUpClick}
                  type="button"
                  className=" bg-red-700 py-3 my-3 font-sans"
                >
                  Sign Up
                </button>
                {error && <p className=" text-center text-red-500">{error}</p>}
                <div className="text-white justify-between items-center flex">
                  <p>
                    <input type="checkbox" className="mr-2" /> Remember me
                  </p>

                  <Link to="/help">Help?</Link>
                </div>
                <p className=" my-3">
                  <span className=" mr-2 text-sm text-sans-bold text-gray-600">
                    Already Have Account to Movie Heist?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className=" flex justify-center items-center bg-red-700 py-3 my-6 font-sans"
                >
                  <FaGoogle className=" mr-2"></FaGoogle>Sign Up With Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;


/* very import handle sigup code

  // const userCredential = await createUserWithEmailAndPassword(
  //       firebaseAuth,
  //       email,
  //       password
  //       );
        
  //       const user = userCredential.user;
        
  //       const db = getDatabase();
  //       const userRef = ref(db, `users/${user.uid}`);
  //       set(userRef, {
  //         email: user.email,
  //       });
        
    //     navigate("/preference");

*/




//old custom css styled page below


// import React, { useState } from "react";
// import styled from "styled-components";
// import Background from "../components/Background";
// import AppHeader from "../components/AppHeader";
// import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../global/Firebase";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { FaGoogle } from "react-icons/fa";
// import { getDatabase, ref, set } from "firebase/database";

// export default function SignUp() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   //   console.log(values);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setValues((previousVal) => ({
//       ...previousVal,
//       [name]: value,
//     }));
//   };
//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(firebaseAuth, provider);
//       navigate("/preference");
//     } catch (error) {
//       console.error("Error during Google sign-in:", error.message);
//     }
//   };

//   const handleJoinNowClick = () => {
//     setShowPassword(true);
//   };

//   // const handleSignUpClick = async () => {
//   //   try {
//   //     const { email, password } = values;

//   //     // Sign up the user using Firebase Authentication
//   //     const userCredential = await createUserWithEmailAndPassword(
//   //       firebaseAuth,
//   //       email,
//   //       password
//   //     );

//   //     // At this point, the user is signed up with Firebase

//   //     const user = userCredential.user;
//   //     const db = getDatabase();
//   //     const userRef = ref(db, `users/${user.uid}`);

//   //     // Here you're setting the user's email in the Firebase Realtime Database
//   //     set(userRef, {
//   //       email: user.email,
//   //     });

//   //     // Make a POST request to your Express server to store user data
//   //     const expressResponse = await fetch('http://127.0.0.1:5003/signup', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ email: user.email }),
//   //     });

//   //     if (expressResponse.ok) {
//   //       // User signed up successfully in both Firebase and Express
//   //       navigate("/preference");
//   //     } else {
//   //       console.error('Error during Express signup:', expressResponse.statusText);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error during signup:', error.message);
//   //   }
//   // };

//   const handleSignUpClick = async () => {
//     try {
//       const { email, password } = values;

//       const userCredential = await createUserWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );

//       const user = userCredential.user;

//       const db = getDatabase();
//       const userRef = ref(db, `users/${user.uid}`);
//       set(userRef, {
//         email: user.email,
//       });

//       navigate("/preference");
//     } catch (error) {

//       console.error("Error during signup:", error.message);
//     }
//   };

//   // const handleSignUpClick = async () => {
//   //   try {
//   //     const { email, password } = values;
//   //     await createUserWithEmailAndPassword(firebaseAuth, email, password);
//   //     // navigate("/login");
//   //   } catch (error) {}
//   // };
//   // onAuthStateChanged(firebaseAuth, (user) => {
//   //   if (user) navigate("/home");
//   // });

//   return (
//     <ContainerMain showPassword={showPassword}>
//       <Background />
//       <div className="screenItems">
//         <AppHeader login />
//         <div className="body flex direction_column align-center justify-center">
//           <div className="text flex justify-center direction_column">
//             <h1>Welcome! To Movie Heist</h1>
//             <h2>Enjoy Immersive Content & Authenticity</h2>
//           </div>
//           <div className="signUpForm">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//             />
//             {showPassword && (
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//               />
//             )}
//             <div>
//               {!showPassword && (
//                 <button
//                   className="formBtn"
//                   onClick={handleJoinNowClick}
//                   type="button"
//                 >
//                   Join Now
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="loginbtn">
//             <button onClick={handleSignUpClick} type="button">
//               Sign Up
//             </button>
//           </div>
//           <div className="google">
//             <button onClick={handleGoogleSignIn} className="googlebtn "type="button">
//               <FaGoogle></FaGoogle>SignUp with Google
//               </button>
//           </div>
//         </div>
//       </div>
//     </ContainerMain>
//   );
// }

// const ContainerMain = styled.div`
//   position: relative;

//   .screenItems {
//     height: 100vh;
//     position: absolute;
//     width: 100vw;
//     top: 0;
//     left: 0;
//     display: grid;
//     grid-template-rows: 15vh 85vh;
//     background-color: rgba(0, 0, 0, 0.6);

//     .body {
//       gap: 2rem;

//       .text {
//         align-items: center;
//         justify-content: center;
//         color: white;
//         gap: 1rem;
//         text-align: center;
//         font-size: 1.5rem;
//       }

//       .signUpForm {
//         width: 50%;
//         display: grid;
//         grid-template-columns: ${({ showPassword }) =>
//           showPassword ? "1fr 1fr" : "2fr 1fr"};

//         input {
//           background-color: #0d0707;
//           color: white;
//           border: 0.9px solid black;
//           &:focus {
//             outline: none;
//           }
//           padding: 1rem;
//           font-size: 0.9rem;
//           margin: auto;
//           width: 100%;
//         }

//         .formBtn {
//           justify-content: center;
//           align-items: center;
//           padding: 1rem;
//           width: 12rem;
//           background-color: red;
//           color: white;
//           border: none;
//           cursor: pointer;
//           font-size: 17;
//           border-radius: 7px;
//         }
//       }

//       button {
//         justify-content: center;
//         align-items: center;
//         padding: 1rem;
//         width: 7rem;
//         background-color: red;
//         color: white;
//         border: none;
//         cursor: pointer;
//         font-size: 17;
//         border-radius: 7px;
//       }
//       .googlebtn{
//         display: flex;
//         justify-content: space-between;
//         justify-content: center;
//         align-items: center;
//         padding: 1rem;
//         gap: 0.5rem;
//         width: 12rem;
//         background-color: white;
//         color: black;
//         border: none;
//         cursor: pointer;
//         font-size: 17;
//         border-radius: 7px;
//       }
//     }
//   }
// `;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../global/Firebase";
// import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { FaGoogle } from "react-icons/fa";
// import { getDatabase, ref, set } from "firebase/database";
// import Background from "../components/Background";
// import AppHeader from "../components/AppHeader";
// export default function SignUp() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setValues((previousVal) => ({
//       ...previousVal,
//       [name]: value,
//     }));
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(firebaseAuth, provider);
//       navigate("/preference");
//     } catch (error) {
//       console.error("Error during Google sign-in:", error.message);
//     }
//   };

//   const handleJoinNowClick = () => {
//     setShowPassword(true);
//   };

//   const handleSignUpClick = async () => {
//     try {
//       const { email, password } = values;
//       const userCredential = await createUserWithEmailAndPassword(
//         firebaseAuth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       const db = getDatabase();
//       const userRef = ref(db, `users/${user.uid}`);
//       set(userRef, {
//         email: user.email,
//       });
//       navigate("/preference");
//     } catch (error) {
//       console.error("Error during signup:", error.message);
//     }
//   };

//   return (
//     <div className="relative">
//       <Background />
//       <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-60">
//         <AppHeader login />
//         <div className="flex flex-col items-center justify-center gap-4 text-white">
//           <div className="text-center">
//             <h1 className="text-3xl font-bold">Welcome! To Movie Heist</h1>
//             <h2>Enjoy Immersive Content & Authenticity</h2>
//           </div>
//           <div className="w-1/2">
//             <input
//               type="email"
//               placeholder="Email Address"
//               name="email"
//               value={values.email}
//               onChange={handleChange}
//               className="bg-gray-800 text-white w-full px-4 py-2 rounded-md focus:outline-none"
//             />
//             {showPassword && (
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 className="bg-gray-800 text-white w-full px-4 py-2 mt-2 rounded-md focus:outline-none"
//               />
//             )}
//             {!showPassword && (
//               <button
//                 onClick={handleJoinNowClick}
//                 type="button"
//                 className="bg-red-600 text-white px-4 py-2 mt-2 rounded-md focus:outline-none"
//               >
//                 Join Now
//               </button>
//             )}
//           </div>
//           <div>
//             <button
//               onClick={handleSignUpClick}
//               type="button"
//               className="bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none"
//             >
//               Sign Up
//             </button>
//           </div>
//           <div>
//             <button
//               onClick={handleGoogleSignIn}
//               className="flex items-center bg-white text-black px-4 py-2 rounded-md focus:outline-none"
//               type="button"
//             >
//               <FaGoogle className="mr-2" />
//               SignUp with Google
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
