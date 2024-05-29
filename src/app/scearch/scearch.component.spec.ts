import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScearchComponent } from './scearch.component';

describe('ScearchComponent', () => {
  let component: ScearchComponent;
  let fixture: ComponentFixture<ScearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
