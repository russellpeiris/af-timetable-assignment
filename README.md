[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)


# AF Assignment - Timetable

## Description
This is a project for AF Assignment focusing on a Timetable system.

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/russellpeiris/af-assignment-timetable.git
    ```

2. Navigate to the project directory:

    ```bash
    cd af-assignment-timetable
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```env
    PORT=4000
    MONGO_URI=mongodb+srv://admin:admin@af.haslhbb.mongodb.net/
    JWT_SECRET=
    SALT_SECRET=
    MAIL_USER=
    MAIL_CLIENT_ID=
    MAIL_CLIENT_SECRET=
    REFRESH_TOKEN=
    REDIRECT_URI=
    ```

## Running the Application

### Development Mode
To run the application in development mode with nodemon:

```bash
npm run dev
```


### Production Mode

To build and run the application in production mode:

```bash
npm run build
npm start
```

## Linting and Formatting 

To lint and fix the code:

```bash
npm run format
```

## Seeding the Database

```bash
npm run seed
```

## Database Design
![image](https://github.com/sliitcsse/assignment-01-russellpeiris/assets/99230526/63d2e771-b0af-4469-9c32-c096037aef6d)
