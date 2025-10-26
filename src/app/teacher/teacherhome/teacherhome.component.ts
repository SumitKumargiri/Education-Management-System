import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { StudentsService } from '../../services/students.service';
import { Chart, registerables } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendanceStatus, Student } from '../../types/student';

@Component({
  selector: 'app-teacherhome',
  templateUrl: './teacherhome.component.html',
  styleUrls: ['./teacherhome.component.css']
})
export class TeacherhomeComponent implements OnInit, AfterViewInit {

  @ViewChild('historicalChartCanvas', { static: false }) historicalChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('departmentChartCanvas', { static: false }) departmentChartCanvas!: ElementRef<HTMLCanvasElement>;

  private isBrowser: boolean;
  errorMessage: string | null = null;
  studentsData$: Observable<Student[]> | undefined;
  private username: string;
  totalStudents: number = 0;
  totalAssignment: number = 0;
  totalpendingAssignment:number=0;

  constructor(private studentService: StudentsService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      Chart.register(...registerables);
    }

    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername.replace(/['"]+/g, '') : '';
  }

  ngOnInit(): void {
    this.fetchTotalStudentCount();
    this.fetchTeacherAssignments();
  }

  fetchTotalStudentCount(): void {
    this.studentService.getStudentDetails().subscribe(
      (students: Student[]) => {
        this.totalStudents = students.length;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }
  fetchTeacherAssignments() {
    this.studentService.getTeacherSubjectAssignments().subscribe(assignments => {
      this.totalAssignment = assignments.filter(assignment => assignment.assignment !== null).length;
      this.totalpendingAssignment = assignments.filter(assignment => assignment.assignment === null).length;
    });
  }


  ngAfterViewInit(): void {
    if (this.isBrowser && this.username) {
      this.loadHistoricalChart();
      this.loadDepartmentChart();
    }
  }

  private loadHistoricalChart(): void {
    if (!this.historicalChartCanvas) {
      console.error('historicalChartCanvas is not available');
      return;
    }

    this.studentService.getTeacherAttendanceByUsername(this.username).subscribe(
      (response: AttendanceStatus[]) => {
        if (Array.isArray(response)) {
          const dates = response.map(d => new Date(d.date));
          const statusCounts = response.map(d => d.status === 'Present' ? 1 : 0);

          new Chart(this.historicalChartCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: dates.map(date => date.toLocaleDateString()),
              datasets: [{
                label: 'Teacher Attendance Status According Date',
                data: statusCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: true,
                  // text: 'Teacher Attendance Status Over Time'
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Date'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Status'
                  },
                  min: 0,
                  max: 1,
                  ticks: {
                    stepSize: 1,
                    callback: (value) => {
                      return value === 1 ? 'Present' : 'Absent';
                    }
                  }
                }
              }
            }
          });
        } else {
          console.error('Data is not an array:', response);
          this.errorMessage = 'Invalid data format received from the server.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching Attendance counts:', error);
        this.errorMessage = 'An error occurred while fetching Attendance counts';
      }
    );
  }

  private loadDepartmentChart(): void {
    if (!this.departmentChartCanvas) {
      console.error('departmentChartCanvas is not available');
      return;
    }

    this.studentsData$ = this.studentService.getStudentDetails();
    this.studentsData$.subscribe(
      (students: Student[]) => {
        if (students.length > 0) {
          this.generateDepartmentChart(students);
        } else {
          console.error('No student data received');
          this.errorMessage = 'No student data available.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students:', error);
        this.errorMessage = 'An error occurred while fetching student data.';
      }
    );
  }

  private generateDepartmentChart(students: Student[]): void {
    const departmentCounts = this.calculateDepartmentCounts(students);

    new Chart(this.departmentChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(departmentCounts),
        datasets: [{
          label: 'Number of Students Department Wise',
          data: Object.values(departmentCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            // text: 'Number of Students per Department'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Students'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Department'
            }
          }
        }
      }
    });
  }

  private calculateDepartmentCounts(students: Student[]): { [key: string]: number } {
    const departmentCounts: { [key: string]: number } = {};
    students.forEach(student => {
      if (departmentCounts[student.departmentname]) {
        departmentCounts[student.departmentname]++;
      } else {
        departmentCounts[student.departmentname] = 1;
      }
    });
    return departmentCounts;
  }
}
