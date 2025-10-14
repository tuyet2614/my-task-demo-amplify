# Setup Commands for My Tasks Demo

## Quick Setup

```bash
# 1. Navigate to project directory
cd my-tasks-demo

# 2. Install dependencies
npm install

# 3. Initialize Amplify (first time only)
npx ampx init

# 4. Add Amplify services
npx ampx add auth
npx ampx add api
npx ampx add storage

# 5. Deploy to AWS
npx ampx push

# 6. Start development server
npm run dev
```

## Environment Variables

After running `npx ampx push`, copy the generated environment variables to `.env.local`:

```bash
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_USER_POOL_ID=us-east-1_ABC123
NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID=client123
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT=https://abc123.appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_AWS_S3_BUCKET=mytasksdemo-storage
```

## Demo Flow

1. **Sign Up**: Create new account
2. **Email Verification**: Check email for verification code
3. **Sign In**: Login with verified account
4. **Create Tasks**: Add new tasks
5. **Manage Tasks**: Mark as done, delete tasks
6. **Upload Files**: Upload avatar in profile
7. **Sign Out**: End session

## Troubleshooting

- Make sure AWS CLI is configured
- Check Amplify CLI version: `npx ampx --version`
- Verify environment variables are set correctly
- Check AWS console for deployed resources
