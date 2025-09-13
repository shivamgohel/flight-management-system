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
