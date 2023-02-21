import { iUsecase } from "src/domain/contracts";
import { AuthEntity, UserEntity } from "src/domain/entities";

export abstract class iGetAccountUserUsecase implements iUsecase {
    abstract exec(input: iGetAccountUserUsecase.Input): Promise<iGetAccountUserUsecase.Output>;
}

export namespace iGetAccountUserUsecase {
    export type Input = {
        user_id ?: string
        email ? :string
    }

    export class Output implements Partial<UserEntity>, Partial<AuthEntity> {
        public id?: any;
        public name?: string;
        public email?: string;
        public access_level?: number;
        public archived_date?: Date;
        public created_at?: Date;
        public updated_at?: Date;
    }
}