import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, IUserCourses, EPurchaseState, EUserRole } from '@/interfaces';
import { Document, Types } from 'mongoose';

/**
 * Курс аккаунта
 * */
@Schema()
export class UserCourses extends Document implements IUserCourses {
	@Prop({ required: true })
	courseId: string;

	@Prop({ required: true, enum: EPurchaseState, type: String })
	purchaseState: EPurchaseState;
}

/**
 * Сгенерированная модель монгуза
 * */
export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses);

/**
 * Модель аккаунта пользователя
 * */
@Schema()
export class User extends Document implements IUser {
	@Prop()
	displayName?: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({
		/** требуется */
		required: true,
		/** тип данных */
		type: String,
		/** возможные значения */
		enum: EUserRole,
		/** дефолтное значение */
		default: EUserRole.STUDENT,
	})
	role: EUserRole;

	@Prop({ type: [UserCoursesSchema], _id: false })
	courses: Types.Array<UserCourses>;
}

/**
 * Экспортируем схему монгуза
 * */
export const UserSchema = SchemaFactory.createForClass(User);
