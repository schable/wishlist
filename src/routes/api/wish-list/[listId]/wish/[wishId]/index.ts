import type { EndpointOutput, Request } from '@sveltejs/kit'
import type { locals } from '../../../../../../hooks'

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