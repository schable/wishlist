import { nanoid } from 'nanoid'

export class UuidGenerator {
	generate(): string {
		return nanoid()
	}
}
