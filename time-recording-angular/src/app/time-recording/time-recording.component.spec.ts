import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRecordingComponent } from './time-recording.component';

describe('TimeRecordingComponent', () => {
  let component: TimeRecordingComponent;
  let fixture: ComponentFixture<TimeRecordingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeRecordingComponent]
    });
    fixture = TestBed.createComponent(TimeRecordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
