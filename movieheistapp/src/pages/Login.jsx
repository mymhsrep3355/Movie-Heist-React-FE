import React, { useState } from "react";
import loginbg from "../assets/loginbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import AppHeader from "../components/AppHeader";
import { firebaseAuth } from "../global/Firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      //login using mongo

      const resp = await axios.post("http://localhost:7676/api/auth/login",{
        email,
        password
      });
      const {token, user} = resp.data;  
      localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      toast.success("Login Success");
    } catch (error) {
      //error
      console.log("Error during login:", error.message);
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) navigate("/");
  });

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(firebaseAuth, provider);
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      toast.error("Error during Google sign-in");
    }
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
          <AppHeader login={false} />
          <div className=" mt-3 h-[510px] max-w-[480px] mx-auto bg-black/70 rounded-lg">
            <div className=" max-w-[330px] mx-auto py-9">
              <h1 className="flex font-sans text-3xl justify-start">Sign In</h1>
              <form action="/home" className="w-full flex flex-col py-3">
                <input
                  type="email"
                  name="email"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <button type="button"
                  onClick={handleLoginClick}
                  className=" bg-red-700 py-3 my-6 font-sans"
                >
                  Sign In
                </button>
                {error && <p className=" text-center text-red-500">{error}</p>}
                <div className="text-white justify-between items-center flex">
                  <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </p>

                  <Link to="/help">Help?</Link>
                </div>
                <p className=" my-3">
                  <span className=" mr-2 text-sm text-sans-bold text-gray-600">
                    Don't have an account?
                  </span>
                  <Link to="/signup">Sign Up</Link>
                </p>
                <button type="button" onClick={handleGoogleSignIn} className=" flex justify-center items-center bg-red-700 py-3 my-6 font-sans">
                  <FaGoogle className=" mr-2"></FaGoogle>Sign In With Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;

//old custom css styled page below


// import React, { useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom"; // Add this import
// import Background from "../components/Background";
// import AppHeader from "../components/AppHeader";
// import { useNavigate } from "react-router-dom";
// import { firebaseAuth } from "../global/Firebase";
// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLoginClick = async () => {
//     try {
//       await signInWithEmailAndPassword(firebaseAuth, email, password);
//       // If login is successful, navigate to home
//       navigate("/home");
//     } catch (error) {
//       // If login fails, display an error message
//       setErrorMessage("Invalid email or password");
//     }
//   };

//   onAuthStateChanged(firebaseAuth, (user) => {
//     if (user) navigate("/home");
//   });

//   return (
//     <ContainerMain>
//       <Background />
//       <div className="screenItems">
//         <AppHeader login={false} />
//         <div className="containerForm flex direction_column align-center justify-center">
//           <div className="form flex justify-center direction_column">
//             <div className="title">
//               <h3>LogIn</h3>
//             </div>
//             <div className="container flex direction_column">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 name="email"
//                 onChange={(event) => setEmail(event.target.value)}
//                 value={email}
//               />
//               <br />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 name="password"
//                 onChange={(event) => setPassword(event.target.value)}
//                 value={password}
//               />
//               {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
//               <button onClick={handleLoginClick}>Log In</button>
//               <Link style={{textAlign:'center', marginTop:'0.9rem',color:'red'}} to="/forgot-password">Forgot Password?</Link>

//             </div>
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

//     .containerForm {
//       height: 85vh;
//       gap: 2rem;

//       .form {
//         align-items: center;
//         padding: 1.5rem;
//         width: 50vw;
//         gap: 1.5rem;
//         color: white;
//         justify-content: center;
//         background-color: rgba(0, 0, 0, 0.6);

//         input {
//           padding: 1rem 1rem;
//           width: 25rem;
//         }

//         button {
//           justify-content: center;
//           align-items: center;
//           padding: 1rem 1rem;
//           width: 10rem;
//           background-color: #de101b;
//           color: white;
//           border: none;
//           cursor: pointer;
//           font-size: 17;
//           border-radius: 7px;
//           margin: auto;
//           margin-top: 25px;
//         }
//       }
//     }
//   }
// `;

// const ErrorText = styled.div`
//   color: #ff0000;
//   margin-top: 2px;
//   font-size: 14px;
//   text-align: center;
// `;
