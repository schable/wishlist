import type { Wish } from './Wish'

export class WishList {
	deletionDate: Date
	name: string
	wishes: Wish[]

	constructor(
		public uuid: string,
	) {
		this.uuid = uuid
	}
}