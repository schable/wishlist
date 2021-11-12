import { Client } from 'pg'
import type { ServerResponse } from '@sveltejs/kit/types/hooks'

const dbClient = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'wishlistpassword',
	port: 5432,
})
dbClient.connect()
	.then(() => {
		console.log('connected')
	})
	.catch(err => console.error('connection error', err.stack))

export async function handle({ request, resolve }): Promise<ServerResponse> {
	request.locals.dbClient = dbClient
	return resolve(request)
}
