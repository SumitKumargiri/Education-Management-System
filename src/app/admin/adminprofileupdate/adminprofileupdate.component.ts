import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-adminprofileupdate',
  templateUrl: './adminprofileupdate.component.html',
  styleUrl: './adminprofileupdate.component.css'
})
export class AdminprofileupdateComponent {


  username: string = '';
  profileForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  profileImage: string | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentsService, private router: Router, private toastr: ToastrService) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedUsername) {
      this.username = storedUsername.replace(/['"]+/g, '');
      this.profileForm.get('username')?.setValue(storedUsername);
    }
    if (storedEmail) {
      this.profileForm.get('email')?.setValue(storedEmail);
    }
    if (storedProfileImage) {
      this.profileImage = storedProfileImage;
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.onStorageChange.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.onStorageChange.bind(this));
    }
  }

  onStorageChange(event: StorageEvent): void {
    if (event.key === 'profileImage') {
      this.profileImage = event.newValue ? event.newValue.replace(/['"]+/g, '') : '../../../../assets/profile_image.png';
    }
    if (event.key === 'username') {
      this.username = event.newValue ? event.newValue.replace(/['"]+/g, '') : '';
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Only JPG, JPEG, and PNG files are allowed';
        this.selectedFile = null;
      } else if (file.size > 4 * 1024 * 1024) {
        this.fileError = 'File size exceeds 4 MB';
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
        this.convertAndStoreProfileImage();
      }
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.updateProfileDetails();
    }
  }

  updateProfileDetails(): void {
    const formData = {
      username: this.profileForm.get('username')?.value,
      email: this.profileForm.get('email')?.value,
      profileImage: this.profileImage
    };

    if (formData.profileImage) {
      localStorage.setItem('profileImage', formData.profileImage);
    }

    this.studentService.adminupdateProfiledetails(formData).subscribe(
      (response: any) => {
        console.log('Profile details updated successfully', response);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('email', formData.email);
        this.toastr.success('Profile updated successfully');
        this.router.navigate(['/admin/home']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating profile details', error);
        // alert(`An error occurred while updating the profile: ${error.message}`);
        this.toastr.error('An error occurred while updating the profile');
      }
    );
  }

  convertAndStoreProfileImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        localStorage.setItem('profileImage', this.profileImage);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
