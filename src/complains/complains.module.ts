import { Module } from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { ComplainsController } from './complains.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Complaint, ComplaintSchema } from './complains.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Complaint.name, schema: ComplaintSchema },
    ]),
  ],
  controllers: [ComplainsController],
  providers: [ComplainsService],
})
export class ComplainsModule {}
