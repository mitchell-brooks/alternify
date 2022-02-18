import Metadata from './Metadata';
import * as sst from '@serverless-stack/resources';

export default function main(app: sst.App): void {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    environment: {
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    },
    runtime: 'nodejs14.x',
  });

  new Metadata(app, 'my-stack');

  // Add more stacks
}
