-- Create FTS5 virtual table as an external content table mirroring listings
CREATE VIRTUAL TABLE listings_fts USING fts5(
    title,
    content='listings',
    content_rowid='id',
    tokenize='unicode61 remove_diacritics 2'
);

-- Triggers to keep FTS index synchronized with listings

-- 1. Insert trigger: index new listing title
CREATE TRIGGER listings_ai AFTER INSERT ON listings BEGIN
    INSERT INTO listings_fts(rowid, title) VALUES (new.id, new.title);
END;

-- 2. Delete trigger: remove deleted listing from FTS index
CREATE TRIGGER listings_ad AFTER DELETE ON listings BEGIN
    INSERT INTO listings_fts(listings_fts, rowid, title) VALUES ('delete', old.id, old.title);
END;

-- 3. Update trigger: delete old entry, insert new entry
CREATE TRIGGER listings_au AFTER UPDATE ON listings BEGIN
    INSERT INTO listings_fts(listings_fts, rowid, title) VALUES ('delete', old.id, old.title);
    INSERT INTO listings_fts(rowid, title) VALUES (new.id, new.title);
END;
