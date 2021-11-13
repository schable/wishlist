import type { EndpointOutput, Request } from '@sveltejs/kit'

export const get = async ({ params, locals }: Request<{ dbClient }>): Promise<EndpointOutput> => {
	const { listId } = params
	const { dbClient } = locals
	const query = {
		text: 'SELECT * FROM wish WHERE list_id = $1',
		values: [listId],
	}

	const wishesQuery = await dbClient.query(query)
	const wishes = wishesQuery.rows

	return {
		status: 200,
		body: wishes,
	}
}