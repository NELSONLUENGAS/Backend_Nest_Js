import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) { }
