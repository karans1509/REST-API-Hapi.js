# assign-04
Book lending API with Hapi.js and JWT authentication

## Team Members
* Karan Saini ( 100290458 )
* Dilpreet Kaur Sanghera ( 100288689 )

## Instructions for Testing
The app has been deployed on heroku and is available at the url - https://fathomless-plains-76558.herokuapp.com. For the routes that require authorization, in the Authorization tab in POSTMAN, select Bearer Token from the dropdown and provide your token. Below are the various routes.

### Users

1. - Path - /users
   - Action - POST
   - Authorization - Not required
   - Payload should be a JSON object like this - 
  {
    "email": "test@gmail.com",
        "booksBorrowed": [
            {
                "bookId": "5a1a15a906fc3d284c1db749",
                "dueDate": "2017-12-15"
            }
        ],
        "booksReserved": [{
        	"bookId" : "5a19fe19d6f8112b5cb3c636"
        }],
        "lateFee": 10
 }
 
   - Response - A user without admin access will be created and you will get a token in the response which you will need to provide at the below routes.It will be valid only for two hours. If you try to post again with the same email, you will get an error message saying "Email already registered". 
 
2. - Path - /users
   - Action - GET
   - Authorization - Admin access required.
   - Response - A list of all the users with their details.
  
3. - Path - /users?late_fee
   - Action - GET
   - Authorization - Admin access required.
   - Response - A list of all the users with late_fee.
  
4. - Path - /users/{emailId}
   - Action - GET
   - Authorization - Any authenticated user can access it.
   - Response - Details of the user with the email id provided as the parameter.
  
5. - Path - /users/auth
   - Action - POST
   - Payload - It should be a JSON object with an already registered "email".
   - Authorization - Not required
   - Response - A token to access the routes. This route is provided for any returning user who wants to access the resources.
  
6. - Path - /users/{id} , here {id} is the "_id" attribute generated automatically by mongodb for every user in the database.
   - Action - PUT
   - Payload - A JSON object with at least one of these fields - "email", "booksBorrowed", "booksReserved", "lateFee". 
   - Authorization - Only admin access
   - Response - "User data modified"
  
7. - Path - /users/{id} , {id} is "_id"
   - Action - DELETE
   - Authorization - Only admin access
   - Response - "User deleted from database"
  
  
  ### Books
  
 Path - /books
  Action - GET
  Authorization - Any authenticated user can access
  Response - List of all the books
  
 Path - /books?genre=fanstasy , search by genre
  Action - GET
  Authorization - Any authenticated user can access
  Response - List of all the books with the given genre
  
 Path - /books?title=prisoner , search by entering keywords of the title of the book
  Action - GET
  Authorization - Any authenticated user can access
  Response - List of all the books which contain those keywords
  
 Path - /books?author=JK Rowling , search by author
  Action - GET
  Authorization - Any authenticated user can access
  Response - List of all the books by the specified author
  
 Path - /books
  Action - POST
  Payload - It should be a JSON object like this - 
    {
        "title": "Half Blood Prince",
        "author": "JK Rowling",
        "genre": "fantasy",
        "publication": {
            "date": "2009-04-16",
            "company": "abc"
        },
        "availability": {
            "available": "no",
            "copies": 3,
            "edition": "first",
            "borrowedBy": "Dilpreet"
        }
}
  Authorization - Any authenticated user can access.
  Response - Data Inserted
  
 Path - /books/{id} , {id} is the "_id" attribute auto-generated for every book added to mongodb
  Action - GET
  Authorization - Any authenticated user
  Response - Details about the book with {id}
  
 Path - /books/{id} , {id} is the "_id" attribute auto-generated for every book added to mongodb
  Action - PUT
  Payload - A JSON object containing at least one of these four fields - "title, "author", "publication", "availability".
  Authorization - Any authenticated user
  Response - Book Data modified
  
 Path - /books/{id} , {id} is the "_id" attribute auto-generated for every book added to mongodb
  Action - DELETE
  Authorization - Admin access required
  Response - Book Deleted from database
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
