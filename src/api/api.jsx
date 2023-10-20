import axios from "axios";

const apiKey = "bbf6f9dfb0527e901039ca82c8d74b56"
const baseUrl = "https://api.themoviedb.org/3"

export const getMovieList = async ()=>{
    const movie = await axios.get(`${baseUrl}/movie/popular?page=1&api_key=${apiKey}`)
     return movie.data.results
}


export const searchMovie = async (q)=>{
    const token = localStorage.getItem("token");

        const search = await axios.get(
          `https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${q}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(search)
        // const data = response.data.data;
        // setSearchResults(data);
        return search.data.data
}


