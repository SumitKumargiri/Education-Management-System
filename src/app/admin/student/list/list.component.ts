
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../../types/student';
import { StudentsService } from '../../../services/students.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  students: Student[] = [];
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
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents({"pageIndex": this.pageIndex,"pageSize": this.pageSize,"searchText": this.searchId
    }).subscribe(
      response => {
        if (response && response.lstModel) {
          this.students = response.lstModel;
          this.totalRecords = response.totalRecords;
          this.isLoading = false;
        } else {
          this.students = [];
          this.totalRecords = 0;
          this.isLoading = false;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching students:', error);
        this.errorMessage = 'An error occurred while fetching students';
        this.isLoading = true;
      }
    );
  }

  onSearchChange(searchValue: string): void {
    this.searchId = searchValue;
    this.pageIndex = 1; 
    this.fetchStudents();
  }

  searchStudent(): void {
    this.pageIndex = 1; 
    this.fetchStudents();
  }

  // deleteStudent(studentId: number): void {
  //   if (confirm('Are you sure you want to delete this student?')) {
  //     this.studentService.deleteStudent(studentId).subscribe(
  //       () => {
  //         this.toastr.success('Student deleted successfully');
  //         this.students = this.students.filter(student => student.id !== studentId);
  //         this.totalRecords--;
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error('Error deleting student:', error);
  //         this.toastr.error('An error occurred while deleting the student');
  //       }
  //     );
  //   }
  // }

  deleteStudent(studentId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(studentId).subscribe(
          () => {
            this.toastr.success('Student deleted successfully');
            this.students = this.students.filter(student => student.id !== studentId);
            this.totalRecords--;
            Swal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            );
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting student:', error);
            this.toastr.error('An error occurred while deleting the student');
          }
        );
      }
    });
  }

  nextPage(): void {
    if (this.pageIndex * this.pageSize < this.totalRecords){
    this.pageIndex++;
    this.fetchStudents();
    }
  }
  disableNext(): boolean {
    return (this.pageIndex * this.pageSize >= this.totalRecords);
  }

  prevPage(): void {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.fetchStudents();
    }
  }


  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.students.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  } 
  
  goToPage(page: number): void {
    this.pageIndex = page;
    this.fetchStudents(); 
  }
  
}









