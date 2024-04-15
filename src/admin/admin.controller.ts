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
import { AdminService } from './admin.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { adminAuth } from 'src/auth/admin.auth';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //create admin | employee
  @Post('/create')
  createAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
    res: Response,
  ) {
    try {
      return this.adminService.createAdmin(email, password);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //admin login
  @Post('/login')
  loginAdmin(
    @Body('email') email: string,
    @Body('password') password: string,
    res: Response,
  ) {
    try {
      return this.adminService.login(email, password);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //update status
  @Put(':id')
  updateStatus(@Param('id') id: number, res: Response) {
    try {
      return this.adminService.updateStatus(id, status);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //activate/decativate user
  @Put()
  activateUser(@Param(':id') id: number, res: Response) {
    try {
      return this.adminService.activateUser(id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
