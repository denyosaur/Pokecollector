"use strict";
const express = require("express");
const app = express();

const cors = require("cors");

const { NotFoundError } = require("./expressErrors");

const { authenticateJWT } = require("./middleware/auth");

const authRoutes = require("./routes/auth");
const cardsRoutes = require("./routes/cards");
const decksRoutes = require("./routes/decks");
const storeRoutes = require("./routes/store");
const tradesRoutes = require("./routes/trades");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

/* Routes */
app.use("/auth", authRoutes);
app.use("/cards", cardsRoutes);
app.use("/decks", decksRoutes);
app.use("/store", storeRoutes);
app.use("/trades", tradesRoutes);
app.use("/user", userRoutes);

/* Handles 404 errors */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/* Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;