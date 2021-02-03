import { Module } from '@nestjs/common';
import { UsersController } from './app.controller';
import { UsersService } from './user.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'changeme',
      database: 'postgres',
      entities: [User, Company],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Company]),
  ],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService],
})
export class AppModule {}
