import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../../services/students.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcourses',
  templateUrl: './addcourses.component.html',
  styleUrls: ['./addcourses.component.css']
})
export class AddcoursesComponent implements OnInit {

  courseForm: FormGroup;
  subjects: any[] = [];

  constructor(private fb: FormBuilder,private http: HttpClient,private studentsService: StudentsService,private toastr: ToastrService, private router: Router) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
      subjectname: ['', Validators.required],
      description: ['', Validators.required],
      semester: ['', Validators.required],
      isActive: [0],
      createdBy: [''],
      createdAt: ['']
    });
  }

  ngOnInit(): void {
    this.courseForm.patchValue({
      createdAt: new Date().toISOString()
    });
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.studentsService.getSubjects().subscribe(
      (response: any) => {
        if (response.success && response.model) {
          this.subjects = response.model;
        } else {
          console.error('Error fetching subjects: Invalid response structure');
        }
      },
      (error: any) => {
        console.error('Error fetching subjects: ', error);
      }
    );
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const createdByDate = new Date().toISOString();
      this.courseForm.patchValue({
        createdBy: createdByDate
      });

      const isActiveValue = this.courseForm.value.isActive ? 1 : 0;
      this.courseForm.patchValue({ isActive: isActiveValue });

      const formData = this.courseForm.value;

      this.studentsService.addCourse(formData).subscribe(
        (response: any) => {
          console.log('POST request successful: ', response);
          this.toastr.success('Course Added successfully');
          this.router.navigate(['/admin/course/listcourse']);
          this.courseForm.reset();
          this.courseForm.patchValue({
            createdAt: new Date().toISOString()
          });
        },
        (error: any) => {
          console.error('Error in POST request: ', error);
        }
      );
    } else {
      console.error('Form is invalid. Please fill all required fields.');
    }
  }
}
