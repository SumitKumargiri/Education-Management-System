import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentsService } from '../../services/students.service';
import { DistrictCount, Student } from '../../types/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChartCanvas', { static: false }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('historicalChartCanvas', { static: false }) historicalChartCanvas!: ElementRef<HTMLCanvasElement>;
  errorMessage: string | null = null;
  private isBrowser: boolean;
  totalStudents: number = 0;
  totalTeachers: number = 0;

  constructor(private studentService: StudentsService,@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      Chart.register(...registerables);
    }
  }

  ngOnInit(): void {
    this.fetchTotalStudentCount();
  }


  fetchTotalStudentCount(): void {
    this.studentService.getStudentDetails().subscribe(
      (students: Student[]) => {
        this.totalStudents = students.length;
      },
      (error) => {
        console.error('Error fetching students:', error);
        // Handle error as needed
      }
    );
  }


  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.loadLineChart();
      this.loadPieChart();
      this.loadHistoricalChart();
    }
  }

  private loadLineChart(): void {
    if (!this.lineChartCanvas) {
      console.error('lineChartCanvas is not available');
      this.errorMessage = 'Canvas element is not available';
      return;
    }

    this.studentService.getDistrictCounts().subscribe(
      (response: { model: DistrictCount[] }) => {
        const data = response.model;

        if (Array.isArray(data)) {
          const labels = data.map(d => d.districtname);
          const values = data.map(d => d.district_count);

          new Chart(this.lineChartCanvas.nativeElement, {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{
                label: 'District Count Over Time',
                data: values,
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
                  text: 'District Count Over Time'
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Districts'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Count'
                  },
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          console.error('Data is not an array:', data);
          this.errorMessage = 'Invalid data format received from the server.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching district counts:', error);
        this.errorMessage = 'An error occurred while fetching district counts';
      }
    );
  }

  private loadPieChart(): void {
    if (!this.pieChartCanvas) {
      console.error('pieChartCanvas is not available');
      this.errorMessage = 'Canvas element is not available';
      return;
    }

    this.studentService.getDistrictCounts().subscribe(
      (response: { model: DistrictCount[] }) => {
        const data = response.model;

        if (Array.isArray(data)) {
          const labels = data.map(d => d.districtname);
          const values = data.map(d => d.district_count);

          new Chart(this.pieChartCanvas.nativeElement, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: values,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
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
                  text: 'District Distribution'
                }
              }
            }
          });
        } else {
          console.error('Data is not an array:', data);
          this.errorMessage = 'Invalid data format received from the server.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching district counts:', error);
        this.errorMessage = 'An error occurred while fetching district counts';
      }
    );
  }

  private loadHistoricalChart(): void {
    if (!this.historicalChartCanvas) {
      console.error('historicalChartCanvas is not available');
      this.errorMessage = 'Canvas element is not available';
      return;
    }

    this.studentService.getDistrictCounts().subscribe(
      (response: { model: DistrictCount[] }) => {
        const data = response.model;

        if (Array.isArray(data)) {
          const labels = data.map(d => d.districtname); 
          const values = data.map(d => d.district_count); 

          new Chart(this.historicalChartCanvas.nativeElement, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Historical District Count',
                data: values,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
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
                  text: 'Historical District Count'
                }
              },
              scales: {
                x: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Districts'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Count'
                  },
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          console.error('Data is not an array:', data);
          this.errorMessage = 'Invalid data format received from the server.';
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching district counts:', error);
        this.errorMessage = 'An error occurred while fetching district counts';
      }
    );
  }
}
