require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();

// ======================================================
// CONFIGURATION
// ======================================================

const PORT = Number(process.env.PORT || 3000);

const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "tiger",
    database: process.env.DB_NAME || "careerjob",
    port: Number(process.env.DB_PORT || 3306),
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
};

// ======================================================
// DATABASE CONNECTION
// ======================================================

const db = mysql.createPool(DB_CONFIG);

app.locals.db = db;

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());

app.use(express.json({
    limit: "3mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "3mb"
}));

// ======================================================
// STATIC FRONTEND
// ======================================================

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

// ======================================================
// HOME PAGE
// ======================================================

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS database_test");

        res.json({
            success: true,
            message: "CareerJob API is running",
            database: "connected",
            test: rows[0].database_test === 1
        });

    } catch (error) {
        console.error("Database health check failed:", error);

        res.status(500).json({
            success: false,
            database: "disconnected",
            message: error.message
        });
    }
});

// ======================================================
// API ROUTES
// ======================================================

app.use(
    "/api/auth",
    require("./routes/auth")
);

app.use(
    "/api/profile",
    require("./routes/profile")
);

app.use(
    "/api/jobs",
    require("./routes/jobs")
);

app.use(
    "/api/saved-jobs",
    require("./routes/savedJobs")
);

app.use(
    "/api/applications",
    require("./routes/applications")
);

app.use(
    "/api/companies",
    require("./routes/companies")
);

app.use(
    "/api/dashboard",
    require("./routes/dashboard")
);

app.use(
    "/api/admin",
    require("./routes/admin")
);

// ======================================================
// 404 API HANDLER
// ======================================================

app.use("/api", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl
    });
});

// ======================================================
// FRONTEND FALLBACK
// ======================================================
// This handles frontend routes such as:
// /dashboard
// /jobs
// /companies
//
// Static HTML files such as /dashboard.html are already
// handled by express.static() above.
//
// We intentionally do NOT use app.get("*") because that
// can cause routing errors with some Express versions.
// ======================================================

app.use((req, res, next) => {
    // If the request looks like an API request, don't
    // return index.html.
    if (req.path.startsWith("/api/")) {
        return res.status(404).json({
            success: false,
            message: "API endpoint not found",
            path: req.originalUrl
        });
    }

    // If the browser is requesting an existing static
    // file, express.static() should already have handled it.
    // Otherwise return the main frontend.
    res.sendFile(path.join(publicPath, "index.html"));
});

// ======================================================
// GLOBAL ERROR HANDLER
// ======================================================

app.use((err, req, res, next) => {
    console.error("Server error:", err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

// ======================================================
// START SERVER
// ======================================================

async function startServer() {
    try {
        // Test MySQL before starting the HTTP server
        const connection = await db.getConnection();

        await connection.query("SELECT 1");

        connection.release();

        console.log("MySQL connected successfully");

        app.listen(PORT, () => {
            console.log(`CareerJob running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MySQL connection failed!");
        console.error(error.message);

        process.exit(1);
    }
}

startServer();

// ======================================================
// GRACEFUL SHUTDOWN
// ======================================================

process.on("SIGINT", async () => {
    console.log("\nShutting down CareerJob...");

    try {
        await db.end();
        console.log("MySQL connection pool closed.");
    } catch (error) {
        console.error("Error closing MySQL:", error.message);
    }

    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("\nSIGTERM received. Shutting down...");

    try {
        await db.end();
    } catch (error) {
        console.error("Error closing MySQL:", error.message);
    }

    process.exit(0);
});