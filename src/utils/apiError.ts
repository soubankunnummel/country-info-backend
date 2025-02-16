

export class ApiError extends Error {
    statusCode: number;
    status:string
    isOperational: boolean;

    constructor(statusCode:number , message:string, error?:string | any) {
        super(message); 
        this.statusCode = statusCode
        this.status =  `${statusCode}`.startsWith('5') ? 'fail' : 'error'
        this.isOperational = true;
        if (error?.message) {
            this.message = error.message; 
            this.isOperational = false;
            
            
        }
         
    }
}