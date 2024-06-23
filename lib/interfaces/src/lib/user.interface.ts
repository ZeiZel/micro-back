export enum EUserRole {
	TEACHER = 'teacher',
	STUDENT = 'student',
}

export enum EPurchaseState {
	STARTED = 'started',
	WAITING_FOR_PAYMENT = 'waiting_for_payment',
	PURCHASED = 'purchased',
	CANCELED = 'canceled',
}

export interface IUser {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: EUserRole;
	courses?: IUserCourses[];
}

export interface IUserCourses {
	courseId: string;
	purchaseState: EPurchaseState;
}
