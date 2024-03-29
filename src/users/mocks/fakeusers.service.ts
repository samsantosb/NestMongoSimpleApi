import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.schema';
import { UsersService } from '../users.service';
import { fakeUser } from './data/fakeData';

export const fakeUsersService: Partial<UsersService> = {
  findOne: (id: string): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...fakeUser,
    } as User);
  },
  findAll: () => {
    return Promise.resolve([fakeUser as User, fakeUser as User]);
  },
  create: (createUserDto: CreateUserDto): Promise<User> => {
    return Promise.resolve({
      ...createUserDto,
    } as User);
  },
  update: (id: string, updateUserDto: CreateUserDto): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...updateUserDto,
    } as User);
  },
  delete: (id: string): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...fakeUser,
    });
  },
};
