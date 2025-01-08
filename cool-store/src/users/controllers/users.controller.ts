import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query
} from '@nestjs/common';
import { ROUTES } from '../../constants/routes';
import {
    CreateUserDto,
    FilterUserDto,
    SearchUsersDto,
    UpdateUserDto
} from '../dtos/users.dto';
import { UserRole } from '../interfaces/user.interface';
import { UsersService } from '../services/users.service';
import {
    ApiCreateUserDocumentation,
    ApiDeleteUserDocumentation,
    ApiFindAllUsersDocumentation,
    ApiFindOneUserDocumentation,
    ApiFindUsersByRoleDocumentation,
    ApiSearchUsersDocumentation,
    ApiUpdateUserDocumentation
} from '../api/decorators/users';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@Controller(ROUTES.USERS.BASE)
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post(ROUTES.USERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateUserDocumentation()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Get(ROUTES.USERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @ApiFindAllUsersDocumentation()
    findAll(@Query() queryString: FilterUserDto) {
        const { limit = 15, page = 1 } = queryString
        return this.userService.findAll(limit, page)
    }

    @Get(ROUTES.USERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @ApiSearchUsersDocumentation()
    search(@Query() queryString: SearchUsersDto) {
        const { s: search = '' } = queryString
        return this.userService.search(search)
    }

    @Get(ROUTES.USERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @ApiFindOneUserDocumentation()
    findOne(@Param('id', MongoIdPipe) userId: string) {
        return this.userService.findOne(userId)
    }

    @Get(ROUTES.USERS.GET_BY_ROLE)
    @HttpCode(HttpStatus.OK)
    @ApiFindUsersByRoleDocumentation()
    findByRole(@Param('role') role: UserRole) {
        return this.userService.findByRole(role)
    }

    @Put(ROUTES.USERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @ApiUpdateUserDocumentation()
    update(@Param('id', MongoIdPipe) userId: string, @Body() user: UpdateUserDto) {
        return this.userService.update(userId, user)
    }

    @Delete(ROUTES.USERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @ApiDeleteUserDocumentation()
    delete(@Param('id', MongoIdPipe) userId: string) {
        return this.userService.delete(userId)
    }
}
