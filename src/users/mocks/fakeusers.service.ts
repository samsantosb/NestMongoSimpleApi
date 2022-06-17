import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.schema';
import { UsersService } from '../users.service';

export const fakeUsersService: Partial<UsersService> = {
  create: (createUserDto: CreateUserDto) => {
    return Promise.resolve({
      ...createUserDto,
    } as User);
  },
  findOne: (userId: string) => {
    return Promise.resolve({
      userId: userId,
      email: 'asdf@asdf.com',
      name: 'asdf',
      age: 12,
    } as User);
  },
  findAll: () => {
    return Promise.resolve([
      {
        userId: '1',
        email: 'asdf@asd.com',
        name: 'asdf',
        age: 12,
      } as User,
      {
        userId: '2',
        email: 'bob@bob.com',
        name: 'bob',
        age: 12,
      } as User,
    ]);
  },
  update: (userId: string, updateUserDto: CreateUserDto) => {
    return Promise.resolve({
      userId: userId,
      ...updateUserDto,
    } as User);
  },
  delete: (userId: string): Promise<Object> => {
    return Promise.resolve({
      message: `User with id ${userId} is deleted from database`,
    });
  },
};
