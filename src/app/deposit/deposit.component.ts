import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MoneyType } from './money-type/money-type.model';
import { MoneyTypeService } from './money-type/money-type.service';
import { Deposit } from './deposit.model';
import { GAService } from '../shared/monitoring/ga-service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  amount: any;
  collectedDenominations: any = [];
  moneyTypes: MoneyType [];
  noteTypes: MoneyType [];
  coinTypesWithSizeGreaterThan20: MoneyType [];
  coinTypesWithSizeLessThanEqual20: MoneyType [];
  depositModel: Deposit;

  constructor(
    private moneyTypeService: MoneyTypeService,
    private gaService: GAService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.amount = sessionStorage.getItem('amount');
    this.moneyTypes = this.moneyTypeService.getMoneyTypes();
    this.depositModel = new Deposit(this.amount, this.moneyTypes);
    this.resetMoneyCount();
    this.getDenominations();
    this.noteTypes = this.moneyTypeService.getNoteTypes();
    this.coinTypesWithSizeGreaterThan20 = this.moneyTypeService.getCoinTypesWithSizeGreaterThan20();
    this.coinTypesWithSizeLessThanEqual20 = this.moneyTypeService.getCoinTypesWithSizeLessThanEqual20();
    this.gaService.monitor('DepositComponent', 'moneyTypes' , btoa(JSON.stringify(this.moneyTypes)));
  }

  getDenominations() {
    const dm = this.depositModel;
    do {
      for (let i = 0; i < dm.moneyTypes.length; i++) {
        if (dm.moneyTypes[i].denomination <= dm.amount) {
          const denomCount = dm.amount / dm.moneyTypes[i].denomination;
          dm.amount = dm.amount % dm.moneyTypes[i].denomination;
          this.moneyTypeService.setMoneyTypeCount(dm.moneyTypes[i].denomination, Math.floor(denomCount));
          break;
        }
      }
    } while (dm.amount > 0);
  }

  resetMoneyCount() {
    this.depositModel.moneyTypes.map (moneyType => moneyType.count = 0);
  }

  onBack() {
    this.router.navigate(['/input']);
  }
}
