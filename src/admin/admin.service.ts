import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Complaint } from 'src/complains/complains.schema';
import { User } from 'src/user/user.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private AdminModel: Model<Admin>,
    @InjectModel(Complaint.name) private ComplaintModel: Model<Complaint>,
    @InjectModel(User.name) private UserModel: Model<User>,
  ) {}

  //create admin| employee account
  async createAdmin(
    //createAdminDto: CreateAdminDto,
    email: String,
    password: String,
  ) {
    const salt = await bcrypt.genSalt(12);
    const hashedPwd = await bcrypt.hash(password, salt);

    //lets check if email is already registered
    const ifExist = await this.AdminModel.findOne({ email });
    if (ifExist) {
      return console.log('Email is already registered');
    }

    const newUser = await this.AdminModel.create({
      email,
      password: hashedPwd,
    });
    await newUser.save();
    return newUser;
  }

  //admin|employee login
  async login(email: String, password: String) {
    //check if user exists
    const ifAdminModelExists: any = await this.AdminModel.findOne({
      email,
    });
    if (!ifAdminModelExists) {
      return console.log('ُInvalid credentials');
    }

    //we need to check if the given password matches the one in the db
    const checkPwd = await bcrypt.compare(
      password,
      ifAdminModelExists.password,
    );
    if (!checkPwd) {
      return console.log({ message: 'ُInvalid email or password !' });
    }

    //JWT
    var token = jwt.sign({ admin: email }, 'KEY', {
      expiresIn: '120s', // it will be expired after 120s
    });

    return token;
  }

  //update status for the complaint
  async updateStatus(id: number, status: String) {
    const result = await this.ComplaintModel.updateOne({ id, status });

    return result;
  }

  //activate/deactivate user
  async activateUser(id: number) {
    const filter = { _id: id };
    const result = await this.UserModel.updateOne({ filter });
    return result;
  }
}
