import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      userId: uuidv4(),
      ...createUserDto,
    });
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }
  async delete(userId: string): Promise<Object> {
    this.userModel.findByIdAndRemove(userId).exec();
    return {
      message: `User with id ${userId} is deleted from database`,
    };
  }
  async update(userId: string, createUserDto: CreateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, createUserDto, { new: true })
      .exec();
  }
}
