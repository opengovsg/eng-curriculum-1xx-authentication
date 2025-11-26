import '../../mail/__mocks__/mail.service'

import { resetTables } from '~tests/db/utils'
import { add } from 'date-fns/add'
import { mock } from 'vitest-mock-extended'

import { db } from '@acme/db'

import * as mailService from '../../mail/mail.service'
import { emailLogin, emailVerifyOtp } from '../auth.service'
import { createAuthToken } from '../auth.utils'

const mockedMailService = mock(mailService)

describe('auth.service', () => {
  beforeEach(async () => {
    // TODO: reset the relevant tables before each test
    // await resetTables(['VerificationToken', 'User', 'Account'])
  })

  // TODO: Add tests for your auth.service methods
})
