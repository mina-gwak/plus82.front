export enum CommonResponseCode {
  SUCCESS = 'CMN-001',
  FAILED = 'CMN-002',
}

export enum AuthExceptionCode {
  TOKEN_NOT_FOUND = 'AE-001',
  EMAIL_NOT_CORRECT = 'AE-002',
  PW_NOT_CORRECT = 'AE-003',
  EXPIRED_TOKEN = 'AE-004',
  INVALID_TOKEN_TYPE = 'AE-005',
  INVALID_TOKEN = 'AE-006',
  DELETED_USER = 'AE-007',
}

export enum EmailVerificationCodeExceptionCode {
  TOO_MANY_REQUEST = 'EM-001',
  ALREADY_VERIFIED_CODE = 'EM-002',
  EXPIRED_CODE = 'EM-003',
}

export enum UserExceptionCode {
  ALREADY_USED_EMAIL = 'UE-001',
  NOT_VERIFIED_EMAIL = 'UE-002',
}

export enum InvalidInputValueExceptionCode {
  INVALID_INPUT_VALUE = 'IIV-001',
}

export enum ResourceNotFoundExceptionCode {
  EMAIL_VERIFICATION_CODE_NOT_FOUND = 'RNF-001',
  USER_NOT_FOUND = 'RNF-002',
  COUNTRY_NOT_FOUND = 'RNF-003',
}

export type ResponseCode =
  | CommonResponseCode
  | AuthExceptionCode
  | EmailVerificationCodeExceptionCode
  | UserExceptionCode
  | InvalidInputValueExceptionCode
  | ResourceNotFoundExceptionCode
