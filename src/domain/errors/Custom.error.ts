export abstract class CustomError extends Error {}


export class GenericError extends CustomError {
    name: string = "Generic Error"
    constructor(message : string){
        super(message)
    }
}
