const RESTAURANTS = [
  {
    id: 1,
    name: "Pizza Paradise",
    cuisine: "Italian",
    category: "pizza",
    rating: 4.5,
    reviews: 320,
    deliveryTime: "25-35 min",
    deliveryFee: 40,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    featured: true,
    address: "123 Main Street",
    description: "Authentic Italian pizzas made with fresh ingredients and wood-fired oven."
  },
  {
    id: 2,
    name: "Dragon Wok",
    cuisine: "Chinese",
    category: "chinese",
    rating: 4.3,
    reviews: 215,
    deliveryTime: "30-40 min",
    deliveryFee: 30,
    priceRange: "$",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop",
    featured: true,
    address: "456 Oak Avenue",
    description: "Traditional Chinese flavors with a modern twist. Szechuan specialties."
  },
  {
    id: 3,
    name: "Spice Garden",
    cuisine: "Indian",
    category: "indian",
    rating: 4.7,
    reviews: 189,
    deliveryTime: "35-45 min",
    deliveryFee: 35,
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    featured: true,
    address: "789 Spice Road",
    description: "Aromatic curries and tandoori dishes. Experience the flavors of India."
  },
  {
    id: 4,
    name: "Burger Barn",
    cuisine: "American",
    category: "burgers",
    rating: 4.2,
    reviews: 412,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    priceRange: "$",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    featured: true,
    address: "321 Burger Lane",
    description: "Juicy burgers, crispy fries, and thick milkshakes. American comfort food."
  },
  {
    id: 5,
    name: "Sakura Sushi",
    cuisine: "Japanese",
    category: "sushi",
    rating: 4.6,
    reviews: 156,
    deliveryTime: "30-40 min",
    deliveryFee: 50,
    priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    featured: false,
    address: "555 Sakura Way",
    description: "Fresh sushi and sashimi prepared by expert chefs. Premium quality fish."
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    category: "mexican",
    rating: 4.4,
    reviews: 278,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    priceRange: "$",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    featured: true,
    address: "888 Fiesta Street",
    description: "Authentic Mexican street food. Tacos, burritos, and quesadillas."
  }
];

