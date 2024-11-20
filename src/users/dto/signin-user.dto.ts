import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class userSignInDto{
    @IsNotEmpty({ message: 'email not be null' })
    @IsEmail({}, { message: 'enter valid email' })
    email: string

    @IsNotEmpty({ message: "Password should not be null" })
    @MinLength(5, { message: 'password should contain 5 characters' })
    password: string
}