# My Tasks Demo - AWS Amplify API Backend

A simple task management application demonstrating AWS Amplify API Backend capabilities.

## 🎯 Demo Features

- ✅ **Authentication**: User registration, login, and session management with AWS Cognito
- ✅ **GraphQL API**: CRUD operations with AWS AppSync and DynamoDB
- ✅ **File Storage**: Upload and manage files with AWS S3
- ✅ **Real-time Ready**: Built for future real-time features

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: AWS Amplify
- **Database**: DynamoDB (via AppSync)
- **Authentication**: Cognito User Pool
- **Storage**: S3 Bucket
- **API**: GraphQL (AppSync)

## 📁 Project Structure

```
my-tasks-demo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── login/             # Authentication pages
│   │   ├── signup/
│   │   ├── dashboard/         # Main app pages
│   │   ├── tasks/
│   │   └── profile/
│   ├── components/            # React components
│   │   ├── auth/             # Authentication components
│   │   ├── tasks/            # Task management components
│   │   └── FileUpload.tsx    # File upload component
│   ├── lib/                   # Core services
│   │   ├── amplify.ts        # Amplify configuration
│   │   ├── auth.ts          # Authentication service
│   │   ├── api.ts           # GraphQL API service
│   │   └── storage.ts       # S3 storage service
│   └── types/                # TypeScript types
├── amplify/                   # Amplify backend configuration
│   ├── backend/
│   │   ├── api/              # GraphQL API schema
│   │   ├── auth/             # Cognito configuration
│   │   └── storage/          # S3 configuration
│   └── cli.json
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd my-tasks-demo
npm install
```

### 2. Setup AWS Amplify
```bash
# Initialize Amplify project
npx ampx init

# Add Authentication
npx ampx add auth

# Add GraphQL API
npx ampx add api

# Add Storage
npx ampx add storage

# Deploy to AWS
npx ampx push
```

### 3. Configure Environment Variables
Copy the environment variables from Amplify output to `.env.local`:
```bash
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_AWS_USER_POOL_ID=us-east-1_ABC123
NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID=client123
NEXT_PUBLIC_AWS_APPSYNC_GRAPHQLENDPOINT=https://abc123.appsync-api.us-east-1.amazonaws.com/graphql
NEXT_PUBLIC_AWS_S3_BUCKET=mytasksdemo-storage
```

### 4. Run Development Server
```bash
npm run dev
```

## 🎯 Demo Script

### 1. **"Tôi sẽ tạo một task app trong 30 phút"**
- Show project structure
- Explain Amplify setup

### 2. **"Amplify setup chỉ với 3 commands"**
- `npx ampx init`
- `npx ampx add auth`
- `npx ampx add api`
- `npx ampx add storage`

### 3. **"GraphQL API tự động generate"**
- Show schema.graphql
- Demonstrate auto-generated CRUD operations
- Show DynamoDB tables

### 4. **"Authentication chỉ với 1 component"**
- Show LoginForm component
- Demonstrate Cognito integration
- Show user session management

### 5. **"File upload chỉ với 1 function"**
- Show FileUpload component
- Demonstrate S3 integration
- Show file management

## 📊 Database Schema

```graphql
type User @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  email: String!
  name: String!
  avatar: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Task @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
  description: String
  status: TaskStatus!
  attachment: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

enum TaskStatus {
  TODO
  DONE
}
```

## 🔧 Key Components

### Authentication Service
```typescript
// src/lib/auth.ts
export const authService = {
  async signUp({ email, password, name }),
  async signIn({ email, password }),
  async signOut(),
  async getCurrentUser(),
}
```

### GraphQL API Service
```typescript
// src/lib/api.ts
export const taskService = {
  async createTask(input: CreateTaskInput),
  async updateTask(input: UpdateTaskInput),
  async deleteTask(id: string),
  async listTasks(),
  async getTask(id: string),
}
```

### Storage Service
```typescript
// src/lib/storage.ts
export const storageService = {
  async uploadFile(file: File, key: string),
  async downloadFile(key: string),
  async deleteFile(key: string),
  async getFileUrl(key: string),
}
```

## 🎨 UI Components

- **LoginForm**: Email/password authentication
- **SignUpForm**: User registration with email verification
- **Dashboard**: Main app interface with task list
- **TaskList**: Display and manage tasks
- **TaskForm**: Create and edit tasks
- **FileUpload**: Upload files to S3
- **Profile**: User profile with avatar upload

## 🚀 Deployment

### Deploy to AWS
```bash
npx ampx push
```

### Deploy Frontend
```bash
npm run build
npm run start
```

## 💡 Demo Value

✅ **Simple**: Only 2 entities, basic CRUD operations
✅ **Complete**: Covers 3/4 Amplify components (Auth, API, Storage)
✅ **Real-world**: Practical task management use case
✅ **Educational**: Easy to understand and modify
✅ **Scalable**: Foundation for more complex features

## 🔮 Future Enhancements

- Real-time notifications with subscriptions
- File processing with Lambda functions
- Advanced search and filtering
- Task categories and tags
- Team collaboration features
- Mobile app with React Native

## 📚 Learning Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GraphQL Documentation](https://graphql.org/learn/)