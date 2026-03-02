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
POST - api/medicine/purchase-medicine -- purchase medicines (Role - Customer)





