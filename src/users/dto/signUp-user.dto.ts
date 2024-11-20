import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { userSignInDto } from "./signin-user.dto";

export class userSignUpDto extends userSignInDto {
    @IsNotEmpty({ message: "name should not be null" })
    name: string
    
}