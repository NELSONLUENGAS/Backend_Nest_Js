import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ROUTES } from 'src/constants/routes';
import { IUser, IUserUpdate } from 'src/interfaces/user.interface';

@Controller(ROUTES.USERS.BASE)
export class UsersController {
    @Post(ROUTES.USERS.CREATE)
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: IUser) {

        // Lógica para crear un nuevo usuario
    }

    @Get(ROUTES.USERS.GET_ALL)
    @HttpCode(HttpStatus.OK)
    getAll(@Query('limit') limit = 15, @Query('page') page = 1) {
        // Lógica para obtener todos los usuarios con paginación
    }

    @Get(ROUTES.USERS.SEARCH)
    @HttpCode(HttpStatus.OK)
    search(@Query('s') search = '') {
        // Lógica para buscar usuarios por término
    }

    @Get(ROUTES.USERS.GET_ONE)
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') userId: string) {
        // Lógica para obtener un usuario por ID
    }

    @Put(ROUTES.USERS.UPDATE)
    @HttpCode(HttpStatus.OK)
    update(@Param('id') userId: string, @Body() user: IUserUpdate) {
        // Lógica para actualizar un usuario
    }

    @Delete(ROUTES.USERS.DELETE)
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') userId: string) {
        // Lógica para eliminar un usuario
    }
}
