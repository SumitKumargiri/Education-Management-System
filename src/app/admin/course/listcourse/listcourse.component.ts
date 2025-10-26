import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listcourse',
  templateUrl: './listcourse.component.html',
  styleUrl: './listcourse.component.css'
})
export class ListcourseComponent implements OnInit {
  courses: any[] = [];
  // courses: Course[] = [];

  constructor(private studentsService: StudentsService,private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.studentsService.getCourses().subscribe(response => {
      if (response.success) {
        this.courses = response.model;
      } else {
        console.error('Error fetching courses:', response.message);
      }
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }
  editCourse(course: any) {
    this.router.navigate(['/admin/course/updatecourse/:id'], { state: { course } });
  }
}
