**Pokecollector**
=====================================

Mock ecommerce website that lets users purchase a handful of pokemon cards, and build decks. 
https://pokecollector.herokuapp.com/

**Purpose**
---------------

The purpose of this project is to practice and present my skills for both front-end and back-end. eCommerce sites are very common around the web, so I wanted to make an attempt at building one out from scratch. Although the site does not accept or use any form of real currency (the user can add as much money as they want), the site attempts to mimic the exact userflow from real ecommerce sites. 

Some userflows include being able to view products while not logged in, having a shopping cart persist through logins/logouts, deleting/updating the shopping card, and registering and logging in. On top of ecommerce userflows, the user can view the products they purchased and organize them into specific categories (decks).

**Features**
---------------
- Homepage that describes what can be done on the site.
- Users are able to login and register.
    - Logged in users are able to update their information and add funds.
- Ability to view all products available for purchase without having to login through store page.
    - Ability to filter through products - filter by name, minimum price, maximum price, rarity, pokemon type, and set name.
    - Users are able to add cards to their cart through the store page. They don't have to be logged in.
    - Products can be clicked on to view more details.
- Shopping cart functionality that persists through logins and logouts.
    - Shopping cart is handle through a combination of state and local storage.
    - Users can remove or increment items in their cart.
    - Purchasing is only available for users who are logged in.
- Ability to view cards that the user owns.
    - After logging in, the user is able to view all the cards they owned.
    - This page allows uers to filter through all their cards similar to the store page. 
- Once users are logged in, they can create mock decks with the cards they own.
    - New decks can be created and deleted.
    - Decks can be named and renamed, and images covers for the decks can be chosen from the cards that they selected for their deck.
- There is a special page that only admins are able to view
    - Admins are able to view a list of all users and delete or create new users or admins.
    - Admins can view all cards and their information currently in the database.
    - Admins are able to add new cards to the database from an external API. 

**API** (External and Internal)
---------------
- ##### External: these API routes are available only for admins
    - Link to external API: https://pokemontcg.io/
    - GET: This API is used to pull in information about cards and card set names to be added directly to the PokeCollector database
- ##### Internal: The PokeCollector API follows the RESTful routing conventions.
    - ###### User Logins
        - POST: Login authentication and registering a new user 
        - PATCH: updating user information
        - DELETE: deleting a user
        - GET: retrieval of user's info for verification of username and JWT token
    - ###### Store
        - POST: Card purchases to create card entries in the UsersCards table
        - PATCH: Removal of currency after purchase and adding new funds
    - ###### Decks - Must be authenticated
        - GET: list of all decks created by user and specific deck information
        - POST: creating a new deck
        - PATCH: updating the deck name and image, and changing out or adding cards to a deck 
        - DELETE: deleting their own deck
    - ###### Cards
        - Users are able to make various get requests which include: 
            - GET: all cards from data base
            - GET: names of all sets currently available in the database - this is used for filtering cards
            - GET: all information on a specific card
        - Logged in users are able to access additional routes:
            - GET: view all cards that the user owns
            - GET: able to make filtered searches through cards they own
        - Admin only routes are available with two making a request from an external API:
            - GET (external API): retrieve list of every set available
            - GET (external API): retrive information on all cards of a specified set
            - POST: insert into Cards table a new card
            - DELETE: delete a card from the Cards table
            
**Tech Stack**
---------------
##### Backend
- Axios - v0.21.1
- Bcrypt - v5.0.1
- Colors - v1.4.0
- Cors - 2.8.5
- dotenv - v10.0.0
- Express - v4.17.1
- Jsonschema - v1.4.0
- Jsonwebtoken - v8.5.1
- Node - v16.10.0
- PostgreSQL - v8.7.1
##### Frontend
- Axios - v0.21.1
- React - v17.0.2
- Boostrap-icons - v1.5.0
- React-bootstrap - v2.0.0-beta.6
- React-dom - v17.0.2
- React-router-dom - v5.2.0