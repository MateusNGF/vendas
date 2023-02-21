import { iUsecase } from "src/domain/contracts";

export abstract class iArchiveOrUnarchiveProduct implements iUsecase {
    abstract exec(input: iArchiveOrUnarchiveProduct.Input): Promise<iArchiveOrUnarchiveProduct.Output>;
}

export namespace iArchiveOrUnarchiveProduct {
    export type Input = {
        action : 'archive' | 'unarchive',
        product_id : string
    }

    export type Output = boolean
}