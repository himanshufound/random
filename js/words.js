/*
 * Built-in word packs.
 * Each entry is "Word|Similar|Similar". The first item is the main word; the
 * others are close-but-different words used for Infiltrators. When a round
 * needs two words, two items from the same entry are picked at random.
 */
window.BUILTIN_PACKS = [
  {
    id: "places", name: "Places", icon: "📍",
    words: [
      "Beach|Swimming Pool|Lake", "Airport|Train Station|Bus Station", "Hospital|Clinic|Pharmacy",
      "School|College|Library", "Supermarket|Mall|Market", "Cinema|Theater|Concert Hall",
      "Restaurant|Cafe|Food Truck", "Gym|Yoga Studio|Sports Stadium", "Zoo|Aquarium|Safari",
      "Museum|Art Gallery|Exhibition Hall", "Bank|ATM|Post Office", "Hotel|Hostel|Airbnb", "Church|Temple|Mosque",
      "Park|Garden|Forest", "Casino|Arcade|Bowling Alley", "Prison|Police Station|Courtroom",
      "Space Station|Submarine|Airplane", "Amusement Park|Water Park|Circus", "Farm|Ranch|Vineyard",
      "Nightclub|Bar|Karaoke Bar", "Hair Salon|Spa|Barber Shop", "Gas Station|Car Wash|Parking Lot",
      "Stadium|Arena|Racetrack", "Ski Resort|Mountain Cabin|Ice Rink", "Cruise Ship|Ferry|Pirate Ship",
      "Desert|Savanna|Canyon", "Office|Coworking Space|Call Center", "Wedding Hall|Banquet Hall|Ballroom",
      "Factory|Warehouse|Construction Site", "Fire Station|Lifeguard Tower|Coast Guard Station",
      "Lighthouse|Harbor|Pier", "Castle|Palace|Fort", "Campsite|Treehouse|Cabin", "Embassy|Parliament|City Hall",
      "Bakery|Pastry Shop|Ice Cream Parlor", "Dentist|Doctor's Office|Eye Clinic", "Laundromat|Dry Cleaner|Tailor",
      "Rooftop|Balcony|Terrace", "Cemetery|Funeral Home|Memorial Park",
      "Haunted House|Abandoned Mansion|Escape Room", "Flea Market|Night Market|Car Boot Sale",
      "Bookstore|Comic Shop|Stationery Shop", "Playground|Trampoline Park|Kindergarten",
      "Pet Shop|Vet Clinic|Animal Shelter", "Subway Station|Bus Stop|Tram Stop",
      "Internet Café|Gaming Lounge|Esports Arena"
    ]
  },
  {
    id: "food", name: "Food", icon: "🍕",
    words: [
      "Pizza|Burger|Calzone", "Sushi|Ramen|Dumplings", "Pancakes|Waffles|French Toast",
      "Ice Cream|Frozen Yogurt|Popsicle", "Chocolate|Candy|Brownie", "Hot Dog|Corn Dog|Sausage Roll",
      "Pasta|Noodles|Lasagna", "Tacos|Burrito|Nachos", "Salad|Soup|Smoothie Bowl", "Cake|Cupcake|Muffin",
      "Cookie|Biscuit|Cracker", "Popcorn|Chips|Pretzels", "French Fries|Hash Browns|Onion Rings", "Apple|Pear|Peach",
      "Banana|Mango|Pineapple", "Strawberry|Raspberry|Cherry", "Orange|Lemon|Grapefruit", "Watermelon|Melon|Papaya",
      "Omelette|Scrambled Eggs|Quiche", "Cheese|Butter|Yogurt", "Bread|Toast|Croissant", "Donut|Bagel|Churros",
      "Steak|Ribs|Kebab", "Fried Chicken|Chicken Nuggets|Chicken Wings", "Rice|Fried Rice|Risotto",
      "Potato|Sweet Potato|Carrot", "Tomato|Bell Pepper|Cucumber", "Onion|Garlic|Ginger", "Honey|Maple Syrup|Jam",
      "Peanut Butter|Nutella|Cream Cheese", "Cereal|Oatmeal|Granola", "Mushroom|Truffle|Olive",
      "Shrimp|Lobster|Crab", "Salmon|Tuna|Cod", "Pie|Tart|Cheesecake", "Hummus|Guacamole|Salsa",
      "Spring Rolls|Samosa|Empanada", "Marshmallow|Cotton Candy|Jelly Beans", "Avocado|Kiwi|Coconut",
      "Corn|Peas|Beans", "Pudding|Custard|Jelly", "Grapes|Blueberries|Olives", "Pho|Udon|Laksa",
      "Falafel|Shawarma|Doner Kebab", "Mac and Cheese|Cheese Toastie|Fondue", "Tiramisu|Panna Cotta|Crème Brûlée",
      "Fish and Chips|Fish Fingers|Calamari"
    ]
  },
  {
    id: "drinks", name: "Drinks", icon: "🥤",
    words: [
      "Coffee|Tea|Hot Chocolate", "Beer|Wine|Cider", "Orange Juice|Apple Juice|Lemonade", "Milkshake|Smoothie|Lassi",
      "Water|Sparkling Water|Tonic Water", "Cola|Lemon Soda|Energy Drink", "Champagne|Prosecco|Cava",
      "Whiskey|Rum|Vodka", "Cocktail|Mocktail|Punch", "Latte|Cappuccino|Espresso", "Green Tea|Chai|Iced Tea",
      "Milk|Soy Milk|Buttermilk", "Mojito|Margarita|Piña Colada", "Bubble Tea|Iced Coffee|Frappuccino",
      "Kombucha|Cold Brew|Ginger Ale", "Tequila|Gin|Sake", "Protein Shake|Sports Drink|Pre-Workout",
      "Mulled Wine|Eggnog|Hot Cider", "Coconut Water|Sugarcane Juice|Watermelon Juice", "Red Wine|White Wine|Rosé",
      "Milo|Horlicks|Ovaltine", "Soju|Makgeolli|Shochu", "Slushie|Frozen Lemonade|Granita"
    ]
  },
  {
    id: "animals", name: "Animals", icon: "🐾",
    words: [
      "Dog|Wolf|Fox", "Cat|Lynx|Bobcat", "Lion|Tiger|Leopard", "Elephant|Rhino|Hippo", "Giraffe|Okapi|Gazelle",
      "Monkey|Gorilla|Chimpanzee", "Horse|Donkey|Zebra", "Cow|Buffalo|Yak", "Pig|Boar|Warthog", "Sheep|Goat|Ibex",
      "Chicken|Duck|Turkey", "Eagle|Hawk|Owl", "Parrot|Peacock|Flamingo", "Penguin|Seal|Puffin",
      "Dolphin|Whale|Shark", "Octopus|Squid|Jellyfish", "Snake|Lizard|Iguana", "Crocodile|Alligator|Komodo Dragon",
      "Turtle|Tortoise|Snail", "Frog|Toad|Salamander", "Rabbit|Hamster|Guinea Pig", "Mouse|Rat|Squirrel",
      "Bear|Panda|Koala", "Kangaroo|Deer|Antelope", "Bee|Wasp|Hornet", "Ant|Termite|Beetle", "Spider|Scorpion|Crab",
      "Bat|Flying Squirrel|Sugar Glider", "Butterfly|Moth|Dragonfly", "Mosquito|Fly|Cockroach",
      "Goldfish|Clownfish|Koi", "Sloth|Lemur|Orangutan", "Hedgehog|Porcupine|Armadillo", "Camel|Llama|Alpaca",
      "Polar Bear|Walrus|Arctic Fox", "Swan|Goose|Pelican", "Cheetah|Jaguar|Puma", "Raccoon|Skunk|Badger",
      "Pigeon|Crow|Sparrow", "Hyena|Jackal|Wild Dog", "Seahorse|Starfish|Sea Urchin", "Ostrich|Emu|Kiwi Bird"
    ]
  },
  {
    id: "objects", name: "Everyday Objects", icon: "🧸",
    words: [
      "Umbrella|Raincoat|Parasol", "Scissors|Knife|Nail Clipper", "Toothbrush|Comb|Hairbrush", "Pen|Pencil|Marker",
      "Watch|Clock|Alarm Clock", "Wallet|Purse|Backpack", "Key|Lock|Padlock", "Glasses|Sunglasses|Contact Lenses",
      "Candle|Flashlight|Lamp", "Mirror|Window|Picture Frame", "Book|Magazine|Newspaper",
      "Phone|Tablet|Walkie-Talkie", "Headphones|Earbuds|Speaker", "Remote Control|Game Controller|Keyboard",
      "Pillow|Blanket|Mattress", "Balloon|Bubble|Kite", "Camera|Binoculars|Telescope", "Ladder|Stool|Stairs",
      "Hammer|Screwdriver|Wrench", "Rope|Chain|Belt", "Tape|Glue|Stapler", "Bottle|Jar|Thermos", "Plate|Bowl|Tray",
      "Spoon|Fork|Chopsticks", "Suitcase|Bag|Box", "Paper Clip|Safety Pin|Rubber Band", "Coin|Banknote|Credit Card",
      "Lighter|Matches|Flint", "Calendar|Diary|Notebook", "Shopping Cart|Wheelbarrow|Stroller",
      "Ball|Frisbee|Boomerang", "Ring|Necklace|Bracelet", "Soap|Shampoo|Toothpaste", "Charger|Battery|Power Bank",
      "Toilet Paper|Tissues|Napkin", "Paintbrush|Crayon|Chalk", "Dice|Playing Cards|Chess Piece",
      "Teddy Bear|Doll|Action Figure", "Trophy|Medal|Crown", "Map|Compass|GPS", "Flag|Banner|Poster",
      "Fidget Spinner|Stress Ball|Rubik's Cube", "Selfie Stick|Tripod|Ring Light"
    ]
  },
  {
    id: "home", name: "Around the House", icon: "🏠",
    words: [
      "Sofa|Armchair|Bean Bag", "Bed|Hammock|Crib", "Fridge|Freezer|Cooler", "Oven|Microwave|Toaster",
      "Washing Machine|Dishwasher|Dryer", "Bathtub|Shower|Jacuzzi", "Toilet|Sink|Bidet",
      "Fan|Air Conditioner|Heater", "Television|Projector|Computer Monitor", "Curtains|Blinds|Shutters",
      "Carpet|Doormat|Yoga Mat", "Wardrobe|Dresser|Shelf", "Vacuum Cleaner|Broom|Mop",
      "Iron|Hair Dryer|Straightener", "Kettle|Coffee Machine|Blender", "Frying Pan|Pot|Wok",
      "Doorbell|Door Knocker|Intercom", "Fireplace|Chimney|Furnace", "Garage|Basement|Attic",
      "Kitchen|Dining Room|Pantry", "Bedroom|Living Room|Guest Room", "Bookshelf|Cabinet|Drawer",
      "Chandelier|Ceiling Fan|Lamp", "Plant Pot|Vase|Flower Box", "Trash Can|Recycling Bin|Compost",
      "Light Switch|Power Socket|Fuse Box", "Staircase|Elevator|Ramp", "Clothesline|Hanger|Laundry Basket",
      "Fish Tank|Bird Cage|Dog House", "Rocking Chair|Swivel Chair|Recliner", "Bunk Bed|Sofa Bed|Futon"
    ]
  },
  {
    id: "jobs", name: "Jobs", icon: "🧑‍🔧",
    words: [
      "Doctor|Nurse|Surgeon", "Teacher|Professor|Tutor", "Police Officer|Detective|Security Guard",
      "Firefighter|Paramedic|Lifeguard", "Chef|Baker|Waiter", "Pilot|Flight Attendant|Air Traffic Controller",
      "Astronaut|Rocket Scientist|Astronomer", "Farmer|Gardener|Fisherman", "Lawyer|Judge|Politician",
      "Engineer|Architect|Builder", "Programmer|Hacker|Data Scientist", "Painter|Sculptor|Artist",
      "Singer|Rapper|DJ", "Actor|Comedian|Magician", "Dentist|Optician|Pharmacist", "Plumber|Electrician|Mechanic",
      "Hairdresser|Barber|Makeup Artist", "Photographer|Videographer|Journalist", "News Anchor|Reporter|Blogger",
      "Taxi Driver|Bus Driver|Truck Driver", "Soldier|Spy|Bodyguard", "Veterinarian|Zookeeper|Dog Walker",
      "Librarian|Bookseller|Archivist", "Accountant|Banker|Cashier", "Influencer|YouTuber|Streamer",
      "Carpenter|Blacksmith|Welder", "Postman|Delivery Driver|Courier", "Scientist|Inventor|Lab Technician",
      "Tour Guide|Travel Agent|Hotel Receptionist", "Personal Trainer|Yoga Teacher|Coach",
      "Fashion Designer|Tailor|Model", "Psychologist|Therapist|Life Coach", "Clown|Mime|Juggler",
      "Pirate|Sailor|Captain", "Priest|Monk|Nun", "Butler|Maid|Nanny", "Referee|Umpire|Linesman",
      "Tattoo Artist|Piercer|Nail Technician", "Game Developer|App Developer|Web Designer"
    ]
  },
  {
    id: "sports", name: "Sports", icon: "⚽",
    words: [
      "Football|Rugby|American Football", "Basketball|Volleyball|Netball", "Cricket|Baseball|Softball",
      "Tennis|Badminton|Table Tennis", "Golf|Mini Golf|Croquet", "Swimming|Diving|Water Polo",
      "Boxing|Wrestling|MMA", "Skiing|Snowboarding|Ice Skating", "Cycling|Mountain Biking|BMX",
      "Marathon|Sprint|Relay Race", "Surfing|Skateboarding|Wakeboarding", "Yoga|Pilates|Stretching",
      "Chess|Checkers|Go", "Bowling|Billiards|Darts", "Hockey|Ice Hockey|Lacrosse", "Gymnastics|Ballet|Cheerleading",
      "Karate|Judo|Taekwondo", "Archery|Shooting|Javelin", "Formula 1|Rally|Motocross", "Horse Riding|Polo|Rodeo",
      "Rock Climbing|Bouldering|Hiking", "Fencing|Kendo|Sword Fighting", "Weightlifting|CrossFit|Powerlifting",
      "Kabaddi|Kho Kho|Tag", "Rowing|Kayaking|Canoeing", "Sailing|Windsurfing|Kitesurfing",
      "Squash|Racquetball|Pickleball", "Parkour|Free Running|Obstacle Course", "Esports|Video Games|Arcade",
      "Skydiving|Bungee Jumping|Paragliding", "Handball|Dodgeball|Ultimate Frisbee",
      "Long Jump|High Jump|Pole Vault", "Air Hockey|Foosball|Pinball"
    ]
  },
  {
    id: "movies", name: "Movies & Shows", icon: "🎬",
    words: [
      "Titanic|Pearl Harbor|The Notebook", "Harry Potter|Lord of the Rings|Narnia",
      "Star Wars|Star Trek|Guardians of the Galaxy", "Frozen|Tangled|Moana",
      "The Lion King|The Jungle Book|Madagascar", "Toy Story|Cars|Monsters, Inc.",
      "Shrek|Puss in Boots|Kung Fu Panda", "Avengers|Justice League|X-Men", "Spider-Man|Batman|Iron Man",
      "Jurassic Park|King Kong|Godzilla", "Friends|How I Met Your Mother|The Big Bang Theory",
      "The Office|Parks and Recreation|Brooklyn Nine-Nine", "Game of Thrones|House of the Dragon|The Witcher",
      "Breaking Bad|Narcos|Money Heist", "Stranger Things|Dark|Wednesday",
      "Squid Game|Alice in Borderland|The Hunger Games", "The Simpsons|Family Guy|South Park",
      "SpongeBob|Tom and Jerry|Looney Tunes", "Pokémon|Digimon|Yu-Gi-Oh!", "Naruto|One Piece|Dragon Ball",
      "Sherlock|Detective Conan|Scooby-Doo", "Fast & Furious|Mission: Impossible|James Bond",
      "Home Alone|Mrs. Doubtfire|The Grinch", "The Matrix|Inception|Interstellar",
      "Finding Nemo|Shark Tale|The Little Mermaid", "Barbie|Oppenheimer|Mean Girls",
      "Pirates of the Caribbean|Indiana Jones|The Mummy", "Minions|Despicable Me|Ice Age", "Rocky|Creed|Karate Kid",
      "The Godfather|Scarface|Goodfellas", "Peaky Blinders|Boardwalk Empire|The Sopranos",
      "Black Mirror|The Twilight Zone|Love, Death & Robots", "Grey's Anatomy|House M.D.|Scrubs",
      "Mr. Bean|Charlie Chaplin|Johnny English", "Twilight|The Vampire Diaries|True Blood", "Coco|Encanto|Up",
      "The Crown|Bridgerton|Downton Abbey", "The Last of Us|Arcane|Fallout"
    ]
  },
  {
    id: "characters", name: "Famous Characters", icon: "🦸",
    words: [
      "Batman|Superman|Iron Man", "Spider-Man|Ant-Man|Deadpool", "Harry Potter|Hermione Granger|Ron Weasley",
      "Mickey Mouse|Donald Duck|Goofy", "Mario|Luigi|Sonic", "Pikachu|Charmander|Jigglypuff",
      "Sherlock Holmes|Hercule Poirot|Detective Conan", "James Bond|Ethan Hunt|Jason Bourne", "Shrek|Fiona|Donkey",
      "Darth Vader|Voldemort|Thanos", "Elsa|Anna|Rapunzel", "Cinderella|Snow White|Sleeping Beauty",
      "SpongeBob|Patrick Star|Squidward", "Homer Simpson|Peter Griffin|Fred Flintstone",
      "Santa Claus|Easter Bunny|Tooth Fairy", "Dracula|Frankenstein|Werewolf",
      "Jack Sparrow|Captain Hook|Blackbeard", "Wonder Woman|Captain Marvel|Black Widow", "Hulk|Thor|Captain America",
      "Joker|Harley Quinn|Riddler", "Yoda|Gandalf|Dumbledore", "Pinocchio|Peter Pan|Tinker Bell",
      "Winnie the Pooh|Paddington|Garfield", "Buzz Lightyear|Woody|Jessie", "Goku|Naruto|Luffy",
      "Crash Bandicoot|Spyro|Pac-Man", "Lara Croft|Indiana Jones|Nathan Drake", "Tarzan|Mowgli|Robinson Crusoe",
      "Cleopatra|Queen Elizabeth|Marie Antoinette", "Robin Hood|Zorro|The Lone Ranger",
      "Alice in Wonderland|Dorothy|Wendy", "Minion|Smurf|Oompa Loompa", "Grinch|Scrooge|Krampus",
      "Chucky|Annabelle|M3GAN", "Doraemon|Hello Kitty|Totoro", "Bugs Bunny|Road Runner|Daffy Duck",
      "Rick Sanchez|Doc Brown|Professor X", "Stitch|Toothless|Sully"
    ]
  },
  {
    id: "countries", name: "Countries & Cities", icon: "🌍",
    words: [
      "Paris|London|Rome", "New York|Los Angeles|Chicago", "Tokyo|Seoul|Beijing", "India|Nepal|Sri Lanka",
      "Italy|Spain|Greece", "France|Belgium|Switzerland", "Germany|Austria|Netherlands", "Brazil|Argentina|Mexico",
      "Egypt|Morocco|Turkey", "Australia|New Zealand|Fiji", "Canada|USA|Alaska", "Dubai|Abu Dhabi|Doha",
      "Mumbai|Delhi|Bangalore", "Goa|Bali|Maldives", "Venice|Amsterdam|Bruges", "Las Vegas|Macau|Monaco",
      "Hollywood|Beverly Hills|Malibu", "Japan|China|South Korea", "Thailand|Vietnam|Indonesia",
      "Singapore|Hong Kong|Kuala Lumpur", "Iceland|Greenland|Norway", "Ireland|Scotland|Wales",
      "Kenya|Tanzania|South Africa", "Peru|Chile|Colombia", "Hawaii|Bahamas|Jamaica", "Antarctica|North Pole|Arctic",
      "Istanbul|Athens|Cairo", "Barcelona|Madrid|Lisbon", "Rio de Janeiro|Buenos Aires|Havana",
      "Sydney|Melbourne|Auckland", "San Francisco|Seattle|Silicon Valley", "Jaipur|Udaipur|Agra",
      "Kashmir|Ladakh|Shimla", "Berlin|Prague|Vienna", "Toronto|Vancouver|Montreal"
    ]
  },
  {
    id: "brands", name: "Brands & Apps", icon: "🏷️",
    words: [
      "Apple|Samsung|Google", "Nike|Adidas|Puma", "McDonald's|Burger King|KFC", "Coca-Cola|Pepsi|Sprite",
      "Starbucks|Costa Coffee|Dunkin'", "Instagram|TikTok|Snapchat", "WhatsApp|Telegram|Messenger",
      "YouTube|Netflix|Disney+", "Amazon|Flipkart|eBay", "Uber|Lyft|Ola", "Spotify|Apple Music|SoundCloud",
      "Tesla|BMW|Mercedes", "Lego|Barbie|Hot Wheels", "IKEA|Muji|Pottery Barn", "Google Maps|Waze|Apple Maps",
      "Facebook|Twitter|LinkedIn", "Zoom|Google Meet|Microsoft Teams", "PlayStation|Xbox|Nintendo",
      "Gucci|Prada|Louis Vuitton", "Rolex|Casio|Apple Watch", "Red Bull|Monster|Gatorade",
      "Nutella|Kinder|Ferrero Rocher", "Domino's|Pizza Hut|Papa John's", "Tinder|Bumble|Hinge", "Zara|H&M|Uniqlo",
      "Canon|Nikon|GoPro", "ChatGPT|Siri|Alexa", "Visa|Mastercard|PayPal", "Airbnb|Booking.com|Expedia",
      "Pinterest|Tumblr|Reddit", "Duolingo|Khan Academy|Coursera", "Ferrari|Lamborghini|Porsche",
      "Oreo|KitKat|Pringles", "Swiggy|Zomato|Uber Eats", "Disney|Pixar|DreamWorks", "Minecraft|Roblox|Fortnite"
    ]
  },
  {
    id: "music", name: "Music", icon: "🎸",
    words: [
      "Guitar|Bass Guitar|Ukulele", "Piano|Keyboard|Organ", "Drums|Tabla|Bongo", "Violin|Cello|Harp",
      "Trumpet|Saxophone|Trombone", "Flute|Clarinet|Recorder", "Rock|Metal|Punk", "Pop|K-pop|Disco",
      "Hip Hop|Rap|R&B", "Jazz|Blues|Soul", "Classical|Opera|Orchestra", "Reggae|Ska|Calypso",
      "Country|Folk|Bluegrass", "EDM|Techno|House", "Concert|Music Festival|Rave", "Karaoke|Talent Show|Open Mic",
      "Microphone|Speaker|Amplifier", "Choir|Band|A Cappella Group", "Vinyl Record|Cassette|CD",
      "Taylor Swift|Ariana Grande|Billie Eilish", "The Beatles|Queen|The Rolling Stones",
      "BTS|Blackpink|One Direction", "Michael Jackson|Elvis Presley|Prince", "Drake|Kanye West|Eminem",
      "Lullaby|Nursery Rhyme|Love Song", "National Anthem|Hymn|Theme Song", "Harmonica|Accordion|Bagpipes",
      "Sitar|Veena|Santoor", "DJ|Producer|Conductor", "Moshpit|Crowd Surfing|Headbanging",
      "Music Video|Album|Playlist", "Bruno Mars|The Weeknd|Ed Sheeran", "Doechii|Doja Cat|SZA"
    ]
  },
  {
    id: "hobbies", name: "Hobbies & Activities", icon: "🎨",
    words: [
      "Painting|Drawing|Sketching", "Reading|Writing|Journaling", "Cooking|Baking|Grilling",
      "Gardening|Farming|Bonsai", "Fishing|Hunting|Bird Watching", "Camping|Hiking|Backpacking",
      "Photography|Filming|Vlogging", "Knitting|Sewing|Embroidery", "Dancing|Zumba|Salsa",
      "Singing|Karaoke|Beatboxing", "Board Games|Card Games|Video Games", "Puzzles|Sudoku|Crosswords",
      "Shopping|Window Shopping|Thrifting", "Traveling|Road Trip|Cruise", "Meditation|Yoga|Breathing Exercises",
      "Pottery|Sculpting|Woodworking", "Magic Tricks|Juggling|Card Tricks",
      "Stargazing|Astrophotography|Cloud Watching", "Scuba Diving|Snorkeling|Swimming",
      "Skateboarding|Rollerblading|Scootering", "Collecting Stamps|Collecting Coins|Collecting Cards",
      "Origami|Paper Crafts|Scrapbooking", "Picnic|Barbecue|Potluck", "Napping|Sleeping|Daydreaming",
      "Binge-Watching|Movie Night|Netflix and Chill", "Gossiping|Texting|Video Calling",
      "Volunteering|Charity Run|Fundraising", "Graffiti|Street Art|Tattooing", "Lego Building|Model Trains|RC Cars",
      "Cosplay|Costume Party|Theatre", "Crochet|Macramé|Cross-Stitch"
    ]
  },
  {
    id: "vehicles", name: "Vehicles", icon: "🚗",
    words: [
      "Car|Taxi|Jeep", "Bus|Tram|Trolleybus", "Train|Metro|Monorail", "Airplane|Helicopter|Glider",
      "Bicycle|Tricycle|Unicycle", "Motorcycle|Scooter|Moped", "Boat|Yacht|Sailboat", "Ship|Ferry|Cruise Ship",
      "Submarine|Battleship|Aircraft Carrier", "Rocket|Space Shuttle|UFO", "Ambulance|Fire Truck|Police Car",
      "Tractor|Bulldozer|Excavator", "Truck|Van|Pickup Truck", "Hot Air Balloon|Blimp|Parachute",
      "Skateboard|Longboard|Roller Skates", "Canoe|Kayak|Raft", "Limousine|Sports Car|Convertible",
      "Auto Rickshaw|Cycle Rickshaw|Tuk-Tuk", "Cable Car|Ski Lift|Elevator", "Horse Carriage|Chariot|Sleigh",
      "Golf Cart|Go-Kart|Bumper Car", "Snowmobile|Sled|Skis", "Jet Ski|Speedboat|Hovercraft",
      "Segway|Electric Scooter|Hoverboard", "Camper Van|Caravan|Trailer", "Fighter Jet|Drone|Spy Plane",
      "Tank|Armored Car|Humvee"
    ]
  },
  {
    id: "clothes", name: "Clothes & Accessories", icon: "👕",
    words: [
      "T-shirt|Shirt|Polo Shirt", "Jeans|Trousers|Shorts", "Dress|Skirt|Gown", "Hoodie|Sweater|Jacket",
      "Sneakers|Boots|Sandals", "Hat|Cap|Beanie", "Scarf|Tie|Bow Tie", "Suit|Tuxedo|Blazer",
      "Pajamas|Bathrobe|Onesie", "Swimsuit|Bikini|Swim Trunks", "Socks|Stockings|Leggings",
      "Gloves|Mittens|Wristband", "Sunglasses|Goggles|Face Mask", "Saree|Lehenga|Salwar Kameez",
      "Kurta|Sherwani|Nehru Jacket", "Raincoat|Trench Coat|Poncho", "High Heels|Flip-Flops|Loafers",
      "Earrings|Nose Ring|Necklace", "Backpack|Handbag|Tote Bag", "Uniform|Lab Coat|Apron", "Crown|Tiara|Headband",
      "Belt|Suspenders|Waistcoat", "Wedding Dress|Veil|Prom Dress", "Kimono|Robe|Toga", "Wig|Hair Clip|Hairband",
      "Watch|Bracelet|Ring", "Cape|Cloak|Shawl", "Overalls|Jumpsuit|Dungarees", "Tank Top|Crop Top|Vest",
      "Costume|Mask|Halloween Outfit"
    ]
  },
  {
    id: "nature", name: "Nature & Weather", icon: "🌋",
    words: [
      "Rain|Snow|Hail", "Thunderstorm|Lightning|Tornado", "Rainbow|Sunset|Aurora", "Sun|Moon|Stars",
      "Volcano|Earthquake|Tsunami", "Mountain|Hill|Cliff", "River|Waterfall|Stream", "Ocean|Sea|Lake",
      "Forest|Jungle|Rainforest", "Desert|Dune|Oasis", "Cave|Tunnel|Canyon", "Island|Beach|Coral Reef",
      "Glacier|Iceberg|Avalanche", "Fog|Mist|Cloud", "Wind|Breeze|Hurricane", "Rose|Tulip|Lily",
      "Tree|Palm Tree|Christmas Tree", "Grass|Moss|Leaves", "Cactus|Aloe Vera|Succulent", "Mushroom|Fern|Toadstool",
      "Wildfire|Campfire|Bonfire", "Rock|Pebble|Boulder", "Sand|Mud|Clay", "Swamp|Marsh|Pond",
      "Sunflower|Daisy|Dandelion", "Bamboo|Sugarcane|Coconut Tree", "Comet|Meteor|Shooting Star",
      "Eclipse|Full Moon|Supermoon", "Heatwave|Drought|Monsoon", "Spring|Summer|Autumn", "Winter|Snowfall|Blizzard",
      "Lotus|Water Lily|Orchid", "High Tide|Low Tide|Wave"
    ]
  },
  {
    id: "tech", name: "Tech & Internet", icon: "💻",
    words: [
      "Laptop|Desktop Computer|Tablet", "Smartphone|Flip Phone|Smartwatch", "Wi-Fi|Bluetooth|Hotspot",
      "Password|PIN|Fingerprint", "Email|Text Message|Voice Note", "Selfie|Group Photo|Photo Booth",
      "Meme|GIF|Sticker", "Emoji|Hashtag|Mention", "Virus|Malware|Spam", "Robot|Android|Cyborg",
      "Drone|RC Plane|Satellite", "Video Call|Phone Call|Voice Chat", "Podcast|Audiobook|Radio",
      "Livestream|Story|Reel", "USB Drive|Hard Drive|SD Card", "Printer|Scanner|Photocopier",
      "Mouse|Trackpad|Touchscreen", "Virtual Reality|Augmented Reality|Hologram",
      "Artificial Intelligence|Chatbot|Voice Assistant", "Google Drive|Dropbox|iCloud",
      "Online Shopping|Food Delivery|Cash on Delivery", "Bitcoin|NFT|Stock Market", "Video Game|Mobile Game|App",
      "Scam Call|Scam Email|Phishing", "Like|Comment|Share", "Dark Mode|Airplane Mode|Silent Mode",
      "Screenshot|Screen Recording|Photo", "Notification|Alarm|Reminder",
      "Charging Cable|Wireless Charger|Power Bank", "Keyboard|Typewriter|Stylus", "Low Battery|No Signal|Buffering",
      "CAPTCHA|Two-Factor Code|Password Reset"
    ]
  },
  {
    id: "school", name: "School & Work", icon: "🎒",
    words: [
      "Homework|Assignment|Project", "Exam|Quiz|Interview", "Principal|Headmaster|Dean",
      "Blackboard|Whiteboard|Projector", "Lunch Box|Pencil Case|Backpack", "Classroom|Lecture Hall|Lab",
      "Library|Study Room|Reading Room", "Recess|Lunch Break|Free Period", "Report Card|Certificate|Diploma",
      "Graduation|Prom|Farewell", "School Bus|Carpool|School Van", "Detention|Suspension|Warning",
      "Field Trip|Picnic|Excursion", "Calculator|Ruler|Protractor", "Eraser|Sharpener|Correction Pen",
      "Science Fair|Art Exhibition|Sports Day", "Meeting|Conference|Seminar", "Boss|Manager|CEO",
      "Promotion|Salary Raise|Bonus", "Resume|Cover Letter|Portfolio", "Deadline|Overtime|Night Shift",
      "Coffee Break|Tea Break|Smoke Break", "Presentation|Speech|Pitch", "Spreadsheet|Document|Slides",
      "Intern|Trainee|Apprentice", "Office Party|Team Outing|Team Building", "Monday|Friday|Sunday",
      "Work From Home|Office|Coworking Space", "Email|Memo|Notice Board", "ID Card|Badge|Uniform",
      "Cafeteria|Canteen|Food Court", "Group Project|Study Group|Lab Partner",
      "Plagiarism|Cheat Sheet|Copying Homework"
    ]
  },
  {
    id: "events", name: "Holidays & Events", icon: "🎉",
    words: [
      "Christmas|New Year|Thanksgiving", "Halloween|Day of the Dead|Carnival", "Birthday|Anniversary|Name Day",
      "Wedding|Engagement|Reception", "Diwali|Holi|Navratri", "Eid|Ramadan|Iftar", "Easter|Passover|Good Friday",
      "Valentine's Day|Date Night|Proposal", "Graduation|Convocation|Farewell", "Funeral|Memorial|Wake",
      "Bachelor Party|Bachelorette Party|Sangeet", "Baby Shower|Gender Reveal|Naming Ceremony",
      "Olympics|World Cup|IPL", "Concert|Festival|Parade", "Fireworks|Bonfire|Lanterns",
      "Sleepover|Slumber Party|Camping Trip", "Surprise Party|Pool Party|House Party",
      "Housewarming|Dinner Party|Potluck", "Mother's Day|Father's Day|Teachers' Day",
      "Chinese New Year|Mid-Autumn Festival|Dragon Boat Festival", "Independence Day|Republic Day|Fourth of July",
      "Oktoberfest|Beer Festival|Wine Tasting", "Comic-Con|Fan Meet|Book Fair",
      "Job Interview|First Day at Work|Exam Day", "Raksha Bandhan|Bhai Dooj|Karwa Chauth",
      "April Fools' Day|Prank|Practical Joke", "Black Friday|Big Sale|Clearance Sale",
      "Pride Parade|Street Parade|Mardi Gras", "Ganesh Chaturthi|Durga Puja|Onam", "Road Trip|Vacation|Staycation",
      "Family Reunion|Class Reunion|Alumni Meet"
    ]
  },
  {
    id: "fantasy", name: "Fantasy & Sci-fi", icon: "🐉",
    words: [
      "Dragon|Dinosaur|Griffin", "Unicorn|Pegasus|Centaur", "Wizard|Witch|Warlock", "Vampire|Werewolf|Zombie",
      "Ghost|Spirit|Poltergeist", "Mermaid|Siren|Merman", "Fairy|Elf|Pixie", "Dwarf|Gnome|Hobbit",
      "Giant|Troll|Ogre", "Alien|UFO|Martian", "Robot|Cyborg|Android", "Time Machine|Teleporter|Portal",
      "Magic Wand|Spell Book|Crystal Ball", "Phoenix|Firebird|Thunderbird", "Kraken|Sea Serpent|Leviathan",
      "Telekinesis|Mind Reading|Invisibility", "Invisibility Cloak|Flying Carpet|Magic Ring",
      "Haunted Castle|Haunted House|Graveyard", "Genie|Magic Lamp|Three Wishes",
      "Spaceship|Space Station|Mothership", "Lightsaber|Laser Gun|Ray Gun",
      "Zombie Apocalypse|Alien Invasion|Robot Uprising", "Treasure Chest|Pirate Map|Gold Coins",
      "Mummy|Skeleton|Ghoul", "Goblin|Imp|Gremlin", "Knight|Samurai|Ninja", "Princess|Queen|Empress",
      "Potion|Elixir|Poison", "Bigfoot|Yeti|Loch Ness Monster", "Parallel Universe|Multiverse|Time Travel",
      "Superhero|Villain|Sidekick", "Medusa|Minotaur|Cyclops"
    ]
  },
  {
    id: "desi", name: "Desi Life", icon: "🪔",
    words: [
      "Biryani|Pulao|Khichdi", "Samosa|Kachori|Pakora", "Chai|Filter Coffee|Lassi", "Dosa|Idli|Uttapam",
      "Pani Puri|Bhel Puri|Sev Puri", "Butter Chicken|Paneer Tikka|Tandoori Chicken", "Roti|Naan|Paratha",
      "Gulab Jamun|Rasgulla|Jalebi", "Ladoo|Barfi|Kaju Katli", "Rangoli|Mehndi|Diya",
      "Auto Rickshaw|Cycle Rickshaw|Tempo", "Gully Cricket|IPL|Test Match", "Dhaba|Chai Tapri|Food Stall",
      "Baraat|Sangeet|Haldi", "Pressure Cooker|Tiffin Box|Steel Glass", "Antakshari|Dumb Charades|Housie",
      "Carrom|Ludo|Snakes and Ladders", "Kite Flying|Gilli Danda|Kanche", "Local Train|Indian Railways|Sleeper Bus",
      "Sharma Ji ka Beta|Nosy Aunty|Distant Relative", "Thandai|Jaljeera|Nimbu Pani", "Pav Bhaji|Vada Pav|Misal Pav",
      "Maggi|Instant Noodles|Hakka Noodles", "Bollywood Song|Item Number|Qawwali", "Saree|Lehenga|Dupatta",
      "Temple|Gurudwara|Pilgrimage", "Ayurveda|Yoga|Home Remedy", "Monsoon|Rainy Day|Waterlogging",
      "Power Cut|Inverter|Generator", "Tuition|Coaching Class|JEE Prep", "Chole Bhature|Rajma Chawal|Dal Makhani",
      "Paan|Supari|Mukhwas", "Kulfi|Falooda|Rabri", "Holi Colours|Water Balloon|Pichkari", "Shaadi|Engagement|Roka",
      "Kabaddi|Wrestling|Akhada", "Bargaining|Window Shopping|Sale", "UPI|Paytm|PhonePe",
      "Blinkit|Zepto|Swiggy Instamart", "Jugaad|Desi Hack|Quick Fix"
    ]
  },
  {
    id: "bollywood", name: "Bollywood & Desi TV", icon: "🎥",
    words: [
      "DDLJ|Kuch Kuch Hota Hai|Kabhi Khushi Kabhie Gham", "3 Idiots|PK|Munna Bhai MBBS", "Sholay|Deewaar|Zanjeer",
      "Lagaan|Chak De! India|Dangal", "Sultan|Bhaag Milkha Bhaag|Mary Kom", "Shah Rukh Khan|Salman Khan|Aamir Khan",
      "Amitabh Bachchan|Rajinikanth|Dharmendra", "Deepika Padukone|Alia Bhatt|Katrina Kaif",
      "Priyanka Chopra|Kareena Kapoor|Anushka Sharma", "Ranveer Singh|Ranbir Kapoor|Varun Dhawan",
      "Hrithik Roshan|Tiger Shroff|Shahid Kapoor", "Ajay Devgn|Sunny Deol|Akshay Kumar", "Krrish|Ra.One|Mr. India",
      "Don|Dhoom|Race", "Hera Pheri|Golmaal|Welcome",
      "Zindagi Na Milegi Dobara|Dil Chahta Hai|Yeh Jawaani Hai Deewani", "Baahubali|RRR|KGF",
      "Devdas|Bajirao Mastani|Padmaavat", "Kabir Singh|Animal|Arjun Reddy", "Queen|English Vinglish|Piku",
      "Gully Boy|Rock On!!|Rockstar", "Andhadhun|Drishyam|Kahaani", "Om Shanti Om|Main Hoon Na|Happy New Year",
      "Jab We Met|Love Aaj Kal|Cocktail", "Taare Zameen Par|Stanley Ka Dabba|Chhichhore",
      "Stree|Bhool Bhulaiyaa|Bhediya", "Pathaan|Tiger|War", "Gangs of Wasseypur|Mirzapur|Sacred Games",
      "Kaun Banega Crorepati|Bigg Boss|The Kapil Sharma Show", "Mogambo|Gabbar Singh|Crime Master Gogo",
      "Arijit Singh|Sonu Nigam|Atif Aslam", "Shreya Ghoshal|Lata Mangeshkar|Sunidhi Chauhan",
      "Item Song|Sad Song|Wedding Song", "Dhurandhar|Chhaava|Saiyaara", "Kantara|Pushpa 2|Jawan"
    ]
  },
  {
    id: "china", name: "Laowai Life in China", icon: "🏮",
    words: [
      "WeChat Pay|Alipay|UnionPay", "WeChat|QQ|WhatsApp", "VPN|Great Firewall|Proxy", "Didi|Taxi|Uber",
      "Meituan|Ele.me|Delivery Rider", "Taobao|Pinduoduo|JD.com", "Xiaohongshu|Bilibili|Weibo",
      "Douyin|TikTok|Kuaishou", "Hot Pot|Malatang|Dry Pot", "Dim Sum|Yum Cha|Dumplings", "Xiaolongbao|Jiaozi|Baozi",
      "Jianbing|Roujiamo|Youtiao", "Peking Duck|Roast Goose|Char Siu", "Congee|Rice Noodle Roll|Wonton Noodles",
      "Bubble Tea|Heytea|Mixue", "Luckin Coffee|Starbucks|Cotti Coffee", "Baijiu|Tsingtao Beer|Rice Wine",
      "KTV|Bar Street|Club", "Jubensha|Escape Room|Werewolf", "Chopsticks|Soup Spoon|Toothpick",
      "Squat Toilet|Western Toilet|Public Toilet", "Hot Water|Warm Water|Thermos",
      "High-Speed Rail|Metro|Sleeper Train", "Shared Bike|E-bike|Scooter",
      "Power Bank Rental|Charging Station|Phone Charger", "Delivery Locker|Express Station|Courier",
      "QR Code|Mini Program|Scan to Pay", "Residence Permit|Visa|Passport",
      "Police Registration|Visa Extension|Immigration Office", "HSK Exam|Chinese Class|Language Partner",
      "Pinyin|Chinese Characters|Tones", "Mandarin|Cantonese|Hokkien", "Ni Hao|Xie Xie|Mei Wenti",
      "Laowai|Expat|Exchange Student", "Dorm|International Student Office|Campus Gate",
      "Canteen|Food Court|Night Market", "Photo Request from Locals|Selfie Stick|Tour Group",
      "Spring Festival|Lantern Festival|Mid-Autumn Festival", "Red Envelope|Firecrackers|Spring Couplets",
      "Mooncake|Zongzi|Tangyuan", "Golden Week|Chunyun|Long Weekend", "Square Dancing|Tai Chi|Morning Exercise",
      "Typhoon|Rainstorm|Humidity", "Haggling|Group Buying|Livestream Shopping", "Sam's Club|Hema|Walmart",
      "FamilyMart|7-Eleven|Lawson", "Chinese Medicine|Acupuncture|Cupping", "Kung Fu|Wushu|Shaolin",
      "Mahjong|Chinese Chess|Dou Dizhu", "Panda|Red Panda|Golden Monkey",
      "Great Wall|Forbidden City|Terracotta Army", "Dragon Dance|Lion Dance|Dragon Boat Race",
      "Chinese Name|English Name|Nickname", "Group Chat|WeChat Moments|Voice Message",
      "Pleco|Translation App|Pinyin Keyboard", "Facial Recognition|Fingerprint|ID Card", "Amap|Baidu Maps|Google Maps"
    ]
  },
  {
    id: "gba", name: "Shenzhen · HK · Macau", icon: "🌉",
    words: [
      "Shenzhen|Guangzhou|Dongguan", "Hong Kong|Kowloon|New Territories", "Zhuhai|Macau|Hengqin",
      "Futian Checkpoint|Lo Wu|Shenzhen Bay Port", "Border Crossing|Customs|Immigration",
      "Octopus Card|Shenzhen Tong|AlipayHK", "MTR|Shenzhen Metro|Light Rail", "Star Ferry|Ding Ding Tram|Peak Tram",
      "Victoria Peak|Lion Rock|Dragon's Back", "Victoria Harbour|Avenue of Stars|Symphony of Lights",
      "Lan Kwai Fong|Soho|Wan Chai", "Mong Kok|Temple Street Night Market|Ladies' Market",
      "Causeway Bay|Tsim Sha Tsui|Central", "Hong Kong Disneyland|Ocean Park|Window of the World",
      "Big Buddha|Ngong Ping Cable Car|Lantau Island", "Cheung Chau|Lamma Island|Peng Chau",
      "Venetian Macao|Casino|Cotai Strip", "Ruins of St. Paul's|Senado Square|Macau Tower",
      "Portuguese Egg Tart|Pork Chop Bun|Almond Cookie", "Hong Kong Milk Tea|Yuenyeung|Lemon Tea",
      "Pineapple Bun|Egg Waffle|Egg Tart", "Cha Chaan Teng|Dai Pai Dong|Dim Sum Restaurant",
      "Roast Goose|Char Siu|Siu Yuk", "Curry Fish Balls|Siu Mai|Fish Balls",
      "Hong Kong–Zhuhai–Macau Bridge|Tsing Ma Bridge|Shenzhen Bay Bridge",
      "High-Speed Rail to Hong Kong|Cross-Border Bus|Ferry to Macau", "Canton Tower|Ping An Finance Centre|IFC",
      "Huaqiangbei|Sham Shui Po|Golden Computer Arcade", "Shenzhen Bay Park|Lianhuashan Park|Shekou",
      "OCT Loft|Dafen Oil Painting Village|Shuiwei Village", "Dameisha|Xiaomeisha|Repulse Bay",
      "Duty Free|Outlet Mall|Shopping Spree", "Hong Kong Sevens|Happy Valley Races|Dragon Boat Race",
      "Typhoon Signal 8|Black Rainstorm|Red Rainstorm", "Two Phones|Two SIM Cards|Roaming", "HKD|RMB|MOP",
      "Cantonese|Mandarin|English", "Chungking Mansions|Mirador Mansion|Hostel", "Stanley Market|Shek O|Sai Kung",
      "Chimelong Safari Park|Chimelong Ocean Kingdom|Zoo", "Canton Fair|Trade Show|Expo"
    ]
  },
  {
    id: "brainrot", name: "Brainrot", icon: "🧠",
    words: [
      "Skibidi Toilet|Cameraman|Speakerman", "Rizz|Aura|Drip", "Sigma|Alpha|Beta", "Ohio|Florida Man|Cursed",
      "Fanum Tax|Food Thief|Snack Steal", "Mewing|Looksmaxxing|Mogging",
      "Aura Points|Aura Farming|Main Character Energy", "Delulu|Copium|Manifesting", "NPC|Main Character|Side Quest",
      "Six Seven|Skibidi|Sigma Boy", "Tralalero Tralala|Bombardiro Crocodilo|Tung Tung Tung Sahur",
      "Ballerina Cappuccina|Cappuccino Assassino|Chimpanzini Bananini",
      "Brr Brr Patapim|Lirili Larila|Boneca Ambalabu", "Cooked|Washed|Fumbled", "Yapping|Glazing|Waffling",
      "No Cap|Fr Fr|On God", "Bussin|Slaps|Hits Different", "It's Giving|Slay|Ate", "Lowkey|Highkey|Deadass",
      "Mid|Goated|Peak", "W|L|Ratio", "Sus|Impostor|Among Us", "Grimace Shake|Prime Drink|Dubai Chocolate",
      "Baby Gronk|Rizzler|Livvy Dunne", "Chill Guy|Moo Deng|Pedro Raccoon", "Pookie|Bestie|Bae",
      "Bed Rotting|Doomscrolling|Touch Grass", "iPad Kid|Brainrot|Screen Time", "Clanker|Robot|AI Slop",
      "Chopped|Mogged|Fell Off", "Unc|Boomer|Old Head", "Gen Alpha|Gen Z|Millennial", "Sheesh|Bruh|Oof",
      "Skull Emoji|Crying Emoji|Clown Emoji", "Ick|Red Flag|Beige Flag", "Hard Launch|Soft Launch|Photo Dump",
      "Edit|Fancam|Stan", "Vine Boom|Bruh Sound|Metal Pipe Falling", "Roman Empire|Girl Dinner|Girl Math",
      "Very Demure|Very Mindful|Brat Summer", "Labubu|Sonny Angel|Jellycat", "Gatekeeping|Gaslighting|Girlbossing",
      "Crash Out|Tweaking|Lost It", "Larping|Pretending|Faking It",
      "Nihilist Penguin|Jimothy the Raccoon|Grumpy Cat", "Bop|Banger|Earworm"
    ]
  },
  {
    id: "popnow", name: "Pop Culture Now", icon: "🔥",
    words: [
      "KPop Demon Hunters|Huntrix|Saja Boys", "Golden|Soda Pop|Your Idol", "Labubu|Pop Mart|Blind Box",
      "Taylor Swift|Sabrina Carpenter|Olivia Rodrigo", "Espresso|Manchild|Please Please Please",
      "APT.|Die With a Smile|Birds of a Feather", "Bad Bunny|Shakira|Karol G", "Kendrick Lamar|Drake|Travis Scott",
      "Charli xcx|Chappell Roan|Billie Eilish", "BLACKPINK|BTS|Stray Kids", "Rosé|Lisa|Jennie",
      "Stranger Things 5|Wednesday Season 2|Squid Game 3", "The White Lotus|Severance|The Bear",
      "Wicked: For Good|Moana 2|Zootopia 2", "A Minecraft Movie|Chicken Jockey|Lava Chicken",
      "Superman|Fantastic Four|Thunderbolts", "Sinners|Nosferatu|Weapons",
      "Avatar: Fire and Ash|Avatar|Dune: Part Two", "Ne Zha 2|Black Myth: Wukong|Kung Fu Panda",
      "GTA 6|Red Dead Redemption|Cyberpunk 2077", "Nintendo Switch 2|PS5|Steam Deck",
      "Hollow Knight: Silksong|Hades II|Elden Ring", "Grow a Garden|Steal a Brainrot|99 Nights in the Forest",
      "Marvel Rivals|Fortnite|Valorant", "IShowSpeed|Kai Cenat|MrBeast",
      "Beast Games|Squid Game: The Challenge|Survivor", "ChatGPT|Gemini|Claude",
      "Ghibli AI Trend|Nano Banana|AI Action Figure", "Sora|Veo|AI Video",
      "World Cup 2026|Club World Cup|Champions League", "Messi|Ronaldo|Mbappé", "Lamine Yamal|Haaland|Vinícius Jr",
      "Super Bowl Halftime|Met Gala|Grammys", "Oscars|Coachella|Golden Globes",
      "Love Island|Too Hot to Handle|The Bachelor", "Dubai Chocolate|Matcha Latte|Crumbl Cookies",
      "Matcha|Ube|Pistachio", "Stanley Cup|Owala|Hydro Flask", "Adidas Sambas|Crocs|New Balance 530",
      "Pickleball|Padel|Run Club", "Ozempic|Protein Shake|Cold Plunge", "Threads|Bluesky|X",
      "TikTok Shop|Temu|Shein", "Pedro Pascal|Timothée Chalamet|Zendaya", "Tom Holland|Jacob Elordi|Austin Butler",
      "Coldplay Kiss Cam|Jumbotron|Concert Proposal", "Eras Tour|World Tour|Stadium Concert",
      "F1 Movie|Drive to Survive|Grand Prix", "Spider-Man: Brand New Day|Toy Story 5|The Super Mario Galaxy Movie",
      "The Odyssey|Project Hail Mary|Michael", "The Devil Wears Prada 2|Freakier Friday|Legally Blonde",
      "Forza Horizon 6|Mario Kart World|Gran Turismo", "Brookhaven|Blox Fruits|Dress to Impress",
      "Ella Langley|Morgan Wallen|Zach Bryan"
    ]
  },
  {
    id: "greek", name: "Greek Life", icon: "🇬🇷",
    words: [
      "Gyros|Souvlaki|Bifteki", "Koulouri|Bougatsa|Croissant", "Spanakopita|Tiropita|Kreatopita",
      "Moussaka|Pastitsio|Lasagna", "Tzatziki|Taramasalata|Tirokafteri", "Greek Salad|Dakos|Horta",
      "Feta|Halloumi|Graviera", "Saganaki|Keftedes|Zucchini Fritters", "Gemista|Dolmades|Cabbage Rolls",
      "Fasolada|Fakes|Avgolemono", "Loukoumades|Baklava|Galaktoboureko", "Olive Oil|Kalamata Olives|Olive Tree",
      "Grilled Octopus|Calamari|Sardines", "Greek Yogurt|Rizogalo|Galatopita",
      "Frappé|Freddo Espresso|Freddo Cappuccino", "Greek Coffee|Coffee Cup Reading|Briki", "Ouzo|Tsipouro|Mastiha",
      "Retsina|Metaxa|Mythos Beer", "Taverna|Ouzeri|Psistaria", "Kafeneio|Kafeteria|Bougatsadiko",
      "Periptero|Mini Market|Tobacco Shop", "Laiki|Fish Market|Flea Market", "Fournos|Zacharoplasteio|Souvlatzidiko",
      "Yiayia|Papou|Theia", "Name Day|Birthday|Baptism", "Mati|Ftou Ftou|Garlic Charm",
      "Komboloi|Rosary|Stress Ball", "Tavli|Prefa|Biriba", "Siesta|Quiet Hours|Late Lunch",
      "Volta|Night Out|Bar Hopping", "Bouzoukia|Rebetiko Bar|Beach Bar",
      "Plate Smashing|Throwing Carnations|Napkin Throwing", "Sirtaki|Zeibekiko|Kalamatianos",
      "Bouzouki|Baglamas|Lyra", "Greek Easter|Clean Monday|Apokries", "Red Eggs|Tsougrisma|Lambades",
      "Lamb on the Spit|Kokoretsi|Magiritsa", "Vasilopita|Tsoureki|Melomakarona", "Kourabiedes|Koulourakia|Loukoumi",
      "Panigiri|Greek Wedding|Glendi", "Ferry|Catamaran|Flying Dolphin", "Island Hopping|Road Trip|Camping",
      "Mykonos|Santorini|Paros", "Crete|Rhodes|Corfu", "Athens|Thessaloniki|Patras", "Athens Metro|KTEL Bus|Tram",
      "Strike|Protest|Road Closure", "Olympiacos|Panathinaikos|AEK",
      "Giannis Antetokounmpo|Stefanos Tsitsipas|Maria Sakkari", "Laiko|Rebetiko|Greek Pop",
      "Siga Siga|Greek Time|Avrio", "Opa|Yamas|Ela", "Moped|Vespa|Quad Bike", "Rakettes|Beach Volleyball|Frisbee",
      "Balcony|Rooftop|Courtyard", "Sunbed|Beach Umbrella|Beach Towel"
    ]
  },
  {
    id: "science", name: "Science & Space", icon: "🚀",
    words: [
      "Planet|Moon|Asteroid", "Mars|Venus|Mercury", "Saturn|Jupiter|Neptune", "Black Hole|Wormhole|Supernova",
      "Galaxy|Milky Way|Nebula", "Astronaut|Alien|Cosmonaut", "Telescope|Microscope|Magnifying Glass",
      "Atom|Molecule|Cell", "DNA|Gene|Chromosome", "Gravity|Magnetism|Friction", "Fossil|Amber|Dinosaur Bone",
      "Electricity|Lightning|Static Shock", "Magnet|Compass|Battery", "Rocket|Satellite|Space Probe",
      "Oxygen|Hydrogen|Carbon Dioxide", "Vaccine|Antibiotic|Painkiller", "Laboratory|Observatory|Planetarium",
      "Einstein|Newton|Nikola Tesla", "Laser|X-ray|Ultrasound", "Solar Panel|Wind Turbine|Dam",
      "Evolution|Big Bang|Climate Change", "3D Printer|Laser Cutter|Robot Arm", "Petri Dish|Test Tube|Beaker",
      "Periodic Table|Formula|Equation", "Brain|Heart|Lungs", "Skeleton|Skull|Ribcage", "Bacteria|Virus|Fungus",
      "Moon Landing|Mars Rover|Space Walk", "Thermometer|Barometer|Stopwatch"
    ]
  },
  {
    id: "party", name: "Party Night", icon: "🍸",
    words: [
      "Hangover|Headache|Jet Lag", "Selfie|Group Photo|Boomerang", "Karaoke|Dance Floor|DJ Booth",
      "Beer Pong|Flip Cup|Drinking Game", "Truth or Dare|Never Have I Ever|Spin the Bottle",
      "Tequila Shot|Vodka Shot|Jägerbomb", "Uber Home|Night Taxi|Last Metro", "Bouncer|Bartender|DJ",
      "Dance-off|Rap Battle|Lip Sync Battle", "Ex|Crush|Situationship", "Blind Date|Speed Dating|Dating App",
      "Afterparty|Pregame|House Party", "Toast|Speech|Cheers", "Midnight Snack|Pizza at 3 AM|Late-Night Kebab",
      "Glow Sticks|Neon Lights|Disco Ball", "Sangria|Punch Bowl|Jungle Juice", "Dress Code|Theme Party|Costume",
      "Wingman|Third Wheel|Plus One", "Drunk Text|Late-Night Call|Story at 3 AM", "Group Chat|Gossip|Spill the Tea",
      "Hookah Lounge|Rooftop Bar|Beach Club", "Birthday Bumps|Cake Smash|Surprise Party",
      "Ice Bucket Challenge|TikTok Dance|Viral Challenge", "Poker Night|Game Night|Movie Night",
      "Road Trip|Weekend Getaway|Goa Trip", "Breakup|Ghosting|Friend Zone", "Flirting|Pickup Line|Wink",
      "Limbo|Conga Line|Macarena", "Fake ID|VIP Pass|Guest List", "Slow Dance|Salsa|Tango",
      "Silent Disco|Foam Party|Glow Party"
    ]
  },
  {
    id: "kids", name: "Kids (Easy)", icon: "🧃", off: true,
    words: [
      "Cat|Dog|Rabbit", "Apple|Banana|Orange", "Ball|Balloon|Bubble", "Car|Bus|Truck", "Sun|Moon|Star",
      "Ice Cream|Cake|Candy", "Teddy Bear|Doll|Toy Car", "Fish|Duck|Frog", "Pizza|Sandwich|Burger",
      "Rainbow|Cloud|Rain", "Tree|Flower|Grass", "Bed|Pillow|Blanket", "Shoe|Sock|Slipper", "Hat|Cap|Crown",
      "Milk|Juice|Water", "Book|Crayon|Pencil", "Swing|Slide|Seesaw", "Butterfly|Bee|Ladybug",
      "Elephant|Giraffe|Hippo", "Lion|Tiger|Bear", "Snowman|Snowball|Igloo", "Robot|Rocket|Spaceship",
      "Pirate|Princess|Superhero", "Birthday|Party|Present", "Train|Airplane|Boat", "School|Playground|Park",
      "Doctor|Teacher|Firefighter", "Cookie|Donut|Cupcake", "Monkey|Panda|Koala", "Toothbrush|Soap|Towel",
      "Bath|Shower|Swimming Pool", "Dinosaur|Dragon|Monster"
    ]
  }
];

