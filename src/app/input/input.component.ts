import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Route } from '@angular/router/src/config';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { GAService } from '../shared/monitoring/ga-service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  keyPressed: string;
  amount: string;
  disableSubmit: boolean;
  maxLimit: boolean;
  @ViewChild('input') inputElement: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gaService: GAService,
    private alertService: AlertService) {
    // You can put any delay while doing any serve intraction
  //   this.amount.debounceTime(1000).distinctUntilChanged().subscribe((amountNumber) => {
  //     this.enteredAmount = amountNumber;
  // });
  }

  ngOnInit() {
    this.keyPressed = '';
    if (sessionStorage.getItem('amount')) {
      this.amount = sessionStorage.getItem('amount');
    } else {
      this.amount = '';
      this.disableSubmit = true;
    }
    this.setFocus();
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    const regExpNumOnly = new RegExp('^[0-9]+$');
    if (!this.whetherBackSpaceOrEnter(event.key) && !regExpNumOnly.test(event.key)) {
      event.preventDefault();
      return;
    }
    this.setFocus();
    event.stopPropagation();
    this.keyPressed = event.key;
    if (event.key === 'Backspace' && !this.amount) {
      this.disableSubmit = true;
    }
    setTimeout(() => {
      this.keyPressed = '';
    }, 300);
  }

  setFocus() {
    this.inputElement.nativeElement.focus();
  }

  onKeyMouseClick(value) {
    this.setFocus();
    if (!this.amount) {
      this.amount = '';
    }
    switch (value) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.amount = this.amount + value;
        this.onChange(this.amount);
        break;
      case 'Backspace':
          this.amount = Math.floor(Number(this.amount) / 1e1).toString();
          if (this.amount === '0') {
            this.amount = '';
          }
          this.onChange(this.amount);
        break;
    }
  }

  onSubmit() {
    if (!Number(this.amount) || Number(this.amount) > 10000) {
      this.disableSubmit = true;
      return;
    }
    sessionStorage.setItem('amount', this.amount);
    this.gaService.monitor('InputComponent', 'amount' , btoa(this.amount));
    this.router.navigate(['/deposit']);
  }

  onChange(amount) {
    if (Number(amount) > 10000) {
      // this.alertService.error('Maximum allowed limit: &pound;10000');
      this.maxLimit = true;
      this.disableSubmit = true;
    } else if (!Number(amount)) {
      // this.alertService.clear();
      this.maxLimit = false;
      this.disableSubmit = true;
    } else {
      // this.alertService.clear();
      this.maxLimit = false;
      this.disableSubmit = false;
    }
  }

  whetherBackSpaceOrEnter(key) {
    if (key === 'Enter' || key === 'Backspace'){
      return true;
    }
    return false;
  }
}
