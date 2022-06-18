import { User } from './user.schema';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { fakeUsersRepository } from './mocks/fakeusers.repostory';
import { fakeUser, fakeId } from './mocks/data/fakeData';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: fakeUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a user and record that', async () => {
    expect(await usersService.create(fakeUser)).toEqual(fakeUser);
  });

  it('should return a user', async () => {
    expect(await usersService.findOne(fakeId)).toEqual({
      id: fakeId,
      ...fakeUser,
    });
  });

  it('should return all users', async () => {
    expect(await usersService.findAll()).toEqual([fakeUser, fakeUser]);
  });

  it('should update a user', async () => {
    expect(
      await usersService.update(fakeId, {
        ...fakeUser,
      }),
    ).toEqual({
      id: fakeId,
      ...fakeUser,
    });
  });
  it('should delete a user', async () => {
    expect(await usersService.delete(fakeId)).toEqual({
      id: fakeId,
      ...fakeUser,
    });
  });
});
