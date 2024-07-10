import React, { useEffect, useState } from "react";
 import "./Row.css";
import axios from '../../utils/axios';
 import movieTrailer from "movie-trailer";
  import YouTube from "react-youtube";

 const Row = ({ title, fetchUrl, isLargeRow }) => {
   const [movies, setMovie] = useState([]);
   const [trailerUrl, setTrailerUrl] = useState("");

   const base_url = "http://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
       try {
         console.log(fetchUrl);
         const request = await axios.get(fetchUrl);
        console.log(request);
        setMovie(request.data.results);
      } catch (error) {
        console.log("Error", error);
       }
     })();
  }, [fetchUrl]);

   const handleClick = (movie) => {
     if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          console.log(url);
         const urlParams = new URLSearchParams(new URL(url).search);
        console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
         })
        .catch((error) => {
            console.log("Error:", error)
       })
     }
  };

   const opts = {
    height: "300",
    width: "100%",
   playerVars: {
      autoplay: 1,
     },
   };

 return (
     <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
             onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
             }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
      ))}
      </div>
       <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
       </div> 
     </div>
   );
 };

 export default Row;

















// import React, { useEffect, useState } from "react";
// import "./Row.css";
//  import axios from "../../../Utils/axios";
//  import movieTrailer from "movie-trailer";
// import YouTube from "react-youtube";

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const [movies, setMovie] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const base_url = "http://image.tmdb.org/t/p/original";

//   useEffect(() => {
//     (async () => {
//       try {
//         console.log(fetchUrl);
//         const request = await axios.get(fetchUrl);
//         console.log(request);
//         setMovie(request.data.results);
//       } catch (error) {
//         console.log("Error", error);
//       }
//     })();
//   }, [fetchUrl]);

//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.title || movie?.name || movie?.original_name)
//         .then((url) => {
//           console.log(url);
//           const urlParams = new URLSearchParams(new URL(url).search);
//           console.log(urlParams);
//           setTrailerUrl(urlParams.get("v"));
//           console.log(urlParams.get("v"));
//         })
//         .catch((error) => {
//           console.log("Error:", error);
//         });
//     }
//   };

//   const opts = {
//     height: "300",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="row">
//       <h1>{title}</h1>
//       <div className="row_posters">
//         {movies?.map((movie, index) => (
//           <img
//             onClick={() => handleClick(movie)}
//             key={index}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//           />
//         ))}
//       </div>
//       <div style={{ padding: "40px" }}>
//         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//       </div>
//     </div>
//   );
// };

// export default Row;