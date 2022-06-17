import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../user.schema';
import { UsersService } from '../users.service';
import { fakeUser } from './data/fakeuser';

export const fakeUsersService: Partial<UsersService> = {
  create: (createUserDto: CreateUserDto): Promise<User> => {
    return Promise.resolve({
      ...createUserDto,
    } as User);
  },
  findOne: (id: string): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...fakeUser,
    } as User);
  },
  findAll: () => {
    return Promise.resolve([fakeUser as User, fakeUser as User]);
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
