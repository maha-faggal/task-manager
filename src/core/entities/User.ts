import {IUser} from '../interfaces/IUser';
import {ValidationUtils} from "../../utils/validation";
import {UserValidationError} from "../errors/UserValidationError";
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';
import {v4 as uuidv4} from 'uuid'; // Make sure to install: npm install uuid @types/uuid

@Entity({tableName: 'users'})
export class User implements IUser {

    @PrimaryKey({fieldName: "id"})
    private _id: string = uuidv4();

    @Property({fieldName: "email"})
    private readonly _email: string;

    @Property({fieldName: "password"})
    private readonly _password: string;

    @Property({fieldName: "created_at"})
    private readonly _createdAt: Date;

    @Property({fieldName: "name"})
    private _name: string;


    constructor(email: string, password: string, name: string) {

        if (ValidationUtils.isValidEmail(email) === false) {
            throw new UserValidationError('Invalid email address')
        }

        if (ValidationUtils.isValidPassword(password) === false) {
            throw new UserValidationError('Invalid password')
        }

        if (name.trim().length === 0) {
            throw new UserValidationError('Invalid name')
        }

        this._email = email;
        this._password = password;
        this._name = name;
        this._createdAt = new Date(Date.now());
    }


    // These getters are now required by the IUser interface
    get id(): string {
        return this._id
    }

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get password(): string {
        return this._password;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set name(name: string) {
        this._name = name;
    }
}
