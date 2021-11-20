export interface GenericText {
	newListPage: newListPageText
	newWishPage: newWishPageText
	viewListPage: viewListPageText
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
	sharingLinkCopy: string
	wishName: string
	wishPrice: string
	wishComment: string
	wishUrl: string
}

interface viewListPageText {
	pageTitle: string
	wishName: string
	wishPrice: string
	wishComment: string
	missingComment: string
	wishUrl: string
	missingUrl: string
	bookAction: string
	bookedAction: string
}