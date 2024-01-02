const myMiddleware = (req, res, next) => {
    // Your middleware logic here
    console.log('This is my middleware');
    next(); // Don't forget to call next() to pass control to the next middleware/route handler
};

module.exports = myMiddleware;
