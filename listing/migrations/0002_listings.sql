CREATE TABLE listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    listing_type TEXT NOT NULL CHECK (listing_type IN ('have', 'want')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fulfilled', 'expired')),
    
    -- Manga details
    title TEXT NOT NULL,
    volume TEXT,               -- e.g. '1', '1-5', 'Omnibus 2'
    edition TEXT,              -- e.g. 'Deluxe', 'First Print'
    language TEXT DEFAULT 'English',
    condition TEXT,            -- e.g. 'G1'..'G5', 'Like New'
    
    -- Deal & batch details
    price_cents INTEGER,       -- NULL for trade-only
    currency TEXT DEFAULT 'USD',
    country_code TEXT,         -- ISO 3166-1 alpha-2, e.g. 'US', 'CA'
    notes TEXT,
    group_id TEXT,             -- Batch UUID for grouping in UI
    
    -- Timestamps (Unix seconds)
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
) STRICT;

-- Indexes for performance & matching
CREATE INDEX idx_listings_updated_at ON listings(updated_at);
CREATE INDEX idx_listings_active_match ON listings(listing_type, status, title);
CREATE INDEX idx_listings_account ON listings(account_id, status);
CREATE INDEX idx_listings_group_id ON listings(group_id) WHERE group_id IS NOT NULL;
