import { applyDecorators, SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';

export function PublicAccess() {
    return applyDecorators(
        SetMetadata(IS_PUBLIC_KEY, true)
    );
}