class ApiError extends Error{
    constructor(
        statusCode, 
        message="Something Went Wrong",
        errors = [],
        stacr=""
    ){
        super(message)
        this.statusCode =statusCode
        this.errors  = errors
        this.data = null
        this.message = message
        if (this.stack) {
            this.stack = this.stack;
        }else{
            Error.captureStackTrace(this , this.constructor)
    }
}
}

export { ApiError }