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
      defaultAuthMode: "userPool" as any,
    },
  },
  Storage: {
    S3: {
      bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
    },
  },
};

// Basic runtime validation to aid debugging misconfiguration
if (!process.env.NEXT_PUBLIC_AWS_USER_POOL_ID || !process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID) {
  // eslint-disable-next-line no-console
  console.warn(
    "Amplify Auth env vars are missing: check NEXT_PUBLIC_AWS_USER_POOL_ID and NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID"
  );
}
if (!process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT || !process.env.NEXT_PUBLIC_AWS_REGION) {
  // eslint-disable-next-line no-console
  console.warn(
    "Amplify API env vars are missing: check NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT and NEXT_PUBLIC_AWS_REGION"
  );
}

Amplify.configure(amplifyConfig);

export default amplifyConfig;
