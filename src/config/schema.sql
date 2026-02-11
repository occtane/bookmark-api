-- Bookmark tables
/*
SERIAL                    -> Auto-increment Integer
PIMRARY KEY               -> Unique key
TEXT                      -> Unlimited length (for URLs, Descriptions)
VARCHAR(255)              -> Max. 255 Chars (for titles)
TIMESTAMP                 -> Date + Time
DEFAULT CURRENT_TIMESTAMP -> Set date automatically
*/
CREATE TABLE IF NOT EXISTS bookmarks (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast search
CREATE INDEX IF NOT EXISTS idx_bookmarks_created_at ON bookmarks(created_at DESC);