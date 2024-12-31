///<reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'aws-nextjs-resume',
      region: 'us-east-1',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    // S3
    const bucket = new sst.aws.Bucket('MyBucket', {
      access: 'public',
    });

    // DynamoDB
    const visitorsTable = new sst.aws.Dynamo('visitors', {
      fields: {
        website: 'string',
        id: 'number',
        visitors: 'number',
      },
      primaryIndex: { hashKey: 'website', rangeKey: 'id' },
    });
    const ipTable = new sst.aws.Dynamo('ip', {
      fields: {
        ip_address: 'string',
        updated: 'string',
        name: 'string',
      },
      primaryIndex: { hashKey: 'ip_address' },
    });

    // Next.js
    new sst.aws.Nextjs('MyWeb', {
      link: [bucket, visitorsTable, ipTable],
      environment: {
        AWS_PROD_ACCESS_KEY_ID:
          process.env.AWS_PROD_ACCESS_KEY_ID ?? 'fallback',
        AWS_PROD_SECRET_ACCESS_KEY:
          process.env.AWS_PROD_SECRET_ACCESS_KEY ?? 'fallback',
        AWS_PROD_SESSION_TOKEN:
          process.env.AWS_PROD_SESSION_TOKEN ?? 'fallback',
      },
      domain: {
        name: 'awsjameslo.com',
        cert: process.env.AWS_ARN_CERTIFICATE,
      },
    });
  },
});

// Revert to profiles instead of env variables
// export default $config({
//   app(input) {
//     return {
//       name: 'aws-nextjs-resume',
//       providers: {
//         aws: {
//           profile:
//             input.stage === 'production' ? 'Master-production' : 'Master-dev',
//         },
//       },
//       removal: input?.stage === 'production' ? 'retain' : 'remove',
//       home: 'aws',
//     };
//   },
//   async run() {
//     const bucket = new sst.aws.Bucket('MyBucket', {
//       access: 'public',
//     });
//     new sst.aws.Nextjs('MyWeb', {
//       link: [bucket],
//       domain: {
//         name: 'awsjameslo.com',
//         cert: 'process.env.AWS_ARN_CERTIFICATE',
//       },
//     });
//   },
// });
