import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { Response } from 'express';
import { userAuth } from 'src/auth/user.auth';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('complains')
export class ComplainsController {
  constructor(private readonly complainsService: ComplainsService) {}

  //create new complaint
  @Post()
  createComplain(
    @Body(' title') title: string,
    @Body('description') description: string,
    @Body('category') category: string,
    status,
    res: Response,
  ) {
    try {
      return this.complainsService.createComplain(
        title,
        description,
        category,
        status,
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //get complaint detail
  @Get(':id')
  getComplaint(@Param('id') id: number, res: Response) {
    try {
      return this.complainsService.getComplaint(id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //delete complaint
  @Delete(':id')
  removeComplaint(@Param('id') id: number, res: Response) {
    try {
      return this.complainsService.removeComplaint(id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
