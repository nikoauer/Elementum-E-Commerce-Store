# <ELMNTM-Ecommerce-site>

## Description

This is an ecommerce website was built to learn and improve my MERN stack building skills. The website is an outdoor adventure gear retailer website that has both customer and administrator features. Depending on the login users creditionals they can access different features.

Customers can:
- Save items they like to favourite list
- Select a quantity of items they wish to purchase and add them to their cart
- They input their address on the checkout
- See their purchased orders and their shipping and payment status
- Modifiy their name, email or password when logged in
- Can pay using a test paypal account to confirm payment of the purchase
- Customers can also leave reviews about products and see other customers reviews on products

Administrators can:
- View a dashboard informing them of sales, customers, and orders
- Can confirm an item has been delivered
- View the payment status of items
- Add or delete categories for products
- Add, delete or update new products along with adding photos for products
- See all users, modify their details, view if their are administrators or not or even delete users
- Update their name, password or email
- View all products and all categories
- Administrators also have all the perks a customer has

Additional features:
- the store has a filter functionality on the store section allowing customers to search by price, brand or category.
- Responsive design made with tailwind
- Paypal functionality allows for purchases to be made using a real Paypal services but using a fake Paypal testing account

This project proved to be quite challenging, especially in understanding how to properly use react redux to communicate between the front end and backend. Also this was my first tailwind project which also proved to have it's own challenges especially around effectively using its responsive funcitonality. 

![Screenshot1](screenshots/screenshot1.png)
![Screenshot2](screenshots/screenshot2.png)
![Screenshot3](screenshots/screenshot3.png)

## Dependancies

- Nodejs - The runtime environment of the application
- Reactjs - Component based UI library
- Tailwind - for styling and responsive layout
- Mongoose - MongoDB object modeling tool to model the database schema
- MongoDB - NoSQL database
- Expressjs - Framework to handle routes and requests

## Installation

You can clone the repository from Github and fill the database with your own products if you wish. You will need to npm install all the necessary dependancies prior to running the project:
 
 You can run the frontend with command: npm run frontend
 You can run the backend with command: npm run backend
 Finally you can run both the front and backends together with command: npm run develop

## Credits

These resources proved to be invalauble in understanding and building this project:
- Scrimba React & Redux Courses
- Tailwind UI
- freeCodeCamp
- HuXn WebDev Udemy & Youtube 

