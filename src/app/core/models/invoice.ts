export interface InvoiceItem {
 itemId: number | null;
 itemName: string;
 price: number;
 quantity: number;
 discountIsPercentage: boolean;
 discountPercentage: number;
 valueDifference: number;
 totalSales: number;
 totalDiscount: number;
 totalNet: number;
 originalPrice: number;
}

interface Invoice {
 customerId?: number;
 date: string;
 items: InvoiceItem[];
 totalSales: number;
 totalDiscount: number;
 totalNet: number;
 totalValueDifference: number;
}



