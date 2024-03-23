import { iUsecase } from 'src/domain/contracts';

export abstract class iArchiveOrUnarchiveProductUsecase implements iUsecase {
  abstract exec(
    input: iArchiveOrUnarchiveProductUsecase.Input
  ): Promise<iArchiveOrUnarchiveProductUsecase.Output>;
}

export namespace iArchiveOrUnarchiveProductUsecase {
  export type Input = {
    action: 'archive' | 'unarchive';
    product_id: string;
  };

  export type Output = boolean;
}
