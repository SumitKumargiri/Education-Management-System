
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-teacheradd',
  templateUrl: './teacheradd.component.html',
  styleUrl: './teacheradd.component.css'
})
export class TeacheraddComponent {
  formData = {
    id: null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    districtname: '',
    districtcode:'',
    statename:'',
    statecode:'',
    mobile: '',
    gender: '',
    qualifications: ''
  };
  successMessageVisible: boolean | undefined;
  errorMessageVisible: boolean | undefined;

  constructor(private studentService: StudentsService, private router: Router, private toastr: ToastrService) { }

  onSubmit(): void {
    this.studentService.addTeacher(this.formData).subscribe(
      response => {
        console.log('Data added successfully:', response);
        this.toastr.success('Data added successfully');
        this.successMessageVisible = true;
        setTimeout(() => {
          this.successMessageVisible = false;
        }, 3000);
        this.router.navigate(['/admin/teacher/teacherlist']);
        this.resetForm();
      },
      error => {
        console.error('Error adding data:', error);
        this.toastr.error('Error adding data');
        this.errorMessageVisible = true;
        setTimeout(() => {
          this.errorMessageVisible = false;
        }, 3000);
      }
    );
  }

  resetForm(): void {
    this.formData = {
    id: null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    districtname: '',
    districtcode:'',
    statename:'',
    statecode:'',
    mobile: '',
    gender: '',
    qualifications: ''
    };
  }

  clearForm() {
    this.formData = {
    id: null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    districtname: '',
    districtcode:'',
    statename:'',
    statecode:'',
    mobile: '',
    gender: '',
    qualifications: ''
    };
  }
}
