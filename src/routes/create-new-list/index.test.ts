import { fireEvent, render, screen } from '@testing-library/svelte'

import CreateNewList from './index.svelte'
import userEvent from '@testing-library/user-event'

describe('Create new list', () => {
	it('should add a new item on description blur if description is provided', async () => {
		// Given
		render(CreateNewList)
		let descriptionInput = screen.getByLabelText('Description')
		userEvent.click(descriptionInput)
		userEvent.type(descriptionInput, 'My awesome product')

		// When
		await userEvent.click(screen.getByLabelText('Prix'))

		// Then
		expect(screen.getAllByLabelText('Description')).toHaveLength(2)
	})
})
