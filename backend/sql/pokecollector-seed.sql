--both passwords are "password"
INSERT INTO users (username, password, first_name, last_name, email, currency_amount, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'JoelTest',
        'BurtonUser',
        'joel@joelburton.com',
        1000,
        FALSE),
        ('seconduser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'twofer',
        'seconded',
        'twotwotwo@emailtest.com',
        1000,
        FALSE),
        ('thirduser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Thirded',
        'ThirdLast',
        'trestres@emailtest.com',
        50,
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'DanielTest',
        'KimAdmin',
        'daniel@dkim.com',
        7777,
        TRUE),
        ('userToDelete',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'deleter',
        'deleted',
        'deleting@del.com',
        9875,
        FALSE);;

INSERT INTO trades (seller_name, buyer_name, seller_offer, buyer_offer, completed)
VALUES ('testuser',
        'testadmin',
        ARRAY ['base1-46', 'base1-58'],
        ARRAY ['base2-10'],
        FALSE),
       ('testadmin',
        'testuser',
        ARRAY ['base1-63'],
        ARRAY ['base1-44'],
        FALSE);

INSERT INTO messages (trade_id, username, message, timestamp)
VALUES (1, 'testuser', 'this is test message. trade me.', 'Tue Aug 20 2021 16:40:58 GMT-0700 (Pacific Daylight Time)'),
       (1, 'testadmin', 'this is message 2 test message. no.', 'Tue Aug 21 2021 16:40:58 GMT-0700 (Pacific Daylight Time)'),
        (1,
        'testuser',
        'this is test message 3. trade me.',
        'Tue Aug 20 2021 18:40:58 GMT-0700 (Pacific Daylight Time)'),
        (1,
        'testadmin',
        'this is test message 4. trade me.',
        'Tue Aug 21 2021 17:40:58 GMT-0700 (Pacific Daylight Time)'),
        (1,
        'testuser',
        'this is test message 5. trade me.',
        'Tue Aug 21 2021 20:40:58 GMT-0700 (Pacific Daylight Time)'),
        (2,
        'testadmin',
        'this is test message 6. trade me.',
        'Tue Aug 24 2021 11:40:58 GMT-0700 (Pacific Daylight Time)');

