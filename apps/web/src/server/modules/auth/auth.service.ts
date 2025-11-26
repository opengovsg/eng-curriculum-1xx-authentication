import { TRPCError } from '@trpc/server'
import { add } from 'date-fns/add'
import { format } from 'date-fns/format'

import { Prisma } from '@acme/db/client'

import { env } from '~/env'
import { getBaseUrl } from '~/utils/get-base-url'
import { sendMail } from '../mail/mail.service'
import { createAuthToken, createVfnPrefix } from './auth.utils'

/**
 * This function initiates the email login process. It:
 * 1. generates a secure random token,
 * 2. stores a hash of that token in the database along with when it is issued, along
 *    with the email it is associated with.
 * 3. Send the token to the user's email address, along with a 3 digit prefix to help
 *    them identify the correct email (in case they have multiple login attempts).
 *
 * @param email The email address of the user trying to login.
 * @returns An object containing the email and OTP prefix.
 */
export const emailLogin = async (email: string) => {
  const { token, hashedToken } = createAuthToken(email)

  const otpPrefix = createVfnPrefix()
  const url = new URL(getBaseUrl())

  // TODO: Store the hashed token, prefix, email, issuedAt timestamp in the database
  // TODO: `issuedAt` should come from the database record once the token is created
  const issuedAt = new Date()

  const expiry = add(issuedAt, { seconds: env.OTP_EXPIRY })
  await sendMail({
    subject: `Sign in to ${url.host}`,
    body: `Your OTP is ${otpPrefix}-<b>${token}</b>. It will expire on ${format(
      expiry,
      'dd MMM yyyy, h:mmaaa',
    )}.
      Please use this to login to your account.
      <p>If your OTP does not work, please request for a new one.</p>`,
    recipient: email,
  })

  return {
    token,
    email,
    otpPrefix,
  }
}

export const emailVerifyOtp = async ({
  email,
  token,
}: {
  email: string
  token: string
}) => {
  // TODO: Implement token verification and handle various error states:
  // 1. Increment attempt count on each verification attempt
  // 2. If attempts exceed limit, throw TOO_MANY_REQUESTS error
  // 3. If token is expired or invalid, throw BAD_REQUEST error
  //    HINT: Use `isValidToken` from auth.utils.ts to check validity
  // 4. If valid, delete the token record to prevent reuse

  try {
    // TODO: Complete the implementation here
  } catch (error) {
    // see error code here: https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid login email',
      })
    }
    throw error
  }
}
