import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
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
    gender: ''
  };
  successMessageVisible: boolean | undefined;
  errorMessageVisible: boolean | undefined;

  constructor(private studentService: StudentsService, private router: Router, private toastr: ToastrService) { }

  onSubmit(): void {
    this.studentService.addStudent(this.formData).subscribe(
      response => {
        console.log('Data added successfully:', response);
        this.toastr.success('Data added successfully');
        this.successMessageVisible = true;
        setTimeout(() => {
          this.successMessageVisible = false;
        }, 3000);
        this.router.navigate(['/admin/student/list']);
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
    gender: ''
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
    gender: ''
    };
  }
}
