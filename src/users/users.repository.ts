import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }
  async delete(userId: string): Promise<User> {
    return this.userModel.findByIdAndRemove(userId).exec();
  }
  async update(userId: string, createUserDto: CreateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, createUserDto, { new: true })
      .exec();
  }
}
