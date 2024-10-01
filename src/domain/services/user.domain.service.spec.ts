import { Test, TestingModule } from '@nestjs/testing';
import { UserDomainService } from './user.domain.service';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
describe('UserDomainService', () => {
  let userDomainService: UserDomainService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userDomainService = module.get<UserDomainService>(UserDomainService);
    userRepository = module.get<UserRepository>('UserRepository');
  });

  it('should be defined', () => {
    expect(userDomainService).toBeDefined();
  });

  it('should call userRepository.save when creating a user with encrypted password', async () => {
    const userName = 'testuser';
    const password = 'testpassword';

    const hashedPassword = 'hashedpassword';
    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(hashedPassword);

    await userDomainService.create(userName, password);

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        userName: 'testuser',
        password: hashedPassword,
      }),
    );
  });
});
