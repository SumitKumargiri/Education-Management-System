
import { Component, OnInit, ViewChild, TemplateRef, HostListener, Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewDay, CalendarEventAction } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentsService } from '../../services/students.service';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { AttendanceStatus, DetailedAttendance, StudentAttendanceSummary, attendanceTeacherStatuses, teacher } from '../../types/student';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

const colors: any = {
  green: {
    primary: '#008000',
    secondary: '#00FF00',
  },
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
};

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.username.toLowerCase().includes(searchText) || it.departmentName.toLowerCase().includes(searchText);
    });
  }
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

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
  pageSize: number = 10;
  totalRecords: number = 0;
  teachers: any[] = [];
  date: string = '';
  status!: string;
  teacherSearchText: string = '';

  activeTab: 'teacher' | 'student' = 'teacher';

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent<any> }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent<any> }): void => {
        this.deleteEvent(event);
      },
    },
  ];

  constructor(private modal: NgbModal, private studentsService: StudentsService, private modalService: NgbModal, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchAttendanceSummary(this.viewDate);
    this.fetchStudentAttendanceSummary(this.viewDate);
    this.fetchTeachers();
  }

  fetchTeachers(): void {
    this.studentsService.getteacher({
      "pageIndex": this.pageIndex,
      "pageSize": this.pageSize,
      "searchText": this.searchId
    }).subscribe(
      (response: any) => {
        if (response && response.lstModel) {
          this.teachers = response.lstModel;
        } else {
          this.teachers = [];
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching teachers:', error);
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.searchId = searchValue;
    this.fetchTeachers();
  }

  fetchAttendanceSummary(date: Date): void {
    this.studentsService.getAttendanceSummaryByDate(date).subscribe(
      (summary: attendanceTeacherStatuses) => {
        this.attendanceSummary = summary;
        this.events = this.mapAttendanceToCalendarEvents(summary.attendanceTeacherStatuses);
        this.presentCount = summary.totalPresent;
        this.totalAbsent = summary.totalAbsent;
      },
      (error) => {
        console.error('Error fetching attendance summary:', error);
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
      color: status.status === 'Present' ? colors.green : colors.red,
      actions: this.actions,
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
        this.fetchAttendanceSummary(this.hoveredDate);
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
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent<any>): void {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  switchTab(tab: 'teacher' | 'student'): void {
    this.activeTab = tab;
    if (tab === 'student') {
      this.fetchStudentAttendanceSummary(this.viewDate);
    }
  }

  submitAttendance(teacher: any) {
    this.studentsService.addTeacherAttendance({
      "id": teacher.id,
      "date": this.date,
      "status": teacher.status
    }).subscribe(
      (response: any) => {
        this.toastr.success('Attendance updated successfully!');
        teacher.status = '';
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating attendance:', error);
        this.toastr.error('Failed to update attendance.');
      }
    );
  }
}
