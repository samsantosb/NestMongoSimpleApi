import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { fakeUsersService } from './mocks/fakeusers.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    fakeUsersService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  it('should create a user', async () => {
    const user = await usersController.createUser({
      email: 'email@email.com',
      name: 'name',
      age: 12,
    });
    expect(user).toEqual({
      email: 'email@email.com',
      name: 'name',
      age: 12,
    });
  });
  it('should return a user', async () => {
    const user = await usersController.getUser('123');
    expect(user).toEqual({
      userId: '123',
      email: 'asdf@asdf.com',
      name: 'asdf',
      age: 12,
    });
  });
  it('should return all users', async () => {
    const users = await usersController.getUsers();
    expect(users).toEqual([
      {
        userId: '1',
        email: 'asdf@asd.com',
        name: 'asdf',
        age: 12,
      },
      {
        userId: '2',
        email: 'bob@bob.com',
        name: 'bob',
        age: 12,
      },
    ]);
  });
  it('should update a user', async () => {
    const user = await usersController.updateUser('123', {
      email: 'email@email.com',
      name: 'name',
      age: 12,
    });
    expect(user).toEqual({
      userId: '123',
      email: 'email@email.com',
      name: 'name',
      age: 12,
    });
  });
  it('should delete a user', async () => {
    const user = await usersController.deleteUser('123');
    expect(user).toEqual({
      message: `User with id 123 is deleted from database`,
    });
  });
});
