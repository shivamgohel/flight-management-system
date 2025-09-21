# ✈️ Flight Management System

Welcome to the **Flight Management System**, a robust backend solution for managing all aspects of modern flight operations.  
Built with **Node.js**, the system is architected around a **flexible microservices framework**, where each service is a specialist, handling a distinct part of the system with efficiency and precision.

This modular approach allows for seamless management of critical domains, including **user authentication, booking, and real-time flight search**.

---

## 🚀 Project Features

- **Modular Microservices Structure**  
  Distributed architecture ensures **high scalability** and **maintainability**.

- **RESTful APIs**  
  Provides a well-defined set of APIs for seamless communication between services.

- **Centralized Configuration**  
  Environment-specific settings managed via **configuration files** and `.env` variables.

- **Database Management**  
  Uses **Sequelize ORM** with **migrations** and **seeders** for schema and data control.

- **Robust Error Handling**  
  Dedicated middleware for validation and consistent error responses.

- **Git Workflow**  
  Follows a standard Git workflow with **dev** and **feature branches** to manage development.

---

## 🏗️ Microservice Architecture

Each microservice in the system is built with a **consistent, layered architecture** to ensure **scalability** and **maintainability**.  
The standard folder structure includes:

- **config** → Configuration files for the server, logging, and database.
- **controllers** → Business logic to handle API requests and send responses.
- **middlewares** → Validation and authentication middleware.
- **migrations** → Manages database schema changes.
- **models** → Database data models and their associations.
- **repository** → The data access layer that abstracts database logic.
- **routes** → API endpoints that route requests to the appropriate controllers.
- **seeders** → Populates the database with initial data.
- **services** → Core business logic that orchestrates calls to the repository layer.
- **utils** → Provides utility functions and reusable code.

## 🛠️ Services

The system is composed of the following **microservices**:

- **Flights Service** ✈️  
  Manages all flight-related data and operations.

- **Booking Service** 🧾  
  Handles flight booking and reservation.

- **Auth Service** 🔐  
  Handles user authentication and authorization.

- **Reminder Service** ⏰  
  Manages flight reminder notifications.

- **API Gateway** 🌐  
  Acts as the single entry point for all client requests, routing them to the appropriate services.

---

## 📂 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL (via Sequelize ORM)
- **Architecture:** Microservices + API Gateway
- **Configuration:** dotenv
- **Version Control:** Git (dev + feature branches)

# ✈️ Flights Microservice

The **Flights Microservice** is the core component for managing **flight-related data**,  
providing a robust set of **RESTful APIs** for handling:

- Flights
- Airports
- Airplanes
- Cities

## 📌 API Endpoints

### 🏙️ Cities

- `GET /api/v1/cities/search`  
  → Search for cities by query parameters
- `GET /api/v1/cities`  
  → Fetch all cities
- `GET /api/v1/cities/:id`  
  → Fetch city details by ID
- `POST /api/v1/cities`  
  → Create a new city ✅ (`CityMiddlewares.validateCreateRequest`)
- `PATCH /api/v1/cities/:id`  
  → Update city details by ID
- `DELETE /api/v1/cities/:id`  
  → Delete city by ID

---

### ✈️ Airplanes

- `GET /api/v1/airplanes`  
  → Fetch all airplanes
- `GET /api/v1/airplanes/:id`  
  → Fetch airplane details by ID
- `POST /api/v1/airplanes`  
  → Create a new airplane ✅ (`AirplaneMiddlewares.validateCreateRequest`)
- `PATCH /api/v1/airplanes/:id`  
  → Update airplane details by ID
- `DELETE /api/v1/airplanes/:id`  
  → Delete airplane by ID

---

### 🛫 Airports

- `GET /api/v1/airports`  
  → Fetch all airports
- `GET /api/v1/airports/:id`  
  → Fetch airport details by ID
- `POST /api/v1/airports`  
  → Create a new airport ✅ (`AirportMiddlewares.validateCreateRequest`)
- `PATCH /api/v1/airports/:id`  
  → Update airport details by ID
- `DELETE /api/v1/airports/:id`  
  → Delete airport by ID

---

### 🛩️ Flights

