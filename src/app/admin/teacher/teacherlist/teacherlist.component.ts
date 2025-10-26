import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { teacher } from '../../../types/student';

@Component({
  selector: 'app-teacherlist',
  templateUrl: './teacherlist.component.html',
  styleUrl: './teacherlist.component.css'
})
export class TeacherlistComponent implements OnInit{

  teachers: teacher[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  searchId: any = '';
  pageIndex: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  constructor(private studentService: StudentsService, private toastr: ToastrService) {}

    capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }



  ngOnInit(): void {
    this.fetchteachers();
  }

  fetchteachers(): void {
    this.studentService.getteacher({"pageIndex": this.pageIndex,"pageSize": this.pageSize,"searchText": this.searchId
    }).subscribe(
      response => {
        if (response && response.lstModel) {
          this.teachers = response.lstModel;
          this.totalRecords = response.totalRecords;
          this.isLoading = false;
        } else {
          this.teachers = [];
          this.totalRecords = 0;
          this.isLoading = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching teacher:', error);
        this.errorMessage = 'An error occurred while fetching teacher';
        this.isLoading = true;
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.searchId = searchValue;
    this.pageIndex = 1; 
    this.fetchteachers();
  }

  searchteacher(): void {
    this.pageIndex = 1; 
    this.fetchteachers();
  }

  deleteTeacher(teacherId: number): void {
    this.studentService.deleteTeacher(teacherId).subscribe(
      () => {
        this.toastr.success('Teacher data deleted successfully');
        this.teachers = this.teachers.filter(teacher => teacher.id !== teacherId);
        this.totalRecords--;
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting teacher data:', error);
        this.toastr.error('An error occurred while deleting the teacher data');
      }
    );
  }

  nextPage(): void {
    if (this.pageIndex * this.pageSize < this.totalRecords){
    this.pageIndex++;
    this.fetchteachers();
    }
  }
  disableNext(): boolean {
    return (this.pageIndex * this.pageSize >= this.totalRecords);
  }

  prevPage(): void {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchteachers();
    }
  }


  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.teachers.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  } 
  
  goToPage(page: number): void {
    this.pageIndex = page;
    this.fetchteachers(); 
  }
  
}
