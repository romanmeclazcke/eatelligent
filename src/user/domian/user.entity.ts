export interface UserEntity {
    id:string
    name: string;
    lastName: string;
    email: string;
    password: string;
    birthdate: Date; // Usa el formato YYYY-MM-DD
    userName: string;
    biography?: string;
    profilePicture?: string; // Asegúrate de que esto sea un URL si es necesario
  }