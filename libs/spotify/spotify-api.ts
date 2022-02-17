import { request } from 'http';
require('dotenv').config();

const authURL = 'https://accounts.spotify.com/api/token';

const authOptions = {
  method: 'POST',
  headers: {
    Authorization: `Basic ${new Buffer(
      `${process.env.SPOTIFY_CLIENT_ID} : ${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')}`,
  },
  form: {
    grant_type: 'client_credentials',
  },
  json: true,
};

export async function getSpotifyInfo({ link_type, uri }) {
  const res = await fetch(authURL, { ...authOptions });
  console.log(res);
}
