# Study Code Backend API

This is a Node.js backend API for the Study Code project.

## Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Data

- `GET /api/data` - Get all data
- `GET /api/data/:id` - Get data by ID
- `POST /api/data` - Create new data
- `PUT /api/data/:id` - Update data
- `DELETE /api/data/:id` - Delete data

## Example Requests

### Create a User

```
POST /api/users
Content-Type: application/json

{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user"
}
```

### Create Data

```
POST /api/data
Content-Type: application/json

{
  "title": "New Data",
  "content": "This is new data content"
}
```
