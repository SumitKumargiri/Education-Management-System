import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isSameDay, isSameMonth } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AttendanceStatus } from '../../types/student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-stdattendance',
  templateUrl: './stdattendance.component.html',
  styleUrls: ['./stdattendance.component.css']
})
export class StdattendanceComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject<void>();
  events: CalendarEvent<any>[] = [];
  attendanceData: AttendanceStatus[] = []; 
  username!: string; 

  activeDayIsOpen: boolean = false;

  constructor(
    private modalService: NgbModal,
    private studentsService: StudentsService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username'); 
    if (storedUsername) {
      this.username = storedUsername.replace(/['"]+/g, ''); 
      this.studentsService.getAttendanceByUsername(this.username).subscribe(data => {
        this.attendanceData = data;
        this.updateCalendarEvents();
      });
    } else {
      this.toastr.error('Username not found in localStorage');
    }
  }

  dayClicked({ day }: { day: CalendarMonthViewDay }): void {
    if (isSameMonth(day.date, this.viewDate)) {
      if ((isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) || day.events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = day.date;
    }
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  updateCalendarEvents(): void {
    this.events = this.attendanceData.map(attendance => ({
      start: new Date(attendance.date),
      title: attendance.status,
      color: attendance.status === 'Absent' ? { primary: 'red', secondary: 'red' } : { primary: 'blue', secondary: 'blue' }
    }));
    this.refresh.next();
  }

  isPresent(date: Date): boolean {
    return this.attendanceData.some(attendance => 
      new Date(attendance.date).toDateString() === date.toDateString() && attendance.status === 'Present'
    );
  }

  isAbsent(date: Date): boolean {
    return this.attendanceData.some(attendance => 
      new Date(attendance.date).toDateString() === date.toDateString() && attendance.status === 'Absent'
    );
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  }
}
