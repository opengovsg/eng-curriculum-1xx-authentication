import { customAlphabet } from 'nanoid'

import { OTP_LENGTH, OTP_PREFIX_LENGTH } from '~/validators/auth'

// Alphabet space with ambiguous characters removed.
const OTP_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const OTP_PREFIX_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ'

const createVfnToken = customAlphabet(OTP_ALPHABET, OTP_LENGTH)

export const createVfnPrefix = customAlphabet(
  OTP_PREFIX_ALPHABET,
  OTP_PREFIX_LENGTH,
)

const createTokenHash = (token: string, email: string) => {
  // TODO: Create a secure hash of the token
  // HINT: Use the appropriate `crypto` methods with the token and email as salt.
  return 'placeholder-hash'
}

export const isValidToken = ({
  token,
  email,
  hash,
}: {
  token: string
  email: string
  hash: string
}) => {
  // TODO: Implement token validation
  // HINT: Use appropriate `crypto` methods to compare the hashes securely
  return false
}

export const createAuthToken = (email: string) => {
  const token = createVfnToken()
  const hashedToken = createTokenHash(token, email)

  return {
    token,
    hashedToken,
  }
}
