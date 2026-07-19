# NB6007CEM S2 Express API - Beginner's Guide
**Student ID:** COBSCCOMP251P-068

Welcome to the **NB6007CEM S2** REST API! This project is a lightweight, backend application built using Node.js and Express.js. It serves data about administrative regions (Provinces & Districts), Police Stations, Patrol Vehicles, Vehicle Models, and Vehicle GPS Pings.

---

## 🚀 Getting Started

If you are new to Node.js, follow these steps to run the project on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Install Dependencies
Open your terminal in this project directory and run the following command to install the required packages (like Express):
```bash
npm install
```

### Step 2: Start the Server
Run the following command to start the server:
```bash
npm start
```
By default, the server will start running at: **`http://localhost:3000`**

---

## 📡 API Endpoint Directory

This API provides several endpoints (URLs) to fetch and upload data. All responses are returned in **JSON (JavaScript Object Notation)** format.

### 📋 Complete Route Table (GET & POST)

| HTTP Method | Route Endpoint | Description | Request Body Example | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Server Status & Welcome | None | `200 OK` | - |
| **GET** | `/provinces` | Retrieve all provinces | None | `200 OK` | - |
| **GET** | `/provinces/:provinceId` | Get a province by ID | None | `200 OK` | `404 Not Found` |
| **POST** | `/provinces` | Create a new province | `{"id": 10, "name": "Sabaragamuwa"}` | `201 Created` | `400 Bad Request` |
| **GET** | `/districts` | Retrieve all districts | None | `200 OK` | - |
| **GET** | `/districts/:districtId` | Get a district by ID | None | `200 OK` | `404 Not Found` |
| **POST** | `/districts` | Create a new district | `{"id": 26, "name": "Kegalle", "province_id": 9}` | `201 Created` | `400 Bad Request` |
| **GET** | `/stations` | Retrieve all police stations | None | `200 OK` | - |
| **GET** | `/stations/:stationId` | Get a station by ID | None | `200 OK` | `404 Not Found` |
| **POST** | `/stations` | Create a new police station | `{"id": 36, "name": "Kegalle Station", "district_id": 25}` | `201 Created` | `400 Bad Request` |
| **GET** | `/vehicles` | Retrieve all patrol vehicles | None | `200 OK` | - |
| **GET** | `/vehicles/:vehicleId` | Get a vehicle by ID | None | `200 OK` | `404 Not Found` |
| **POST** | `/vehicles` | Register a new vehicle | `{"id": 221, "register_number": "WP-123", "device_id": "TUK-999", "station_id": 1}` | `201 Created` | `400 Bad Request` |
| **GET** | `/models` | Retrieve all vehicle models | None | `200 OK` | - |
| **GET** | `/models/:modelId` | Get a model by ID | None | `200 OK` | `404 Not Found` |
| **POST** | `/models` | Create a new vehicle model | `{"id": 4, "name": "L4-Hybrid"}` | `201 Created` | `400 Bad Request` |
| **GET** | `/vehicles/:vehicleId/pings` | Retrieve GPS pings for a vehicle | None | `200 OK` | `404 Not Found` |
| **POST** | `/vehicles/:vehicleId/pings`| Record a new GPS ping for a vehicle| `{"id": 36961, "latitude": 6.92, "longitude": 79.8, "timestamp": "ISO..."}` | `201 Created` | `400 Bad Request` / `404 Not Found` |

---

### 1. Welcome / Status Route
Check if the server is running.
- **URL:** `/`
- **Method:** `GET`
- **Response Example:**
  ```json
  {
    "status": "ok",
    "session": "NB6007CEM S2"
  }
  ```

---

### 2. Provinces Endpoints
Manage and view provinces data.

#### Get All Provinces
- **URL:** `/provinces`
- **Method:** `GET`
- **Response Example:**
  ```json
  [
    { "id": 1, "name": "Western Province" },
    { "id": 2, "name": "Central Province" }
  ]
  ```

#### Get Province by ID
- **URL:** `/provinces/:provinceId`
- **Method:** `GET`
- **URL Parameters:** `provinceId` (e.g., `/provinces/1`)
- **Status Codes:**
  - `200 OK` on success.
  - `404 Not Found` if the ID doesn't exist.
- **Response Example:**
  ```json
  { "id": 1, "name": "Western Province" }
  ```

#### Create a Province
- **URL:** `/provinces`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 10,
    "name": "New Province"
  }
  ```
- **Status Codes:**
  - `201 Created` on success.
  - `400 Bad Request` if parameter validation fails or ID already exists.
- **Response Example:**
  ```json
  { "id": 10, "name": "New Province" }
  ```

---

### 3. Districts Endpoints
Manage and view districts. Each district belongs to a province (linked by `province_id`).

#### Get All Districts
- **URL:** `/districts`
- **Method:** `GET`
- **Response Example:**
  ```json
  [
    { "id": 1, "name": "Colombo", "province_id": 1 }
  ]
  ```

#### Get District by ID
- **URL:** `/districts/:districtId`
- **Method:** `GET`
- **URL Parameters:** `districtId`
- **Response Example:**
  ```json
  { "id": 1, "name": "Colombo", "province_id": 1 }
  ```

#### Create a District
- **URL:** `/districts`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 26,
    "name": "New District",
    "province_id": 1
  }
  ```
