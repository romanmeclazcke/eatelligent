import { UserEntity } from "src/user/domian/user.entity";
import { postCreateDto } from "./dto/post.create.dto";
import { postUpdateDto } from "./dto/post.update.dto";
import { postEntity } from "./post.entity";
import User from "src/user/infrastructure/models/user.models";

export interface postRepository{
    
    getPostsFromUsersIFollow(userId:string):Promise<postEntity[]|null>;//incluir count likes
    getPostById(id:string):Promise<postEntity|null> //incluye comentarios
    getPostByUser(userId:string):Promise<postEntity[]|null>//incluir count likes
    findPost(userId:string, id:string):Promise<postEntity|null>
    createPost(userId:string,postCreateDto:postCreateDto):Promise<postEntity|null>;
    editPost(userId:string,id:string,postUpdateDto:postUpdateDto,file: Express.Multer.File):Promise<postEntity|null>
    deletePost(userId:string,id:string):Promise<number|null>
    

}