- `POST /api/v1/flights`  
  → Create a new flight ✅ (`FlightMiddlewares.validateCreateRequest`)

- `GET /api/v1/flights/:id`
  → Fetch detailed information for a specific flight by its ID

- `GET /api/v1/flights`  
  → Fetch all flights with filtering, sorting, and eager loading

  **Query Parameters**

  - `departureAirportId` → Filter by departure airport ID
  - `arrivalAirportId` → Filter by arrival airport ID
  - `minPrice` → Filter flights above a minimum price
  - `maxPrice` → Filter flights below a maximum price
  - `sort` → Sort results (e.g., `price_ASC`, `price_DESC`, `departureTime_ASC`)

  **Includes (Eager Loading)**

  - `airplaneDetail` → Fetch airplane info for the flight
  - `departureAirport` → Fetch departure airport (with associated city)
  - `arrivalAirport` → Fetch arrival airport (with associated city)

### Example Request

`GET /api/v1/flights?departureAirportId=DEL&arrivalAirportId=BOM&minPrice=2000&maxPrice=6000&sort=price_ASC`

### Example Response

```json
[
  {
    "id": 15,
    "flightNumber": "AI-202",
    "price": 2500,
    "departureTime": "2025-09-06T10:00:00Z",
    "arrivalTime": "2025-09-06T12:30:00Z",
    "boardingGate": "A12",
    "airplaneDetail": {
      "id": 1,
      "modelNumber": "Airbus A320",
      "capacity": 180
    },
    "departureAirport": {
      "code": "DEL",
      "name": "Indira Gandhi International Airport",
      "city": {
        "id": 1,
        "name": "New Delhi",
        "country": "India"
      }
    },
    "arrivalAirport": {
      "code": "BOM",
      "name": "Chhatrapati Shivaji Maharaj International Airport",
      "city": {
        "id": 2,
        "name": "Mumbai",
        "country": "India"
      }
    }
  },
  {
    "id": 16,
    "flightNumber": "AI-303",
    "price": 3200,
    "departureTime": "2025-09-06T15:00:00Z",
    "arrivalTime": "2025-09-06T17:25:00Z",
    "boardingGate": "B15",
    "airplaneDetail": {
      "id": 2,
      "modelNumber": "Boeing 737",
      "capacity": 160
    },
    "departureAirport": {
      "code": "DEL",
      "name": "Indira Gandhi International Airport",
      "city": {
        "id": 1,
        "name": "New Delhi",
        "country": "India"
      }
    },
    "arrivalAirport": {
      "code": "BOM",
      "name": "Chhatrapati Shivaji Maharaj International Airport",
      "city": {
        "id": 2,
        "name": "Mumbai",
        "country": "India"
      }
    }
  }
]
```

---

- `PATCH /api/v1/flights/:id/seats`
  → Update the remaining seats on a flight (increment or decrement)
  → Ensures concurrency-safe operations using row-level locking.

  **Path Parameters**

  - `:id` → ID of the flight to update

  **Request Body**

  - `seats` → Required. Number of seats to adjust (positive integer)
  - `dec` → Optional. Boolean (true to decrease, false to increase seats). Defaults to true.

  **Validation & Logic**

  - `seats` must be a positive integer

  - Throws error if dec=true and not enough seats are available

  - Accepts both boolean and string values for dec (e.g., "true", "false")

  - Uses Sequelize transactions with row-level locking for safe updates

### Example Request

`PATCH /api/v1/flights/15/seats`

```json
{
  "seats": 2,
  "dec": true
}
```

### Example Response

```json
{
  "data": {
    "id": 15,
    "flightNumber": "AI-202",
    "totalSeats": 178,
    "price": 2500,
    "departureTime": "2025-09-06T10:00:00Z",
    "arrivalTime": "2025-09-06T12:30:00Z",
    "boardingGate": "A12",
    "airplaneId": 1,
    "departureAirportId": "DEL",
    "arrivalAirportId": "BOM",
    "createdAt": "2025-09-01T08:00:00Z",
    "updatedAt": "2025-09-13T10:30:00Z"
  },
  "success": true,
  "message": "Successfully updated the seats",
  "error": {}
}
```

### Row-Level Locking for Seat Updates

