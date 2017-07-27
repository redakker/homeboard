import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerloadComponent } from './serverload.component';

describe('ServerloadComponent', () => {
  let component: ServerloadComponent;
  let fixture: ComponentFixture<ServerloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
