/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, HeadersDefaults } from "axios";
import { BaseResponse } from "../modal/index";
import baseAxios from "./baseAxios";
import { ErrorType }from "../constants/enum";
/* eslint-disable  @typescript-eslint/no-explicit-any */
const successHandle = async (res: any) => {
    if (res?.result) {
        // eslint-disable-next-line
        if (res?.result == 0) {
            return true;
        }
        return false;
    }

    return true;
};

const errorHandle = async (url: string, error: AxiosError) => {
    const errorRes = {
        apiPath: url,
        errorCode: error.response?.status || error.message,
        message: error.message,
    } as BaseResponse;
    const config: AxiosRequestConfig = error?.config;
    const res = error?.response;
    const statusCode = res?.status;
    if (statusCode) {
        switch (statusCode) {
            //Request Timeout
            case 400: {
                const detail = (res.data as any)?.detail;
                let message = "";

                if (detail) {
                    if (detail.hasOwnProperty("tradePassword")) {
                        errorRes.data = res?.data || {};

                        return errorRes;
                    }
                    Object.keys(detail).forEach(function (key) {
                        if (key === "parameters") {
                            return;
                        }

                        message += message === "" ? "" : "\n";
                        message += detail[key] ? detail[key] : "";
                    });
                }
                alert("pleaseTryAgainForAWhile");
                errorRes.data = res?.data || {};

                return errorRes;
            }
            case 401: {
                alert(ErrorType.OutOfSession + " sessionInvalidMessage");
                return errorRes;
            }
            //Request Timeout
            case 408: {
                alert(ErrorType.Timeout +  " timeoutMessage");

                return request(url, config);
            }
            //Internal Server Error
            case 500: {
                // browserHistory

                alert(ErrorType.Timeout + " SystemError");

                return errorRes;
            }
            //Server Maintenace
            case 503: {
                alert(ErrorType.Timeout + " ServerError");

                return errorRes;
            }
        }

        return errorRes;
    } else {
        if (error?.isAxiosError) {
            return errorRes;
        }
    }
    return errorRes;
};

const request = async <T = any>(
    url: string,
    config: AxiosRequestConfig,
    hasLoading?: boolean,
): Promise<T & BaseResponse> => {
    let result = null;
    try {
        let xxsrfToken = "67649f3aeae7c3a2d82504a13ab67bf3";
        config.baseURL = "https://api.themoviedb.org/3/movie";
        config.timeout = 60000;

        baseAxios.defaults.headers = {
            ...baseAxios.defaults.headers,
            "X-XSRF-TOKEN": xxsrfToken,
        } as HeadersDefaults;

        result = (await baseAxios(config)).data;
        if (typeof result === "string") {
            // Remove non-printable and other non-valid JSON chars
            result = result.replace(/[\u0000-\u0019]+/g, "");
            result = JSON.parse(result);
        }
    } catch (error: any) {
        // CancelToken
        if (axios.isCancel(error)) {
            result = {
                apiPath: url,
                errorCode: "CANCEL",
            } as BaseResponse;
        } else {
            result = await errorHandle(url, error);
        }
    }

    return result;
};

const api = {
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig, hasLoading = true) => {
        return request<T>(url, { method: "post", url, data, ...config }, hasLoading);
    },
    get: <T = any>(url: string, config?: AxiosRequestConfig, hasLoading?: boolean) => {
        return request<T>(url, { method: "get", url, ...config }, hasLoading);
    },
};

export default api;
