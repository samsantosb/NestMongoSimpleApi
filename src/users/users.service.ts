import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().lean();

    if (!users) return [];

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user: User =
      Types.ObjectId.isValid(id) && (await this.userModel.findById(id).lean());

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, createUserDto: CreateUserDto): Promise<User> {
    const user: User =
      Types.ObjectId.isValid(id) && (await this.userModel.findById(id).lean());

    if (!user) throw new NotFoundException('User not found');

    return this.userModel.findByIdAndUpdate(id, createUserDto, { new: true });
  }

  async delete(id: string): Promise<User> {
    const user: User =
      Types.ObjectId.isValid(id) && (await this.userModel.findById(id).lean());

    if (!user) throw new NotFoundException('User not found');

    return this.userModel.findByIdAndDelete(id);
  }
}
