///<reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'aws-nextjs-resume',
      providers: {
        aws: {
          profile:
            input.stage === 'production' ? 'Master-production' : 'Master-dev',
        },
      },
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket('MyBucket', {
      access: 'public',
    });
    new sst.aws.Nextjs('MyWeb', {
      link: [bucket],
      domain: {
        name: 'awsjameslo.com',
        cert: 'arn:aws:acm:us-east-1:503561410637:certificate/895c941f-82a2-470d-a594-cd90234efd2a',
      },
    });
  },
});
