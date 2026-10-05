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
      "Museum|Art Gallery|Library", "Bank|ATM|Post Office", "Hotel|Hostel|Airbnb",
      "Church|Temple|Mosque", "Park|Garden|Forest", "Casino|Arcade|Bowling Alley",
      "Prison|Police Station|Courtroom", "Space Station|Submarine|Airplane", "Amusement Park|Water Park|Circus",
      "Farm|Ranch|Vineyard", "Nightclub|Bar|Karaoke Bar", "Hair Salon|Spa|Barber Shop",
      "Gas Station|Car Wash|Parking Lot", "Stadium|Arena|Racetrack", "Ski Resort|Mountain Cabin|Ice Rink",
      "Cruise Ship|Ferry|Pirate Ship", "Desert|Savanna|Canyon", "Office|Coworking Space|Call Center",
      "Wedding Hall|Banquet Hall|Ballroom", "Factory|Warehouse|Construction Site", "Fire Station|Police Station|Hospital",
      "Lighthouse|Harbor|Pier", "Castle|Palace|Fort", "Campsite|Treehouse|Cabin",
      "Embassy|Parliament|City Hall", "Bakery|Pastry Shop|Ice Cream Parlor", "Dentist|Doctor's Office|Hospital",
      "Laundromat|Dry Cleaner|Tailor", "Rooftop|Balcony|Terrace", "Cemetery|Funeral Home|Church",
      "Haunted House|Abandoned Mansion|Escape Room", "Volcano|Mountain|Island", "Bookstore|Library|Stationery Shop",
      "Playground|Park|Kindergarten", "Pet Shop|Vet Clinic|Zoo"
    ]
  },
  {
    id: "food", name: "Food", icon: "🍕",
    words: [
      "Pizza|Burger|Calzone", "Sushi|Ramen|Dumplings", "Pancakes|Waffles|French Toast",
      "Ice Cream|Frozen Yogurt|Popsicle", "Chocolate|Candy|Brownie", "Hot Dog|Burger|Sandwich",
      "Pasta|Noodles|Lasagna", "Tacos|Burrito|Nachos", "Salad|Soup|Smoothie Bowl",
      "Cake|Cupcake|Muffin", "Cookie|Biscuit|Cracker", "Popcorn|Chips|Pretzels",
      "French Fries|Hash Browns|Onion Rings", "Apple|Pear|Peach", "Banana|Mango|Pineapple",
      "Strawberry|Raspberry|Cherry", "Orange|Lemon|Grapefruit", "Watermelon|Melon|Papaya",
      "Omelette|Scrambled Eggs|Quiche", "Cheese|Butter|Yogurt", "Bread|Toast|Croissant",
      "Donut|Bagel|Churros", "Steak|Ribs|Kebab", "Fried Chicken|Chicken Nuggets|Chicken Wings",
      "Rice|Fried Rice|Risotto", "Potato|Sweet Potato|Carrot", "Tomato|Bell Pepper|Cucumber",
      "Onion|Garlic|Ginger", "Honey|Maple Syrup|Jam", "Peanut Butter|Nutella|Jam",
      "Cereal|Oatmeal|Granola", "Mushroom|Truffle|Olive", "Shrimp|Lobster|Crab",
      "Salmon|Tuna|Cod", "Pie|Tart|Cheesecake", "Hummus|Guacamole|Salsa",
      "Spring Rolls|Samosa|Empanada", "Marshmallow|Cotton Candy|Jelly Beans", "Avocado|Kiwi|Coconut",
      "Corn|Peas|Beans", "Pudding|Custard|Jelly", "Grapes|Blueberries|Olives"
    ]
  },
  {
    id: "drinks", name: "Drinks", icon: "🥤",
    words: [
      "Coffee|Tea|Hot Chocolate", "Beer|Wine|Cider", "Orange Juice|Apple Juice|Lemonade",
      "Milkshake|Smoothie|Lassi", "Water|Sparkling Water|Coconut Water", "Cola|Lemon Soda|Energy Drink",
      "Champagne|Prosecco|White Wine", "Whiskey|Rum|Vodka", "Cocktail|Mocktail|Punch",
      "Latte|Cappuccino|Espresso", "Green Tea|Chai|Iced Tea", "Milk|Soy Milk|Buttermilk",
      "Mojito|Margarita|Piña Colada", "Bubble Tea|Iced Coffee|Frappuccino", "Kombucha|Cold Brew|Ginger Ale",
      "Tequila|Gin|Sake", "Protein Shake|Sports Drink|Smoothie", "Mulled Wine|Eggnog|Hot Cider",
      "Coconut Water|Sugarcane Juice|Watermelon Juice", "Red Wine|White Wine|Rosé", "Hot Chocolate|Milo|Horlicks"
    ]
  },
  {
    id: "animals", name: "Animals", icon: "🐾",
    words: [
      "Dog|Wolf|Fox", "Cat|Lion|Tiger", "Lion|Tiger|Leopard", "Elephant|Rhino|Hippo",
      "Giraffe|Zebra|Camel", "Monkey|Gorilla|Chimpanzee", "Horse|Donkey|Zebra", "Cow|Buffalo|Yak",
      "Pig|Boar|Sheep", "Sheep|Goat|Llama", "Chicken|Duck|Turkey", "Eagle|Hawk|Owl",
      "Parrot|Peacock|Flamingo", "Penguin|Seal|Puffin", "Dolphin|Whale|Shark", "Octopus|Squid|Jellyfish",
      "Snake|Lizard|Crocodile", "Crocodile|Alligator|Komodo Dragon", "Turtle|Tortoise|Snail", "Frog|Toad|Salamander",
      "Rabbit|Hamster|Guinea Pig", "Mouse|Rat|Squirrel", "Bear|Panda|Koala", "Kangaroo|Deer|Antelope",
      "Bee|Wasp|Butterfly", "Ant|Termite|Beetle", "Spider|Scorpion|Crab", "Bat|Owl|Moth",
      "Butterfly|Moth|Dragonfly", "Mosquito|Fly|Cockroach", "Goldfish|Clownfish|Koi", "Sloth|Koala|Lemur",
      "Hedgehog|Porcupine|Armadillo", "Camel|Llama|Alpaca", "Polar Bear|Walrus|Arctic Fox", "Peacock|Swan|Flamingo",
      "Cheetah|Leopard|Jaguar", "Raccoon|Skunk|Badger", "Pigeon|Crow|Sparrow", "Hyena|Jackal|Wild Dog"
    ]
  },
  {
    id: "objects", name: "Everyday Objects", icon: "🧸",
    words: [
      "Umbrella|Raincoat|Parasol", "Scissors|Knife|Nail Clipper", "Toothbrush|Comb|Hairbrush",
      "Pen|Pencil|Marker", "Watch|Clock|Alarm Clock", "Wallet|Purse|Backpack", "Key|Lock|Padlock",
      "Glasses|Sunglasses|Contact Lenses", "Candle|Flashlight|Lamp", "Mirror|Window|Picture Frame",
      "Book|Magazine|Newspaper", "Phone|Tablet|Walkie-Talkie", "Headphones|Earbuds|Speaker",
      "Remote Control|Game Controller|Keyboard", "Pillow|Blanket|Mattress", "Balloon|Bubble|Kite",
      "Camera|Binoculars|Telescope", "Ladder|Stool|Stairs", "Hammer|Screwdriver|Wrench", "Rope|Chain|Belt",
      "Tape|Glue|Stapler", "Bottle|Jar|Thermos", "Plate|Bowl|Tray", "Spoon|Fork|Chopsticks",
      "Suitcase|Bag|Box", "Paper Clip|Safety Pin|Rubber Band", "Coin|Banknote|Credit Card",
      "Lighter|Matches|Candle", "Calendar|Diary|Notebook", "Shopping Cart|Wheelbarrow|Stroller",
      "Ball|Frisbee|Balloon", "Ring|Necklace|Bracelet", "Soap|Shampoo|Toothpaste", "Charger|Battery|Power Bank",
      "Toilet Paper|Tissues|Napkin", "Paintbrush|Crayon|Chalk", "Dice|Playing Cards|Chess Piece",
      "Teddy Bear|Doll|Action Figure", "Trophy|Medal|Crown", "Map|Compass|GPS", "Flag|Banner|Poster"
    ]
  },
  {
    id: "home", name: "Around the House", icon: "🏠",
    words: [
      "Sofa|Armchair|Bean Bag", "Bed|Hammock|Crib", "Fridge|Freezer|Cooler", "Oven|Microwave|Toaster",
      "Washing Machine|Dishwasher|Dryer", "Bathtub|Shower|Jacuzzi", "Toilet|Sink|Bidet",
      "Fan|Air Conditioner|Heater", "Television|Projector|Computer Monitor", "Curtains|Blinds|Shutters",
      "Carpet|Doormat|Yoga Mat", "Wardrobe|Dresser|Shelf", "Vacuum Cleaner|Broom|Mop", "Iron|Hair Dryer|Straightener",
      "Kettle|Coffee Machine|Blender", "Frying Pan|Pot|Wok", "Doorbell|Door Knocker|Intercom",
      "Fireplace|Chimney|Furnace", "Garage|Basement|Attic", "Kitchen|Dining Room|Pantry",
      "Bedroom|Living Room|Guest Room", "Bookshelf|Cabinet|Drawer", "Chandelier|Ceiling Fan|Lamp",
      "Plant Pot|Vase|Flower Box", "Trash Can|Recycling Bin|Compost", "Light Switch|Power Socket|Fuse Box",
      "Staircase|Elevator|Ramp", "Clothesline|Hanger|Laundry Basket", "Fish Tank|Bird Cage|Dog House",
      "Swing|Rocking Chair|Hammock"
    ]
  },
  {
    id: "jobs", name: "Jobs", icon: "🧑‍🔧",
    words: [
      "Doctor|Nurse|Surgeon", "Teacher|Professor|Tutor", "Police Officer|Detective|Security Guard",
      "Firefighter|Paramedic|Lifeguard", "Chef|Baker|Waiter", "Pilot|Flight Attendant|Air Traffic Controller",
      "Astronaut|Rocket Scientist|Pilot", "Farmer|Gardener|Fisherman", "Lawyer|Judge|Politician",
      "Engineer|Architect|Builder", "Programmer|Hacker|Data Scientist", "Painter|Sculptor|Artist",
      "Singer|Rapper|DJ", "Actor|Comedian|Magician", "Dentist|Optician|Pharmacist", "Plumber|Electrician|Mechanic",
      "Hairdresser|Barber|Makeup Artist", "Photographer|Videographer|Journalist", "News Anchor|Reporter|Blogger",
      "Taxi Driver|Bus Driver|Truck Driver", "Soldier|Spy|Bodyguard", "Veterinarian|Zookeeper|Dog Walker",
      "Librarian|Bookseller|Archivist", "Accountant|Banker|Cashier", "Influencer|YouTuber|Streamer",
      "Carpenter|Blacksmith|Welder", "Postman|Delivery Driver|Courier", "Scientist|Inventor|Lab Technician",
      "Tour Guide|Travel Agent|Hotel Receptionist", "Personal Trainer|Yoga Teacher|Coach",
      "Fashion Designer|Tailor|Model", "Psychologist|Therapist|Life Coach", "Clown|Mime|Juggler",
      "Pirate|Sailor|Captain", "Priest|Monk|Nun", "Butler|Maid|Nanny", "Referee|Umpire|Coach"
    ]
  },
  {
    id: "sports", name: "Sports", icon: "⚽",
    words: [
      "Football|Rugby|American Football", "Basketball|Volleyball|Netball", "Cricket|Baseball|Softball",
      "Tennis|Badminton|Table Tennis", "Golf|Mini Golf|Croquet", "Swimming|Diving|Water Polo",
      "Boxing|Wrestling|MMA", "Skiing|Snowboarding|Ice Skating", "Cycling|Mountain Biking|BMX",
      "Marathon|Sprint|Relay Race", "Surfing|Skateboarding|Wakeboarding", "Yoga|Pilates|Stretching",
      "Chess|Checkers|Go", "Bowling|Billiards|Darts", "Hockey|Ice Hockey|Lacrosse",
      "Gymnastics|Ballet|Cheerleading", "Karate|Judo|Taekwondo", "Archery|Shooting|Darts",
      "Formula 1|Rally|Motocross", "Horse Riding|Polo|Rodeo", "Rock Climbing|Bouldering|Hiking",
      "Fencing|Kendo|Sword Fighting", "Weightlifting|CrossFit|Powerlifting", "Kabaddi|Kho Kho|Tag",
      "Rowing|Kayaking|Canoeing", "Sailing|Windsurfing|Kitesurfing", "Squash|Badminton|Pickleball",
      "Parkour|Free Running|Obstacle Course", "Esports|Video Games|Arcade", "Skydiving|Bungee Jumping|Paragliding",
      "Handball|Dodgeball|Volleyball"
    ]
  },
  {
    id: "movies", name: "Movies & Shows", icon: "🎬",
    words: [
      "Titanic|Pearl Harbor|The Notebook", "Harry Potter|Lord of the Rings|Narnia",
      "Star Wars|Star Trek|Guardians of the Galaxy", "Frozen|Tangled|Moana", "The Lion King|The Jungle Book|Madagascar",
      "Toy Story|Cars|Monsters, Inc.", "Shrek|Puss in Boots|Kung Fu Panda", "Avengers|Justice League|X-Men",
      "Spider-Man|Batman|Iron Man", "Jurassic Park|King Kong|Godzilla", "Friends|How I Met Your Mother|The Big Bang Theory",
      "The Office|Parks and Recreation|Brooklyn Nine-Nine", "Game of Thrones|House of the Dragon|The Witcher",
      "Breaking Bad|Narcos|Money Heist", "Stranger Things|Dark|Wednesday", "Squid Game|Alice in Borderland|The Hunger Games",
      "The Simpsons|Family Guy|South Park", "SpongeBob|Tom and Jerry|Looney Tunes", "Pokémon|Digimon|Yu-Gi-Oh!",
      "Naruto|One Piece|Dragon Ball", "Sherlock|Detective Conan|Scooby-Doo", "Fast & Furious|Mission: Impossible|James Bond",
      "Home Alone|Mrs. Doubtfire|The Grinch", "The Matrix|Inception|Interstellar", "Finding Nemo|Shark Tale|The Little Mermaid",
      "Barbie|Oppenheimer|Mean Girls", "Pirates of the Caribbean|Indiana Jones|The Mummy", "Minions|Despicable Me|Ice Age",
      "Rocky|Creed|Karate Kid", "The Godfather|Scarface|Goodfellas", "Peaky Blinders|Boardwalk Empire|The Sopranos",
      "Black Mirror|The Twilight Zone|Love, Death & Robots", "Grey's Anatomy|House M.D.|Scrubs",
      "Mr. Bean|Charlie Chaplin|Johnny English", "Twilight|The Vampire Diaries|True Blood", "Coco|Encanto|Up",
      "The Crown|Bridgerton|Downton Abbey"
    ]
  },
  {
    id: "characters", name: "Famous Characters", icon: "🦸",
    words: [
      "Batman|Superman|Iron Man", "Spider-Man|Ant-Man|Deadpool", "Harry Potter|Hermione Granger|Ron Weasley",
      "Mickey Mouse|Donald Duck|Goofy", "Mario|Luigi|Sonic", "Pikachu|Charmander|Jigglypuff",
      "Sherlock Holmes|Hercule Poirot|Detective Conan", "James Bond|Ethan Hunt|Jason Bourne", "Shrek|Fiona|Donkey",
      "Darth Vader|Voldemort|Thanos", "Elsa|Anna|Rapunzel", "Cinderella|Snow White|Sleeping Beauty",
      "SpongeBob|Patrick Star|Squidward", "Homer Simpson|Peter Griffin|Fred Flintstone", "Santa Claus|Easter Bunny|Tooth Fairy",
      "Dracula|Frankenstein|Werewolf", "Jack Sparrow|Captain Hook|Blackbeard", "Wonder Woman|Captain Marvel|Black Widow",
      "Hulk|Thor|Captain America", "Joker|Harley Quinn|Riddler", "Yoda|Gandalf|Dumbledore",
      "Pinocchio|Peter Pan|Tinker Bell", "Winnie the Pooh|Paddington|Garfield", "Buzz Lightyear|Woody|Jessie",
      "Goku|Naruto|Luffy", "Crash Bandicoot|Sonic|Pac-Man", "Lara Croft|Indiana Jones|Nathan Drake",
      "Tarzan|Mowgli|Robinson Crusoe", "Cleopatra|Queen Elizabeth|Marie Antoinette", "Robin Hood|Zorro|The Lone Ranger",
      "Alice in Wonderland|Dorothy|Wendy", "Minion|Smurf|Oompa Loompa", "Grinch|Scrooge|Krampus",
      "Chucky|Annabelle|M3GAN", "Doraemon|Hello Kitty|Totoro", "Bugs Bunny|Road Runner|Daffy Duck",
      "Rick Sanchez|Doc Brown|Professor X"
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
      "Nutella|Kinder|Ferrero Rocher", "Domino's|Pizza Hut|Papa John's", "Tinder|Bumble|Hinge",
      "Zara|H&M|Uniqlo", "Canon|Nikon|GoPro", "ChatGPT|Siri|Alexa", "Visa|Mastercard|PayPal",
      "Airbnb|Booking.com|Expedia", "Pinterest|Tumblr|Reddit", "Duolingo|Khan Academy|Coursera",
      "Ferrari|Lamborghini|Porsche", "Oreo|KitKat|Pringles", "Swiggy|Zomato|Uber Eats",
      "Disney|Pixar|DreamWorks", "Minecraft|Roblox|Fortnite"
    ]
  },
  {
    id: "music", name: "Music", icon: "🎸",
    words: [
      "Guitar|Bass Guitar|Ukulele", "Piano|Keyboard|Organ", "Drums|Tabla|Bongo", "Violin|Cello|Harp",
      "Trumpet|Saxophone|Trombone", "Flute|Clarinet|Recorder", "Rock|Metal|Punk", "Pop|K-pop|Disco",
      "Hip Hop|Rap|R&B", "Jazz|Blues|Soul", "Classical|Opera|Orchestra", "Reggae|Ska|Calypso",
      "Country|Folk|Bluegrass", "EDM|Techno|House", "Concert|Music Festival|Rave", "Karaoke|Talent Show|Open Mic",
      "Microphone|Speaker|Amplifier", "Choir|Band|Orchestra", "Vinyl Record|Cassette|CD",
      "Taylor Swift|Ariana Grande|Billie Eilish", "The Beatles|Queen|The Rolling Stones", "BTS|Blackpink|One Direction",
      "Michael Jackson|Elvis Presley|Prince", "Drake|Kanye West|Eminem", "Lullaby|Nursery Rhyme|Love Song",
      "National Anthem|Hymn|Theme Song", "Harmonica|Accordion|Bagpipes", "Sitar|Veena|Santoor",
      "DJ|Producer|Conductor", "Moshpit|Crowd Surfing|Headbanging", "Music Video|Album|Playlist"
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
      "Pottery|Sculpting|Woodworking", "Magic Tricks|Juggling|Card Tricks", "Stargazing|Astronomy|Bird Watching",
      "Scuba Diving|Snorkeling|Swimming", "Skateboarding|Rollerblading|Scootering", "Collecting Stamps|Collecting Coins|Collecting Cards",
      "Origami|Paper Crafts|Scrapbooking", "Picnic|Barbecue|Potluck", "Napping|Sleeping|Daydreaming",
      "Binge-Watching|Movie Night|Netflix and Chill", "Gossiping|Texting|Video Calling", "Volunteering|Charity Run|Fundraising",
      "Graffiti|Street Art|Tattooing", "Lego Building|Model Trains|RC Cars", "Cosplay|Costume Party|Theatre"
    ]
  },
  {
    id: "vehicles", name: "Vehicles", icon: "🚗",
    words: [
      "Car|Taxi|Jeep", "Bus|Tram|Trolleybus", "Train|Metro|Monorail", "Airplane|Helicopter|Glider",
      "Bicycle|Tricycle|Unicycle", "Motorcycle|Scooter|Moped", "Boat|Yacht|Speedboat", "Ship|Ferry|Cruise Ship",
      "Submarine|Battleship|Aircraft Carrier", "Rocket|Space Shuttle|UFO", "Ambulance|Fire Truck|Police Car",
      "Tractor|Bulldozer|Excavator", "Truck|Van|Pickup Truck", "Hot Air Balloon|Blimp|Parachute",
      "Skateboard|Scooter|Hoverboard", "Canoe|Kayak|Raft", "Limousine|Sports Car|Convertible",
      "Auto Rickshaw|Cycle Rickshaw|Tuk-Tuk", "Cable Car|Ski Lift|Elevator", "Horse Carriage|Chariot|Sleigh",
      "Golf Cart|Go-Kart|Bumper Car", "Snowmobile|Sled|Skis", "Jet Ski|Speedboat|Hovercraft",
      "Segway|Electric Scooter|Hoverboard", "Camper Van|Caravan|Trailer", "Fighter Jet|Drone|Helicopter",
      "Tank|Armored Car|Humvee"
    ]
  },
  {
    id: "clothes", name: "Clothes & Accessories", icon: "👕",
    words: [
      "T-shirt|Shirt|Polo Shirt", "Jeans|Trousers|Shorts", "Dress|Skirt|Gown", "Hoodie|Sweater|Jacket",
      "Sneakers|Boots|Sandals", "Hat|Cap|Beanie", "Scarf|Tie|Bow Tie", "Suit|Tuxedo|Blazer",
      "Pajamas|Bathrobe|Onesie", "Swimsuit|Bikini|Swim Trunks", "Socks|Stockings|Leggings", "Gloves|Mittens|Wristband",
      "Sunglasses|Goggles|Face Mask", "Saree|Lehenga|Salwar Kameez", "Kurta|Sherwani|Nehru Jacket",
      "Raincoat|Trench Coat|Poncho", "High Heels|Flip-Flops|Loafers", "Earrings|Nose Ring|Necklace",
      "Backpack|Handbag|Tote Bag", "Uniform|Lab Coat|Apron", "Crown|Tiara|Headband", "Belt|Suspenders|Waistcoat",
      "Wedding Dress|Veil|Prom Dress", "Kimono|Robe|Toga", "Wig|Hair Clip|Hairband", "Watch|Bracelet|Ring",
      "Cape|Cloak|Shawl", "Overalls|Jumpsuit|Dungarees", "Tank Top|Crop Top|Vest", "Costume|Mask|Halloween Outfit"
    ]
  },
  {
    id: "nature", name: "Nature & Weather", icon: "🌋",
    words: [
      "Rain|Snow|Hail", "Thunderstorm|Lightning|Tornado", "Rainbow|Sunset|Aurora", "Sun|Moon|Stars",
      "Volcano|Earthquake|Tsunami", "Mountain|Hill|Cliff", "River|Waterfall|Stream", "Ocean|Sea|Lake",
      "Forest|Jungle|Rainforest", "Desert|Dune|Oasis", "Cave|Tunnel|Canyon", "Island|Beach|Coral Reef",
      "Glacier|Iceberg|Avalanche", "Fog|Mist|Cloud", "Wind|Breeze|Hurricane", "Rose|Tulip|Lily",
      "Tree|Palm Tree|Christmas Tree", "Grass|Moss|Leaves", "Cactus|Aloe Vera|Succulent", "Mushroom|Moss|Fern",
      "Wildfire|Campfire|Bonfire", "Rock|Pebble|Boulder", "Sand|Mud|Clay", "Swamp|Marsh|Pond",
      "Sunflower|Daisy|Dandelion", "Bamboo|Palm Tree|Coconut Tree", "Comet|Meteor|Shooting Star",
      "Eclipse|Full Moon|Supermoon", "Heatwave|Drought|Monsoon", "Spring|Summer|Autumn", "Winter|Snowfall|Blizzard",
      "Lotus|Water Lily|Orchid"
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
      "Mouse|Trackpad|Touchscreen", "Virtual Reality|Augmented Reality|Hologram", "Artificial Intelligence|Chatbot|Voice Assistant",
      "Google Drive|Dropbox|iCloud", "Online Shopping|Food Delivery|Cash on Delivery", "Bitcoin|NFT|Stock Market",
      "Video Game|Mobile Game|App", "Scam Call|Scam Email|Phishing", "Like|Comment|Share",
      "Dark Mode|Airplane Mode|Silent Mode", "Screenshot|Screen Recording|Photo", "Notification|Alarm|Reminder",
      "Charging Cable|Wireless Charger|Power Bank", "Keyboard|Typewriter|Touchscreen", "Low Battery|No Signal|Buffering"
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
      "Coffee Break|Lunch Break|Smoke Break", "Presentation|Speech|Pitch", "Spreadsheet|Document|Slides",
      "Intern|Trainee|Apprentice", "Office Party|Team Outing|Team Building", "Monday|Friday|Sunday",
      "Work From Home|Office|Coworking Space", "Email|Memo|Notice Board", "ID Card|Badge|Uniform",
      "Cafeteria|Canteen|Food Court"
    ]
  },
  {
    id: "events", name: "Holidays & Events", icon: "🎉",
    words: [
      "Christmas|New Year|Thanksgiving", "Halloween|Day of the Dead|Carnival", "Birthday|Anniversary|Baby Shower",
      "Wedding|Engagement|Reception", "Diwali|Holi|Navratri", "Eid|Ramadan|Iftar", "Easter|Passover|Good Friday",
      "Valentine's Day|Date Night|Proposal", "Graduation|Convocation|Farewell", "Funeral|Memorial|Wake",
      "Bachelor Party|Bachelorette Party|Sangeet", "Baby Shower|Gender Reveal|Naming Ceremony", "Olympics|World Cup|IPL",
      "Concert|Festival|Parade", "Fireworks|Bonfire|Lanterns", "Sleepover|Slumber Party|Camping Trip",
      "Surprise Party|Pool Party|House Party", "Housewarming|Dinner Party|Potluck", "Mother's Day|Father's Day|Teachers' Day",
      "Chinese New Year|Mid-Autumn Festival|Dragon Boat Festival", "Independence Day|Republic Day|Fourth of July",
      "Oktoberfest|Beer Festival|Wine Tasting", "Comic-Con|Fan Meet|Book Fair", "Job Interview|First Day at Work|Exam Day",
      "Raksha Bandhan|Bhai Dooj|Karwa Chauth", "April Fools' Day|Prank|Practical Joke", "Black Friday|Big Sale|Clearance Sale",
      "Pride Parade|Carnival|Mardi Gras", "Ganesh Chaturthi|Durga Puja|Onam", "Road Trip|Vacation|Staycation",
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
      "Telekinesis|Mind Reading|Invisibility", "Invisibility Cloak|Flying Carpet|Magic Ring", "Haunted Castle|Haunted House|Graveyard",
      "Genie|Magic Lamp|Three Wishes", "Spaceship|Space Station|Mothership", "Lightsaber|Laser Gun|Ray Gun",
      "Zombie Apocalypse|Alien Invasion|Robot Uprising", "Treasure Chest|Pirate Map|Gold Coins", "Mummy|Skeleton|Zombie",
      "Goblin|Imp|Gremlin", "Knight|Samurai|Ninja", "Princess|Queen|Empress", "Potion|Elixir|Poison",
      "Bigfoot|Yeti|Loch Ness Monster", "Parallel Universe|Multiverse|Time Travel", "Superhero|Villain|Sidekick",
      "Medusa|Minotaur|Cyclops"
    ]
  },
  {
    id: "desi", name: "Desi Life", icon: "🪔",
    words: [
      "Biryani|Pulao|Khichdi", "Samosa|Kachori|Pakora", "Chai|Filter Coffee|Lassi", "Dosa|Idli|Uttapam",
      "Pani Puri|Bhel Puri|Sev Puri", "Butter Chicken|Paneer Tikka|Tandoori Chicken", "Roti|Naan|Paratha",
      "Gulab Jamun|Rasgulla|Jalebi", "Ladoo|Barfi|Kaju Katli", "Rangoli|Mehndi|Diya",
      "Auto Rickshaw|Cycle Rickshaw|Tempo", "Gully Cricket|IPL|Test Match", "Dhaba|Chai Tapri|Food Stall",
      "Baraat|Sangeet|Haldi", "Pressure Cooker|Tiffin Box|Steel Glass", "Antakshari|Dumb Charades|Ludo",
      "Carrom|Ludo|Snakes and Ladders", "Kite Flying|Gilli Danda|Kanche", "Local Train|Indian Railways|Sleeper Bus",
      "Sharma Ji ka Beta|Nosy Aunty|Distant Relative", "Thandai|Jaljeera|Nimbu Pani", "Pav Bhaji|Vada Pav|Misal Pav",
      "Maggi|Instant Noodles|Hakka Noodles", "Bollywood Song|Item Number|Qawwali", "Saree|Lehenga|Dupatta",
      "Temple|Gurudwara|Pilgrimage", "Ayurveda|Yoga|Home Remedy", "Monsoon|Rainy Day|Waterlogging",
      "Power Cut|Inverter|Generator", "Tuition|Coaching Class|JEE Prep", "Chole Bhature|Rajma Chawal|Dal Makhani",
      "Paan|Supari|Mukhwas", "Kulfi|Falooda|Rabri", "Holi Colours|Water Balloon|Pichkari", "Shaadi|Engagement|Roka",
      "Kabaddi|Wrestling|Akhada", "Bargaining|Window Shopping|Sale"
    ]
  },
  {
    id: "bollywood", name: "Bollywood & Desi TV", icon: "🎥",
    words: [
      "DDLJ|Kuch Kuch Hota Hai|Kabhi Khushi Kabhie Gham", "3 Idiots|PK|Munna Bhai MBBS", "Sholay|Deewaar|Zanjeer",
      "Lagaan|Chak De! India|Dangal", "Dangal|Sultan|Bhaag Milkha Bhaag", "Shah Rukh Khan|Salman Khan|Aamir Khan",
      "Amitabh Bachchan|Rajinikanth|Dharmendra", "Deepika Padukone|Alia Bhatt|Katrina Kaif",
      "Priyanka Chopra|Kareena Kapoor|Anushka Sharma", "Ranveer Singh|Ranbir Kapoor|Varun Dhawan",
      "Hrithik Roshan|Tiger Shroff|Akshay Kumar", "Ajay Devgn|Sunny Deol|Akshay Kumar", "Krrish|Ra.One|Mr. India",
      "Don|Dhoom|Race", "Hera Pheri|Golmaal|Welcome", "Zindagi Na Milegi Dobara|Dil Chahta Hai|Yeh Jawaani Hai Deewani",
      "Baahubali|RRR|KGF", "Devdas|Bajirao Mastani|Padmaavat", "Kabir Singh|Animal|Arjun Reddy",
      "Queen|English Vinglish|Piku", "Gully Boy|Rock On!!|Rockstar", "Andhadhun|Drishyam|Kahaani",
      "Om Shanti Om|Main Hoon Na|Happy New Year", "Jab We Met|Love Aaj Kal|Cocktail", "Taare Zameen Par|Stanley Ka Dabba|Chhichhore",
      "Stree|Bhool Bhulaiyaa|Bhediya", "Pathaan|Tiger|War", "Gangs of Wasseypur|Mirzapur|Sacred Games",
      "Kaun Banega Crorepati|Bigg Boss|The Kapil Sharma Show", "Mogambo|Gabbar Singh|Crime Master Gogo",
      "Arijit Singh|Sonu Nigam|Atif Aslam", "Shreya Ghoshal|Lata Mangeshkar|Sunidhi Chauhan", "Item Song|Sad Song|Wedding Song"
    ]
  },
  {
    id: "china", name: "Laowai Life in China", icon: "🏮",
    words: [
      "WeChat Pay|Alipay|UnionPay", "WeChat|QQ|WhatsApp", "VPN|Great Firewall|Proxy", "Didi|Taxi|Uber",
      "Meituan|Ele.me|Delivery Rider", "Taobao|Pinduoduo|JD.com", "Xiaohongshu|Douyin|Bilibili", "Douyin|TikTok|Kuaishou",
      "Hot Pot|Malatang|Dry Pot", "Dim Sum|Yum Cha|Dumplings", "Xiaolongbao|Jiaozi|Baozi", "Jianbing|Roujiamo|Baozi",
      "Peking Duck|Roast Goose|Char Siu", "Congee|Rice Noodle Roll|Wonton Noodles", "Bubble Tea|Heytea|Mixue",
      "Luckin Coffee|Starbucks|Cotti Coffee", "Baijiu|Tsingtao Beer|Rice Wine", "KTV|Bar Street|Club",
      "Jubensha|Escape Room|Werewolf", "Chopsticks|Soup Spoon|Toothpick", "Squat Toilet|Western Toilet|Public Toilet",
      "Hot Water|Warm Water|Thermos", "High-Speed Rail|Metro|Sleeper Train", "Shared Bike|E-bike|Scooter",
      "Power Bank Rental|Charging Station|Phone Charger", "Delivery Locker|Express Station|Courier",
      "QR Code|Mini Program|Scan to Pay", "Residence Permit|Visa|Passport", "Police Registration|Visa Extension|Immigration Office",
      "HSK Exam|Chinese Class|Language Partner", "Pinyin|Chinese Characters|Tones", "Mandarin|Cantonese|Hokkien",
      "Ni Hao|Xie Xie|Mei Wenti", "Laowai|Expat|Exchange Student", "Dorm|International Student Office|Campus Gate",
      "Canteen|Food Court|Night Market", "Photo Request from Locals|Selfie Stick|Tour Group",
      "Spring Festival|Lantern Festival|Mid-Autumn Festival", "Red Envelope|Firecrackers|Spring Couplets",
      "Mooncake|Zongzi|Tangyuan", "Golden Week|Chunyun|Long Weekend", "Square Dancing|Tai Chi|Morning Exercise",
      "Typhoon|Rainstorm|Humidity", "Haggling|Group Buying|Livestream Shopping", "Sam's Club|Hema|Walmart",
      "FamilyMart|7-Eleven|Lawson", "Chinese Medicine|Acupuncture|Cupping", "Kung Fu|Wushu|Shaolin",
      "Mahjong|Chinese Chess|Dou Dizhu", "Panda|Red Panda|Golden Monkey", "Great Wall|Forbidden City|Terracotta Army",
      "Dragon Dance|Lion Dance|Dragon Boat Race", "Chinese Name|English Name|Nickname", "Group Chat|WeChat Moments|Voice Message",
      "Pleco|Translation App|Pinyin Keyboard", "Facial Recognition|Fingerprint|ID Card"
    ]
  },
  {
    id: "gba", name: "Shenzhen · HK · Macau", icon: "🌉",
    words: [
      "Shenzhen|Guangzhou|Dongguan", "Hong Kong|Macau|Shenzhen", "Zhuhai|Macau|Hengqin",
      "Futian Checkpoint|Lo Wu|Shenzhen Bay Port", "Border Crossing|Customs|Immigration", "Octopus Card|Shenzhen Tong|AlipayHK",
      "MTR|Shenzhen Metro|Light Rail", "Star Ferry|Ding Ding Tram|Peak Tram", "Victoria Peak|Lion Rock|Dragon's Back",
      "Victoria Harbour|Avenue of Stars|Symphony of Lights", "Lan Kwai Fong|Soho|Wan Chai",
      "Mong Kok|Temple Street Night Market|Ladies' Market", "Causeway Bay|Tsim Sha Tsui|Central",
      "Hong Kong Disneyland|Ocean Park|Window of the World", "Big Buddha|Ngong Ping Cable Car|Lantau Island",
      "Cheung Chau|Lamma Island|Peng Chau", "Venetian Macao|Casino|Cotai Strip", "Ruins of St. Paul's|Senado Square|Macau Tower",
      "Portuguese Egg Tart|Pork Chop Bun|Almond Cookie", "Hong Kong Milk Tea|Yuenyeung|Lemon Tea",
      "Pineapple Bun|Egg Waffle|Egg Tart", "Cha Chaan Teng|Dai Pai Dong|Dim Sum Restaurant", "Roast Goose|Char Siu|Siu Yuk",
      "Curry Fish Balls|Siu Mai|Fish Balls", "Hong Kong–Zhuhai–Macau Bridge|Tsing Ma Bridge|Shenzhen Bay Bridge",
      "High-Speed Rail to Hong Kong|Cross-Border Bus|Ferry to Macau", "Canton Tower|Ping An Finance Centre|IFC",
      "Huaqiangbei|Sham Shui Po|Golden Computer Arcade", "Shenzhen Bay Park|Lianhuashan Park|Shekou",
      "OCT Loft|Dafen Oil Painting Village|Shuiwei Village", "Dameisha|Xiaomeisha|Repulse Bay",
      "Duty Free|Outlet Mall|Shopping Spree", "Hong Kong Sevens|Happy Valley Races|Dragon Boat Race",
      "Typhoon Signal 8|Black Rainstorm|Red Rainstorm", "Two Phones|Two SIM Cards|Roaming",
      "HKD|RMB|MOP", "Cantonese|Mandarin|English", "Chungking Mansions|Mirador Mansion|Hostel",
      "Stanley Market|Repulse Bay|Shek O", "Chimelong Safari Park|Chimelong Ocean Kingdom|Zoo", "Canton Fair|Trade Show|Expo"
    ]
  },
  {
    id: "science", name: "Science & Space", icon: "🚀",
    words: [
      "Planet|Moon|Asteroid", "Mars|Venus|Mercury", "Saturn|Jupiter|Neptune", "Black Hole|Wormhole|Supernova",
      "Galaxy|Milky Way|Nebula", "Astronaut|Alien|Cosmonaut", "Telescope|Microscope|Magnifying Glass",
      "Atom|Molecule|Cell", "DNA|Gene|Chromosome", "Gravity|Magnetism|Friction", "Fossil|Skeleton|Amber",
      "Electricity|Lightning|Static Shock", "Magnet|Compass|Battery", "Rocket|Satellite|Space Probe",
      "Oxygen|Hydrogen|Carbon Dioxide", "Vaccine|Antibiotic|Painkiller", "Laboratory|Observatory|Planetarium",
      "Einstein|Newton|Nikola Tesla", "Laser|X-ray|Ultrasound", "Solar Panel|Wind Turbine|Dam",
      "Evolution|Big Bang|Climate Change", "3D Printer|Laser Cutter|Robot Arm", "Petri Dish|Test Tube|Beaker",
      "Periodic Table|Formula|Equation", "Brain|Heart|Lungs", "Skeleton|Skull|Ribcage", "Bacteria|Virus|Fungus",
      "Moon Landing|Mars Rover|Space Walk"
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
      "Limbo|Conga Line|Macarena", "Fake ID|VIP Pass|Guest List", "Slow Dance|Salsa|Tango"
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
  "Would you take a first date there / with it?", "How much does it cost, roughly?", "Is it something you'd find at home?",
  "What colour do you picture when you think of it?", "When did you last come across it?", "Would a kid like it?",
  "Is it bigger than a fridge?", "Would you post it on Instagram?", "Is it noisy or quiet?",
  "Could you take it on a plane?", "Is it more of a day thing or a night thing?", "Would your grandparents know it?",
  "Does it smell good?", "Is it something you'd do or something you'd see?", "Would you go there or use it alone?",
  "What season fits it best?", "Is it fancy or everyday?", "Would you find it in a movie?",
  "How would you feel if you saw it right now?", "What's the worst thing about it?", "Is it popular in your country?",
  "Would you gift it to someone?", "Could it be dangerous?", "Would you need special clothes for it?",
  "Is it older than 100 years?", "Does it need electricity?", "Would you find it in a city or in nature?",
  "What would a dog think of it?", "Is it something people argue about?", "How often do you think about it?"
];