/* Open questions that work for almost any secret word (Questions play style). */
window.QUESTION_IDEAS = [
  "Would you take a first date there / with it?", "How much does it cost, roughly?",
  "Is it something you'd find at home?", "What colour do you picture when you think of it?",
  "When did you last come across it?", "Would a kid like it?", "Is it bigger than a fridge?",
  "Would you post it on Instagram?", "Is it noisy or quiet?", "Could you take it on a plane?",
  "Is it more of a day thing or a night thing?", "Would your grandparents know it?", "Does it smell good?",
  "Is it something you'd do or something you'd see?", "Would you go there or use it alone?",
  "What season fits it best?", "Is it fancy or everyday?", "Would you find it in a movie?",
  "How would you feel if you saw it right now?", "What's the worst thing about it?",
  "Is it popular in your country?", "Would you gift it to someone?", "Could it be dangerous?",
  "Would you need special clothes for it?", "Is it older than 100 years?", "Does it need electricity?",
  "Would you find it in a city or in nature?", "What would a dog think of it?",
  "Is it something people argue about?", "How often do you think about it?"
];

/*
 * Easy mode: hand-picked pairs per category where BOTH words are everyday
 * things almost anyone knows. "Everyday words" games draw only from these
 * (plus words the players added themselves). "all" = every entry is easy.
 */
