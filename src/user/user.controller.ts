import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { userAuth } from 'src/auth/user.auth';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //signup
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto, res: Response) {
    try {
      return this.userService.SignUp(
        createUserDto.email,
        createUserDto.password,
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //login /user/login
  @Post('/login')
  Login(@Body() createUserDto: CreateUserDto, res: Response) {
    try {
      return this.userService.Login(
        createUserDto.email,
        createUserDto.password,
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //update user pwd
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('password') password: string,
    res: Response,
  ) {
    try {
      return this.userService.updatePwd(id, password);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
