import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-teacherlogin',
  templateUrl: './teacherlogin.component.html',
  styleUrl: './teacherlogin.component.css'
})
export class TeacherloginComponent {

  loginForm!: FormGroup;
  captchaFormGroup!: FormGroup;
  siteKey = '6LdFs7gpAAAAAE9mGnPHHgPEDEDEOLd2nKesMfee';
  defaultProfileImage ='../../../assets/profile_image.png';

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
    const storedPassword = this.storageService.get('password');
    if (storedUsername && storedPassword) {
      this.loginForm.patchValue({
        username: storedUsername,
        password: storedPassword
      });
    }
  }


  handleLogin() {
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

  userlogin(){
    this.router.navigate(['/studentlogin']);
  }

}
