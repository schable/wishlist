import type { EndpointOutput, Request } from '@sveltejs/kit'


type locals = { dbClient }

type postWishListBody = { deletionDate: Date, name: string }

export const post = async ({
														 body,
														 params,
														 locals,
													 }: Request<locals, postWishListBody>): Promise<EndpointOutput> => {
	const { listUuid } = params
	const { dbClient } = locals
	const { deletionDate, name } = body

	const query = {
		text: 'INSERT INTO wishlist (id, deletionDate, name) VALUES ($1, $2, $3)',
		values: [listUuid, deletionDate, name],
	}

	await dbClient.query(query)

	return {
		status: 201,
	}
}

export const get = async ({ params, locals }: Request<locals>): Promise<EndpointOutput> => {
	const { listUuid } = params
	const { dbClient } = locals
	const query = {
		text: 'SELECT * FROM wishlist WHERE id = $1',
		values: [listUuid],
	}

	const wishListQuery = await dbClient.query(query)
	const wishList = wishListQuery.rows[0]

	return {
		status: 200,
		body: wishList,
	}

}