import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { StudentSubjectMarks } from '../../types/student';

@Component({
  selector: 'app-studentmarks',
  templateUrl: './studentmarks.component.html',
  styleUrls: ['./studentmarks.component.css']
})
export class StudentmarksComponent implements OnInit {

  studentMarks: StudentSubjectMarks[] = [];
  isLoading: boolean = true;
  error: string = '';
  username!: string;

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername.replace(/['"]+/g, '');
      this.fetchStudentSubjectMarks(this.username);
    } else {
      this.isLoading = false;
      this.error = 'Username not found in localStorage';
    }
  }

  fetchStudentSubjectMarks(username: string): void {
    this.studentsService.getStudentSubjectMarks(username).subscribe(
      (marks: StudentSubjectMarks[]) => {
        this.studentMarks = marks;
        this.isLoading = false;
      },
      (error) => {
        this.error = 'Error fetching student subject marks: ' + error.message;
        this.isLoading = false;
      }
    );
  }
}
