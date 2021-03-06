import * as sst from '@serverless-stack/resources';

export default class Metadata extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, 'Api', {
      routes: {
        'POST /': 'src/lambda.handler',
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
    });
  }
}
