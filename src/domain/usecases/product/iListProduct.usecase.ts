import { iUsecase } from "src/domain/contracts";
import { ProductEntity } from "src/domain/entities";
import { BaseFilterForListing } from "src/domain/types";

export abstract class iListProductUsecase implements iUsecase {
    abstract exec(input: iListProductUsecase.Input): Promise<iListProductUsecase.Output>;
}

export namespace iListProductUsecase {
    export class Input implements BaseFilterForListing, Partial<ProductEntity> {
        public text?: string;
        public limit?: number;
        public offset?: number;
        public created_at?: Date;
        public updated_at?: Date;
        public created_by ?: string
        public archived_date?: Date;
    }

    export type Output = Array<ProductEntity>
}