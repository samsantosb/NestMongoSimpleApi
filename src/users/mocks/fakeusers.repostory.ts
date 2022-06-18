import { User } from './../user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { fakeUser } from './data/fakeData';

export const fakeUsersRepository = {
  find: () => {
    return Promise.resolve([fakeUser as User, fakeUser as User]);
  },
  findById: (id: string): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...fakeUser,
    } as User);
  },
  create: (createUserDto: CreateUserDto): Promise<User> => {
    return Promise.resolve({
      ...createUserDto,
    } as User);
  },
  findByIdAndUpdate: (
    id: string,
    updateUserDto: CreateUserDto,
  ): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...updateUserDto,
    } as User);
  },
  findByIdAndDelete: (id: string): Promise<User> => {
    return Promise.resolve({
      id: id,
      ...fakeUser,
    });
  },
};
