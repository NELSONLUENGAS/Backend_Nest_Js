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
    Query,
    UseGuards
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
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { RolesAccess } from '@auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(ROUTES.USERS.BASE)
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post(ROUTES.USERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    @RolesAccess(UserRole.ADMIN)
    @ApiCreateUserDocumentation()
    create(@Body() user: CreateUserDto) {
        return this.userService.create(user)
    }

    @Get(ROUTES.USERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindAllUsersDocumentation()
    findAll(@Query() queryString: FilterUserDto) {
        const { limit = 15, page = 1 } = queryString
        return this.userService.findAll(limit, page)
    }

    @Get(ROUTES.USERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiSearchUsersDocumentation()
    search(@Query() queryString: SearchUsersDto) {
        const { s: search = '' } = queryString
        return this.userService.search(search)
    }

    @Get(ROUTES.USERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindOneUserDocumentation()
    findOne(@Param('id', MongoIdPipe) userId: string) {
        return this.userService.findOne(userId)
    }

    @Get(ROUTES.USERS.GET_BY_ROLE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiFindUsersByRoleDocumentation()
    findByRole(@Param('role') role: UserRole) {
        return this.userService.findByRole(role)
    }

    @Put(ROUTES.USERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiUpdateUserDocumentation()
    update(@Param('id', MongoIdPipe) userId: string, @Body() user: UpdateUserDto) {
        return this.userService.update(userId, user)
    }

    @Delete(ROUTES.USERS.DELETE)
    @HttpCode(HttpStatus.OK)
    @RolesAccess(UserRole.ADMIN)
    @ApiDeleteUserDocumentation()
    delete(@Param('id', MongoIdPipe) userId: string) {
        return this.userService.delete(userId)
    }
}
