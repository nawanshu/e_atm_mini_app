import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [{provide: AlertService, useValue: {
        error: (message: any) => {},
        clear: () => {},
        getMessage: () => {}
      } }],
    });
  }));

  beforeEach(() => {
    alertService = TestBed.get(AlertService);
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit', () => {
  //   it('should call when error occurs', () => {
  //     const ngOnInitSpy = spyOn(alertService, 'getMessage').and.returnValue(Observable.of('a'));
  //     component.ngOnInit();
  //     expect(ngOnInitSpy).toHaveBeenCalledTimes(1);
  //   });
  // });
});
