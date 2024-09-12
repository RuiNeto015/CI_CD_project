require("dotenv").config();
const mysql = require("mysql2");
import fetch from "node-fetch";

const {
  DDD_FORUM_DB_USER,
  DDD_FORUM_DB_PASS,
  DDD_FORUM_DB_HOST,
  DDD_FORUM_DB_DEV_DB_NAME,
  DDD_FORUM_DB_TEST_DB_NAME,
  DDD_FORUM_DB_PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const dbName =
  NODE_ENV === "development"
    ? DDD_FORUM_DB_DEV_DB_NAME
    : NODE_ENV === "production"
    ? DDD_FORUM_DB_PROD_DB_NAME
    : DDD_FORUM_DB_TEST_DB_NAME;

const connection = mysql.createConnection({
  host: DDD_FORUM_DB_HOST,
  user: DDD_FORUM_DB_USER,
  password: DDD_FORUM_DB_PASS,
  database: dbName,
});

// Mysql smoke tests
connection.connect((err) => {
  if (err) {
    throw new Error("Error connecting to MySQL: " + err.stack);
  }

  const query = "SELECT * FROM post LIMIT 1";
  connection.query(query, (error, results) => {
    if (error) {
      throw new Error("Error executing query: " + error.stack);
    }

    connection.end((endError) => {
      if (endError) {
        throw new Error("Error closing connection: " + endError.stack);
      }
      console.log("Database smoke test passed");
    });
  });
});

// Frontend smoke tests
const FRONTEND_URL = "http://localhost:3000";

async function runFrontendSmokeTest() {
  try {
    const response = await fetch(FRONTEND_URL);

    if (response.status === 200) {
      console.log("Frontend smoke test passed");
    } else {
      throw new Error("Frontend smoke test failed");
    }
  } catch (error) {
    throw new Error("Frontend smoke test failed");
  }
}

// Backend smoke tests
const BACKEND_URL = "http://localhost:5001/api/v1/posts/popular";

async function runBackendSmokeTest() {
  try {
    const response = await fetch(BACKEND_URL);

    if (response.status === 200) {
      console.log("Backend smoke test passed");
    } else {
      throw new Error("Backend smoke test failed");
    }
  } catch (error) {
    throw new Error("Backend smoke test failed");
  }
}

runFrontendSmokeTest();
runBackendSmokeTest();
