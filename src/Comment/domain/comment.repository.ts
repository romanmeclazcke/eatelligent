import { commentEntity } from "./comment.entity";
import { commentCreateDto } from "./dto/comment.create.dto";
import { commentUpdateDto } from "./dto/comment.update.dto";

export interface commentRepository{

    addComment(userId:string, postId:string,commentCreateDto:commentCreateDto):Promise<commentEntity|null>;
    updateComment(userId:string,commentId:string,commentCreateDto:commentUpdateDto):Promise<commentEntity|null>;
    deleteComment(userId:string, postId:string,commentId:string):Promise<number>;
    findCommentById(commentId:string):Promise<commentEntity|null>;
    isYourComment(userId:string,commentId:string):Promise<boolean>

}