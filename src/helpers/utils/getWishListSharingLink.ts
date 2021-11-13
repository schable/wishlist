const CREATION_PATH = 'new-wish-list'
const CONSULTATION_PATH = 'wish-list'

export const getWishListSharingLink = () => window.location.href.replace(CREATION_PATH, CONSULTATION_PATH)