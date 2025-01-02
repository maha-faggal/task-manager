"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const validation_1 = require("../../utils/validation");
const UserValidationError_1 = require("../errors/UserValidationError");
const core_1 = require("@mikro-orm/core");
let User = class User {
    constructor(id, email, password, name) {
        if (validation_1.ValidationUtils.isValidEmail(email) === false) {
            throw new UserValidationError_1.UserValidationError('Invalid email address');
        }
        if (validation_1.ValidationUtils.isValidPassword(password) === false) {
            throw new UserValidationError_1.UserValidationError('Invalid password');
        }
        if (name.trim().length === 0) {
            throw new UserValidationError_1.UserValidationError('Invalid name');
        }
        this._id = id;
        this._email = email;
        this._password = password;
        this._name = name;
        this._createdAt = new Date(Date.now());
    }
    // These getters are now required by the IUser interface
    get id() {
        return this._id;
    }
    get email() {
        return this._email;
    }
    get name() {
        return this._name;
    }
    get password() {
        return this._password;
    }
    get createdAt() {
        return this._createdAt;
    }
};
exports.User = User;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "_email", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "_password", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], User.prototype, "_createdAt", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "_name", void 0);
exports.User = User = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, String])
], User);
//# sourceMappingURL=User.js.map