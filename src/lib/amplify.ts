import { Amplify } from "aws-amplify";

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID!,
      loginWith: {
        email: true,
        username: false,
        phone: false,
      },
      userAttributes: {
        email: {
          required: true,
        },
        name: {
          required: true,
        },
      },
    },
  },
  API: {
    GraphQL: {
      apiUrl: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT!,
      endpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT!,
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
      defaultAuthMode: "API_KEY" as any,
    },
  },
  Storage: {
    S3: {
      bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
    },
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;
