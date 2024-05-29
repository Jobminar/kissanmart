import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeLocationComponent } from './office-location.component';

describe('OfficeLocationComponent', () => {
  let component: OfficeLocationComponent;
  let fixture: ComponentFixture<OfficeLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfficeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
