import axios from "axios";
import { AXIOS_TIMEOUT_ERROR_MESSAGE,DEFAULT_TIME_OUT,API_URL,XXSRFTOKEN} from "../constants/api";

const baseAxios = axios.create({
    baseURL: API_URL,
    timeout: DEFAULT_TIME_OUT,
    timeoutErrorMessage: AXIOS_TIMEOUT_ERROR_MESSAGE,
    headers: {
        "X-XSRF-TOKEN": XXSRFTOKEN,
    },
    withCredentials: true,
});

export default baseAxios;
