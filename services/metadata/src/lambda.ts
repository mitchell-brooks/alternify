import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { getSpotifyInfo } from '../lib/spotify';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const request = event?.body ? event.body : null;
  const data = getSpotifyInfo({
    media_type: 'track',
    URI: '2TpxZ7JUBn3uw46aR7qd6V',
  });
  //const data = event?.body ? getSpotifyInfo(JSON.parse(event.body)) : null;

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