const MENU_ITEMS = {
  1: [
    { id: 101, name: "Margherita Pizza", description: "Fresh mozzarella, tomato sauce, basil on thin crust", price: 250, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop", category: "Pizzas", popular: true },
    { id: 102, name: "Pepperoni Supreme", description: "Loaded with pepperoni, cheese, and marinara sauce", price: 300, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop", category: "Pizzas", popular: true },
    { id: 103, name: "BBQ Chicken Pizza", description: "Grilled chicken, BBQ sauce, red onions, cilantro", price: 350, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop", category: "Pizzas", popular: false },
    { id: 104, name: "Veggie Delight", description: "Bell peppers, mushrooms, olives, onions, tomatoes", price: 280, image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada4d?w=300&h=200&fit=crop", category: "Pizzas", popular: false },
    { id: 105, name: "Garlic Bread", description: "Crispy garlic bread with herb butter and parmesan", price: 120, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=300&h=200&fit=crop", category: "Sides", popular: true },
    { id: 106, name: "Caesar Salad", description: "Romaine lettuce, croutons, parmesan, Caesar dressing", price: 180, image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=200&fit=crop", category: "Sides", popular: false },
    { id: 107, name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 150, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop", category: "Desserts", popular: false },
    { id: 108, name: "Cola", description: "Ice-cold cola (500ml)", price: 40, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&h=200&fit=crop", category: "Drinks", popular: false }
  ],
  2: [
    { id: 201, name: "Kung Pao Chicken", description: "Spicy chicken with peanuts, vegetables, chili peppers", price: 280, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300&h=200&fit=crop", category: "Mains", popular: true },
    { id: 202, name: "Sweet & Sour Pork", description: "Crispy pork with pineapple, peppers in tangy sauce", price: 300, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&h=200&fit=crop", category: "Mains", popular: true },
    { id: 203, name: "Fried Rice Special", description: "Wok-fried rice with shrimp, chicken, egg, vegetables", price: 220, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop", category: "Rice & Noodles", popular: false },
    { id: 204, name: "Pad Thai", description: "Stir-fried rice noodles with shrimp, peanuts, bean sprouts", price: 250, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300&h=200&fit=crop", category: "Rice & Noodles", popular: true },
    { id: 205, name: "Spring Rolls (4 pcs)", description: "Crispy vegetable spring rolls with sweet chili sauce", price: 140, image: "https://images.unsplash.com/photo-1539755530862-00f623c00f52?w=300&h=200&fit=crop", category: "Starters", popular: false },
    { id: 206, name: "Hot & Sour Soup", description: "Traditional Chinese soup with tofu, mushrooms, bamboo", price: 100, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop", category: "Soups", popular: false },
    { id: 207, name: "Mango Pudding", description: "Silky smooth mango pudding with coconut milk", price: 90, image: "https://images.unsplash.com/photo-1621293954908-907159247fc8?w=300&h=200&fit=crop", category: "Desserts", popular: false }
  ],
  3: [
    { id: 301, name: "Butter Chicken", description: "Tender chicken in creamy tomato-butter sauce, mild spice", price: 320, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop", category: "Curries", popular: true },
    { id: 302, name: "Lamb Biryani", description: "Fragrant basmati rice with spiced lamb, saffron, fried onions", price: 380, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop", category: "Biryani", popular: true },
    { id: 303, name: "Palak Paneer", description: "Cottage cheese cubes in spiced spinach gravy", price: 260, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=200&fit=crop", category: "Curries", popular: false },
    { id: 304, name: "Chicken Tikka Masala", description: "Grilled chicken in rich, creamy masala sauce", price: 320, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop", category: "Curries", popular: true },
    { id: 305, name: "Naan Bread (2 pcs)", description: "Soft, fluffy tandoor-baked bread", price: 60, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop", category: "Breads", popular: false },
    { id: 306, name: "Samosa (2 pcs)", description: "Crispy pastry stuffed with spiced potatoes and peas", price: 100, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop", category: "Starters", popular: true },
    { id: 307, name: "Mango Lassi", description: "Creamy yogurt drink blended with ripe mango", price: 80, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&h=200&fit=crop", category: "Drinks", popular: false },
    { id: 308, name: "Gulab Jamun (3 pcs)", description: "Deep-fried milk dumplings in rose syrup", price: 100, image: "https://images.unsplash.com/photo-1666190466521-dddb8f04284c?w=300&h=200&fit=crop", category: "Desserts", popular: false }
  ],
  4: [
    { id: 401, name: "Classic Cheeseburger", description: "Beef patty, cheddar cheese, lettuce, tomato, special sauce", price: 200, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop", category: "Burgers", popular: true },
    { id: 402, name: "Bacon BBQ Burger", description: "Beef patty, crispy bacon, BBQ sauce, onion rings", price: 280, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300&h=200&fit=crop", category: "Burgers", popular: true },
    { id: 403, name: "Mushroom Swiss", description: "Beef patty, sauteed mushrooms, Swiss cheese, truffle mayo", price: 300, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300&h=200&fit=crop", category: "Burgers", popular: false },
    { id: 404, name: "Crispy Chicken Sandwich", description: "Crispy fried chicken, pickles, spicy mayo, brioche bun", price: 220, image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=300&h=200&fit=crop", category: "Burgers", popular: true },
    { id: 405, name: "Loaded Fries", description: "Crispy fries topped with cheese, bacon, jalapenos, sour cream", price: 150, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=200&fit=crop", category: "Sides", popular: false },
    { id: 406, name: "Onion Rings", description: "Golden crispy battered onion rings with ranch dip", price: 100, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300&h=200&fit=crop", category: "Sides", popular: false },
    { id: 407, name: "Chocolate Milkshake", description: "Thick and creamy chocolate milkshake with whipped cream", price: 120, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop", category: "Drinks", popular: true }
  ],
  5: [
    { id: 501, name: "Salmon Nigiri (6 pcs)", description: "Fresh salmon over seasoned sushi rice", price: 350, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop", category: "Nigiri", popular: true },
    { id: 502, name: "Dragon Roll", description: "Eel, cucumber, avocado, topped with avocado and eel sauce", price: 400, image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=300&h=200&fit=crop", category: "Rolls", popular: true },
    { id: 503, name: "Spicy Tuna Roll", description: "Fresh tuna, spicy mayo, cucumber, sesame seeds", price: 300, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop", category: "Rolls", popular: true },
    { id: 504, name: "Sashimi Platter", description: "Chef's selection of 12 pieces of fresh sashimi", price: 600, image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=300&h=200&fit=crop", category: "Sashimi", popular: false },
    { id: 505, name: "Edamame", description: "Steamed and salted soybeans", price: 80, image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?w=300&h=200&fit=crop", category: "Starters", popular: false },
    { id: 506, name: "Miso Soup", description: "Traditional Japanese soup with tofu, seaweed, green onion", price: 60, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop", category: "Soups", popular: false },
    { id: 507, name: "Mochi Ice Cream (3 pcs)", description: "Assorted flavors of Japanese rice cake ice cream", price: 150, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop", category: "Desserts", popular: true }
  ],
  6: [
    { id: 601, name: "Chicken Tacos (3 pcs)", description: "Grilled chicken, salsa verde, cilantro, onion, lime", price: 200, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=200&fit=crop", category: "Tacos", popular: true },
    { id: 602, name: "Carne Asada Burrito", description: "Grilled steak, rice, beans, guacamole, cheese, sour cream", price: 280, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&h=200&fit=crop", category: "Burritos", popular: true },
    { id: 603, name: "Cheese Quesadilla", description: "Flour tortilla with melted cheese, served with salsa and sour cream", price: 160, image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop", category: "Quesadillas", popular: false },
    { id: 604, name: "Nachos Supreme", description: "Loaded nachos with beef, beans, cheese, jalapenos, guacamole", price: 220, image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300&h=200&fit=crop", category: "Starters", popular: true },
    { id: 605, name: "Chicken Quesadilla", description: "Grilled chicken, cheese, peppers, onions in flour tortilla", price: 200, image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300&h=200&fit=crop", category: "Quesadillas", popular: false },
    { id: 606, name: "Churros (4 pcs)", description: "Crispy cinnamon sugar churros with chocolate dipping sauce", price: 120, image: "https://images.unsplash.com/photo-1624371414361-e670edf4e835?w=300&h=200&fit=crop", category: "Desserts", popular: true },
    { id: 607, name: "Horchata", description: "Traditional Mexican rice milk drink with cinnamon", price: 60, image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=300&h=200&fit=crop", category: "Drinks", popular: false }
  ]
};

const CATEGORIES = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "pizza", name: "Pizza", icon: "🍕" },
  { id: "chinese", name: "Chinese", icon: "🥡" },
  { id: "indian", name: "Indian", icon: "🍛" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "sushi", name: "Sushi", icon: "🍣" },
  { id: "mexican", name: "Mexican", icon: "🌮" }
];
