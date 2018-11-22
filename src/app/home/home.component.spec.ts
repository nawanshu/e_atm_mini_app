import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GAService } from '../shared/monitoring/ga-service';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let gaService: GAService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, InputComponent, AlertComponent ],
      providers: [
        { provide: GAService, useValue: {
          monitor: (action, category, label) => {}
        } }
      ],
      imports: [RouterTestingModule, FormsModule]
    });
  }));

  beforeEach(() => {
    gaService = TestBed.get(GAService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit', () => {
      const sessionStorageSpy = spyOn(sessionStorage, 'removeItem').and.callFake(() => { });
      component.ngOnInit();
      expect(sessionStorageSpy).toHaveBeenCalledWith('amount');
    });
  });

});
