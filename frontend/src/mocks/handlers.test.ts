import { describe, it, expect } from 'vitest'

describe('get listings', () => {
    it('returns all of the active listings with no query', async () => {
        const response = await fetch('/listings')
        const data = await response.json()
        expect(response.status).toBe(200)
        expect(data).toHaveLength(2)
    })
    it('returns the fma listing', async () => {
        const response = await fetch('/listings?name=alchemist')
        const data = await response.json()
        expect(response.status).toBe(200)
        expect(data).toHaveLength(1)
    })
    it('returns error if name is empty', async () => {
        const response = await fetch('/listings?name=')
        expect(response.status).toBe(400)
    })
})
