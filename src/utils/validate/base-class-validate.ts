export class BaseClassValidate<Data> {
	public constructor(data: Data) {
		Object.assign(this, data);
	}
}
