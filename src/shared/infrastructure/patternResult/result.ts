export class Result<T>{
    constructor(public isSucces:boolean, public statusCode:number, public readonly value?:T,public error?:string){}

    static succes<U>(value:U,status:number){
        return new Result<U>(true,status,value,undefined)
    }

    static failure<U>(error:string,status:number){
        return new Result<U>(false,status,undefined,error);
    }
}