import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { sha512 } from 'js-sha512';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css'] 
})
export class StudentloginComponent implements OnInit {

  loginForm!: FormGroup;
  siteKey = '6LdFs7gpAAAAAE9mGnPHHgPEDEDEOLd2nKesMfee';
  defaultProfileImage = '../../../assets/profile_image.png';

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentsService,
    private toastr: ToastrService,
    private router: Router,
    @Inject(LOCAL_STORAGE) private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });

    const storedUsername = this.storageService.get('username');
    if (storedUsername) {
      this.loginForm.patchValue({
        username: storedUsername
      });
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = sha512(this.loginForm.get('password')?.value);
    const recaptchaToken = this.loginForm.get('recaptcha')?.value;

    const formData = {
      "username": username,
      "password": password,
      "captchaToken": recaptchaToken
    };

    this.studentService.userlogin(formData).subscribe(
      (loginResponse: any) => {
        if (loginResponse && loginResponse.token) {
          this.toastr.success('Login successful!');
          this.storageService.set('username', username);
          localStorage.setItem('token', loginResponse.token);
          
          
          if (loginResponse.email) {
            localStorage.setItem('email', loginResponse.email);
          }

          const profileImage = loginResponse.profileImage ? loginResponse.profileImage : this.defaultProfileImage;
          localStorage.setItem('profileImage', profileImage);
          
          this.router.navigate(['/student/studenthome']);
        } else {
          this.toastr.error('Invalid username or password.');
        }
      },
      (error: any) => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
    );
  }

  userlogin() {
    this.router.navigate(['/studentlogin']);
  }
}
