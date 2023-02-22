1. What tech stack will you use for your final project? We recommend that you use React and Node for this project, however if you are extremely interested in becoming a Python developer you are welcome to use Python/Flask for this project. 
    React and Node will be used for the front and back end. 

2. Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application? 
    The focus will be on the front end. I want the front end to be able to handle most features that the user will be using. The back end will handle reading and writing of user’s information and data.

3. Will this be a website? A mobile app? Something else? 
    This will be a website. 

4. What goal will your project be designed to achieve? 
    Frontend
        The front end will handle user registration, login, and sign out.
        It will also handle the UI of making a deck and saving the deck.
        There will be a store to purchase card packs which can be bought with fake money.
        Packs will be opened on the front end and based on odds, pulls the card information from the back end.
        Users will be able to view their library, other user’s library, and entire card catalogue.
        There will be a trade system handled by the front end and offers made on the front end will be stored on the back end for users to view later.
    Backend - 
        The goal will be to create a database of cards that is pulled from a public API. It will store the card information that includes card information as well as prices. Front end will be able to access these as a library.
        The back end will also include a database for user information (username, password, email, the amount of currency they have) and what cards they own on the app. 
        Trade system’s back end will handle the storage of offers for cards. 

5. What kind of users will visit your app? In other words, what is the demographic of your users? 
    Users who are interested in the card game and want to keep track of card information.

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. If you are using a Python/Flask stack are required to create your own API. 
    I plan on using the card API to pull information on cards and store in the backend. The admin will be able to update the database through the front end. The backend will contain user sign up data as well as any cards the user might own. The back end will also store data on user offers.  

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 
a. What does your database schema look like? 
https://docs.google.com/document/d/1JrtScBJvarIP2DXnqayBOrnWWPtLZ08btWXYT9E9bhg/edit?usp=sharing

b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 
There is a lot of data on cards that are not planned to be saved. These need to be excluded when saving to the database. Since I am planning on creating a RESTful API within my own DB, I may have to limit the amount of responses for each user. 
c. Is there any sensitive information you need to secure? 
    I would want to secure the user information such as password, first and last name.
d. What functionality will your app include? 
    The app will include a ecommerce style shop where a user can purchase card packs.
    Users will be able to send trade offers in the form of messages.
    Users can browse cards
    Users will be able to browse their library and create decks.
e. What will the user flow look like? 
Not logged in users will be able to view the entire card library.
User will be able to register and log in. This will allow users to view cards that they own and build a deck or view any decks that they own. 
Once logged in, they will have access to a shop where they will be able to purchase and open packs with a fake currency.
f. What features make your site more than a CRUD app? What are your stretch goals?
Build out the card game that follows the official rules. 
