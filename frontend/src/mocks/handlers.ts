import { http, HttpResponse } from 'msw'

// TODO: Replace when shapes are finalized and extract to schema
type Manga = {
    title: string
    volume?: number
    edition?: string
    language?: string
}

type ListingType = 'have' | 'want';
type ListingStatus = 'active' | 'fulfilled' | 'expired';

type Listing = {
    id: number
    account_id: number
    listing_type: ListingType
    manga: Manga
    notes?: string
    status: ListingStatus
    created_at: string
    expires_at: string
}

type Account = {
    id: number
    email: string
    password: string
}

type MockState = {
    accounts: Account[]
    listings: Listing[]
    authenticatedAccountId: number | null
    nextAccountId: number
    nextListingId: number
}

function createInitialState(): MockState {
    return {
        accounts: [
            {
                id: 1,
                email: 'mio@example.com',
                password: 'password123',
            },
            {
                id: 2,
                email: 'ren@example.com',
                password: 'password456',
            },
        ],
        listings: [
            {
                id: 1,
                account_id: 1,
                listing_type: 'have',
                manga: {
                    title: 'Fullmetal Alchemist',
                    volume: 1,
                    edition: 'Paperback',
                    language: 'English',
                },
                notes: 'In good condition.',
                status: 'active',
                created_at: '2026-01-01T00:00:00.000Z',
                expires_at: '2026-04-01T00:00:00.000Z',
            },
            {
                id: 2,
                account_id: 2,
                listing_type: 'want',
                manga: {
                    title: 'Yotsuba&!',
                    volume: 1,
                    language: 'English',
                },
                notes: 'Looking for a readable copy.',
                status: 'active',
                created_at: '2026-01-02T00:00:00.000Z',
                expires_at: '2026-04-02T00:00:00.000Z',
            },
            {
                id: 3,
                account_id: 1,
                listing_type: 'have',
                manga: {
                    title: 'Nausicaä of the Valley of the Wind',
                    volume: 1,
                    edition: 'Deluxe',
                    language: 'English',
                },
                status: 'fulfilled',
                created_at: '2026-01-03T00:00:00.000Z',
                expires_at: '2026-04-03T00:00:00.000Z',
            },
        ],
        authenticatedAccountId: null,
        nextAccountId: 3,
        nextListingId: 4,
    }
}

//Mock State
let state: MockState = createInitialState()

function errorResponse(message: string, status: number): HttpResponse {
    return HttpResponse.json({ error: message }, { status })
}

function requireAuthenticatedAccount(): Account | HttpResponse {
    if (state.authenticatedAccountId === null) {
        return errorResponse('Account not logged in', 401)
    }
    else {
        const account = state.accounts.find(
            (candidate) => candidate.id === state.authenticatedAccountId,
        )

        if (account == null) {
            return errorResponse('Account not found', 401)
        }
        else {
            return account
        }
    }
}

