import axios from 'axios';

const API_KEY = 'c19c47264b0dfd0973d63aa54cb6788c';

export const getTopTracks = async (country) => {
  try {
    const response = await axios.get('https://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'geo.getTopTracks',
        country: 'italy', //country,
        api_key: API_KEY,
        format: 'json',
      },
    });
    return response.data.tracks.track;
  } catch (error) {
    console.error(error);
    return [];
  }
};
