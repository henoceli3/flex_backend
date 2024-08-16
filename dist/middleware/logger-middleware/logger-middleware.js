"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
class LoggerMiddleware {
    use(req, res, next) {
        console.log({
            message: `Requete reçue: ${req.method} on ${req.url}`,
            date: new Date(),
            data: req.body,
        });
        next();
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger-middleware.js.map