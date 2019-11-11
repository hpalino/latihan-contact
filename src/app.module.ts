import { Module } from '@nestjs/common';
import { ContactService } from './service/contact.service';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from 'nestjs-config';
import { ContactRepository } from './repository/contact.repository';
import { ContactController } from './controller/contact.controller';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config/**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database.config'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ContactRepository]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class AppModule {}
