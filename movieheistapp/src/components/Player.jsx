// import React, { useEffect, useState } from "react";

// const Player = ({ movieVideos }) => {
//   const [trailerKey, setTrailerKey] = useState("");

//   useEffect(() => {
//     // Check if movieVideos is defined and has length
//     if (movieVideos && movieVideos.length > 0) {
//       // Find the first trailer available
//       const trailer = movieVideos.find((video) => video.type === "Trailer");

//       // Set the trailer key if found
//       if (trailer && trailer.key) {
//         setTrailerKey(trailer.key);
//       } else {
//         // If no trailer key is found, set it to null
//         setTrailerKey(null);
//       }
//     } else {
//       // If movieVideos is empty or undefined, set trailer key to null
//       setTrailerKey(null);
//     }
//   }, [movieVideos]);

//   return (
//     <div className="player-container">
//       {trailerKey ? (
//         <iframe
//           title="Trailer"
//           width="560"
//           height="315"
//           src={`https://www.youtube.com/embed/${trailerKey}`}
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//         ></iframe>
//       ) : (
//         <p>No trailer available</p>
//       )}
//     </div>
//   );
// };

// export default Player;
