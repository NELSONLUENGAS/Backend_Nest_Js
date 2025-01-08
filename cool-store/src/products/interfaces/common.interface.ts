
export interface IApiServiceResponse {
    ok: boolean
    message: string
}

export interface IApiServiceError {
    ok: boolean
    message: string
    error: string
    statusCode: number
}
