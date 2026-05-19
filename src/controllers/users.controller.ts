import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QueryParamsPipe } from 'pipes/query-params.pipe';
import { UsersService } from 'services/users.service';
import { CreateUserDto } from 'types/dtos/users/create-user.dto';
import { FindAllUsersDto } from 'types/dtos/users/find-all-users.dto';
import { RemoveUserDto } from 'types/dtos/users/remove-user.dto';
import { UpdateUserDto } from 'types/dtos/users/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query(QueryParamsPipe) queryParams: Record<string, any>) {
    const dto: FindAllUsersDto = {};

    if (Object.prototype.hasOwnProperty.call(queryParams, 'freetext')) {
      dto.FreeText = queryParams['freetext'] as string;
    }

    return this.usersService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: RemoveUserDto) {
    return this.usersService.remove(id, dto);
  }
}
