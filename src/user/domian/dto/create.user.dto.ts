export class CreateUserDto{
    readonly  name: string;

    readonly  lastName: string;

    readonly  email: string;

    readonly  password: string;

    readonly  birthdate: Date;

    readonly  userName: string;

    readonly  biography?: string;

    readonly  profilePicture?: string;

}