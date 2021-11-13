import type { EndpointOutput, Request } from '@sveltejs/kit'
import type { locals } from '../../../../hooks'

export const get = async ({ params, locals }: Request<locals>): Promise<EndpointOutput> => {
	const { wishId } = params
	const { dbClient } = locals
	const query = {
		text: 'SELECT * FROM wish WHERE id = $1',
		values: [wishId],
	}

	const wishQuery = await dbClient.query(query)
	const wish = wishQuery.rows[0]

	return {
		status: 200,
		body: wish,
	}
}
type postWishBody = {
	list_id: string
	available: boolean
	comment: string
	name: string
	price: string
	url: string
}
export const post = async ({
														 body,
														 locals,
														 params,
													 }: Request<locals, postWishBody>): Promise<EndpointOutput> => {
	const { wishId } = params
	const { dbClient } = locals
	const {
		list_id,
		available,
		comment,
		name,
		price,
		url,
	} = body

	const query = {
		text: `INSERT INTO wish (id, list_id, available, comment, name, price, url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT ON CONSTRAINT wish_pkey
           DO UPDATE SET list_id = $2, available = $3, comment = $4, name = $5, price = $6, url = $7
           WHERE wish."id" = $1`,
		values: [
			wishId,
			list_id,
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