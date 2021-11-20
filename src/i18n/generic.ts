export interface GenericText {
	newListPage: newListPageText
	newWishPage: newWishPageText
}

interface newListPageText {
	pageTitle: string
	title: string
	listTitle: string
	listTitleDetails: string
	listDeletionDate: string
	listDeletionDateDetails: string
	listSubmitButton: string
}

interface newWishPageText {
	pageTitle: string
	listDeletionDateDetails: string
	sharingLink: string
	wishName: string
	wishPrice: string
	wishComment: string
	wishUrl: string
}
