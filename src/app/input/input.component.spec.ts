import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GAService } from '../shared/monitoring/ga-service';
import { Route } from '@angular/router/src/config';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let gaService: GAService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputComponent, AlertComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: GAService, useValue: {
          monitor: (action, category, label) => {}
        } },
        {provide: AlertService, useValue: {
          error: (message: any) => {},
          clear: () => {},
          getMessage: () => {}
        } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    gaService = TestBed.get(GAService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit and set amount property with empty', () => {
      const sessionStorageSpy = spyOn(sessionStorage, 'getItem').and.callFake(() => {  });
      component.ngOnInit();
      expect(sessionStorageSpy).toHaveBeenCalledWith('amount');
      expect(component.amount).toBe('');
    });
  });

  describe('onChange', () => {
    it('should call onChange when amount greater than 10000', () => {
      component.amount = '11000';
      component.onChange(component.amount);
      expect(component.maxLimit).toBe(true);
      expect(component.disableSubmit).toBe(true);
    });
    it('should call onChange when amount is null', () => {
      component.amount = null;
      component.onChange(component.amount);
      expect(component.maxLimit).toBe(false);
      expect(component.disableSubmit).toBe(true);
    });
    it('should call onChange when amount less than 10000', () => {
      component.amount = '9000';
      component.onChange(component.amount);
      expect(component.maxLimit).toBe(false);
      expect(component.disableSubmit).toBe(false);
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit when amount is null', () => {
      const sessionStorageSpy = spyOn(sessionStorage, 'setItem').and.callFake(() => {  });
      const monitorSpy = spyOn(gaService, 'monitor').and.callFake(() => { });
      const navigateSpy = spyOn(router, 'navigate');
      component.amount = null;
      component.onSubmit();
      expect(sessionStorageSpy).not.toHaveBeenCalledWith('amount', component.amount);
      expect(monitorSpy).not.toHaveBeenCalledWith('InputComponent', 'amount', btoa(component.amount));
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalledWith(['/deposit']);
    });
    it('should call onSubmit when amount is greater than 10000', () => {
      const sessionStorageSpy = spyOn(sessionStorage, 'setItem').and.callFake(() => {  });
      const monitorSpy = spyOn(gaService, 'monitor').and.callFake(() => { });
      const navigateSpy = spyOn(router, 'navigate');
      component.amount = '123434';
      component.onSubmit();
      expect(sessionStorageSpy).not.toHaveBeenCalledWith('amount', component.amount);
      expect(monitorSpy).not.toHaveBeenCalledWith('InputComponent', 'amount', btoa(component.amount));
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalledWith(['/deposit']);
    });
    it('should call onSubmit when amount is less than 10000', () => {
      const sessionStorageSpy = spyOn(sessionStorage, 'setItem').and.callFake(() => {  });
      const monitorSpy = spyOn(gaService, 'monitor').and.callFake(() => { });
      const navigateSpy = spyOn(router, 'navigate');
      component.amount = '1234';
      component.onSubmit();
      expect(sessionStorageSpy).toHaveBeenCalledWith('amount', component.amount);
      expect(monitorSpy).toHaveBeenCalledWith('InputComponent', 'amount', btoa(component.amount));
      expect(navigateSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/deposit']);
    });
  });
});