To prevent race conditions and ensure data consistency during seat updates, the Flights Service now implements **row-level locking** on the flight record.

When updating the remaining seats of a flight, the service locks the specific flight row in the database using a `SELECT ... FOR UPDATE` query inside a transaction. This ensures that concurrent requests to update seats are serialized, preventing conflicts and inconsistent seat counts.

```js
await db.sequelize.query(
  `SELECT * FROM Flights WHERE Flights.id = :flightId FOR UPDATE`,
  {
    replacements: { flightId },
  }
);
```

---

# 🧾 Booking Microservice

---

The **Booking Microservice** handles all flight booking operations including creation, retrieval, update, and cancellation of bookings.

### 🔄 Inter-Service Communication

The Booking Microservice communicates with the Flights Microservice using **HTTP requests via Axios**.

- Example: Fetching flight details inside a database transaction before creating a booking.

```js
async function createBooking(data) {
  try {
    const result = await db.sequelize.transaction(
      async function bookingImplementation(t) {
        // Fetch flight details from Flights Service
        const flight = await axios.get(
          `${serverConfig.FLIGHTS_SERVICE}/api/v1/flights/${data.flightId}`
        );

        const flightData = flight.data.data;

        // Prepare booking data with total cost calculated
        const bookingData = {
          flightId: data.flightId,
          userId: data.userId,
          noOfSeats: data.noOfSeats,
          totalCost: data.noOfSeats * flightData.price,
        };

        // Create booking within the transaction
        const booking = await bookingRepository.create(bookingData, {
          transaction: t,
        });

        return booking;
      }
    );
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
```

- Axios calls are awaited to ensure synchronous flow inside transactions.

- Network failures or validation errors will cause the transaction to rollback.

- This pattern ensures data consistency between services.

---

## 📌 API Endpoints

### ✍️ Create Booking

`POST /api/v1/bookings`

Create a new booking.

**Request Body**

| Field       | Type    | Description             | Required |
| ----------- | ------- | ----------------------- | -------- |
| `flightId`  | Integer | Flight identifier       | Yes      |
| `userId`    | Integer | User identifier         | Yes      |
| `noOfSeats` | Integer | Number of seats to book | Yes      |

**Validation**

- `flightId` and `userId` must be valid integers.
- `noOfSeats` must be a positive integer.
- Seat availability is verified with the Flights Service.

**Success Response**

```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 101,
    "flightId": 15,
    "userId": 23,
    "noOfSeats": 2,
    "totalCost": 5000,
    "status": "BOOKED",
    "createdAt": "2025-09-13T10:00:00Z",
    "updatedAt": "2025-09-13T10:00:00Z"
  },
  "error": {}
}
```

### RabbitMQ Publishing

After successfully creating a booking, the Booking Service publishes a message to RabbitMQ to notify the Notification Service for email delivery. The published message contains:

- `type`: `BOOKING_CREATED`
- `bookingId` → ID of the newly created booking
- `userId` → User ID
- `userEmail` → User email fetched from Auth Service
- `flightId` → Flight ID
- `seats` → Number of seats booked
- `totalCost` → Total booking cost
- `timestamp` → Booking creation timestamp

The Notification Service consumes this message asynchronously, creates a pending ticket in the database with `status: PENDING`, and sends the confirmation email via the scheduled email cron job.

---

### 🔍 Get Booking by ID

`GET /api/v1/bookings/:id`

Fetch booking details by ID.

**Parameters**

| Name | Type    | Description | Required |
| ---- | ------- | ----------- | -------- |
| `id` | Integer | Booking ID  | Yes      |

**Success Response**

```json
{
  "success": true,
  "message": "Booking fetched successfully",
  "data": {
    "id": 101,
    "flightId": 15,
    "userId": 23,
    "noOfSeats": 2,
    "totalCost": 5000,
    "status": "BOOKED",
    "createdAt": "2025-09-13T10:00:00Z",
    "updatedAt": "2025-09-13T10:00:00Z"
  },
  "error": {}
}
```

---

### 📋 Get All Bookings

`GET /api/v1/bookings`

Fetch a list of all bookings.

**Success Response**

