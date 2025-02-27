interface UserData {
  email: string
  name: string
  accessToken: string
}

export declare module 'next-auth' {
  interface User {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string
    refreshTokenExpiresAt: number
  }

  interface Session {
    accessToken: string
    error?: NewObject
    isExpired: boolean
  }
}
export declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpiresAt: number
    refreshToken: string
    refreshTokenExpiresAt: number
  }
}
