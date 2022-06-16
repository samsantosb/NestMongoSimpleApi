import { userStub } from '../test/stubs/user.stub';
export const userService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([userStub]),
  findOne: jest.fn().mockResolvedValue(userStub),
  create: jest.fn().mockResolvedValue(userStub),
  update: jest.fn().mockResolvedValue(userStub),
  delete: jest.fn().mockResolvedValue(userStub),
});