```json
{
  "success": true,
  "message": "Bookings fetched successfully",
  "data": [
    {
      "id": 101,
      "flightId": 15,
      "userId": 23,
      "noOfSeats": 2,
      "totalCost": 5000,
      "status": "BOOKED",
      "createdAt": "2025-09-13T10:00:00Z",
      "updatedAt": "2025-09-13T10:00:00Z"
    },
    {
      "id": 102,
      "flightId": 16,
      "userId": 45,
      "noOfSeats": 1,
      "totalCost": 2500,
      "status": "CANCELLED",
      "createdAt": "2025-09-10T08:30:00Z",
      "updatedAt": "2025-09-12T09:15:00Z"
    }
  ],
  "error": {}
}
```

---

### ✏️ Update Booking Status

`PATCH /api/v1/bookings/:id`

Update the status of an existing booking.

**Path Parameters**

| Parameter | Type   | Description        | Required |
| --------- | ------ | ------------------ | -------- |
| `id`      | String | Booking identifier | Yes      |

**Request Body**

| Field    | Type   | Description                                                    | Required |
| -------- | ------ | -------------------------------------------------------------- | -------- |
| `status` | String | New status value (e.g., BOOKED, CANCELLED, INITIATED, PENDING) | Yes      |

**Validation**

- `status` is required.
- Allowed values: `BOOKED`, `CANCELLED`, `INITIATED`, `PENDING`.

**Success Response**

```json
{
  "success": true,
  "message": "Booking updated successfully",
  "data": {
    "id": 101,
    "flightId": 15,
    "userId": 23,
    "noOfSeats": 2,
    "totalCost": 5000,
    "status": "CANCELLED",
    "createdAt": "2025-09-13T10:00:00Z",
    "updatedAt": "2025-09-14T12:00:00Z"
  },
  "error": {}
}
```

---

### ❌ Cancel Booking

`PATCH /api/v1/bookings/:id/cancel`

Cancel an existing booking by setting its status to **CANCELLED**.

**Path Parameters**

| Parameter | Type   | Description        | Required |
| --------- | ------ | ------------------ | -------- |
| `id`      | String | Booking identifier | Yes      |

**Success Response**

```json
{
  "success": true,
  "message": "Booking cancelled successfully",
  "data": {
    "id": 101,
    "flightId": 15,
    "userId": 23,
    "noOfSeats": 2,
    "totalCost": 5000,
    "status": "CANCELLED",
    "createdAt": "2025-09-13T10:00:00Z",
    "updatedAt": "2025-09-14T12:30:00Z"
  },
  "error": {}
}
```

---

## ⚙️ Request Validation Middlewares

### Create Booking Validator

- Validates presence and type of `flightId`, `userId`, and `noOfSeats`.
- Returns **400 Bad Request** if validation fails.

### Seat Availability Validator

- Calls Flights Service to ensure requested seats are available.
- Returns **400 Bad Request** if there are insufficient seats.

### Status Update Validator

- Ensures `status` field exists in the request body.
- Validates that `status` is one of the allowed values:
  `BOOKED`, `CANCELLED`, `INITIATED`, `PENDING`.

---

## 🔧 Internal Logic Notes

- Booking creation runs inside a **database transaction** to ensure atomicity.
- **Total cost** is computed by multiplying `noOfSeats` by the flight price fetched from the Flights Service.
- Status updates and cancellations only modify the booking **status** field.
- Errors are **logged** for monitoring and debugging purposes.
- Communicates with the **Flights Service** to fetch flight data and verify seat availability.

---

# 🔐 Auth Service

The **Auth Service** handles user authentication and authorization for the Flight Management System.  
It provides secure user signup, signin, and role management functionalities without relying on external libraries like Passport.js, using JWTs for tokens and bcrypt for password hashing.

---

## 🚀 Features

- **User Signup**  
  Register new users with securely hashed passwords using bcrypt.

- **User Signin**  
  Authenticate users and issue JSON Web Tokens (JWT) for session management.

- **Role Management**  
  Assign roles to users for role-based access control (RBAC).

- **Middleware Authentication & Authorization**  
  Custom `isAuthenticated` middleware to verify JWTs.  
  Custom `isAuthorized` middleware to enforce user role permissions.