window.EASY_PAIRS = {
  places: [
    "Beach|Swimming Pool", "Airport|Train Station", "Hospital|Pharmacy", "School|Library", "Supermarket|Mall",
    "Cinema|Theater", "Restaurant|Cafe", "Gym|Stadium", "Zoo|Aquarium", "Hotel|Hostel", "Park|Garden",
    "Bank|Post Office", "Farm|Zoo", "Office|Factory", "Church|Temple", "Bakery|Ice Cream Shop",
    "Prison|Police Station", "Castle|Palace", "Island|Desert", "Playground|Park"
  ],
  food: [
    "Pizza|Burger", "Sushi|Dumplings", "Pancakes|Waffles", "Ice Cream|Popsicle", "Chocolate|Candy",
    "Hot Dog|Sandwich", "Pasta|Noodles", "Cake|Cupcake", "Cookie|Biscuit", "Popcorn|Chips", "French Fries|Potato",
    "Apple|Pear", "Banana|Mango", "Strawberry|Cherry", "Orange|Lemon", "Watermelon|Melon", "Egg|Omelette",
    "Cheese|Butter", "Bread|Toast", "Donut|Bagel", "Fried Chicken|Chicken Nuggets", "Rice|Fried Rice",
    "Tomato|Cucumber", "Honey|Jam", "Salad|Soup", "Grapes|Blueberries", "Fish and Chips|Fish Fingers",
    "Mac and Cheese|Cheese Toastie", "Falafel|Shawarma"
  ],
  drinks: [
    "Coffee|Tea", "Beer|Wine", "Orange Juice|Apple Juice", "Milkshake|Smoothie", "Water|Sparkling Water",
    "Cola|Lemonade", "Milk|Yogurt Drink", "Hot Chocolate|Coffee", "Bubble Tea|Iced Tea", "Latte|Cappuccino",
    "Champagne|Wine", "Energy Drink|Cola", "Cocktail|Mocktail", "Coconut Water|Water", "Vodka|Whiskey"
  ],
  animals: [
    "Dog|Cat", "Lion|Tiger", "Elephant|Hippo", "Giraffe|Zebra", "Monkey|Gorilla", "Horse|Donkey", "Cow|Sheep",
    "Pig|Goat", "Chicken|Duck", "Eagle|Owl", "Parrot|Peacock", "Penguin|Seal", "Dolphin|Whale", "Shark|Dolphin",
    "Snake|Lizard", "Crocodile|Snake", "Turtle|Snail", "Frog|Fish", "Rabbit|Hamster", "Mouse|Rat", "Bear|Panda",
    "Kangaroo|Koala", "Bee|Butterfly", "Ant|Spider", "Mosquito|Fly", "Camel|Horse", "Polar Bear|Penguin",
    "Pigeon|Crow", "Ostrich|Emu", "Seahorse|Starfish", "Bee|Wasp"
  ],
  objects: [
    "Umbrella|Raincoat", "Scissors|Knife", "Toothbrush|Comb", "Pen|Pencil", "Watch|Clock", "Wallet|Backpack",
    "Key|Lock", "Glasses|Sunglasses", "Candle|Flashlight", "Mirror|Window", "Book|Newspaper", "Phone|Tablet",
    "Headphones|Speaker", "Remote Control|Keyboard", "Pillow|Blanket", "Balloon|Kite", "Camera|Telescope",
    "Hammer|Screwdriver", "Bottle|Cup", "Plate|Bowl", "Spoon|Fork", "Suitcase|Box", "Coin|Credit Card",
    "Ring|Necklace", "Soap|Shampoo", "Charger|Battery", "Dice|Playing Cards", "Teddy Bear|Doll", "Map|Compass"
  ],
  home: [
    "Sofa|Armchair", "Bed|Hammock", "Fridge|Freezer", "Oven|Microwave", "Washing Machine|Dishwasher",
    "Bathtub|Shower", "Toilet|Sink", "Fan|Air Conditioner", "Television|Computer", "Curtains|Blinds",
    "Carpet|Doormat", "Wardrobe|Shelf", "Vacuum Cleaner|Broom", "Iron|Hair Dryer", "Kettle|Coffee Machine",
    "Frying Pan|Pot", "Kitchen|Bathroom", "Bedroom|Living Room", "Lamp|Ceiling Fan", "Trash Can|Recycling Bin",
    "Stairs|Elevator", "Door|Window"
  ],
  jobs: [
    "Doctor|Nurse", "Teacher|Professor", "Police Officer|Security Guard", "Firefighter|Lifeguard", "Chef|Waiter",
    "Pilot|Flight Attendant", "Farmer|Gardener", "Lawyer|Judge", "Engineer|Builder", "Programmer|Hacker",
    "Painter|Artist", "Singer|DJ", "Actor|Comedian", "Dentist|Doctor", "Plumber|Electrician", "Hairdresser|Barber",
    "Photographer|Journalist", "Taxi Driver|Bus Driver", "Soldier|Spy", "Astronaut|Pilot", "YouTuber|Influencer",
    "Cashier|Banker", "Postman|Delivery Driver", "Scientist|Inventor", "Magician|Clown", "Pirate|Sailor"
  ],
  sports: [
    "Football|Rugby", "Basketball|Volleyball", "Cricket|Baseball", "Tennis|Badminton", "Table Tennis|Tennis",
    "Golf|Mini Golf", "Swimming|Diving", "Boxing|Wrestling", "Skiing|Snowboarding", "Ice Skating|Skiing",
    "Cycling|Running", "Surfing|Skateboarding", "Yoga|Gym", "Chess|Checkers", "Bowling|Darts", "Hockey|Ice Hockey",
    "Karate|Kung Fu", "Horse Riding|Cycling", "Formula 1|Go-Karting", "Marathon|Sprint", "Gymnastics|Ballet"
  ],
  movies: [
    "Titanic|Avatar", "Harry Potter|Lord of the Rings", "Star Wars|Star Trek", "Frozen|Moana",
    "The Lion King|The Jungle Book", "Toy Story|Cars", "Shrek|Kung Fu Panda", "Avengers|X-Men", "Spider-Man|Batman",
    "Jurassic Park|King Kong", "Friends|The Big Bang Theory", "Game of Thrones|The Witcher",
    "Squid Game|The Hunger Games", "The Simpsons|Family Guy", "SpongeBob|Tom and Jerry", "Pokémon|Digimon",
    "Fast & Furious|James Bond", "Home Alone|The Grinch", "Finding Nemo|The Little Mermaid", "Minions|Despicable Me",
    "Mr. Bean|Charlie Chaplin", "Stranger Things|Wednesday"
  ],
  characters: [
    "Batman|Superman", "Spider-Man|Iron Man", "Harry Potter|Hermione Granger", "Mickey Mouse|Donald Duck",
    "Mario|Luigi", "Pikachu|Sonic", "Sherlock Holmes|James Bond", "Shrek|Donkey", "Darth Vader|Voldemort",
    "Elsa|Anna", "Cinderella|Snow White", "SpongeBob|Patrick Star", "Santa Claus|Easter Bunny",
    "Dracula|Frankenstein", "Hulk|Thor", "Joker|Harley Quinn", "Yoda|Gandalf", "Pinocchio|Peter Pan",
    "Winnie the Pooh|Garfield", "Buzz Lightyear|Woody", "Goku|Naruto", "Tarzan|Mowgli", "Robin Hood|Zorro",
    "Minion|Smurf", "Doraemon|Hello Kitty", "Bugs Bunny|Tom"
  ],
  countries: [
    "Paris|London", "New York|Los Angeles", "Tokyo|Seoul", "India|Nepal", "Italy|Spain", "France|Germany",
    "Brazil|Argentina", "Egypt|Turkey", "Australia|New Zealand", "Canada|USA", "Dubai|Qatar", "Japan|China",
    "Thailand|Vietnam", "Singapore|Hong Kong", "Hawaii|Maldives", "Russia|Norway", "Mexico|Spain",
    "Switzerland|Austria", "Antarctica|North Pole", "Las Vegas|Monaco"
  ],
  brands: [
    "Apple|Samsung", "Nike|Adidas", "McDonald's|KFC", "Coca-Cola|Pepsi", "Starbucks|Dunkin'", "Instagram|TikTok",
    "WhatsApp|Telegram", "YouTube|Netflix", "Amazon|eBay", "Uber|Lyft", "Spotify|Apple Music", "Tesla|BMW",
    "Lego|Barbie", "Facebook|Twitter", "PlayStation|Xbox", "Gucci|Louis Vuitton", "Rolex|Apple Watch",
    "Red Bull|Monster", "Domino's|Pizza Hut", "Zara|H&M", "ChatGPT|Siri", "Ferrari|Lamborghini", "Oreo|KitKat",
    "Disney|Pixar", "Minecraft|Roblox", "Google|Apple"
  ],
  music: [
    "Guitar|Ukulele", "Piano|Keyboard", "Drums|Bongo", "Violin|Cello", "Trumpet|Saxophone", "Flute|Recorder",
    "Rock|Metal", "Pop|K-pop", "Hip Hop|Rap", "Jazz|Blues", "Classical|Opera", "Concert|Music Festival",
    "Karaoke|Talent Show", "Microphone|Speaker", "Choir|Band", "Taylor Swift|Ariana Grande", "The Beatles|Queen",
    "BTS|Blackpink", "Michael Jackson|Elvis Presley", "Lullaby|Love Song", "DJ|Producer", "Music Video|Album"
  ],
  hobbies: [
    "Painting|Drawing", "Reading|Writing", "Cooking|Baking", "Gardening|Farming", "Fishing|Hunting",
    "Camping|Hiking", "Photography|Vlogging", "Knitting|Sewing", "Dancing|Singing", "Board Games|Video Games",
    "Puzzles|Crosswords", "Shopping|Window Shopping", "Traveling|Road Trip", "Meditation|Yoga",
    "Magic Tricks|Juggling", "Swimming|Snorkeling", "Skateboarding|Rollerblading", "Picnic|Barbecue",
    "Napping|Sleeping", "Binge-Watching|Movie Night", "Texting|Video Calling", "Lego Building|Puzzles"
  ],
  vehicles: [
    "Car|Taxi", "Bus|Tram", "Train|Metro", "Airplane|Helicopter", "Bicycle|Motorcycle", "Motorcycle|Scooter",
    "Boat|Yacht", "Ship|Ferry", "Submarine|Ship", "Rocket|Spaceship", "Ambulance|Fire Truck", "Police Car|Taxi",
    "Tractor|Bulldozer", "Truck|Van", "Hot Air Balloon|Parachute", "Skateboard|Scooter", "Canoe|Kayak",
    "Limousine|Sports Car", "Cable Car|Elevator", "Go-Kart|Bumper Car", "Jet Ski|Speedboat", "Tank|Jeep"
  ],
  clothes: [
    "T-shirt|Shirt", "Jeans|Shorts", "Dress|Skirt", "Hoodie|Jacket", "Sneakers|Boots", "Sandals|Flip-Flops",
    "Hat|Cap", "Scarf|Tie", "Suit|Tuxedo", "Pajamas|Bathrobe", "Swimsuit|Bikini", "Socks|Gloves",
    "Sunglasses|Goggles", "Raincoat|Jacket", "High Heels|Sneakers", "Earrings|Necklace", "Backpack|Handbag",
    "Uniform|Apron", "Crown|Tiara", "Belt|Tie", "Wedding Dress|Prom Dress", "Watch|Bracelet", "Costume|Mask"
  ],
  nature: [
    "Rain|Snow", "Thunderstorm|Tornado", "Rainbow|Sunset", "Sun|Moon", "Volcano|Earthquake", "Mountain|Hill",
    "River|Waterfall", "Ocean|Lake", "Forest|Jungle", "Desert|Beach", "Cave|Tunnel", "Island|Beach",
    "Iceberg|Glacier", "Fog|Cloud", "Wind|Hurricane", "Rose|Tulip", "Tree|Palm Tree", "Grass|Leaves", "Cactus|Plant",
    "Fire|Campfire", "Rock|Sand", "Spring|Summer", "Winter|Autumn", "Sunflower|Rose", "Stars|Moon"
  ],
  tech: [
    "Laptop|Tablet", "Smartphone|Smartwatch", "Wi-Fi|Bluetooth", "Password|Fingerprint", "Email|Text Message",
    "Selfie|Group Photo", "Meme|GIF", "Emoji|Sticker", "Virus|Spam", "Robot|Drone", "Video Call|Phone Call",
    "Podcast|Radio", "USB Drive|Hard Drive", "Printer|Scanner", "Mouse|Keyboard", "Virtual Reality|Video Game",
    "Chatbot|Robot", "Online Shopping|Food Delivery", "Like|Comment", "Airplane Mode|Silent Mode",
    "Screenshot|Photo", "Notification|Alarm", "Charger|Power Bank", "Low Battery|No Signal"
  ],
  school: [
    "Homework|Project", "Exam|Quiz", "Teacher|Principal", "Blackboard|Whiteboard", "Backpack|Lunch Box",
    "Classroom|Library", "Recess|Lunch Break", "Report Card|Certificate", "Graduation|Prom", "School Bus|Carpool",
    "Field Trip|Picnic", "Calculator|Ruler", "Eraser|Pencil Sharpener", "Meeting|Presentation", "Boss|Manager",
    "Promotion|Bonus", "Resume|Job Interview", "Deadline|Overtime", "Coffee Break|Lunch Break",
    "Intern|New Employee", "Monday|Friday", "Work From Home|Office", "Uniform|ID Card"
  ],
  events: [
    "Christmas|New Year", "Halloween|Carnival", "Birthday|Anniversary", "Wedding|Engagement", "Diwali|Holi",
    "Easter|Christmas", "Valentine's Day|Date Night", "Graduation|Farewell", "Funeral|Wedding",
    "Baby Shower|Birthday", "Olympics|World Cup", "Concert|Festival", "Fireworks|Bonfire", "Sleepover|Camping Trip",
    "Surprise Party|Pool Party", "Housewarming|Dinner Party", "Mother's Day|Father's Day",
    "Chinese New Year|Mid-Autumn Festival", "Job Interview|First Day at Work", "April Fools' Day|Prank",
    "Black Friday|Big Sale", "Road Trip|Vacation", "Family Reunion|Class Reunion"
  ],
  fantasy: [
    "Dragon|Dinosaur", "Unicorn|Pegasus", "Wizard|Witch", "Vampire|Werewolf", "Zombie|Mummy", "Ghost|Spirit",
    "Mermaid|Fairy", "Fairy|Elf", "Giant|Troll", "Alien|UFO", "Robot|Cyborg", "Time Machine|Portal",
    "Magic Wand|Crystal Ball", "Genie|Magic Lamp", "Spaceship|Space Station", "Lightsaber|Laser Gun",
    "Treasure Chest|Gold Coins", "Knight|Ninja", "Princess|Queen", "Potion|Poison", "Superhero|Villain",
    "Haunted House|Graveyard", "Invisibility Cloak|Flying Carpet"
  ],
  desi: [
    "Biryani|Pulao", "Samosa|Pakora", "Chai|Lassi", "Dosa|Idli", "Pani Puri|Bhel Puri",
    "Butter Chicken|Paneer Tikka", "Roti|Naan", "Gulab Jamun|Jalebi", "Ladoo|Barfi", "Rangoli|Diya",
    "Auto Rickshaw|Cycle Rickshaw", "Gully Cricket|IPL", "Ludo|Carrom", "Local Train|Bus", "Saree|Lehenga",
    "Mehndi|Haldi", "Maggi|Noodles", "Pav Bhaji|Vada Pav", "Kulfi|Ice Cream", "Holi Colours|Water Balloon",
    "Power Cut|Generator", "Monsoon|Rainy Day", "Temple|Gurudwara"
  ],
  bollywood: [
    "Shah Rukh Khan|Salman Khan", "Aamir Khan|Akshay Kumar", "Amitabh Bachchan|Rajinikanth",
    "Deepika Padukone|Alia Bhatt", "Priyanka Chopra|Katrina Kaif", "Ranveer Singh|Ranbir Kapoor",
    "Hrithik Roshan|Tiger Shroff", "3 Idiots|PK", "Sholay|Deewaar", "Lagaan|Dangal", "DDLJ|Kuch Kuch Hota Hai",
    "Krrish|Mr. India", "Don|Dhoom", "Hera Pheri|Golmaal", "Baahubali|RRR", "KGF|Pushpa",
    "Kaun Banega Crorepati|Bigg Boss", "Arijit Singh|Sonu Nigam", "Item Song|Sad Song", "Gabbar Singh|Mogambo"
  ],
  china: [
    "WeChat Pay|Alipay", "WeChat|WhatsApp", "VPN|Great Firewall", "Didi|Taxi", "Taobao|Amazon", "Douyin|TikTok",
    "Hot Pot|Dumplings", "Dim Sum|Dumplings", "Bubble Tea|Milk Tea", "Luckin Coffee|Starbucks", "Chopsticks|Spoon",
    "Squat Toilet|Western Toilet", "Hot Water|Cold Water", "High-Speed Rail|Metro", "Shared Bike|Scooter",
    "QR Code|Barcode", "Visa|Passport", "Mandarin|Cantonese", "Ni Hao|Xie Xie", "Canteen|Night Market",
    "Spring Festival|Mid-Autumn Festival", "Red Envelope|Firecrackers", "Mooncake|Dumplings", "Panda|Red Panda",
    "Great Wall|Forbidden City", "Kung Fu|Tai Chi", "Mahjong|Chinese Chess", "Dragon Dance|Lion Dance",
    "FamilyMart|7-Eleven", "Typhoon|Rainstorm"
  ],
  gba: [
    "Shenzhen|Guangzhou", "Hong Kong|Macau", "Border Crossing|Customs", "Octopus Card|Metro Card",
    "MTR|Shenzhen Metro", "Star Ferry|Tram", "Victoria Peak|Victoria Harbour", "Hong Kong Disneyland|Ocean Park",
    "Big Buddha|Cable Car", "Casino|Cotai Strip", "Egg Tart|Pineapple Bun", "Milk Tea|Lemon Tea",
    "Roast Goose|Char Siu", "Fish Balls|Siu Mai", "Dim Sum|Egg Waffle",
    "Ferry to Macau|High-Speed Rail to Hong Kong", "HKD|RMB", "Cantonese|Mandarin",
    "Typhoon Signal 8|Black Rainstorm", "Two Phones|Two SIM Cards", "Duty Free|Outlet Mall",
    "Night Market|Shopping Mall"
  ],
  brainrot: [
    "Skibidi Toilet|Cameraman", "Rizz|Aura", "Sigma|Alpha", "NPC|Main Character", "Delulu|Manifesting",
    "Cooked|Fumbled", "No Cap|Fr Fr", "Slay|Ate", "Lowkey|Highkey", "W|L", "Mid|Goated", "Sus|Among Us",
    "Chill Guy|Moo Deng", "Bestie|Bae", "Touch Grass|Doomscrolling", "iPad Kid|Screen Time", "Gen Alpha|Gen Z",
    "Bruh|Sheesh", "Skull Emoji|Crying Emoji", "Red Flag|Ick", "Hard Launch|Soft Launch", "Labubu|Jellycat",
    "Yapping|Gossiping", "Tralalero Tralala|Tung Tung Tung Sahur", "Crash Out|Lost It", "Six Seven|Skibidi"
  ],
  popnow: [
    "Taylor Swift|Sabrina Carpenter", "Bad Bunny|Shakira", "Kendrick Lamar|Drake", "BLACKPINK|BTS",
    "Labubu|Pop Mart", "Stranger Things|Wednesday", "Squid Game|Wednesday", "A Minecraft Movie|Barbie",
    "Superman|Batman", "GTA 6|Minecraft", "Nintendo Switch 2|PS5", "Fortnite|Roblox", "IShowSpeed|MrBeast",
    "ChatGPT|Gemini", "World Cup 2026|Champions League", "Messi|Ronaldo", "Met Gala|Oscars",
    "Dubai Chocolate|Matcha Latte", "Stanley Cup|Water Bottle", "Pickleball|Padel", "TikTok Shop|Shein",
    "KPop Demon Hunters|Frozen", "Eras Tour|Concert", "Spider-Man: Brand New Day|Toy Story 5",
    "GTA 6|Mario Kart World"
  ],
  greek: [
    "Gyros|Souvlaki", "Moussaka|Lasagna", "Feta|Halloumi", "Greek Salad|Tzatziki", "Baklava|Loukoumades",
    "Spanakopita|Tiropita", "Olive Oil|Kalamata Olives", "Grilled Octopus|Calamari", "Frappé|Freddo Espresso",
    "Greek Coffee|Frappé", "Ouzo|Metaxa", "Taverna|Kafeneio", "Yiayia|Papou", "Name Day|Birthday",
    "Plate Smashing|Throwing Carnations", "Siesta|Quiet Hours", "Ferry|Catamaran", "Mykonos|Santorini",
    "Crete|Rhodes", "Athens|Thessaloniki", "Olympiacos|Panathinaikos", "Opa|Yamas", "Greek Easter|Name Day",
    "Sunbed|Beach Umbrella", "Moped|Vespa"
  ],
  science: [
    "Planet|Moon", "Mars|Venus", "Saturn|Jupiter", "Black Hole|Galaxy", "Astronaut|Alien", "Telescope|Microscope",
    "Atom|Cell", "DNA|Gene", "Gravity|Magnet", "Fossil|Skeleton", "Electricity|Lightning", "Magnet|Battery",
    "Rocket|Satellite", "Oxygen|Carbon Dioxide", "Vaccine|Medicine", "Laboratory|Observatory", "Einstein|Newton",
    "X-ray|Ultrasound", "Solar Panel|Wind Turbine", "Brain|Heart", "Bacteria|Virus", "Moon Landing|Space Walk",
    "Test Tube|Beaker"
  ],
  party: [
    "Hangover|Headache", "Selfie|Group Photo", "Karaoke|Dance Floor", "Beer Pong|Drinking Game",
    "Truth or Dare|Never Have I Ever", "Tequila Shot|Vodka Shot", "Bouncer|Bartender", "Ex|Crush",
    "Blind Date|Dating App", "Afterparty|House Party", "Toast|Cheers", "Midnight Snack|Pizza at 3 AM",
    "Disco Ball|Neon Lights", "Wingman|Third Wheel", "Drunk Text|Late-Night Call", "Group Chat|Gossip",
    "Birthday Bumps|Surprise Party", "Poker Night|Game Night", "Road Trip|Weekend Getaway", "Breakup|Ghosting",
    "Flirting|Wink", "Slow Dance|Salsa"
  ],
  kids: "all"
};
