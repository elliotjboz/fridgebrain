// ===== GROCERY DATABASE =====
// Each item has: name, group (for duplicate detection), category (for organization)
// Duplicate checks happen at the GROUP level — items in the same group flag as potential duplicates

var groceryDB = [
  // === DAIRY ===
  { name: "Whole Milk", group: "Milk", category: "Dairy" },
  { name: "2% Milk", group: "Milk", category: "Dairy" },
  { name: "Skim Milk", group: "Milk", category: "Dairy" },
  { name: "Oat Milk", group: "Milk", category: "Dairy" },
  { name: "Almond Milk", group: "Milk", category: "Dairy" },
  { name: "Coconut Milk", group: "Milk", category: "Dairy" },
  { name: "Soy Milk", group: "Milk", category: "Dairy" },
  { name: "Heavy Cream", group: "Cream", category: "Dairy" },
  { name: "Half & Half", group: "Cream", category: "Dairy" },
  { name: "Whipping Cream", group: "Cream", category: "Dairy" },
  { name: "Butter", group: "Butter", category: "Dairy" },
  { name: "Unsalted Butter", group: "Butter", category: "Dairy" },
  { name: "Margarine", group: "Butter", category: "Dairy" },
  { name: "Cheddar Cheese", group: "Cheese", category: "Dairy" },
  { name: "Mozzarella Cheese", group: "Cheese", category: "Dairy" },
  { name: "Parmesan Cheese", group: "Cheese", category: "Dairy" },
  { name: "Swiss Cheese", group: "Cheese", category: "Dairy" },
  { name: "Cream Cheese", group: "Cheese", category: "Dairy" },
  { name: "Shredded Cheese", group: "Cheese", category: "Dairy" },
  { name: "Cottage Cheese", group: "Cheese", category: "Dairy" },
  { name: "Ricotta Cheese", group: "Cheese", category: "Dairy" },
  { name: "Goat Cheese", group: "Cheese", category: "Dairy" },
  { name: "Feta Cheese", group: "Cheese", category: "Dairy" },
  { name: "String Cheese", group: "Cheese", category: "Dairy" },
  { name: "Greek Yogurt", group: "Yogurt", category: "Dairy" },
  { name: "Regular Yogurt", group: "Yogurt", category: "Dairy" },
  { name: "Vanilla Yogurt", group: "Yogurt", category: "Dairy" },
  { name: "Sour Cream", group: "Sour Cream", category: "Dairy" },
  { name: "Eggs", group: "Eggs", category: "Dairy" },
  { name: "Egg Whites", group: "Eggs", category: "Dairy" },

  // === PRODUCE ===
  { name: "Bananas", group: "Bananas", category: "Produce" },
  { name: "Apples", group: "Apples", category: "Produce" },
  { name: "Green Apples", group: "Apples", category: "Produce" },
  { name: "Oranges", group: "Oranges", category: "Produce" },
  { name: "Clementines", group: "Oranges", category: "Produce" },
  { name: "Mandarins", group: "Oranges", category: "Produce" },
  { name: "Lemons", group: "Lemons", category: "Produce" },
  { name: "Limes", group: "Limes", category: "Produce" },
  { name: "Grapes", group: "Grapes", category: "Produce" },
  { name: "Strawberries", group: "Berries", category: "Produce" },
  { name: "Blueberries", group: "Berries", category: "Produce" },
  { name: "Raspberries", group: "Berries", category: "Produce" },
  { name: "Blackberries", group: "Berries", category: "Produce" },
  { name: "Mixed Berries", group: "Berries", category: "Produce" },
  { name: "Watermelon", group: "Melon", category: "Produce" },
  { name: "Cantaloupe", group: "Melon", category: "Produce" },
  { name: "Honeydew", group: "Melon", category: "Produce" },
  { name: "Pineapple", group: "Pineapple", category: "Produce" },
  { name: "Mango", group: "Mango", category: "Produce" },
  { name: "Avocados", group: "Avocados", category: "Produce" },
  { name: "Tomatoes", group: "Tomatoes", category: "Produce" },
  { name: "Cherry Tomatoes", group: "Tomatoes", category: "Produce" },
  { name: "Roma Tomatoes", group: "Tomatoes", category: "Produce" },
  { name: "Onions", group: "Onions", category: "Produce" },
  { name: "Red Onion", group: "Onions", category: "Produce" },
  { name: "Green Onions", group: "Onions", category: "Produce" },
  { name: "Garlic", group: "Garlic", category: "Produce" },
  { name: "Ginger", group: "Ginger", category: "Produce" },
  { name: "Potatoes", group: "Potatoes", category: "Produce" },
  { name: "Sweet Potatoes", group: "Potatoes", category: "Produce" },
  { name: "Russet Potatoes", group: "Potatoes", category: "Produce" },
  { name: "Carrots", group: "Carrots", category: "Produce" },
  { name: "Baby Carrots", group: "Carrots", category: "Produce" },
  { name: "Celery", group: "Celery", category: "Produce" },
  { name: "Broccoli", group: "Broccoli", category: "Produce" },
  { name: "Cauliflower", group: "Cauliflower", category: "Produce" },
  { name: "Spinach", group: "Leafy Greens", category: "Produce" },
  { name: "Kale", group: "Leafy Greens", category: "Produce" },
  { name: "Spring Mix", group: "Leafy Greens", category: "Produce" },
  { name: "Romaine Lettuce", group: "Leafy Greens", category: "Produce" },
  { name: "Iceberg Lettuce", group: "Leafy Greens", category: "Produce" },
  { name: "Arugula", group: "Leafy Greens", category: "Produce" },
  { name: "Bell Peppers", group: "Peppers", category: "Produce" },
  { name: "Jalapeños", group: "Peppers", category: "Produce" },
  { name: "Cucumber", group: "Cucumber", category: "Produce" },
  { name: "Zucchini", group: "Zucchini", category: "Produce" },
  { name: "Mushrooms", group: "Mushrooms", category: "Produce" },
  { name: "Corn", group: "Corn", category: "Produce" },
  { name: "Green Beans", group: "Green Beans", category: "Produce" },
  { name: "Asparagus", group: "Asparagus", category: "Produce" },
  { name: "Fresh Herbs", group: "Herbs", category: "Produce" },
  { name: "Basil", group: "Herbs", category: "Produce" },
  { name: "Cilantro", group: "Herbs", category: "Produce" },
  { name: "Parsley", group: "Herbs", category: "Produce" },
  { name: "Mint", group: "Herbs", category: "Produce" },

  // === MEAT & SEAFOOD ===
  { name: "Chicken Breast", group: "Chicken", category: "Meat" },
  { name: "Chicken Thighs", group: "Chicken", category: "Meat" },
  { name: "Whole Chicken", group: "Chicken", category: "Meat" },
  { name: "Chicken Wings", group: "Chicken", category: "Meat" },
  { name: "Ground Chicken", group: "Chicken", category: "Meat" },
  { name: "Ground Beef", group: "Beef", category: "Meat" },
  { name: "Steak", group: "Beef", category: "Meat" },
  { name: "Beef Roast", group: "Beef", category: "Meat" },
  { name: "Ground Turkey", group: "Turkey", category: "Meat" },
  { name: "Turkey Breast", group: "Turkey", category: "Meat" },
  { name: "Pork Chops", group: "Pork", category: "Meat" },
  { name: "Pork Tenderloin", group: "Pork", category: "Meat" },
  { name: "Ground Pork", group: "Pork", category: "Meat" },
  { name: "Bacon", group: "Bacon", category: "Meat" },
  { name: "Turkey Bacon", group: "Bacon", category: "Meat" },
  { name: "Sausage", group: "Sausage", category: "Meat" },
  { name: "Italian Sausage", group: "Sausage", category: "Meat" },
  { name: "Hot Dogs", group: "Hot Dogs", category: "Meat" },
  { name: "Deli Turkey", group: "Deli Meat", category: "Meat" },
  { name: "Deli Ham", group: "Deli Meat", category: "Meat" },
  { name: "Salami", group: "Deli Meat", category: "Meat" },
  { name: "Salmon", group: "Salmon", category: "Seafood" },
  { name: "Smoked Salmon", group: "Salmon", category: "Seafood" },
  { name: "Shrimp", group: "Shrimp", category: "Seafood" },
  { name: "Tuna", group: "Tuna", category: "Seafood" },
  { name: "Canned Tuna", group: "Tuna", category: "Seafood" },
  { name: "Tilapia", group: "Fish", category: "Seafood" },
  { name: "Cod", group: "Fish", category: "Seafood" },

  // === BAKERY ===
  { name: "White Bread", group: "Bread", category: "Bakery" },
  { name: "Wheat Bread", group: "Bread", category: "Bakery" },
  { name: "Sourdough Bread", group: "Bread", category: "Bakery" },
  { name: "Rye Bread", group: "Bread", category: "Bakery" },
  { name: "Multigrain Bread", group: "Bread", category: "Bakery" },
  { name: "Hamburger Buns", group: "Buns", category: "Bakery" },
  { name: "Hot Dog Buns", group: "Buns", category: "Bakery" },
  { name: "Bagels", group: "Bagels", category: "Bakery" },
  { name: "English Muffins", group: "English Muffins", category: "Bakery" },
  { name: "Tortillas", group: "Tortillas", category: "Bakery" },
  { name: "Flour Tortillas", group: "Tortillas", category: "Bakery" },
  { name: "Corn Tortillas", group: "Tortillas", category: "Bakery" },
  { name: "Pita Bread", group: "Pita", category: "Bakery" },
  { name: "Croissants", group: "Croissants", category: "Bakery" },
  { name: "Muffins", group: "Muffins", category: "Bakery" },
  { name: "Dinner Rolls", group: "Rolls", category: "Bakery" },

  // === PANTRY ===
  { name: "White Rice", group: "Rice", category: "Pantry" },
  { name: "Brown Rice", group: "Rice", category: "Pantry" },
  { name: "Jasmine Rice", group: "Rice", category: "Pantry" },
  { name: "Basmati Rice", group: "Rice", category: "Pantry" },
  { name: "Spaghetti", group: "Pasta", category: "Pantry" },
  { name: "Penne", group: "Pasta", category: "Pantry" },
  { name: "Fettuccine", group: "Pasta", category: "Pantry" },
  { name: "Macaroni", group: "Pasta", category: "Pantry" },
  { name: "Rigatoni", group: "Pasta", category: "Pantry" },
  { name: "Pasta", group: "Pasta", category: "Pantry" },
  { name: "Tomato Sauce", group: "Pasta Sauce", category: "Pantry" },
  { name: "Marinara Sauce", group: "Pasta Sauce", category: "Pantry" },
  { name: "Alfredo Sauce", group: "Pasta Sauce", category: "Pantry" },
  { name: "Pesto", group: "Pasta Sauce", category: "Pantry" },
  { name: "Canned Tomatoes", group: "Canned Tomatoes", category: "Pantry" },
  { name: "Tomato Paste", group: "Canned Tomatoes", category: "Pantry" },
  { name: "Diced Tomatoes", group: "Canned Tomatoes", category: "Pantry" },
  { name: "Olive Oil", group: "Cooking Oil", category: "Pantry" },
  { name: "Extra Virgin Olive Oil", group: "Cooking Oil", category: "Pantry" },
  { name: "Vegetable Oil", group: "Cooking Oil", category: "Pantry" },
  { name: "Coconut Oil", group: "Cooking Oil", category: "Pantry" },
  { name: "Avocado Oil", group: "Cooking Oil", category: "Pantry" },
  { name: "Cooking Spray", group: "Cooking Oil", category: "Pantry" },
  { name: "Flour", group: "Flour", category: "Pantry" },
  { name: "All-Purpose Flour", group: "Flour", category: "Pantry" },
  { name: "Almond Flour", group: "Flour", category: "Pantry" },
  { name: "Sugar", group: "Sugar", category: "Pantry" },
  { name: "Brown Sugar", group: "Sugar", category: "Pantry" },
  { name: "Powdered Sugar", group: "Sugar", category: "Pantry" },
  { name: "Honey", group: "Sweetener", category: "Pantry" },
  { name: "Maple Syrup", group: "Sweetener", category: "Pantry" },
  { name: "Salt", group: "Salt", category: "Pantry" },
  { name: "Black Pepper", group: "Spices", category: "Pantry" },
  { name: "Cinnamon", group: "Spices", category: "Pantry" },
  { name: "Cumin", group: "Spices", category: "Pantry" },
  { name: "Paprika", group: "Spices", category: "Pantry" },
  { name: "Garlic Powder", group: "Spices", category: "Pantry" },
  { name: "Onion Powder", group: "Spices", category: "Pantry" },
  { name: "Chili Powder", group: "Spices", category: "Pantry" },
  { name: "Italian Seasoning", group: "Spices", category: "Pantry" },
  { name: "Red Pepper Flakes", group: "Spices", category: "Pantry" },
  { name: "Soy Sauce", group: "Soy Sauce", category: "Pantry" },
  { name: "Vinegar", group: "Vinegar", category: "Pantry" },
  { name: "Balsamic Vinegar", group: "Vinegar", category: "Pantry" },
  { name: "Apple Cider Vinegar", group: "Vinegar", category: "Pantry" },
  { name: "Ketchup", group: "Ketchup", category: "Pantry" },
  { name: "Mustard", group: "Mustard", category: "Pantry" },
  { name: "Mayonnaise", group: "Mayo", category: "Pantry" },
  { name: "Hot Sauce", group: "Hot Sauce", category: "Pantry" },
  { name: "Ranch Dressing", group: "Salad Dressing", category: "Pantry" },
  { name: "Italian Dressing", group: "Salad Dressing", category: "Pantry" },
  { name: "Salad Dressing", group: "Salad Dressing", category: "Pantry" },
  { name: "Peanut Butter", group: "Nut Butter", category: "Pantry" },
  { name: "Almond Butter", group: "Nut Butter", category: "Pantry" },
  { name: "Jelly", group: "Jelly", category: "Pantry" },
  { name: "Jam", group: "Jelly", category: "Pantry" },
  { name: "Canned Beans", group: "Beans", category: "Pantry" },
  { name: "Black Beans", group: "Beans", category: "Pantry" },
  { name: "Chickpeas", group: "Beans", category: "Pantry" },
  { name: "Kidney Beans", group: "Beans", category: "Pantry" },
  { name: "Lentils", group: "Beans", category: "Pantry" },
  { name: "Chicken Broth", group: "Broth", category: "Pantry" },
  { name: "Vegetable Broth", group: "Broth", category: "Pantry" },
  { name: "Beef Broth", group: "Broth", category: "Pantry" },
  { name: "Canned Soup", group: "Soup", category: "Pantry" },
  { name: "Oatmeal", group: "Oatmeal", category: "Pantry" },
  { name: "Granola", group: "Granola", category: "Pantry" },
  { name: "Cereal", group: "Cereal", category: "Pantry" },
  { name: "Pancake Mix", group: "Pancake Mix", category: "Pantry" },

  // === SNACKS ===
  { name: "Potato Chips", group: "Chips", category: "Snacks" },
  { name: "Tortilla Chips", group: "Chips", category: "Snacks" },
  { name: "Pretzels", group: "Pretzels", category: "Snacks" },
  { name: "Popcorn", group: "Popcorn", category: "Snacks" },
  { name: "Crackers", group: "Crackers", category: "Snacks" },
  { name: "Graham Crackers", group: "Crackers", category: "Snacks" },
  { name: "Goldfish", group: "Crackers", category: "Snacks" },
  { name: "Granola Bars", group: "Granola Bars", category: "Snacks" },
  { name: "Protein Bars", group: "Granola Bars", category: "Snacks" },
  { name: "Trail Mix", group: "Nuts", category: "Snacks" },
  { name: "Mixed Nuts", group: "Nuts", category: "Snacks" },
  { name: "Almonds", group: "Nuts", category: "Snacks" },
  { name: "Cashews", group: "Nuts", category: "Snacks" },
  { name: "Walnuts", group: "Nuts", category: "Snacks" },
  { name: "Dark Chocolate", group: "Chocolate", category: "Snacks" },
  { name: "Milk Chocolate", group: "Chocolate", category: "Snacks" },
  { name: "White Chocolate", group: "Chocolate", category: "Snacks" },
  { name: "Chocolate Chips", group: "Chocolate", category: "Snacks" },
  { name: "Cookies", group: "Cookies", category: "Snacks" },
  { name: "Hummus", group: "Hummus", category: "Snacks" },
  { name: "Salsa", group: "Salsa", category: "Snacks" },
  { name: "Guacamole", group: "Guacamole", category: "Snacks" },
  { name: "Dried Fruit", group: "Dried Fruit", category: "Snacks" },
  { name: "Fruit Snacks", group: "Fruit Snacks", category: "Snacks" },
  { name: "Applesauce", group: "Applesauce", category: "Snacks" },
  { name: "Pudding", group: "Pudding", category: "Snacks" },
  { name: "Gelatin", group: "Gelatin", category: "Snacks" },
  { name: "Ice Cream", group: "Ice Cream", category: "Frozen" },

  // === BEVERAGES ===
  { name: "Water", group: "Water", category: "Beverages" },
  { name: "Sparkling Water", group: "Water", category: "Beverages" },
  { name: "Orange Juice", group: "Juice", category: "Beverages" },
  { name: "Apple Juice", group: "Juice", category: "Beverages" },
  { name: "Cranberry Juice", group: "Juice", category: "Beverages" },
  { name: "Grape Juice", group: "Juice", category: "Beverages" },
  { name: "Lemonade", group: "Juice", category: "Beverages" },
  { name: "Coffee", group: "Coffee", category: "Beverages" },
  { name: "Ground Coffee", group: "Coffee", category: "Beverages" },
  { name: "Coffee Beans", group: "Coffee", category: "Beverages" },
  { name: "K-Cups", group: "Coffee", category: "Beverages" },
  { name: "Tea", group: "Tea", category: "Beverages" },
  { name: "Green Tea", group: "Tea", category: "Beverages" },
  { name: "Herbal Tea", group: "Tea", category: "Beverages" },
  { name: "Soda", group: "Soda", category: "Beverages" },
  { name: "Diet Soda", group: "Soda", category: "Beverages" },
  { name: "Ginger Ale", group: "Soda", category: "Beverages" },
  { name: "Sports Drink", group: "Sports Drink", category: "Beverages" },
  { name: "Coconut Water", group: "Coconut Water", category: "Beverages" },
  { name: "Energy Drink", group: "Energy Drink", category: "Beverages" },

  // === FROZEN ===
  { name: "Frozen Pizza", group: "Frozen Pizza", category: "Frozen" },
  { name: "Frozen Vegetables", group: "Frozen Vegetables", category: "Frozen" },
  { name: "Frozen Fruit", group: "Frozen Fruit", category: "Frozen" },
  { name: "Frozen Waffles", group: "Frozen Breakfast", category: "Frozen" },
  { name: "Frozen Burritos", group: "Frozen Meals", category: "Frozen" },
  { name: "Frozen Dinner", group: "Frozen Meals", category: "Frozen" },
  { name: "Fish Sticks", group: "Frozen Seafood", category: "Frozen" },
  { name: "Frozen Shrimp", group: "Frozen Seafood", category: "Frozen" },
  { name: "Ice Pops", group: "Ice Cream", category: "Frozen" },
  { name: "Frozen Fries", group: "Frozen Fries", category: "Frozen" },
  { name: "Tater Tots", group: "Frozen Fries", category: "Frozen" },

  // === HOUSEHOLD ===
  { name: "Paper Towels", group: "Paper Towels", category: "Household" },
  { name: "Toilet Paper", group: "Toilet Paper", category: "Household" },
  { name: "Tissues", group: "Tissues", category: "Household" },
  { name: "Trash Bags", group: "Trash Bags", category: "Household" },
  { name: "Dish Soap", group: "Dish Soap", category: "Household" },
  { name: "Hand Soap", group: "Hand Soap", category: "Household" },
  { name: "Laundry Detergent", group: "Laundry", category: "Household" },
  { name: "Dryer Sheets", group: "Laundry", category: "Household" },
  { name: "All-Purpose Cleaner", group: "Cleaner", category: "Household" },
  { name: "Disinfecting Wipes", group: "Cleaner", category: "Household" },
  { name: "Sponges", group: "Sponges", category: "Household" },
  { name: "Aluminum Foil", group: "Foil & Wrap", category: "Household" },
  { name: "Plastic Wrap", group: "Foil & Wrap", category: "Household" },
  { name: "Parchment Paper", group: "Foil & Wrap", category: "Household" },
  { name: "Ziplock Bags", group: "Storage Bags", category: "Household" },
  { name: "Sandwich Bags", group: "Storage Bags", category: "Household" },
  { name: "Paper Plates", group: "Disposables", category: "Household" },
  { name: "Paper Cups", group: "Disposables", category: "Household" },
  { name: "Napkins", group: "Napkins", category: "Household" },

  // === PERSONAL CARE ===
  { name: "Toothpaste", group: "Toothpaste", category: "Personal Care" },
  { name: "Toothbrush", group: "Toothbrush", category: "Personal Care" },
  { name: "Shampoo", group: "Shampoo", category: "Personal Care" },
  { name: "Conditioner", group: "Conditioner", category: "Personal Care" },
  { name: "Body Wash", group: "Body Wash", category: "Personal Care" },
  { name: "Bar Soap", group: "Body Wash", category: "Personal Care" },
  { name: "Deodorant", group: "Deodorant", category: "Personal Care" },
  { name: "Lotion", group: "Lotion", category: "Personal Care" },
  { name: "Sunscreen", group: "Sunscreen", category: "Personal Care" },
  { name: "Razors", group: "Razors", category: "Personal Care" },
  { name: "Floss", group: "Floss", category: "Personal Care" },
  { name: "Cotton Balls", group: "Cotton", category: "Personal Care" },
  { name: "Q-Tips", group: "Cotton", category: "Personal Care" },
  { name: "Band-Aids", group: "First Aid", category: "Personal Care" },
  { name: "Pain Reliever", group: "Medicine", category: "Personal Care" },
  { name: "Vitamins", group: "Vitamins", category: "Personal Care" },

  // === BABY ===
  { name: "Diapers", group: "Diapers", category: "Baby" },
  { name: "Baby Wipes", group: "Baby Wipes", category: "Baby" },
  { name: "Baby Food", group: "Baby Food", category: "Baby" },
  { name: "Baby Formula", group: "Baby Formula", category: "Baby" },

  // === PET ===
  { name: "Dog Food", group: "Dog Food", category: "Pet" },
  { name: "Cat Food", group: "Cat Food", category: "Pet" },
  { name: "Dog Treats", group: "Dog Treats", category: "Pet" },
  { name: "Cat Litter", group: "Cat Litter", category: "Pet" }
];