- **Request Validation**  
  Middlewares to validate signup and signin request bodies to ensure data integrity.

- **Sequelize ORM**  
  Models and migrations to manage Users, Roles, and UserRoles.

- **Logging**  
  Centralized logging configuration for error tracking and debugging.

---

## 📄 API Endpoints

### Authentication

| Method | Endpoint              | Description                | Access |
| ------ | --------------------- | -------------------------- | ------ |
| POST   | `/api/v1/auth/signup` | Register a new user        | Public |
| POST   | `/api/v1/auth/signin` | Authenticate and get token | Public |

### User Role Management

| Method | Endpoint                       | Description                    | Access            |
| ------ | ------------------------------ | ------------------------------ | ----------------- |
| POST   | `/api/v1/auth/users/:id/roles` | Assign role(s) to a user by ID | Protected (Admin) |

---

## 🔐 Middleware

- **isAuthenticated**: Verifies JWT tokens and authenticates users.
- **isAuthorized**: Checks if the authenticated user has required role(s).
- **validateSignup**: Validates user registration data.
- **validateSignin**: Validates user login data.

---

## 💾 Database Models

- **User**  
  Stores user credentials and profile info.

- **Role**  
  Defines roles like `ADMIN`, `FLIGHT_COMPANY` & `USER`.

- **UserRole**  
  Maps users to their roles (many-to-many relationship).

---

## 🔧 How It Works

- **Signup:**  
  User submits registration details → password is hashed → user record created → optionally assign roles.

- **Signin:**  
  User submits credentials → password verified → JWT token generated → token returned for authorization in future requests.

- **Role Assignment:**  
  Admin users can assign roles to other users → used by authorization middleware to permit access.

- **Request Authorization:**  
  Middleware validates JWT → extracts user roles → permits or denies access based on roles.

## 🔒 Security

- **Password Hashing:** Uses bcrypt with salt rounds for strong hashing.
- **JWT Handling:** Tokens include expiration and secure signing.
- **Input Validation:** Protects against injection and malformed data.

---

# 📧 Notification Service

The **Notification Service** is responsible for managing and delivering email notifications to users within the Flight Management System. It ensures reliable email delivery using **RabbitMQ** for queuing, a retry mechanism, and a scheduled cron job for processing pending or failed emails.

---

## 🚀 Features

- **Email Sending**
  Send transactional emails such as booking confirmations, cancellations, and reminders.

- **RabbitMQ Integration**
  Booking Service publishes email tickets to **RabbitMQ**, which the Notification Service consumes.

- **Robust Error Handling**
  Handles authentication failures, network issues, and unexpected errors with descriptive logs and retry logic.

- **Retry Mechanism**
  Emails with status `PENDING` or `FAILED` are retried automatically until successfully delivered.

- **Cron-Based Scheduler**
  A cron job runs every **5 minutes** to process queued emails and update their delivery status.

- **Centralized Logging**
  Logs all email attempts, successes, and failures for monitoring and debugging.

---

## ⚡ Why Use a Queue

In the Flight Management System, booking events can occur at **very high traffic volumes**, especially during peak booking hours. On the other hand, the Notification Service typically handles **less frequent email sending operations**.

Using a **message queue (RabbitMQ)** provides several advantages:

1. **Asynchronous Processing**: Booking Service can publish messages without waiting for the Notification Service to send emails, preventing delays in booking flow.
2. **Traffic Buffering**: High booking traffic will not overwhelm the Notification Service. Messages are queued and processed at a manageable pace.
3. **Reliability**: Even if the Notification Service is temporarily down, messages remain in the queue and will be processed later.
4. **Decoupling Services**: Booking Service and Notification Service are independent, making the system more maintainable and scalable.
5. **Retry Mechanism**: Failed email messages can remain in the queue or DB ticket for retries without blocking new bookings.

**Why not use HTTP directly?**

- Synchronous HTTP calls would require the Booking Service to wait for the Notification Service to process emails.
- High traffic could cause delays or failures in booking creation.
- Queue-based async processing ensures smooth operation even under heavy load.

---

## ⚙️ Notification Service Full Workflow

### 1. Booking Event Published

