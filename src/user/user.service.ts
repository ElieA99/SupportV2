import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //signup
  async SignUp(email: String, password: String) {
    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(password, salt);

    //lets check if email is already registered
    const ifExist = await this.userModel.findOne({ email });
    if (ifExist) {
      return console.log('Email is already registered');
    }

    const newUser = await this.userModel.create({
      email,
      password: hashedPwd,
    });
    await newUser.save();
    return newUser;
  }

  //login
  async Login(email: String, password: String) {
    //check if user exists
    const ifUserExists: any = await this.userModel.findOne({ email });
    if (!ifUserExists) {
      return console.log('ُInvalid credentials');
    }

    //we need to check if the given password matches the one in the db
    const checkPwd = await bcrypt.compare(password, ifUserExists.password);
    if (!checkPwd) {
      return console.log({ message: 'ُInvalid email or password !' });
    }

    //JWT
    var token = jwt.sign({ user: email }, 'KEY', {
      expiresIn: '120s', // it will be expired after 120s
    });
    return token;
  }

  //update
  async updatePwd(id: number, password: String) {
    const filter = { _id: id };

    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(password, salt);

    const newPwd = await this.userModel.updateOne({
      filter,
      password: hashedPwd,
    });

    return newPwd;
  }
}
