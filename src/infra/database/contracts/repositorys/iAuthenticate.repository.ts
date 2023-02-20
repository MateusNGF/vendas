import { AuthEntity } from "src/domain/entities/auth.entity";
import { BaseRepository } from ".";

export interface iAuthenticateRepository extends BaseRepository<AuthEntity> {
    create(auth: Partial<AuthEntity>) : Promise<AuthEntity>
    findByAssocieted(associetedId : string) : Promise<AuthEntity>
    findByEmail(email : string) : Promise<AuthEntity>
}