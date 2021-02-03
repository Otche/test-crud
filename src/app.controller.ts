import { Controller, UseFilters } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

import { Catch, ArgumentsHost } from '@nestjs/common';

import { BaseExceptionFilter } from '@nestjs/core';



@Crud({
  model: {
    type: User,
  },
  /*query: {
    filter: (...params) => {
      console.log('===>', params);
      return {
        companyId: {
          $eq: 1,
        },
      };
    },
  },*/
  /*filter: [
      {
        field: 'companyId',
        operator: 'eq',
        value: 1,
      },
    ],*/
  //},
  query: {
    join: {
      company: { eager: true },
    },
  },
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}
}
