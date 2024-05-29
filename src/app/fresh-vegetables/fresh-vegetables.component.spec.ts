import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshVegetablesComponent } from './fresh-vegetables.component';

describe('FreshVegetablesComponent', () => {
  let component: FreshVegetablesComponent;
  let fixture: ComponentFixture<FreshVegetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreshVegetablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreshVegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
