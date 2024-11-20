import { Request } from 'express';
import { userSignInDto } from './dto/signin-user.dto';
import { userSignUpDto } from './dto/signUp-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { hash, compare } from "bcrypt"
import { plainToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }
  async signUp(userSignUpDto: userSignUpDto): Promise<UserEntity> {
    const userExist = await this.usersRepository.findOne({ where: { email: userSignUpDto.email } })
    if (userExist) throw new BadRequestException('user already exist')
    userSignUpDto.password = await hash(userSignUpDto.password, 10)
    // const user = this.usersRepository.create(userSignUpDto)
    return await this.usersRepository.save(userSignUpDto)
    // return plainToClass(UserEntity, savedUser)
  }
  async signIn(userSignInDto: userSignInDto): Promise<UserEntity> {
    const userExist = await this.usersRepository.findOne({ where: { email: userSignInDto.email } })
    if (!userExist) throw new BadRequestException('user not exist')
    const validatePass = await compare(userSignInDto.password, userExist.password)
    console.log("Validate Password", validatePass);

    if (!validatePass) {
      throw new BadRequestException("user password is incorrect please try again")
    }
    userExist.isActive = true
    await this.usersRepository.save(userExist)
    return plainToClass(UserEntity, userExist)
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id: id } })
    if (!user) throw new BadRequestException('User Not found')
    // return plainToClass(UserEntity, user) when you use useclassinterceptons in the controler class then u dont need to wrap in classtoplan u jus sent the whole object
    return user // return must be the class instence as it is if you wana send in object like {user } the use the above plan to class
  }
  async delete(email: string) {
    return await this.usersRepository.delete({ email: email })

  }
  async accessToken(user: UserEntity): Promise<string> {
    return sign({
      id: user.id,
      email: user.email,
    },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }

    )
  }




  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } })
  }

}
