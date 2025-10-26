
import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { TeacherCourseSubject } from '../../types/student';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachersubjectassignment',
  templateUrl: './teachersubjectassignment.component.html',
  styleUrls: ['./teachersubjectassignment.component.css']
})
export class TeachersubjectassignmentComponent implements OnInit {
  teacherCourseSubjects: TeacherCourseSubject[] = [];
  selectedFile: File | null = null;
  selectedTeacher: TeacherCourseSubject | null = null;

  constructor(private studentsService: StudentsService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.studentsService.getTeacherCourseSubjects().subscribe(
      data => this.teacherCourseSubjects = data,
      error => console.error('Error fetching data', error)
    );
  }

  onFileSelected(event: any, teacher: TeacherCourseSubject): void {
    this.selectedFile = event.target.files[0];
    this.selectedTeacher = teacher;
  }

  onUpload(): void {
    if (this.selectedFile && this.selectedTeacher) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        if (this.selectedTeacher) {
          this.studentsService.uploadAssignment(
            this.selectedTeacher.firstname,
            this.selectedTeacher.subjectname,base64String
          ).subscribe(response => {
              console.log('File uploaded successfully', response);
              this.toastr.success('File uploaded successfully');
              this.router.navigate(['/teacher/teacherhome']);
            },
            error => {
              console.error('Error uploading file', error);
              this.toastr.error('Error uploading file');
            }
          );
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}


