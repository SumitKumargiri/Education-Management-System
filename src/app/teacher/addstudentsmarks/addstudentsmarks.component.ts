import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student, StudentSubjectMarks } from '../../types/student';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addstudentsmarks',
  templateUrl: './addstudentsmarks.component.html',
  styleUrls: ['./addstudentsmarks.component.css']
})
export class AddstudentsmarksComponent implements OnInit {
  studentDetails: Student[] = [];
  filteredStudentDetails: Student[] = [];
  searchTerm: string = '';
  departmentFilter: string = '';

  constructor(private studentsService: StudentsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    this.studentsService.getStudentDetails().subscribe(
      (data: Student[]) => {
        this.studentDetails = data;
        this.filteredStudentDetails = data;
      },
      (error) => {
        console.error('Error fetching student details', error);
      }
    );
  }

  filterStudents(): void {
    if (this.searchTerm) {
      this.filteredStudentDetails = this.studentDetails.filter(student =>
        student.firstname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudentDetails = this.studentDetails;
    }
  }

  filterStudentsByDepartment(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.departmentFilter = target.value.trim().toLowerCase();

    if (this.departmentFilter) {
      this.filteredStudentDetails = this.studentDetails.filter(student =>
        student.departmentname.toLowerCase().includes(this.departmentFilter)
      );
    } else {
      this.filteredStudentDetails = this.studentDetails;
    }
  }

  submitMarks(student: Student): void {
    const { firstname, departmentname, subjectname } = student;

    if (!subjectname) {
      this.toastr.error('Subject name is not available', 'Error');
      return;
    }

    const studentMarks: StudentSubjectMarks = {
      subjectname: student.subjectname || 'N/A',
      marks: student.marks || 0,
      a1marks: student.a1marks || 0,
      a2marks: student.a2marks || 0,
      a3marks: student.a3marks || 0,
      firstname: firstname || '', 
      departmentname: departmentname || '' 
    };

    this.studentsService.updateStudentMarks(studentMarks).subscribe(
      response => {
        console.log('Marks updated successfully', response);
        this.toastr.success('Marks added successfully', 'Success');
      },
      error => {
        console.error('Error updating marks', error);
        this.toastr.error('Failed to add marks', 'Error');
      }
    );
  }

  getUniqueDepartments(): string[] {
    const departments = new Set<string>();
    this.studentDetails.forEach(student => departments.add(student.departmentname));
    return Array.from(departments);
  }
}
