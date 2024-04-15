import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ComplainsModule } from './complains/complains.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    //
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('DB_URL'),
    //   }),
    //   inject: [ConfigService],
    // }),
    
    MongooseModule.forRoot('mongodb://localhost:27017/SupportNestJS'),
    //
    ConfigModule.forRoot({ cache: true, isGlobal: true }),

    UserModule,

    AdminModule,

    ComplainsModule,

    CategoryModule,
  ],

  // imports: [UserModule, AdminModule, ComplaintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
