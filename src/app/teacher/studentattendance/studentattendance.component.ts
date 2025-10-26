
import { Component, OnInit, ViewChild, TemplateRef, HostListener, Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../services/students.service';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { AttendanceStatus, DetailedAttendance, StudentAttendanceSummary, attendanceTeacherStatuses, teacher } from '../../types/student';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-studentattendance',
  templateUrl: './studentattendance.component.html',
  styleUrls: ['./studentattendance.component.css']
})
export class StudentattendanceComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  modalData: { action: string; event: CalendarEvent<any> | null } = { action: '', event: null };

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject<void>();
  events: CalendarEvent<any>[] = [];
  presentCount: number = 0;
  totalPresent: number = 0;
  totalAbsent: number = 0;
  hoveredDate: Date | null = null;
  detailedAttendance: DetailedAttendance | null = null;

  attendanceSummary: attendanceTeacherStatuses | null = null;
  studentAttendanceSummary: StudentAttendanceSummary | null = null;

  activeDayIsOpen: boolean = false;
  searchId: any = '';
  pageIndex: number = 1;
  pageSize: number = 100;
  totalRecords: number = 0;

  students: any[] = [];
  date: string = '';
  status!: string;
  teacherSearchText: string = '';

  activeTab: 'teacher' | 'student' = 'teacher';

  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fas fa-fw fa-pencil-alt"></i>',
  //     onClick: ({ event }: { event: CalendarEvent<any> }): void => {
  //       this.handleEvent('Edited', event);
  //     },
  //   },
  //   {
  //     label: '<i class="fas fa-fw fa-trash-alt"></i>',
  //     onClick: ({ event }: { event: CalendarEvent<any> }): void => {
  //       this.deleteEvent(event);
  //     },
  //   },
  // ];

  constructor(private modal: NgbModal, private studentsService: StudentsService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchAttendanceSummary(this.viewDate);
    this.fetchStudentAttendanceSummary(this.viewDate);
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentsService.getStudents({
      "pageIndex": this.pageIndex,
      "pageSize": this.pageSize,
      "searchText": this.searchId
    }).subscribe(
      (response: any) => {
        if (response && response.lstModel) {
          this.students = this.students.concat(response.lstModel);
        } else {
          this.students = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  

  onSearchChange(searchValue: string): void {
    this.searchId = searchValue;
    this.fetchStudents();
  }


  fetchAttendanceSummary(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0]; 
    this.studentsService.getStudentAttendanceSummary(formattedDate).subscribe(
      (summary: StudentAttendanceSummary) => {
        this.studentAttendanceSummary = summary;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching student attendance summary:', error);
      }
    );
  }


  fetchDetailedAttendance(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0];
    this.studentsService.getDetailedAttendance(formattedDate).subscribe(
      (details: DetailedAttendance) => {
        this.detailedAttendance = details;
        this.hoveredDate = date;
        this.openModal();
      },
      (error) => {
        console.error('Error fetching detailed attendance:', error);
      }
    );
  }

  fetchStudentAttendanceSummary(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0];
    this.studentsService.getStudentAttendanceSummary(formattedDate).subscribe(
      (summary: StudentAttendanceSummary) => {
        this.studentAttendanceSummary = summary;
      },
      (error) => {
        console.error('Error fetching student attendance summary:', error);
      }
    );
  }

  dayClicked({ day }: { day: CalendarMonthViewDay }): void {
    if (isSameMonth(day.date, this.viewDate)) {
      if ((isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) || day.events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = day.date;
      this.fetchAttendanceSummary(day.date);
      this.fetchDetailedAttendance(day.date);
    }
  }

  handleEvent(action: string, event: CalendarEvent<any>): void {
    this.modalData = { action, event };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  mapAttendanceToCalendarEvents(attendanceStatuses: AttendanceStatus[]): CalendarEvent<any>[] {
    return attendanceStatuses.map(status => ({
      start: new Date(status.date),
      title: status.status,
      // actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }));
  }

  openModal(): void {
    if (this.detailedAttendance) {
      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  openAddTeacherModal(content: any) {
    this.modalService.open(content, { size: 'lg', scrollable: true });
  }

  editAttendance(date: Date): void {
    this.fetchDetailedAttendance(date);
  }

  @HostListener('mouseover', ['$event'])
  onHover(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('cal-day-cell')) {
      const dayDate = target.getAttribute('data-date');
      if (dayDate) {
        this.hoveredDate = new Date(dayDate);
      }
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.classList.contains('cal-day-cell')) {
      this.hoveredDate = null;
    }
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      },
    ];
  }

  // deleteEvent(eventToDelete: CalendarEvent<any>): void {
  //   this.events = this.events.filter(event => event !== eventToDelete);
  // }

  switchTab(tab: 'teacher' | 'student'): void {
    this.activeTab = tab;
    if (tab === 'student') {
      this.fetchStudentAttendanceSummary(this.viewDate);
    }
  }

  submitAttendance(student: any) {
    this.studentsService.addStudentAttendance({
      "id": student.id,
      "date": this.date,
      "status": student.status
    }).subscribe(
      (response: any) => {
        this.toastr.success('Attendance updated successfully!');
        student.status = '';
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating attendance:', error);
        this.toastr.error('Failed to update attendance.');
      }
    );
  }
}
