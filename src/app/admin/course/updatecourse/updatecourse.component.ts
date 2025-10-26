import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css']
})
export class UpdatecourseComponent implements OnInit {

  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private studentsService: StudentsService,private toastr: ToastrService) {
    const course = this.router.getCurrentNavigation()?.extras.state?.['course']; 
    if (course) {
      this.editForm = this.fb.group({
        id: [course.id, Validators.required],
        name: [course.name, Validators.required],
        duration: [course.duration, Validators.required],
        type: [course.type, Validators.required],
        description: [course.description, Validators.required],
        updatedby: [new Date()]
      });
    } else {
      console.error('Course data not found in navigation extras.');
    }
  }

  ngOnInit(): void {}

  updateCourse() {
    if (this.editForm.valid) {
      const updatedCourse = {
        ...this.editForm.value,
        updatedby: new Date()
      };

      this.studentsService.updateCourse(updatedCourse).subscribe(
        response => {
          console.log('Course updated successfully');
          this.toastr.success('Course updated successfully');
          this.router.navigate(['/admin/course/listcourse']);
        },
        error => {
          console.error('Error updating course', error);
        }
      );
    }
  }
}
