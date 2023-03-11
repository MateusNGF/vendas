import { iUsecase } from 'src/domain/contracts';

export abstract class iArchiveOrUnarchiveProductUsecase implements iUsecase {
  abstract exec(
    input: iArchiveOrUnarchiveProductUsecase.Input,
    settings ?: iArchiveOrUnarchiveProductUsecase.Settings
  ): Promise<iArchiveOrUnarchiveProductUsecase.Output>;
}

export namespace iArchiveOrUnarchiveProductUsecase {
  export type Input = {
    action: 'archive' | 'unarchive';
    product_id: string;
  };

  export interface Settings extends iUsecase.Configuration {};

  export type Output = boolean;
}
