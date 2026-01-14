CREATE TABLE IF NOT EXISTS users (
    users_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE IF NOT EXISTS food (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (category_id) REFERENCES category(category_id)
    ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS nutrition (
    nutrition_id SERIAL PRIMARY KEY,
    food_id INTEGER NOT NULL,
    calories INTEGER,
    protein FLOAT,
    fat FLOAT,
    fiber FLOAT,
    sugar FLOAT,
    sodium FLOAT,
    carbs FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
    ON DELETE CASCADE
)

CREATE TABLE IF NOT EXISTS servings (
    serving_id SERIAL PRIMARY KEY,
    food_id INTEGER NOT NULL,
    serving_name VARCHAR(100) NOT NULL,
    grams FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
    ON DELETE CASCADE
)
