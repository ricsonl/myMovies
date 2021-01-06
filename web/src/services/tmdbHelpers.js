import axios from 'axios';

const tmbdApi = axios.create();

const searchById = async (id) => {
  const movieResponse = await tmbdApi.get(`https://api.themoviedb.org/3/movie/${id}?api_key=ec4a335860d941ce2837cd611504ab64`);
  const movie = movieResponse.data;

  const imagesResponse = await tmbdApi.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=ec4a335860d941ce2837cd611504ab64`);
  const images = imagesResponse.data.backdrops;

  let imageUrl = `https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg`
  if(images.length > 0)
    imageUrl = `https://image.tmdb.org/t/p/w300/${images[0].file_path}`;
  
  const modifiedMovie = {
    tmdbId: id,
    imageUrl: imageUrl,
    name: movie.title,
    synopsis: movie.overview,
  }

  return modifiedMovie;
}

const searchByText = async (text) => {
  const moviesResponse = await tmbdApi.get(`https://api.themoviedb.org/3/search/movie?api_key=ec4a335860d941ce2837cd611504ab64&query=${text}`);
  const movies = moviesResponse.data.results;
  
  return await Promise.all(movies.map( async (movie) => {
    
    const imagesResponse = await tmbdApi.get(`https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=ec4a335860d941ce2837cd611504ab64`);
    const images = imagesResponse.data.backdrops;

    let imageUrl = `https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg`
    if(images.length > 0)
      imageUrl = `https://image.tmdb.org/t/p/w300/${images[0].file_path}`;

    const modifiedMovie = {
      tmdbId: movie.id,
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

export { searchById, searchByText, searchByGenre }