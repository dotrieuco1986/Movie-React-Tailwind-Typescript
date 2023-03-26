export interface ServerError {
    apiPath?: string;
    errorCode?: number | string;
}

/** Common response */
export interface BaseResponse extends ServerError {
    result: string;
    message?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}