- **Trigger:** User creates a booking via Booking Service.
- **Action:** Booking Service publishes an email notification payload to **RabbitMQ**.
- **Payload Structure:**

```json
{
  "type": "BOOKING_CREATED",
  "bookingId": 101,
  "userId": 23,
  "userEmail": "user@example.com",
  "flightId": 15,
  "seats": 2,
  "totalCost": 5000,
  "timestamp": "2025-09-13T10:00:00Z"
}
```

### 2. Notification Service Consumes Message

- **Queue:** RabbitMQ Queue subscribed by Notification Service.
- **Action:** Consumes the message and creates a **ticket** in the database.
- **Ticket Data Stored:**

```js
const ticketData = {
  subject: `Booking Confirmation #${bookingId}`,
  content: `Your booking for flight ${flightId} with ${seats} seat(s) totaling $${totalCost} was successfully created on ${timestamp}.`,
  recepientEmail: userEmail,
  status: PENDING,
};
```

### 3. Cron Job for Email Processing

- **Schedule:** Every 5 minutes (`*/5 * * * *`).
- **Function:** `sendPendingEmails()`.
- **Action:** Picks up tickets with `PENDING` or `FAILED` status for processing.

### 4. Email Sending Logic

- Attempts to send emails using **Nodemailer with Gmail SMTP**.
- Handles error scenarios:

  - **EAUTH** → Authentication failure, mark as `FAILED`
  - **ECONNECTION / ETIMEDOUT / ESOCKET** → Network issues, mark as `FAILED`
  - **Unexpected errors** → Log and mark as `FAILED`

- On successful delivery, ticket status updated to `SUCCESS`.

### 5. Retry Mechanism

- Emails with status `FAILED` or still `PENDING` are retried automatically in the next cron cycle.
- Ensures that no email is left unsent.

### 6. Logging & Monitoring

- All actions, successes, and failures are logged centrally.
- Example logs:

```bash
INFO: Found 3 pending emails to send.
INFO: Email sent to user1@example.com: 250 OK
INFO: Email sent and status updated for ticket ID 12
ERROR: Failed to send email for ticket ID 13 Authentication failed
INFO: Retrying email on next cron cycle
```

### 7. End-to-End Flow

```
Booking Service ---> RabbitMQ Exchange ---> Notification Service ---> Ticket Created in DB (PENDING) ---> Cron Job (sendPendingEmails) ---> Email Sent via Nodemailer/Gmail ---> Recipient
```

---

## 📧 Email Configuration

The Notification Service uses **Nodemailer** with Gmail as the SMTP service.

```js
const nodemailer = require("nodemailer");

const { GMAIL_EMAIL, GMAIL_PASSWORD } = require("./server-config");

const mailSender = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
});

module.exports = { mailSender };
```

This is imported as `emailConfig.mailSender` in the service for sending emails.

---

## 📄 Core Functions

### `sendEmail`

Responsible for sending emails using the configured mail transporter.

- Handles different error scenarios:

  - **EAUTH** → Authentication failure
  - **ECONNECTION / ETIMEDOUT / ESOCKET** → Network issues
  - Any other error is treated as **Unexpected**

```js
async function sendEmail(mailFrom, mailTo, subject, text, html = null)
```

---

### `getPendingTickets`

Fetches all email tickets with status **PENDING** or **FAILED** for retry processing.

```js
async function getPendingTickets()
```

---

### `sendPendingEmails`

Processes pending tickets:

1. Fetch tickets with status **PENDING** or **FAILED**.
2. Attempt to send each email using `sendEmail`.
3. Update ticket status:

   - ✅ `SUCCESS` → Email sent successfully.
   - ❌ `FAILED` → Email failed, will retry later.

```js
async function sendPendingEmails()
```

---

### `startEmailCron`

Starts a **cron job** that runs every **5 minutes** to process pending and failed emails automatically.

```js
async function startEmailCron()
```

---

## ✅ Summary

The **Notification Service** ensures reliable, consistent, and fault-tolerant email delivery within the Flight Management System. With **RabbitMQ integration**, retry mechanisms, structured error handling, and a scheduled cron job, it guarantees that no email is left unsent.
