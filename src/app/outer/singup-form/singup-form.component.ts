import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-singup-form',
  templateUrl: './singup-form.component.html',
  styleUrls: ['./singup-form.component.css']
})
export class SingupFormComponent implements OnInit {
  registerform!: FormGroup;
  currentPanel: string = 'admin';

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerform = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  showPanel(panel: string | null) {
    if (panel) {
      this.currentPanel = panel;
    } else {
      this.currentPanel = 'admin'; 
    }
  }

  handleRegistration(panel: string) {
    if (this.registerform.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const firstname = this.registerform.get('firstname')?.value;
    const lastname = this.registerform.get('lastname')?.value;
    const username = this.registerform.get('username')?.value;
    const email = this.registerform.get('email')?.value;
    const password = sha512(this.registerform.get('password')?.value);
    const confirmPassword = sha512(this.registerform.get('confirmPassword')?.value);

    if (password !== confirmPassword) {
      this.toastr.error('Passwords do not match.');
      return;
    }

    // Save username and email to localStorage before API call
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);

    const registrationData = {
      firstname,
      lastname,
      username,
      email,
      password,
      role: panel
    };

    switch (panel) {
      case 'admin':
        this.studentsService.adminregister(registrationData).subscribe(
          response => {
            this.toastr.success('Admin registration successful!');
            // Save token to localStorage after successful registration
            localStorage.setItem('token', response.token);
            this.router.navigate(['/admin/home']);
          },
          error => {
            this.toastr.error('Admin registration failed. Please try again.');
          }
        );
        break;
      case 'student':
        this.studentsService.studentregister(registrationData).subscribe(
          response => {
            this.toastr.success('Student registration successful!');
            // Save token to localStorage after successful registration
            localStorage.setItem('token', response.token);
            this.router.navigate(['/student-login']);
          },
          error => {
            this.toastr.error('Student registration failed. Please try again.');
          }
        );
        break;
      case 'teacher':
        this.studentsService.teacherregister(registrationData).subscribe(
          response => {
            this.toastr.success('Teacher registration successful!');
            localStorage.setItem('token', response.token);
            this.router.navigate(['/teacher-login']);
          },
          error => {
            this.toastr.error('Teacher registration failed. Please try again.');
          }
        );
        break;
    }
  }
}