- **Response Example:**
  ```json
  { "id": 26, "name": "New District", "province_id": 1 }
  ```

---

### 4. Police Stations Endpoints
View and create Police Stations. Each station is associated with a district (linked by `district_id`).

#### Get All Stations
- **URL:** `/stations`
- **Method:** `GET`
- **Response Example:**
  ```json
  [
    { "id": 1, "name": "Colombo Police Station", "district_id": 1 }
  ]
  ```

#### Get Station by ID
- **URL:** `/stations/:stationId`
- **Method:** `GET`
- **URL Parameters:** `stationId`
- **Response Example:**
  ```json
  { "id": 1, "name": "Colombo Police Station", "district_id": 1 }
  ```

#### Create a Police Station
- **URL:** `/stations`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 36,
    "name": "New Police Station",
    "district_id": 1
  }
  ```
- **Response Example:**
  ```json
  { "id": 36, "name": "New Police Station", "district_id": 1 }
  ```

---

### 5. Vehicles Endpoints
View and register GPS-tracked patrol vehicles.

#### Get All Vehicles
- **URL:** `/vehicles`
- **Method:** `GET`
- **Response Example:**
  ```json
  [
    { "id": 1, "register_number": "HB-6168", "device_id": "TUK-DEV-520651", "station_id": 4 }
  ]
  ```

#### Get Vehicle by ID
- **URL:** `/vehicles/:vehicleId`
- **Method:** `GET`
- **URL Parameters:** `vehicleId`
- **Response Example:**
  ```json
  { "id": 1, "register_number": "HB-6168", "device_id": "TUK-DEV-520651", "station_id": 4 }
  ```

#### Register a Vehicle
- **URL:** `/vehicles`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 221,
    "register_number": "WP-1234",
    "device_id": "TUK-DEV-999999",
    "station_id": 1
  }
  ```
- **Response Example:**
  ```json
  { "id": 221, "register_number": "WP-1234", "device_id": "TUK-DEV-999999", "station_id": 1 }
  ```

---

### 6. Models Endpoints
View and create vehicle models details.

#### Get All Models
- **URL:** `/models`
- **Method:** `GET`
- **Response Example:**
  ```json
  [
    { "id": 1, "name": "L1-Automatic model" }
  ]
  ```

#### Get Model by ID
- **URL:** `/models/:modelId`
- **Method:** `GET`
- **URL Parameters:** `modelId`
- **Response Example:**
  ```json
  { "id": 1, "name": "L1-Automatic model" }
  ```

#### Create a Vehicle Model
- **URL:** `/models`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 4,
    "name": "L4-Hybrid"
  }
  ```
- **Response Example:**
  ```json
  { "id": 4, "name": "L4-Hybrid" }
  ```

---

### 7. Vehicle GPS Pings Endpoint
Get and record GPS pings/breadcrumbs tracked for a specific vehicle.

#### Get Pings for a Vehicle
- **URL:** `/vehicles/:vehicleId/pings`
- **Method:** `GET`
- **URL Parameters:** `vehicleId`
- **Response Example:**
  ```json
  [
    {
      "id": 1,
      "vehicle_id": 1,
      "latitude": 6.9271,
      "longitude": 79.8612,
      "timestamp": "2026-07-19T12:00:00Z"
    }
  ]
  ```

#### Record a GPS Ping for a Vehicle
- **URL:** `/vehicles/:vehicleId/pings`
- **Method:** `POST`
- **URL Parameters:** `vehicleId`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "id": 36961,
    "latitude": 6.9271,
    "longitude": 79.8612,
    "timestamp": "2026-07-19T12:00:00Z"
  }
  ```
- **Response Example:**
  ```json
  {
    "id": 36961,
    "vehicle_id": 1,
    "latitude": 6.9271,
    "longitude": 79.8612,
    "timestamp": "2026-07-19T12:00:00Z"
  }
  ```

---

## 🗄️ Database Seeding

The raw data is stored locally in [seed.json](file:///Users/shane/Documents/Pdf's/WEB-API/WEBAPI/WebAPI/seed.json). To import this data to a connected MongoDB cluster:

1. Open the [seed.mongodb.js](file:///Users/shane/Documents/Pdf's/WEB-API/WEBAPI/WebAPI/seed.mongodb.js) file.
2. Select your MongoDB connection in the VS Code MongoDB Extension.
3. Click the **Play button (▶)** in the top-right corner of the editor, or run the command **MongoDB: Run All From Playground** in the Command Palette.
