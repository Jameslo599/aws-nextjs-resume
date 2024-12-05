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
    });
  },
});
