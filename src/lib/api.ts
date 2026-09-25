import { BASE_URL } from "./shared";

export type Problem = {
    code: string;
    description: string;
};

export type FastApiValidationError = {
    detail: {
        type: string;
        loc: (string | number)[];
        msg: string;
        input: unknown;
    }[];
};

export class ApiError extends Error {
    status: number;
    code?: string;

    constructor(message: string, status: number, code?: string) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.code = code;
    }
}

export class NetworkError extends Error {
    constructor() {
        super("Unable to connect to the server.");
        this.name = "NetworkError";
    }
}

export async function send(path: string, options: RequestInit={}):Promise<Response>{
    try{
        return await fetch(`${BASE_URL}${path}`,{
            ...options,
            headers:{
                "Content-type":"application/json",
                ...options.headers
            }
        })
    }catch{
        throw new NetworkError
    }
}

async function parse<T>(response: Response): Promise<T> {
    const text = await response.text();

    let data = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        // Response wasn't JSON
    }

    if (!response.ok) {

        // FastAPI validation error
        if (response.status === 422 && Array.isArray(data?.detail)) {
            const message =
                data.detail[0]?.msg ?? "Invalid request";

            throw new ApiError(
                message,
                response.status,
                data.detail[0]?.type
            );
        }

      
        if (data?.description) {
            throw new ApiError(
                data.description,
                response.status,
                data.code
            );
        }

        throw new ApiError(
            "Something went wrong.",
            response.status
        );
    }

    return data as T;
}

export const api = {
    get: async<T>(path: string): Promise<T> =>{
        const response = await send(path)
        return parse<T>(response)
    },

    post: async<T>(path: string, body: unknown): Promise<T>=>{
        const response = await send(path, {
            method: "POST",
            body: JSON.stringify(body)
        })
        return parse<T>(response)
    }
}