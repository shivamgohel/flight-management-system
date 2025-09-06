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

- **Auth Service** 🔐  
  Handles user authentication and authorization.

- **Reminder Service** ⏰  
  Manages flight reminder notifications.

- **Booking Service** 🧾  
  Handles flight booking and reservation.

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
