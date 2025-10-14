import { signUp, signIn, signOut, getCurrentUser } from 'aws-amplify/auth'

export interface SignUpParams {
  email: string
  password: string
  name: string
}

export interface SignInParams {
  email: string
  password: string
}

export const authService = {
  async signUp({ email, password, name }: SignUpParams) {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      })
      return { isSignUpComplete, userId, nextStep }
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  },

  async signIn({ email, password }: SignInParams) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      })
      return { isSignedIn, nextStep }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  async signOut() {
    try {
      await signOut()
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  },

  async getCurrentUser() {
    try {
      const user = await getCurrentUser()
      return user
    } catch (error) {
      console.error('Get current user error:', error)
      return null
    }
  },
}
