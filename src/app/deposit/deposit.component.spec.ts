import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositComponent } from './deposit.component';
import { MoneyTypeService } from './money-type/money-type.service';
import { GAService } from '../shared/monitoring/ga-service';
import { Deposit } from './deposit.model';
import { MoneyType } from './money-type/money-type.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('DepositComponent', () => {
  let component: DepositComponent;
  let fixture: ComponentFixture<DepositComponent>;
  let moneyTypeService: MoneyTypeService;
  let gaService: GAService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositComponent ],
      providers: [
        { provide: MoneyTypeService, useValue: {
          getMoneyTypes: () => {},
          getNoteTypes: () => {},
          getCoinTypesWithSizeGreaterThan20: () => {},
          getCoinTypesWithSizeLessThanEqual20: () => {},
          setMoneyTypeCount: (denomination: number, count: number) => {}
        } },
        { provide: GAService, useValue: {
          monitor: (action, category, label) => {}
        } }
      ],
      imports : [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    moneyTypeService = TestBed.get(MoneyTypeService);
    gaService = TestBed.get(GAService);
    const amount = '<<amount>>';
    const moneyTypes = [
      new MoneyType('<<id>>', '<<type>>', 0, 0, 0)
    ];
    fixture = TestBed.createComponent(DepositComponent);
    component = fixture.componentInstance;

    component.depositModel = new Deposit(amount, moneyTypes);
    console.log(component.depositModel);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
