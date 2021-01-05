import axios from 'axios';

const tmbdApi = axios.create();

const searchByText = async (text) => {
  const response = await tmbdApi.get(`https://api.themoviedb.org/3/search/movie?api_key=ec4a335860d941ce2837cd611504ab64&query=${text}`);
  return response;
}

const searchByGenre = (genres) => {
  console.log('genre');
}

export { searchByText, searchByGenre }