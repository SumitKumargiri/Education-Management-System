import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { sha512 } from 'js-sha512';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminresetpass',
  templateUrl: './adminresetpass.component.html',
  styleUrls: ['./adminresetpass.component.css']
})
export class AdminresetpassComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private studentsService: StudentsService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPassword });
  }

  matchPassword(group: FormGroup) {
    const password = group.controls['password'];
    const confirmPassword = group.controls['confirmPassword'];

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ notSame: true });
    } else {
      confirmPassword.setErrors(null);
    }

    return null;
  }

  onSubmit() {
    if (this.resetForm.valid) {
      let username = localStorage.getItem('username');
      if (username) {
        // Remove double quotes if present
        username = username.replace(/"/g, '');
      }

      const oldPassword = sha512(this.resetForm.value.oldPassword);
      const newPassword = sha512(this.resetForm.value.password);

      const resetPasswordData = {
        "username": username,
        "oldPassword": oldPassword,
        "newPassword": newPassword
      };

      this.studentsService.AdminresetPassword(resetPasswordData).subscribe(
        (response: any) => {
          console.log('Password updated successfully', response);
          this.toastr.success('Password updated successfully');
          this.router.navigate(['/admin/home']);
        },
        (error: any) => {
          console.error('Error updating password', error);
          this.toastr.error('Error updating password');
        }
      );
    }
  }
}
