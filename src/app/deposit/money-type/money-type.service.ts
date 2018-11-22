import { MoneyType } from './money-type.model';
import { Injectable } from '@angular/core';

@Injectable()
export class MoneyTypeService {
    private moneyTypes: MoneyType[] = [
        new MoneyType('E1001', 'note', 1000, 0, 0),
        new MoneyType('E1002', 'note', 500, 0, 0),
        new MoneyType('E1003', 'note', 200, 0, 0),
        new MoneyType('E1004', 'note', 100, 0, 0),
        new MoneyType('E1005', 'note', 50, 0, 0),
        new MoneyType('E1006', 'coin', 20, 40, 0),
        new MoneyType('E1007', 'coin', 10, 20, 0),
        new MoneyType('E1008', 'coin', 5, 50, 0),
        new MoneyType('E1009', 'coin', 2, 30, 0),
        new MoneyType('E1010', 'coin', 1, 10, 0)
    ];

    getMoneyTypes() {
        return this.moneyTypes;
    }

    getNoteTypes() {
        return this.moneyTypes.filter(function(moneyType: MoneyType) {
            return moneyType.type === 'note';
        });
    }

    getCoinTypesWithSizeGreaterThan20() {
        return this.moneyTypes.filter(function(moneyType: MoneyType) {
            return moneyType.type === 'coin' && moneyType.size > 20;
        });
    }

    getCoinTypesWithSizeLessThanEqual20() {
        return this.moneyTypes.filter(function(moneyType: MoneyType) {
            return moneyType.type === 'coin' && moneyType.size <= 20;
        });
    }

    setMoneyTypeCount(denomination: number, count: number) {
        this.moneyTypes.filter(function(moneyType: MoneyType) {
            return moneyType.denomination === denomination;
        })[0].count = count;
    }
}
