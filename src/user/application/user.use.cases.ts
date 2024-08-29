import { Injectable, Res } from "@nestjs/common";
import { userRepositorySequelize } from "../infrastructure/repository/user.repository.sequelize";
import { UserEntity } from "../domian/user.entity";
import { Result } from "src/shared/infrastructure/patternResult/result";
import { CreateUserDto } from "../domian/dto/create.user.dto";
import { CloudinaryService } from "src/shared/infrastructure/cloudinary/cloudinary.service";
import { UpdateUserDto } from "../domian/dto/user.update";
import { AuthService } from "src/shared/infrastructure/auth/auth.service";
import { SightEngineServices } from "src/shared/infrastructure/IAimage/sight.engine.service";



@Injectable()
export class userUseCases {
    
    constructor(private userRepository: userRepositorySequelize, private cloudinary: CloudinaryService,private readonly authService: AuthService, private imageServices: SightEngineServices){}
    
    async getAllUser(): Promise<Result<UserEntity[]|null>>{
        const user = await this.userRepository.getUsers();
        if(user){
            return Result.succes(user,200)
        }else{
            return  Result.failure("user not found",404)
        }
    }
    
    async getUserById(id:string):Promise<Result<UserEntity|null>>{
        const user = await this.userRepository.getUserById(id);
        if(user){
            return Result.succes(user,200)
        }else{
            return Result.failure("user not found",404)
        }
    }

    async createUser(createUser:CreateUserDto,file: Express.Multer.File):Promise<Result<UserEntity|null>>{
        const emailInUse= await this.userRepository.getUserByEmail(createUser.email);
         
        if(emailInUse){
            return Result.failure("User with email already exists",404);
        }
        const usernameInUse= await this.userRepository.getUserByUserName(createUser.userName);
        
        if(usernameInUse){
            return Result.failure("User with username already exists",404);
        }

        const passwordHashed = await this.authService.hashPassword(createUser.password);

        if(!passwordHashed.isSucces){
            return Result.failure("Error to hash password",500)
        }

        let profilePictureUrl: string | null = null;
        //impelemtar verificacion por email

        if (file) {
            try {
                const uploadResult = await this.cloudinary.uploadImage(file);
                profilePictureUrl = uploadResult.url; 
            } catch (uploadError) {
                return Result.failure("Failed to upload image", 500);
            }
        }
        const userWithImage: CreateUserDto = { ...createUser, profilePicture: profilePictureUrl,password:passwordHashed.value }
        
        const user = await this.userRepository.createUser(userWithImage);

        if(user){
            return Result.succes(user,201)
        }else{
            return Result.failure("Error to create user",500)
        }   
    }

    async updateUserInformation(updateUser:UpdateUserDto,userId:string):Promise<Result<UserEntity|null>>{
        const userUpdated = await this.userRepository.updateUserInformation(updateUser,userId);
        
        if(userUpdated){
            return Result.succes(userUpdated,200);
        }

        return Result.failure("User not found",404)
    }


    async updateProfilePicture(file: Express.Multer.File, id: string) :Promise<Result<UserEntity|null>>{

        const user = await this.userRepository.getUserById(id);
        
        if (!user) {
            return Result.failure("User not found",404)
        }

        if (user.profilePicture) {
        //    const result = await this.cloudinary.deleteImage(user.profilePicture); //hay error
        //    if(!result.isSucces){
        //     return Result.failure(result.error,result.statusCode)
        //    }
        }

        if (file) {
            try {
                const uploadResult = await this.cloudinary.uploadImage(file);
                const profilePictureUrl = uploadResult.url;

                  const resultDetection=await this.imageServices.detectImage(profilePictureUrl); 
                  
                    console.log("hellow"+resultDetection.isSucces)
                
                 if(!resultDetection.isSucces){ //si el resultado no es exitoso (contiene imagenes con contenido inapropiado)
                    this.cloudinary.deleteImage(profilePictureUrl);
                    return Result.failure("prohibited content",406);
                }

                const userUpdated= await this.userRepository.updateProfilePicture(profilePictureUrl,id)

                if(userUpdated){
                    return Result.succes(userUpdated,200);
                }
                return Result.failure("User not found",404)

            } catch (uploadError) {
                return Result.failure("Failed to upload image", 500);
            }
        }
    }
}