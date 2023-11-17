import { HTTP_STATUS } from '../../../src/domain/types/Http.status';
import { CustomError, NotificationError } from '../../../src/domain/errors';
import { HttpResponse } from '../helpers/http';


export abstract class HTTPHandlerReturns {
    private makeBodyResponseError(status: any, data: any){
        return { status: status, ok : 0, data };
    };

    sendError(error: any): HttpResponse<{ message: string }> {
       
        if (error instanceof CustomError) {
            return this.makeBodyResponseError(
                error.code || HTTP_STATUS.BAD_REQUEST,
                { message: error.message, code : error.code }
            );
        } else if (error instanceof NotificationError) {
            return this.makeBodyResponseError(
                HTTP_STATUS.BAD_REQUEST,
                { message: 'Some errors were found .', stack: error.notifications}
            );
        } else {
            return this.makeBodyResponseError(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                { message: 'Internal Error. try later.' }
            );
        }
    }

    sendSucess(
        status:
            | HTTP_STATUS.OK
            | HTTP_STATUS.ACCEPTED
            | HTTP_STATUS.CREATED
            | HTTP_STATUS.CONTINUE = HTTP_STATUS.CONTINUE,
        data?: any
    ): HttpResponse<any> {
        if (typeof data == 'string') {
            data = { message: data };
        }
        return {
            status: status || 200,
            data: { ...data } || null,
        };
    }
}