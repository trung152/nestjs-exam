import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';

export const provideCustomRepository = <T>(repository: new (...args: any[]) => T): Provider => ({
  provide: repository,
  useFactory: (dataSource: DataSource) => {
    const baseRepository = dataSource.getRepository(repository.prototype.constructor);
    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
  },
  inject: [DataSource],
});