// ===== SEARCH & MATCHING =====

// Search the database — returns matches sorted by relevance
function searchGroceryDB(query) {
  if (!query || query.trim().length === 0) return [];
  var q = query.toLowerCase().trim();
  var results = [];

  for (var i = 0; i < groceryDB.length; i++) {
    var item = groceryDB[i];
    var name = item.name.toLowerCase();
    // Exact start match = highest priority
    if (name.indexOf(q) === 0) {
      results.push({ item: item, score: 0 });
    // Word start match
    } else if (name.indexOf(' ' + q) > -1) {
      results.push({ item: item, score: 1 });
    // Contains match
    } else if (name.indexOf(q) > -1) {
      results.push({ item: item, score: 2 });
    // Category match
    } else if (item.category.toLowerCase().indexOf(q) === 0) {
      results.push({ item: item, score: 3 });
    }
  }

  results.sort(function (a, b) { return a.score - b.score; });
  return results.map(function (r) { return r.item; });
}

// Find the group for a given item name (exact match from DB)
function getGroupForItem(name) {
  var lower = name.toLowerCase().trim();
  for (var i = 0; i < groceryDB.length; i++) {
    if (groceryDB[i].name.toLowerCase() === lower) return groceryDB[i].group;
  }
  return null;
}

// For custom items not in DB: try to match group by checking if any group name
// appears as a word in the custom item name
function guessGroupForCustomItem(name) {
  var lower = name.toLowerCase().trim();
  var words = lower.split(/\s+/);
  var groups = {};
  for (var i = 0; i < groceryDB.length; i++) {
    groups[groceryDB[i].group] = true;
  }
  // Check if any word in the custom name matches a group name
  // Only match groups with 4+ chars to avoid false positives (e.g. "tea" in "steak")
  for (var g in groups) {
    var groupLower = g.toLowerCase();
    if (groupLower.length < 4) continue;
    // Single-word group: must match a whole word in the item name
    if (groupLower.indexOf(' ') === -1) {
      for (var w = 0; w < words.length; w++) {
        if (words[w] === groupLower) return g;
      }
    } else {
      // Multi-word group: check if it appears as a whole phrase
      var regex = new RegExp('\\b' + groupLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
      if (regex.test(lower)) return g;
    }
  }
  return null;
}

// Check if a new item is a duplicate of anything on the current lists
// Returns { isDuplicate: bool, existingItem: string, group: string, source: string }
function checkDuplicateByGroup(newItemName, existingItems) {
  var newGroup = getGroupForItem(newItemName) || guessGroupForCustomItem(newItemName);
  if (!newGroup) return { isDuplicate: false };

  for (var i = 0; i < existingItems.length; i++) {
    var existingName = existingItems[i].name;
    var existingSource = existingItems[i].source;
    var existingGroup = getGroupForItem(existingName) || guessGroupForCustomItem(existingName);
    if (existingGroup && existingGroup === newGroup && existingName.toLowerCase() !== newItemName.toLowerCase()) {
      return { isDuplicate: true, existingItem: existingName, group: newGroup, source: existingSource };
    }
    // Also check exact match
    if (existingName.toLowerCase().trim() === newItemName.toLowerCase().trim()) {
      return { isDuplicate: true, existingItem: existingName, group: 'exact', source: existingSource };
    }
  }
  return { isDuplicate: false };
}

// Get all current items from all visible lists with source info
function getAllListItems() {
  var items = [];
  // My list
  document.querySelectorAll('#myListItems .my-list-name').forEach(function (el) {
    if (el.closest('.my-list-card').style.display !== 'none') {
      items.push({ name: el.textContent, source: 'you' });
    }
  });
  // Household list — get person name from meta
  document.querySelectorAll('#householdListItems .hh-list-card').forEach(function (card) {
    var name = card.querySelector('.hh-list-name').textContent;
    var meta = card.querySelector('.hh-list-meta');
    var person = meta ? meta.textContent.split(/[·•·]/)[0].trim() : 'someone';
    items.push({ name: name, source: person });
  });
  // Family list
  document.querySelectorAll('#familyListItems .my-list-name').forEach(function (el) {
    if (el.closest('.my-list-card').style.display !== 'none') {
      items.push({ name: el.textContent, source: 'the household' });
    }
  });
  return items;
}
