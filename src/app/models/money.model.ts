export class Money {
    static VALID_CURRENCIES = ['USD', 'KES'];

    amount: number;
    currency: string;

    isValid(): boolean {
        return typeof this.amount === 'number' &&
            this.amount > 0 &&
            Money.VALID_CURRENCIES.includes(this.currency);
    }
}