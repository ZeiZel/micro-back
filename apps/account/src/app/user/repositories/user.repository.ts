import { InjectModel } from '@nestjs/mongoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

/**
 * Класс для работы с базой данных и манипуляции над пользователями
 * */
@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

	async createUser(user: UserEntity) {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async updateUser({ _id, ...rest }: UserEntity) {
		return (
			this.userModel
				.updateOne({ _id }, { $set: { ...rest } })
				/** exec нужен для формирования запроса - без него не всегда может вернуться результат из mongo */
				.exec()
		);
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserById(id: string) {
		return this.userModel.findById(id).exec();
	}

	async deleteUser(email: string) {
		this.userModel.deleteOne({ email }).exec();
	}
}
