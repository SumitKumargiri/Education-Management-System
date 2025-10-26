import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { isPlatformBrowser } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { AttendanceStatus, StudentSubjectMarks } from '../../types/student';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-studenthome',
  templateUrl: './studenthome.component.html',
  styleUrls: ['./studenthome.component.css']
})
export class StudenthomeComponent implements OnInit, AfterViewInit {

  @ViewChild('historicalChartCanvas', { static: false }) historicalChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('historicalChartCanvasMarks', { static: false }) historicalChartCanvasMarks!: ElementRef<HTMLCanvasElement>;
  
  private isBrowser: boolean;
  errorMessage: string | null = null;
  private username: string;
  studentSubjectMarks$: Observable<StudentSubjectMarks[]> | undefined;

  constructor(private studentService: StudentsService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      Chart.register(...registerables);
    }

    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername.replace(/['"]+/g, '') : '';
  }

  ngOnInit(): void {
    this.fetchStudentSubjectMarks();
  }

  fetchStudentSubjectMarks(): void {
    if (this.username) {
      this.studentSubjectMarks$ = this.studentService.getStudentSubjectMarks(this.username);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.username) {
      this.loadHistoricalChart();
      this.loadHistoricalChartMarks();
    }
  }

  private loadHistoricalChart(): void {
    if (!this.historicalChartCanvas) {
      console.error('historicalChartCanvas is not available');
      return;
    }

    this.studentService.getAttendanceByUsername(this.username).subscribe(
      (response: AttendanceStatus[]) => {
        if (Array.isArray(response)) {
          const dates = response.map(d => new Date(d.date));
          const statusCounts = response.map(d => d.status === 'Present' ? 1 : 0);

          new Chart(this.historicalChartCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: dates.map(date => date.toLocaleDateString()),
              datasets: [{
                label: 'Student Attendance Status According to Date',
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

  private loadHistoricalChartMarks(): void {
    if (!this.historicalChartCanvasMarks) {
      console.error('historicalChartCanvasMarks is not available');
      return;
    }

    if (this.studentSubjectMarks$) {
      this.studentSubjectMarks$.subscribe(
        (marks: StudentSubjectMarks[]) => {
          const subjects = marks.map(mark => mark.subjectname);
          const marksData = marks.map(mark => mark.marks);

          new Chart(this.historicalChartCanvasMarks.nativeElement, {
            type: 'line',
            data: {
              labels: subjects,
              datasets: [{
                label: 'Subject Marks',
                data: marksData,
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
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Subjects'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Marks'
                  },
                  min: 0,
                  max: 100,
                  ticks: {
                    stepSize: 10,
                    callback: (value) => {
                      return value.toString(); // Corrected callback for y-axis
                    }
                  }
                }
              }
            }
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching student subject marks:', error);
          this.errorMessage = 'An error occurred while fetching student subject marks.';
        }
      );
    } else {
      console.error('studentSubjectMarks$ is undefined');
      // Handle the case where studentSubjectMarks$ is not defined, if needed
    }
  }
}
