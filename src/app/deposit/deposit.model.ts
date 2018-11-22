import { MoneyType } from './money-type/money-type.model';

export class Deposit {
    public amount: any;
    public moneyTypes: MoneyType [];

    constructor(amount: any, moneyTypes: MoneyType []) {
        this.amount = amount;
        this.moneyTypes = moneyTypes;
    }
}
