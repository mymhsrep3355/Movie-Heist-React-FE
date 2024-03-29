import React, { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../global/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { IoIosArrowBack } from "react-icons/io";

import logo from "../assets/Movieheist.png";
import AppNavigation from "./AppNavigation";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleResetClick = async () => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      setResetSent(true);
      setErrorMessage("");
    } catch (error) {
      setResetSent(false);
      setErrorMessage(
        "Error sending reset email. Please check your email address Properly."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <img className=" ml-5 size-40" src={logo} alt="" />
        <div className="flex justify-between items-center mr-9">
          <div className="flex">
            <Link
              to="/login"
              className=" capitalize pr-4 bg-red-600 px-5 py-3 rounded-lg"
              onClick={() => {
                signOut(firebaseAuth);
              }}
            >
              LOG OUT
            </Link>
          </div>
        </div>
      </div>
      {resetSent ? (
        <>
          <div className=" w-full h-[250px] m-auto flex justify-center items-center">
            <p className="flex">
              Password reset email sent. Please check your email and follow the
              instructions.
            </p>
          </div>
          <div className=" w-full h-full m-auto flex justify-center items-center">
            <Link
              className="flex items-center capitalize pr-4 bg-red-600 px-5 py-3 rounded-lg"
              to="/login"
              onClick={() => {
                signOut(firebaseAuth);
              }}
            >
              <IoIosArrowBack className="" /> Logout and Back to Login
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className=" h-[450px] max-w-[500px] mx-auto bg-slate-900/45 rounded-lg">
            <div className=" max-w-[330px] mx-auto py-14">
              <h1 className="flex font-sans text-3xl justify-start">
                Forgot Password
              </h1>
              <div className=" w-full flex flex-col py-4">
                <p className=" flex my-3">
                  <span className=" mr-2 text-sm text-sans-bold text-gray-600">
                    Enter your email address to receive password reset link
                  </span>
                </p>
                <input
                  type="email"
                  className=" p-3 my-2 bg-gray-600 rounded"
                  placeholder="email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
                {errorMessage && { errorMessage }}
                <button
                  onClick={handleResetClick}
                  className=" bg-red-700 py-3 my-3 font-sans"
                >
                  Get Reset Link
                </button>
                <div className="text-white justify-between items-center flex">
                  <div>
                    <Link to="/help">Help?</Link>
                  </div>
                  <Link
                    className="flex justify-center items-center"
                    to={loggedIn ? "/" : "/login"}
                  >
                    <IoIosArrowBack />{" "}
                    {loggedIn ? "Back to Home" : "Back to Login"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { firebaseAuth } from "../global/Firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { signOut, onAuthStateChanged } from "firebase/auth";
// import { IoIosArrowBack } from "react-icons/io";

// import logo from "../assets/Movieheist.png";
// import AppNavigation from "./AppNavigation";

// export default function ForgotPassword() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [resetSent, setResetSent] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
//       setLoggedIn(!!user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleResetClick = async () => {
//     try {
//       await sendPasswordResetEmail(firebaseAuth, email);
//       setResetSent(true);
//       setErrorMessage("");
//     } catch (error) {
//       setResetSent(false);
//       setErrorMessage(
//         "Error sending reset email. Please check your email address."
//       );
//     }
//   };

//   return (
//     <Container>
//       <div className="flex direction_column align-center justify-center">
//         <img className="logo" src={logo} alt="" />
//       </div>
//       <div className="title">
//         <h3>Forgot Password</h3>
//       </div>
//       {resetSent ? (
//         <>
//           <p style={{ marginTop: "1.9rem" }}>
//             Password reset email sent. Please check your email and follow the
//             instructions.
//           </p>
//           <div style={{ marginTop: "2rem" }}>
//           <Link
//         style={{ color: "red" }}
//         to="/login"
//         onClick={() => {
//           signOut(firebaseAuth);
//         }}
//       >
//         <IoIosArrowBack /> Logout and Back to Login
//       </Link>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="containerForm flex direction_column align-center justify-center">
//             <div className="form flex justify-center direction_column">
//               <p>Enter your email address to receive a password reset link.</p>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 onChange={(event) => setEmail(event.target.value)}
//                 value={email}
//               />
//               {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
//               <button onClick={handleResetClick}>Reset Password</button>
//               <div>
//                 <Link
//                   style={{ color: "red" }}
//                   to={loggedIn ? "/home" : "/login"}
//                 >
//                   <IoIosArrowBack />{" "}
//                   {loggedIn ? "Back to Home" : "Back to Login"}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
//   .title {
//     font-size: 1.5rem;
//   }
//   .logo {
//     height: 15rem;
//   }
//   .containerForm {
//     height: 85vh;
//     gap: 2rem;

//     .form {
//       align-items: center;
//       padding: 1.5rem;
//       width: 50vw;
//       gap: 1.5rem;
//       color: white;
//       justify-content: center;
//       background-color: rgba(0, 0, 0, 0.6);

//       input {
//         padding: 1rem 1rem;
//         width: 25rem;
//       }

//       button {
//         justify-content: center;
//         align-items: center;
//         padding: 1rem 1rem;
//         width: 10rem;
//         background-color: #de101b;
//         color: white;
//         border: none;
//         cursor: pointer;
//         font-size: 17;
//         border-radius: 7px;
//         margin: auto;
//         margin-top: 25px;
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
