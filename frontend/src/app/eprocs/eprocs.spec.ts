import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eprocs } from './eprocs';

describe('Eprocs', () => {
  let component: Eprocs;
  let fixture: ComponentFixture<Eprocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eprocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eprocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
