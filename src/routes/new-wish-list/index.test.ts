import { render, screen } from '@testing-library/svelte'

import CreateNewList from './index.svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from '@jest/globals'
import { WishService } from '../../services/wishService'

jest.mock('../../services/wishService')
describe('New wish list', () => {
	let mockedWishService
	beforeEach(() => {
		mockedWishService = new WishService()
	})

	it('should add a new wish form on name blur if the name field is filled', async () => {
		// Given
		render(CreateNewList, { wishService: mockedWishService })
		const nameInput = screen.getByLabelText('Name')
		userEvent.type(nameInput, 'My wish number one')

		// When
		await userEvent.tab()

		// Then
		expect(screen.getAllByLabelText('Name')).toHaveLength(2)
	})

	it('should not add a new wish form on name blur if the name field is empty', async () => {
		// Given
		render(CreateNewList, { wishService: mockedWishService })
		userEvent.click(screen.getByLabelText('Name'))

		// When
		await userEvent.tab()

		// Then
		expect(screen.getAllByLabelText('Name')).toHaveLength(1)
	})

	it.each([
		{ fieldLabel: 'Name', valueToType: 'My wish number one' },
		{ fieldLabel: 'Price', valueToType: '2' },
		{ fieldLabel: 'Comment', valueToType: 'This is a comment' },
		{ fieldLabel: 'URL', valueToType: 'https://super.wish' },
	])(
		'should save wish on $fieldLabel field blur if field is filled',
		async ({ fieldLabel, valueToType }) => {
			// Given
			render(CreateNewList, { wishService: mockedWishService })
			const input = screen.getByLabelText(fieldLabel)
			userEvent.type(input, valueToType)

			// When
			await userEvent.tab()

			// Then
			expect(mockedWishService.save).toHaveBeenCalled()
		},
	)

	it.each([
		{ fieldLabel: 'Name', valueToType: 'My wish number one' },
		{ fieldLabel: 'Price', valueToType: '2' },
		{ fieldLabel: 'Comment', valueToType: 'This is a comment' },
		{ fieldLabel: 'URL', valueToType: 'https://super.wish' },
	])(
		'should not save wish on $fieldLabel field blur if field value has not changed',
		async ({ fieldLabel, valueToType }) => {
			// Given
			render(CreateNewList, { wishService: mockedWishService })
			const input = screen.getByLabelText(fieldLabel)
			userEvent.type(input, valueToType)
			await userEvent.tab()

			// When
			userEvent.click(input)
			await userEvent.tab()

			// Then
			expect(mockedWishService.save).toHaveBeenCalledTimes(1)
		},
	)
})
