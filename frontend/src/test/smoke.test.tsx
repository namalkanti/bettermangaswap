import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from './utils'

function SampleComponent({ label }: { label: string }) {
    return <button type="button">{label}</button>
}

describe('Smoke', () => {
    it('renders a component with providers', () => {
        render(<SampleComponent label="Submit" />)
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })
})
