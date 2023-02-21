import { iUsecase } from "src/domain/contracts";
import { AuthEntity, UserEntity } from "src/domain/entities";

export abstract class iAccessAccountUser implements iUsecase {
    abstract exec(input: iAccessAccountUser.Input): Promise<iAccessAccountUser.Output>;
}

export namespace iAccessAccountUser {
    export class Input implements Partial<AuthEntity> {
        public email: string;
        public password: string;
    }

    // token
    export type Output = string
}