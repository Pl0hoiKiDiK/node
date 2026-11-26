import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseOptions } from './database/database.options';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../.env' }),
    TypeOrmModule.forRootAsync({ useFactory: getDatabaseOptions }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
