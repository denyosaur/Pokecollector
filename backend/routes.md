user
    -ensureCorrectUserOrAdmin
        GET /user/:username - get username information and all cards they own
        PATCH /user/:username - patch user information
        DELETE /user/:username - delete user
    -ensureAdmin
        GET /user - get all user's info
        POST /user - create a new user. can make them admin.

auth - logging in and registering
    -No Restriction 
        POST /auth/token - route to handle logging in
        POST /auth/register - route to handle registration

cards
    -No Restriction
        GET /cards - get all cards. can have search filters
        GET /cards/:cardId - get a single cards information
    -ensureLoggedIn
        GET /cards/:username - get all cards from user
    -ensureAdmin
        POST /cards/createCard - pass in a card info through body to create
        DELETE /cards/:cardId - delete a card by ID

store
    -ensureCorrectUserOrAdmin
        POST /store/:username/purchase - add cards to users_cards, 
        PATCH /store/:username/removeFunds - remove funds from user's currency amount
        PATCH /store/:username/addFunds - add funds to user's currency amount

trades
    -ensureCorrectUserOrAdmin
        GET /trades/:username - get all of user's trades 
        GET /trades/:username/:tradeId - get trade information and messages
        POST /trades/:username/create - create a trade, create entry in trades and messages table
        POST /trades/:username/:tradeId/accept - switch cards between users. mark trade as completed
        PATCH /trades/:username/:tradeId - update offers
        DELETE /trades/:username/:tradeId/delete - delete trade and messages
        POST /trades/:username/:tradeId/sendMessage - send message
        PATCH /trades/:username/:msgId - update a message
        DELETE /trade/:username/:msgId - delete a message

deck
    -ensureCorrectUserOrAdmin
        GET /decks/:username - get all of user's decks
        GET /decks/:username/:deckId - view a single deck and all cards in it
        POST /decks/:username - create a new deck
        PATCH /decks/:username/:deckId/updateName - edit name of deck
        PATCH /decks/:username/:deckId - edit cards in deck
        DELETE /decks/:username/:deckId - delete a deck