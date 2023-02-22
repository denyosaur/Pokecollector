//ExpressError extends normal JS error to add a status and message
class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    };
};

//NotFoundError extends ExpressError. Used for 404 page not found errors
class NotFoundError extends ExpressError {
    constructor(message = "404 not found") {
        super(message, 404);
    };
};

//UnauthorizedError extends ExpressError. Used for unauthorized users trying to access content they aren't allowed to view
class UnauthorizedError extends ExpressError {
    constructor(message = "401 not Authorized") {
        super(message, 401);
    };
};

//BadRequestError extends ExpressError. Used for invalid requests sent by user
class BadRequestError extends ExpressError {
    constructor(message = "400 Bad Request") {
        super(message, 400);
    };
};

//ForbiddenError extends ExpressError. Used for bad request errors
class ForbiddenError extends ExpressError {
    constructor(message = "403 Bad Request") {
        super(message, 403);
    };
};

module.exports = {
    ExpressError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ForbiddenError
};