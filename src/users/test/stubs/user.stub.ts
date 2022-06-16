import { User } from '../../user.schema';

export const userStub = (): User => {
  return {
    userId: '5e8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8f',
    name: 'John Doe',
    email: 'test@example.com',
    age: 30,
  };
};
