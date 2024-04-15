import { Injectable } from '@nestjs/common';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import mongoose, { Model } from 'mongoose';
import { Complaint } from './complains.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';

@Injectable()
export class ComplainsService {
  constructor(
    @InjectModel(Complaint.name) private complaintModel: Model<Complaint>,
  ) {}

  //create complain
  async createComplain(
    title: String,
    description: String,
    category: String,
    status: 'PENDING',
  ) {
    const newComplaint = new this.complaintModel({
      title,
      description,
      status,
      category,
    });
    await newComplaint.save();

    return newComplaint;
  }

  //delete complain
  async removeComplaint(id: number) {
    const filter = { _id: id };
    //check if complaint is available before delete
    const ifExists = await this.complaintModel.findOne({ filter });
    if (!ifExists) {
      console.log('ُComplaint not found');
    }

    const deleted = await this.complaintModel.deleteOne(filter);
    return deleted;

    // const cmp = await this.complaintModel.deleteOne({ _id: id });
    // return console.log({ message: 'Complaint Deleted', cmp });
  }

  //get complaint detail
  async getComplaint(id: number) {
    const filter = { _id: id };
    const ifExists = await this.complaintModel.findOne({ filter });
    if (!ifExists) {
      console.log('ُComplaint not found');
    }
    const complaint = await this.complaintModel.findOne({ filter });
    return complaint;
  }
}
