"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationError = void 0;
class UserValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserValidationError';
    }
}
exports.UserValidationError = UserValidationError;
//# sourceMappingURL=UserValidationError.js.map