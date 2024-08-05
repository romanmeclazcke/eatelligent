export interface userCreate {
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: Date; // Formato YYYY-MM-DD
    userName: string;
    biography?: string;
    profilePicture?: string; // URL opcional
}
