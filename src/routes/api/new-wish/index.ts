import type { EndpointOutput, Request } from '@sveltejs/kit'
import type { locals } from '../../../hooks'

type postWishBody = {
	id: string
	list_uuid: string
	available: boolean
	comment: string
	name: string
	price: string
	url: string
}

export const post = async ({
														 body,
														 locals,
													 }: Request<locals, postWishBody>): Promise<EndpointOutput> => {
	const { dbClient } = locals
	const {
		id,
		list_uuid,
		available,
		comment,
		name,
		price,
		url,
	} = body

	const query = {
		text: 'INSERT INTO wish (id, list_uuid, available, comment, name, price, url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
		values: [
			id,
			list_uuid,
			available,
			comment,
			name,
			price,
			url,
		],
	}

	await dbClient.query(query)

	return {
		status: 201,
	}
}
