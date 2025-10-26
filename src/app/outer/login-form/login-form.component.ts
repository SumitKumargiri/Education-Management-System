import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  adminLoginForm!: FormGroup;
  studentLoginForm!: FormGroup;
  teacherLoginForm!: FormGroup;
  siteKey = '6LdFs7gpAAAAAE9mGnPHHgPEDEDEOLd2nKesMfee';
  defaultProfileImage = '../../../assets/profile_image.png';
  currentPanel: 'admin' | 'student' | 'teacher' = 'admin';
  showLoginPanel = false;

  constructor(private formBuilder: FormBuilder,private studentService: StudentsService,private toastr: ToastrService,private router: Router,@Inject(LOCAL_STORAGE) private storageService: StorageService) { }

  ngOnInit(): void {
    this.createAdminLoginForm();
    this.createStudentLoginForm();
    this.createTeacherLoginForm();
  }

  createAdminLoginForm(): void {
    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptchaAdmin: ['', Validators.required]
    });

    const storedUsername = this.storageService.get('username');
    const storedPassword = this.storageService.get('password');
    if (storedUsername && storedPassword) {
      this.adminLoginForm.patchValue({
        username: storedUsername,
        password: storedPassword
      });
    }
  }

  createStudentLoginForm(): void {
    this.studentLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptchaStudent: ['', Validators.required]
    });

    const storedUsername = this.storageService.get('username');
    const storedPassword = this.storageService.get('password');
    if (storedUsername && storedPassword) {
      this.studentLoginForm.patchValue({
        username: storedUsername,
        password: storedPassword
      });
    }
  }

  createTeacherLoginForm(): void {
    this.teacherLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      recaptchaTeacher: ['', Validators.required]
    });
  }

  handleLogin(): void {
    if (this.adminLoginForm.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.adminLoginForm.get('username')?.value;
    const password = sha512(this.adminLoginForm.get('password')?.value);
    const recaptchaToken = this.adminLoginForm.get('recaptchaAdmin')?.value;

    const formData = {
      username: username,
      password: password,
      captchaToken: recaptchaToken
    };

    this.studentService.login(formData).subscribe(
      loginResponse => {
        if (loginResponse && loginResponse.token) {
          this.toastr.success('Login successful!');
          this.storageService.set('username', username);
          this.storageService.set('password', password);
          localStorage.setItem('token', loginResponse.token);

          if (loginResponse.email) {
            localStorage.setItem('email', loginResponse.email);
          }

          const profileImage = loginResponse.profileImage ? loginResponse.profileImage : this.defaultProfileImage;
          localStorage.setItem('profileImage', profileImage);

          this.router.navigate(['/admin/home']);
          this.toggleLoginPanel();
        } else {
          this.toastr.error('Invalid username or password.');
        }
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
    );
  }

  studentHandleLogin(): void {
    if (this.studentLoginForm.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.studentLoginForm.get('username')?.value;
    const password = sha512(this.studentLoginForm.get('password')?.value);
    const recaptchaToken = this.studentLoginForm.get('recaptchaStudent')?.value;

    const formData = {
      username: username,
      password: password,
      captchaToken: recaptchaToken
    };

    this.studentService.userlogin(formData).subscribe(
      loginResponse => {
        if (loginResponse && loginResponse.token) {
          this.toastr.success('Login successful!');
          this.storageService.set('username', username);
          this.storageService.set('password', password);
          localStorage.setItem('token', loginResponse.token);

          if (loginResponse.email) {
            localStorage.setItem('email', loginResponse.email);
          }

          const profileImage = loginResponse.profileImage ? loginResponse.profileImage : this.defaultProfileImage;
          localStorage.setItem('profileImage', profileImage);

          this.router.navigate(['/student/studenthome']);
          this.toggleLoginPanel();
        } else {
          this.toastr.error('Invalid username or password.');
        }
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
    );
  }

  teacherHandleLogin(): void {
    if (this.teacherLoginForm.invalid) {
      this.toastr.error('Please fill all the required fields.');
      return;
    }

    const username = this.teacherLoginForm.get('username')?.value;
    const password = sha512(this.teacherLoginForm.get('password')?.value);
    const recaptchaToken = this.teacherLoginForm.get('recaptchaTeacher')?.value;

    const formData = {
      username: username,
      password: password,
      captchaToken: recaptchaToken
    };

    this.studentService.teacherlogin(formData).subscribe(
      loginResponse => {
        if (loginResponse && loginResponse.token) {
          this.toastr.success('Login successful!');
          this.storageService.set('username', username);
          this.storageService.set('password', password);
          localStorage.setItem('token', loginResponse.token);

          if (loginResponse.email) {
            localStorage.setItem('email', loginResponse.email);
          }

          const profileImage = loginResponse.profileImage ? loginResponse.profileImage : this.defaultProfileImage;
          localStorage.setItem('profileImage', profileImage);

          this.router.navigate(['/teacher/teacherhome']);
          this.toggleLoginPanel();
        } else {
          this.toastr.error('Invalid username or password.');
        }
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('An error occurred while logging in. Please try again later.');
      }
    );
  }

  showPanel(panel: 'admin' | 'student' | 'teacher'): void {
    this.currentPanel = panel;
  }

  toggleLoginPanel(): void {
    this.showLoginPanel = !this.showLoginPanel;
  }
}
