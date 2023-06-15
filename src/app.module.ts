import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [PeopleModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
