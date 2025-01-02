import {IUser} from '../interfaces/IUser';
import {ValidationUtils} from "../../utils/validation";
import {UserValidationError} from "../errors/UserValidationError";

export class User implements IUser {

    private readonly _id: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _createdAt: Date;
    private _name: string;


    constructor(id: string, email: string, password: string, name: string) {

        if (ValidationUtils.isValidEmail(email) === false) {
            throw new UserValidationError('Invalid email address')
        }

        if (ValidationUtils.isValidPassword(password) === false) {
            throw new UserValidationError('Invalid password')
        }

        if (name.trim().length === 0) {
            throw new UserValidationError('Invalid name')
        }

        this._id = id;
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
}
