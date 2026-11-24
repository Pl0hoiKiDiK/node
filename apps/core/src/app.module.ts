import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseOptions } from './database/database.options';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: getDatabaseOptions })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
