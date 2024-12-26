import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { IUser, UserRole } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/services/users.service';

@Controller(ROUTES.USERS.BASE)
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post(ROUTES.USERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: CreateUserDto) {
        const response = this.userService.create(user)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.USERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        const response = this.userService.findAll(limit, page)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.USERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        const response = this.userService.search(search)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.USERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') userId: string) {
        const response = this.userService.findOne(userId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Get(ROUTES.USERS.GET_BY_ROLE)
    @HttpCode(HttpStatus.OK)
    ByRole(@Param('role') role: UserRole) {
        const response = this.userService.findByRole(role)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Put(ROUTES.USERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') userId: string, @Body() user: UpdateUserDto) {
        const response = this.userService.update(userId, user)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }

    @Delete(ROUTES.USERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') userId: string) {
        const response = this.userService.delete(userId)

        if (response.ok) {
            return response
        } else {
            throw new NotFoundException()
        }
    }
}