INSERT INTO cards (id, name, supertype, subtypes, hp, types, evolves_to, rules, attacks, weaknesses, resistances, retreat_cost, converted_retreat_cost, set_name, set_logo, number, artist, rarity, national_pokedex_numbers, legalities, images, tcgplayer, prices)
VALUES ('base1-46',
        'Charmander',
        'Pokémon',
        ARRAY ['Basic'],
        '50',
        ARRAY ['Fire'],
        ARRAY ['Charmeleon'],
        ARRAY ['None'],
        ARRAY [
        '{
          "name": "Scratch",
          "cost": [
            "Colorless"
          ],
          "convertedEnergyCost": 1,
          "damage": "10",
          "text": ""
        }',
        '{
          "name": "Ember",
          "cost": [
            "Fire",
            "Colorless"
          ],
          "convertedEnergyCost": 2,
          "damage": "30",
          "text": "Discard 1 Fire Energy card attached to Charmander in order to use this attack."
        }'
      ],
        ARRAY ['{"type": "Water","value": "x2"}'],
        ARRAY [
        '{
          "type": "Psychic",
          "value": "-30"
        }'
      ],
        ARRAY ['Colorless'],
        1,
        'Base',
        'https://images.pokemontcg.io/base1/logo.png',
        '46',
        'Mitsuhiro Arita',
        'Common',
        ARRAY [4],
        '{"unlimited": "Legal"}',
        'https://images.pokemontcg.io/base1/46_hires.png',
        '{
        "url": "https://prices.pokemontcg.io/tcgplayer/base1-46",
        "updatedAt": "2021/08/19",
        "prices": {
          "normal": {
            "low": 0.34,
            "mid": 2.24,
            "high": 35.0,
            "market": 1.57,
            "directLow": 1.04
          }}}',
        1.57),
        ('base1-44',
         'Bulbasaur',
         'Pokémon',
          ARRAY ['Basic'],
          '50',
          ARRAY ['Grass'],
          ARRAY ['Ivysaur'],
          ARRAY ['None'],
          ARRAY ['{
          "name": "Leech Seed",
          "cost": ["Grass","Grass"],
          "convertedEnergyCost": 2,
          "damage": "20",
          "text": "Unless all damage from this attack is prevented, you may remove 1 damage counter from Bulbasaur"
          }'],
          ARRAY ['{
          "type": "Fire",
          "value": "×2"
            }'],
          ARRAY [
        '{
          "type": "Psychic",
          "value": "-30"
        }'],
          ARRAY ['Colorless'],
          1,
          'Base',
          'https://images.pokemontcg.io/base1/logo.png',
          '44',
          'Mitsuhiro Arita',
          'Common',
          ARRAY [1],
          '{"unlimited": "Legal"}',
          'https://images.pokemontcg.io/base1/44_hires.png',
          '{
            "url": "https://prices.pokemontcg.io/tcgplayer/base1-44",
            "updatedAt": "2021/08/22",
            "prices": {
                "normal": {
                "low": 0.4,
                "mid": 2.5,
                "high": 16.16,
                "market": 2.21,
                "directLow": 1.29
            }}}',
            2.5),
        ('base1-63',
        'Squirtle',
        'Pokémon',
        ARRAY ['Basic'],
        '40',
        ARRAY ['Water'],
        ARRAY ['Wartortle'],
        ARRAY ['None'],
        ARRAY [
        '{
          "name": "Bubble",
          "cost": [
            "Water"
          ],
          "convertedEnergyCost": 1,
          "damage": "10",
          "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
        }','{"name": "Withdraw",
          "cost": [
            "Water",
            "Colorless"
          ],
          "convertedEnergyCost": 2,
          "damage": "",
          "text": "Flip a coin. If heads, prevent all damage done to Squirtle during your opponents next turn. (Any other effects of attacks still happen.)"}'
      ],
        ARRAY [
        '{
          "type": "Lightning",
          "value": "×2"
        }'
      ],
      ARRAY ['{
          "type": "Psychic",
          "value": "-30"
        }'],
        ARRAY ['Colorless'],
        1,
        'Base',
        'https://images.pokemontcg.io/base1/logo.png',
        '44',
        'Mitsuhiro Arita',
        'Common',
        ARRAY [7],
        '{"unlimited": "Legal"}',
        'https://images.pokemontcg.io/base1/63_hires.png',
        '{
        "url": "https://prices.pokemontcg.io/tcgplayer/base1-63",
        "updatedAt": "2021/08/22",
        "prices": {
          "normal": {
            "low": 1.19,
            "mid": 4.06,
            "high": 14.98,
            "market": 4.19,
            "directLow": 0.9
          }
        }}',
        4.06),
        
        ('base1-58',
        'Pikachu',
        'Pokémon',
        ARRAY ['Basic'],
        '40',
        ARRAY ['Lightning'],
        ARRAY ['Raichu'],
        ARRAY ['None'],
        ARRAY [
        '{
          "name": "Gnaw",
          "cost": [
            "Colorless"
          ],
          "convertedEnergyCost": 1,
          "damage": "10",
          "text": ""
        }',
        '{
          "name": "Thunder Jolt",
          "cost": [
            "Lightning",
            "Colorless"
          ],
          "convertedEnergyCost": 2,
          "damage": "30",
          "text": "Flip a coin. If tails, Pikachu does 10 damage to itself."
        }'
      ],
        ARRAY [
        '{
          "type": "Fighting",
          "value": "×2"
        }'
      ],
      ARRAY ['{
          "type": "Psychic",
          "value": "-30"
        }'],
        ARRAY ['Colorless'],
        1,
        'Base',
        'https://images.pokemontcg.io/base1/logo.png',
        '58',
        'Mitsuhiro Arita',
        'Common',
        ARRAY [25],
        '{"unlimited": "Legal"}',
        'https://images.pokemontcg.io/base1/58_hires.png',
        '{
        "url": "https://prices.pokemontcg.io/tcgplayer/base1-58",
        "updatedAt": "2021/08/22",
        "prices": {
          "normal": {
            "low": 0.99,+
            "mid": 3.45,
            "high": 63.44,
            "market": 3.82,
            "directLow": 1.7
          }
        }',
        3.45),

        ('base2-10',
        'Scyther',
        'Pokémon',
        ARRAY ['Basic'],
        '70',
        ARRAY ['Grass'],
        ARRAY ['Scizor'],
        ARRAY ['None'],
        ARRAY [
        '{
          "name": "Swords Dance",
          "cost": [
            "Grass"
          ],
          "convertedEnergyCost": 1,
          "damage": "",
          "text": "During your next turn, Scythers Slash attacks base damage is 60 instead of 30"
        }',
        '{
          "name": "Slash",
          "cost": [
            "Colorless",
            "Colorless",
            "Colorless"
          ],
          "convertedEnergyCost": 3,
          "damage": "30",
          "text": ""
        }'
      ],
        ARRAY [
        '{
          "type": "Fire",
          "value": "-30"
        }'
      ],
      ARRAY [
        '{
          "type": "Fighting",
          "value": "-30"
        }'
      ],
        ARRAY ['Colorless'],
        1,
        'Jungle',
        'https://images.pokemontcg.io/base2/logo.png',
        '10',
        'Ken Sugimori',
        'Rare Holo',
        ARRAY [123],
        '{"unlimited": "Legal"}',
        ' https://images.pokemontcg.io/base2/10_hires.png',
        '{
        "url": "https://prices.pokemontcg.io/tcgplayer/base2-10",
        "updatedAt": "2021/08/22",
        "prices": {
          "holofoil": {
            "low": 12.0,
            "mid": 24.47,
            "high": 77.99,
            "market": 32.57,
            "directLow": null
          },
          "1stEditionHolofoil": {
            "low": 43.99,
            "mid": 79.99,
            "high": 149.99,
            "market": 45.43,
            "directLow": 39.38
          }
        }',
        24.47);


INSERT INTO users_cards (username, card_id)
VALUES ('testuser','base1-46'),
       ('testuser','base1-58'),
       ('testuser','base1-44'),
       ('testuser','base2-10'),
       ('testadmin','base2-10'),
       ('testadmin','base1-63');

INSERT INTO decks (username, deck_name, deck_image)
VALUES ('testuser','card deck #1', 'https://images.pokemontcg.io/base1/63_hires.png'),
       ('testuser','card deck #2', 'https://images.pokemontcg.io/base2/10_hires.png'),
       ('testadmin','admin deck #3', 'https://images.pokemontcg.io/base1/63_hires.png'),
       ('testadmin','admin deck #4', 'https://images.pokemontcg.io/base1/58_hires.png');

INSERT INTO cards_in_decks (deck_id, users_cards_id)
VALUES (1,1),
       (1,2),
       (1,3),
       (3,4),
       (3,5);

