export interface genericCropDetails {
    cropName: string,
    status: string,
    sellerId: string,
    buyerId: string,
    quantity: number,
}

export interface matchesDetails extends genericCropDetails {
    askingPrice: number,
    sellerTotal: number,
    buyerTotal: number,
    matchDate: string,
    daysSinceAdded: number
}

export interface transactionDetail extends genericCropDetails {
    sellerTotal: number,
    transactionValue: number,
    buyerAcceptDate: string,
    sellerAcceptDate: string,
}