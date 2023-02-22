CREATE TABLE users (
    username VARCHAR(30) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE CHECK (position('@' IN email) > 1),
    currency_amount NUMERIC NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    seller_name TEXT NOT NULL
        REFERENCES users(username) ON DELETE CASCADE,
    buyer_name TEXT NOT NULL
        REFERENCES users(username) ON DELETE CASCADE,
    seller_offer TEXT[] NOT NULL,
    buyer_offer TEXT[] NOT NULL,
    completed BOOLEAN NOT NULL
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    trade_id INTEGER NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
    username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    message TEXT,
    timestamp TEXT NOT NULL
);

CREATE TABLE cards (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    supertype TEXT,
    subtypes TEXT[],
    hp TEXT,
    types TEXT[],
    evolves_to TEXT[],
    rules TEXT[],
    attacks TEXT[],
    weaknesses TEXT[],
    resistances TEXT[],
    retreat_cost TEXT[],
    converted_retreat_cost INTEGER,
    set_name TEXT,
    set_logo TEXT,
    number TEXT,
    artist TEXT,
    rarity TEXT,
    national_pokedex_numbers INTEGER[],
    legalities TEXT,
    images TEXT,
    tcgplayer TEXT,
    prices NUMERIC
);

CREATE TABLE users_cards (
    id SERIAL PRIMARY KEY,
    username TEXT REFERENCES users(username) ON DELETE CASCADE,
    card_id TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE decks (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    deck_name TEXT NOT NULL,
    deck_image TEXT
);

CREATE TABLE cards_in_decks (
    id SERIAL PRIMARY KEY,
    deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    users_cards_id INTEGER NOT NULL REFERENCES users_cards(id) ON DELETE CASCADE
);
