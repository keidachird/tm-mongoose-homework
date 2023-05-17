# mongoose-homework

### Installation

1. Clone repo
2. Open the project directory
3. run `npm install` command
4. Update `.env` variables
5. run `npm run dev` command

### Task

1. Implement CRUD for users

- 1.1 Use already created empty user schema, model, controller, route as example

#### User Schema

```
{
  firstName: type string, min length 4, max length 50, required field, trim;
  lastName: type string, min length 3, max length 60, required field, trim;
  fullName: type string, set it using middleware (`<firstName> <lastName>`);
  email: type string, required field, email validation, lowercase;
  role: type string, only valid values is [admin, writer, guest],
  age: type number, min 1, max 99, if value < 0 set 1 (middleware);
  numberOfArticles: type number, default value 0;
  createdAt: type datetime, date of creation the document;
  updatedAt: type datetime, should be updated each time when the document updated;
}
```

- Using [Postman](https://www.getpostman.com/), and api endpoint **/users (GET)**, I want to have the possibility
  to get all users with the ability to sort them by age (query parameters). Return only user id, fullName, email and age fields.

- Using [Postman](https://www.getpostman.com/), and api endpoint **/users (POST)**, I want to create new user document,
  so that I can have the possibility to find it in mongodb users collection.

- Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (PUT)**, I want to have the possibility
  to edit user document fields (firstName, lastName, age, don't forget to regenerate fullName).

- Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (GET)**, I want to have possibility
  to get information about any user by passing specific user id as an api parameter.
  (Response also should contain all articles that user created, only title, subtitle and created date fields).

- Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (DELETE)**, I want to have possibility
  to remove specific user from mongodb and all articles that he created.

2. Implement CRUD for articles

- 2.1 Create schema, model, controller, routes

#### Article Schema

```
{
  title: type string, min length 5, max length 400, required field, trim.
  subtitle: type string, min length 5, not required field,
  description: type string, min length 5, max length 5000, required,
  owner: user reference, required field,
  category: valid options [sport, games, history], required
  createdAt: type datetime, date of creation the document;
  updatedAt: type datetime, should be updated each time when the document updated;
}
```

- Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (POST)**, I want to create new article.
  Before creating new article, you should check if owner exist.
  (Don't forget that all your articles should have reference to specific user - **_owner_** field, and also after creating new article, increment **_numberOfArticles_** field for that user).

- Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (PUT)**, I want to have possibility
  to edit any article document. Before you make update action, you should always check if article / user exist, and only
  after that start updating document. Only owner can update the article.

- Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (GET)**,
  I want to have the possibility to search for articles using **title**.
  Add the pagination for the results (using page and limit query params)
  (Also you should populate owner field (return only fullName, email and age fields)).

- Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (DELETE)**,
  I want to have possibility to delete any article from database. (Don't forget to decrement **_numberOfArticles_** field for user that created this article). Only owner can delete the article

3. Not required!

- 3.1 Add the ability to 'like' the article by the user
  (Add **_likedArticles_** (article reference) to user schema, and **_likes_** (user reference) to article schema)
  The user can 'like' the article and remove the 'like'
  Please, try to follow the REST architecture.
