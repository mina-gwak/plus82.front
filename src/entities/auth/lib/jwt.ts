/* eslint-disable @typescript-eslint/no-explicit-any */

import jwt from 'jsonwebtoken'

export const decodeToken = (
  token: string,
): {
  valid: boolean
  decoded?: any
  error?: any
} => {
  try {
    // 토큰 디코딩
    const decoded = jwt.decode(token)

    // 디코딩 성공
    return { valid: true, decoded }
  } catch (error) {
    // 디코딩 실패
    console.log('Token decoding error:', error)

    return { valid: false, error }
  }
}
