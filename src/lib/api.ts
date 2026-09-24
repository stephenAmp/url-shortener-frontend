import type { Problem } from "./problem";

const BASE_URL = import.meta.env.VITE_BASE_URL

export class ApiError extends Error{
    readonly problem: Problem;
    readonly retryAfter?: number;

    constructor(problem: Problem,  retryAfter?: number){
        super()
        this.problem = problem;
        this.retryAfter = retryAfter
    }
}   

export class NetworkError extends Error{
    constructor(){
        super("Could not reach TinyWeeny")
        this.name = "NetworkError"
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

async function parse<T>(res: Response):Promise<T>{
    const text = await res.text()
    let data;

    try{
        data = text ? JSON.parse(text) : null
    }catch{
        data = null
    }
    if(!res.ok){
        throw new ApiError(data)
    }
    return data as T
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