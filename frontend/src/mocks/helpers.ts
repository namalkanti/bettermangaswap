import { HttpResponse } from 'msw'
import { mockState } from './mock-data'
import type { Account } from './mock-data'

export function errorResponse(
    message: string,
    status: number,
): HttpResponse<{ error: string }> {
    return HttpResponse.json({ error: message }, { status })
}

export function requireAuthenticatedAccount(): Account | HttpResponse<{ error: string }> {
    if (mockState.authenticatedAccountId === null) {
        return errorResponse('Account not logged in', 401)
    }

    const account = mockState.accounts.find(
        (candidate) => candidate.id === mockState.authenticatedAccountId,
    )

    return account ?? errorResponse('Account not found', 401)
}
