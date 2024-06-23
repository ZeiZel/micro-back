import { EUserRole, IUser, IUserCourses } from '@/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

/**
 * Класс сущности пользователя, который предоставляет методы манипуляции над аккаунтом
 * */
export class UserEntity implements IUser {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: EUserRole;
	courses?: IUserCourses[];

	constructor({ _id, courses, displayName, role, email, passwordHash }: IUser) {
		this._id = _id;
		this.displayName = displayName;
		this.email = email;
		this.passwordHash = passwordHash;
		this.role = role;
		this.courses = courses;
	}

	public async setPassword(password: string) {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);

		return this;
	}

	public validatePassword(password: string) {
		return compare(password, this.passwordHash);
	}
}
