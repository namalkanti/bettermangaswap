// Keep endpoint handlers thin. Mock data/state lives in mock-data.ts and shared
// response/authentication mechanics live in helpers.ts.
import { http, HttpResponse } from 'msw'
import { errorResponse } from './helpers'
import { mockState } from './mock-data'
import type { Listing } from './mock-data'

function getMockListings({ request }: { request: Request }) {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    if (name === '') {
        return errorResponse('Search query cannot be empty', 400)
    }

    const search = name?.toLowerCase()
    type ListingPredicate = (listing: Listing) => boolean
    const nameFilter: ListingPredicate = search
        ? (listing) => listing.manga.title.toLowerCase().includes(search)
        : (_listing) => true

    const listings = mockState.listings.filter((listing) =>
        listing.status === 'active' &&
        new Date(listing.expires_at).getTime() > Date.now() &&
        nameFilter(listing)
    )
    return HttpResponse.json(listings)
}

export const handlers = [
    http.get('/listings', getMockListings),
]
