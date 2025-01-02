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
exports.Task = void 0;
const ITask_1 = require("../interfaces/ITask");
const core_1 = require("@mikro-orm/core");
const User_1 = require("./User");
let Task = class Task {
    constructor(id, title, description, createdBy) {
        if (!id.trim()) {
            throw new Error('Task ID cannot be empty');
        }
        if (!title.trim()) {
            throw new Error('Task title cannot be empty');
        }
        const now = new Date();
        this._id = id;
        this._title = title.trim();
        this._description = description.trim();
        this._status = ITask_1.TaskStatus.TODO; // New tasks always start as TODO
        this._createdBy = createdBy;
        this._createdAt = now;
        this._updatedAt = now;
    }
    // Public getters to satisfy the interface
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get status() {
        return this._status;
    }
    get createdBy() {
        return this._createdBy;
    }
    get assignedTo() {
        return this._assignedTo;
    }
    get createdAt() {
        return new Date(this._createdAt.getTime());
    }
    get updatedAt() {
        return new Date(this._updatedAt.getTime());
    }
    // Methods to modify the task
    updateTitle(newTitle) {
        if (!newTitle.trim()) {
            throw new Error('Task title cannot be empty');
        }
        this._title = newTitle.trim();
        this._updatedAt = new Date();
    }
    updateDescription(newDescription) {
        this._description = newDescription.trim();
        this._updatedAt = new Date();
    }
    updateStatus(newStatus) {
        this._status = newStatus;
        this._updatedAt = new Date();
    }
    assignTo(user) {
        this._assignedTo = user;
        this._updatedAt = new Date();
    }
    unassign() {
        this._assignedTo = undefined;
        this._updatedAt = new Date();
    }
};
exports.Task = Task;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", String)
], Task.prototype, "_id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Task.prototype, "_title", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Task.prototype, "_description", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Task.prototype, "_status", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", Object)
], Task.prototype, "_createdBy", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", Object)
], Task.prototype, "_assignedTo", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Task.prototype, "_createdAt", void 0);
__decorate([
    (0, core_1.Property)({ onUpdate: () => new Date() }),
    __metadata("design:type", Date)
], Task.prototype, "_updatedAt", void 0);
exports.Task = Task = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String, String, String, Object])
], Task);
//# sourceMappingURL=Task.js.map