import {User} from "../User";
import {IUser} from "../../interfaces/IUser";
import {UserValidationError} from "../../errors/UserValidationError";


describe('User', () => {
    it('should create a new user', () => {
        let user: IUser;

        user = new User('user123', 'test@example.com', "Password123", 'John Doe');
        expect(user.id).toBe('user123');
        expect(user.email).toBe('test@example.com');
        expect(user.name).toBe('John Doe');
        expect(user.createdAt).toBeInstanceOf(Date);
        expect(user.password).toBeDefined();
    })


    it("should throw an error if the email is invalid", () => {
        expect(() => {
            new User('user123', 'testexample.com', 'Password123', 'Test User');
        }).toThrowError(UserValidationError);
    });

});
