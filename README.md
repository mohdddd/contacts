# Contact Manager App

This is a **Contact Manager** web application built with the **MEAN stack** (MongoDB, Express, Angular, Node.js) and **Material UI**. It allows users to manage their contacts (Name, Phone, Address, and Notes), supporting features such as adding, editing, deleting contacts, and real-time collaboration using **Socket.io**.

## Features

- **Login Authentication**: Two hardcoded users can log in (`user1` / `user1`, `user2` / `user2`).
- **Add New Contacts**: Create new contacts by providing a name, phone number, address, and optional notes.
- **Display Contacts**: List all contacts in a paginated grid with server-side pagination (5 contacts per page).
- **Column Filters**: Filter contacts by columns.
- **Edit Contact**: Inline editing of contact details in the grid.
- **Delete Contact**: Remove a contact with confirmation.
- **Real-time Synchronization**: Contacts appear locked to other users during editing (Socket.io).
- **Responsive UI**: Angular + Material UI ensures a sleek, user-friendly interface.

## Technologies Used

- **Frontend**: Angular, Angular Material
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time**: Socket.io for real-time updates

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (v14.x or later)
- **MongoDB** (locally or using a cloud service like MongoDB Atlas)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mohdddd/contacts.git
   cd contacts
    ```

   # Install server-side dependencies:

   ```bash
   cd contacts-backend
   npm install
  # Install client-side dependencies:

   ```bash
   cd ../contacts-frontend
   npm install
```
 # Running the Application
Start MongoDB:

If you're running MongoDB locally, ensure that it is running:

   ```bash
   mongod
```

# Run the backend server:

   ```bash
   cd contacts-backend
   npm start
```

# Run the frontend Angular application:

```bash
   cd contacts-frontend
   ng serve
```

Navigate to http://localhost:4200 in your browser to access the application.

Login Details
The app has two hardcoded users for testing:

Username: user1, Password: user1
Username: user2, Password: user2

API Endpoints

GET /contacts: Retrieve all contacts with pagination.

POST /contacts: Add a new contact.

DELETE /contacts/:id: Delete a contact.

Real-Time Communication

The application uses Socket.io for real-time communication. When a user starts editing a contact, it is "locked" for other users, and they cannot edit it until the first user finishes.

Screenshots

![Mini Contacts]((https://github.com/mohdddd/contacts/blob/master/screenshot.png?raw=true)"Mini Contacts")
License
This project is licensed under the GNU License - see the LICENSE file for details.
