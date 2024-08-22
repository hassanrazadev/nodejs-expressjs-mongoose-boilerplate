export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public message: string;

    constructor(message: string, statusCode: number = 400) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}