import axios from 'axios';

const tmbdApi = axios.create();

const searchByText = async (text) => {
  const moviesResponse = await tmbdApi.get(`https://api.themoviedb.org/3/search/movie?api_key=ec4a335860d941ce2837cd611504ab64&query=${text}`);
 
  const movies = moviesResponse.data.results;
  
  return await Promise.all(movies.map( async (movie) => {
    
    const imagesResponse = await tmbdApi.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=ec4a335860d941ce2837cd611504ab64`);
  
    const images = imagesResponse.data.backdrops;

    let imageUrl = `https://image.tmdb.org/t/p/w300/3Rfvhy1Nl6sSGJwyjb0QiZzZYlB.jpg`
    if(images.length > 0)
      imageUrl = `https://image.tmdb.org/t/p/w300/${images[0].file_path}`;

    const modifiedMovie = {
      id: movie.id,
      imageUrl: imageUrl,
      name: movie.title,
      synopsis: movie.overview,
    };

    return modifiedMovie;
  }));
}

const searchByGenre = (genres) => {
  console.log('genre');
}

export { searchByText, searchByGenre }