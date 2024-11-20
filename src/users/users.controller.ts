import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { userSignInDto } from './dto/signin-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
// import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/utility/decorator/current-user.decorator';
import { userSignUpDto } from './dto/signUp-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post("signup")
  async signUp(@Body() userSignUpDto: userSignUpDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signUp(userSignUpDto) }

  }
  @Post("signin")
  async logIn(@Body() userSignInDto: userSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signIn(userSignInDto)
    const accessToken = await this.usersService.accessToken(user)
    return { accessToken, user }
  }
  @UseInterceptors(ClassSerializerInterceptor) // it will remove sending the exclude field in the user entity
  @Get("single/:id")
  async findOne(@Param('id') id: string) {

    return await this.usersService.findOne(+id)
  }
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get("profile")
  async Profile(@CurrentUser() currentUser: UserEntity) {  //Profile(@Req() req: Request) can also do this type as we set user entity in request while verifyin token
    console.log("userProfile", currentUser);
    return currentUser
  }
  @Delete('/:slug')
  async delete(@Param("slug") email: string) {

    const deleteUser = await this.usersService.findByEmail(email)
    await this.usersService.delete(email)
    return deleteUser
  }


}
