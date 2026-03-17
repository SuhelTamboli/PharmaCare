** List of API's **

# Auth
POST - /api/auth/register -- register new user (Role - Pharmacist/Customer)
POST - /api/auth/login -- login user (Role - Pharmacist/Customer)

# User
GET - /api/user/profile -- get logged in user details (Role - Pharmacist/Customer)
POST - /api/user/logout -- logout user (Role - Pharmacist/Customer)

# Medicine
POST - api/medicine/add-medicine -- add new medicine in inventory (Role - Pharmacist)
GET - api/medicine/all-medicine -- get all medicines details in inventory (Role - Pharmacist/Customer)
GET - api/medicine/get-medicine/:name -- get medicine by name (Role - Pharmacist/Customer)
DELETE - api/medicine/delete-medicine/:id -- delete medicine by id (Role - Pharmacist)
POST - api/medicine/purchase-medicine -- purchase medicines (Role - Customer)

# Cart
POST - api/cart/add-to-cart -- add medicines to user's cart (Role - Customer)
GET - api/cart/fetch-cart -- fetch cart items for user (Role - Customer)

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid, shipped, cancelled
    delivery_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    medicine_id INTEGER REFERENCES medicines(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL -- Crucial for historical accuracy
);





