import { render, screen } from '@testing-library/svelte'

import CreateNewList from './index.svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from '@jest/globals'
import { WishService } from '../../../services/WishService'
import { UuidGenerator } from '../../../helpers/UuidGenerator'
import  { Encryptor } from '../../../helpers/Encryptor'

jest.mock('../../../helpers/Encryptor')
jest.mock('../../../services/wishService')
jest.mock('../../../helpers/UuidGenerator')

const GENERATED_UUID = 'universally-unique-identifier'

describe('New wish list', () => {
	let mockWishService
	let mockedUuidGenerator
	beforeEach(() => {
		window.location.hash='#jdfbJbe_jdSA'
		mockedUuidGenerator = new UuidGenerator()
		const encryptor = new Encryptor({extractable: true} as CryptoKey)
		jest.spyOn(Encryptor, 'new').mockResolvedValue(encryptor)
		mockWishService = new WishService(encryptor)
		jest.spyOn(mockedUuidGenerator, 'generate').mockReturnValue(GENERATED_UUID)
	})

	const renderCreateNewList = () => {
		render(CreateNewList, { listUuid: 'list-uuid', uuidGenerator: mockedUuidGenerator })
	}

	describe('Wish item', () => {
		it('should add a new wish form on Name field blur if the name field is filled', async () => {
			// Given
			renderCreateNewList()
			const nameInput = screen.getByLabelText('Name')
			userEvent.type(nameInput, 'My wish number one')

			// When
			await userEvent.tab()

			// Then
			expect(screen.getAllByLabelText('Name')).toHaveLength(2)
		})

		it('should not add a new wish form on Name field blur if the name field is empty', async () => {
			// Given
			renderCreateNewList()
			userEvent.click(screen.getByLabelText('Name'))

			// When
			await userEvent.tab()

			// Then
			expect(screen.getAllByLabelText('Name')).toHaveLength(1)
		})

		it('should not add a new wish form on Name field blur if the name field is blur but the last wish is empty', async () => {
			// Given
			renderCreateNewList()
			const nameInput = screen.getByLabelText('Name')
			userEvent.click(nameInput)
			userEvent.type(nameInput, 'My wish number one')
			await userEvent.tab()

			// When
			userEvent.click(screen.getAllByLabelText('Name')[0])
			await userEvent.tab()

			// Then
			expect(screen.getAllByLabelText('Name')).toHaveLength(2)
		})

		it.each([
			{
				fieldLabel: 'Name',
				valueToType: 'My wish number one',
				fieldName: 'name',
				valueToSave: 'My wish number one',
			},
			{ fieldLabel: 'Price', valueToType: '2', fieldName: 'price', valueToSave: 2 },
			{
				fieldLabel: 'Comment',
				valueToType: 'This is a comment',
				fieldName: 'comment',
				valueToSave: 'This is a comment',
			},
			{
				fieldLabel: 'URL',
				valueToType: 'https://super.wish',
				fieldName: 'url',
				valueToSave: 'https://super.wish',
			},
		])(
			'should save wish with generated UUID on $fieldLabel field blur',
			async ({ fieldLabel, valueToType, fieldName, valueToSave }) => {
				// Given
				renderCreateNewList()
				const input = screen.getByLabelText(fieldLabel)
				userEvent.type(input, valueToType)

				// When
				await userEvent.tab()

				// Then
				expect(mockWishService.save).toHaveBeenCalledWith({
					comment: undefined,
					name: undefined,
					price: undefined,
					reserved: false,
					url: undefined,
					uuid: GENERATED_UUID,
					[fieldName]: valueToSave,
				})
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
				renderCreateNewList()
				const input = screen.getByLabelText(fieldLabel)
				userEvent.type(input, valueToType)
				await userEvent.tab()

				// When
				userEvent.click(input)
				await userEvent.tab()

				// Then
				expect(mockWishService.save).toHaveBeenCalledTimes(1)
			},
		)
	})
})
