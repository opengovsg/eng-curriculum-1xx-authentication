import { TRPCError } from '@trpc/server'
import z from 'zod'

import {
  emailSignInSchema,
  emailVerifyOtpSchema,
  OTP_PREFIX_LENGTH,
} from '~/validators/auth'
import { createTRPCRouter, publicProcedure } from '../../trpc'

export const emailAuthRouter = createTRPCRouter({
  login: publicProcedure
    .input(emailSignInSchema)
    .output(
      z.object({
        email: z.email(),
        otpPrefix: z.string().length(OTP_PREFIX_LENGTH),
      }),
    )
    .mutation(async ({ input }) => {
      // TODO: Use your created login method (from auth.service.ts) here.
      // TODO: Replace the error below with your implementation.
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
      })
    }),
  verifyOtp: publicProcedure
    .input(emailVerifyOtpSchema)
    .mutation(async ({ input: { email, token }, ctx }) => {
      // TODO: Implement the token verification. Handle the following steps:
      // 1. Implement and use a service method (in auth.service.ts) to verify the token
      // 2a. If token is valid, use user.service#upsertUserAndAccountByEmail to upsert a user by email.
      // 2b. If invalid, throw an appropriate TRPCError.
      // 3. Regenerate a new session with the userId and email once completed.

      // TODO: Replace the error below with your implementation.
      throw new TRPCError({
        code: 'NOT_IMPLEMENTED',
      })
    }),
})
