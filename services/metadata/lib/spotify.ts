import fetch from 'node-fetch';

interface IAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const authURL = 'https://accounts.spotify.com/api/token';
const apiBaseURL = 'https://api.spotify.com/v1/';
const body = new URLSearchParams();
body.append('grant_type', 'client_credentials');
body.append('client_id', process.env.SPOTIFY_CLIENT_ID);
body.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

const authOptions = {
  method: 'POST',
  body,
};

export async function getSpotifyInfo({
  media_type = 'track',
  URI = '2TpxZ7JUBn3uw46aR7qd6V',
}) {
  const reqURL = `${apiBaseURL}${media_type}s/${URI}`;
  console.log('about to send');
  const authRes = await fetch(authURL, { ...authOptions });
  console.log('auth responded');
  const { access_token } = (await authRes.json()) as IAuthResponse;
  console.log(':::access token', access_token);
  const reqOptions = { headers: { Authorization: `Bearer ${access_token}` } };
  console.log(':::reqOptions', reqOptions);
  const res = await fetch(reqURL, reqOptions);
  const parsedRes = await res.json();
  console.log(':::parsedRes', parsedRes);
  return parsedRes;
}
