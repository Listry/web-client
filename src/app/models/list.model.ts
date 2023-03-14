import { Money } from "./money.model";

export class List {
    name: string;
    completion: number;
    _budget: Money;

    set budget(money: Money) {
        if(money.isValid()) {
            this._budget = money;
        }
    }

    get budget(): Money {
        return this._budget;
    }
}