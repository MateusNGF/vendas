import { MockProxy, mock } from 'jest-mock-extended';
import { iArchiveOrUnarchiveProductUsecase } from 'src/domain/usecases/product';
import { ArchiveOrUnarchiveProductData } from '../ArchiveOrUnarchiveProduct.data';
import { iProductRepository } from 'src/infra/database/contracts/repositorys/iProduct.repository';

describe('CreateTokenAuthenticate', () => {
  let sut: iArchiveOrUnarchiveProductUsecase;
  let productRepository: MockProxy<iProductRepository>;

  let fakeInputCredentials: iArchiveOrUnarchiveProductUsecase.Input;
  let fakeOutput: iArchiveOrUnarchiveProductUsecase.Output;

  beforeAll(() => {
    productRepository = mock();
  });

  beforeEach(() => {
    sut = new ArchiveOrUnarchiveProductData(productRepository);

    fakeInputCredentials = {
      action: 'archive',
      product_id: '123123',
    };
    fakeOutput = true;
  });

  it('Shound return null if not found authenticate by associeted_id', async () => {
    // fakeInputCredentials.associeted_id = 'any_associeted';

    // authenticateRepository.findByAssocieted.mockResolvedValue(null);

    const result = await sut.exec(fakeInputCredentials);
    expect(result).toEqual(null);
  });
});
