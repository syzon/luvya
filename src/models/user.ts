export class User {
    name: string = '';
    email: string = '';
    dateOfBirth: Date = null;
    gender: string = '';
    password: string = '';
    confirmPassword: string = '';

    constructor(
        name: string,
        email: string,
        dateOfBirth: Date,
        gender: string,
        password: string,
        confirmPassword: string
    ) {
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth
        this.gender = gender;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
