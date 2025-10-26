import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentsService } from '../../services/students.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stdprofile',
  templateUrl: './stdprofile.component.html',
  styleUrls: ['./stdprofile.component.css']
})
export class StdprofileComponent implements OnInit, OnDestroy {
  username: string = '';
  profileForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;
  profileImage: string | null = null;

  constructor(private fb: FormBuilder, private studentService: StudentsService, private router: Router) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      districtcode: ['', Validators.required],
      districtname: ['', Validators.required],
      statecode: ['', Validators.required],
      statename: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      gender: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedUsername) {
      this.username = storedUsername.replace(/['"]+/g, '');
      this.profileForm.get('username')?.setValue(this.username);
      this.fetchStudentDetails();
    }

    if (storedEmail) {
      this.profileForm.get('email')?.setValue(storedEmail.replace(/['"]+/g, ''));
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

  fetchStudentDetails(): void {
    const requestData = { username: this.username, searchText: this.username };
    this.studentService.getStudents(requestData).subscribe(
      (response: any) => {
        console.log('API response:', response); // Log the full response for debugging

        if (response && response.lstModel) {
          const studentData = response.lstModel.find((student: any) => student.username === this.username);
          if (studentData) {
            this.profileForm.patchValue({
              firstname: studentData.firstname,
              lastname: studentData.lastname,
              email: studentData.email,
              districtcode: studentData.districtcode,
              districtname: studentData.districtname,
              statecode: studentData.statecode,
              statename: studentData.statename,
              mobile: studentData.mobile,
              gender: studentData.gender,
              status: studentData.status
            });

            // if (studentData.profileImage) {
            //   this.profileImage = studentData.profileImage;
            //   localStorage.setItem('profileImage', this.profileImage);
            // }
          } else {
            console.warn('No matching student found for username:', this.username);
          }
        } else {
          console.warn('Invalid API response:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching student details', error);
      }
    );
  }

  onStorageChange(event: StorageEvent): void {
    if (event.key === 'profileImage') {
      this.profileImage = event.newValue ? event.newValue.replace(/['"]+/g, '') : '../../../../assets/profile_image.png';
    }
    if (event.key === 'username') {
      this.username = event.newValue ? event.newValue.replace(/['"]+/g, '') : '';
      this.profileForm.get('username')?.setValue(this.username);
      this.fetchStudentDetails();
    }
    if (event.key === 'email') {
      const storedEmail = event.newValue ? event.newValue.replace(/['"]+/g, '') : '';
      this.profileForm.get('email')?.setValue(storedEmail);
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
      username: this.username,
      firstname: this.profileForm.get('firstname')?.value,
      lastname: this.profileForm.get('lastname')?.value,
      email: this.profileForm.get('email')?.value,
      districtcode: this.profileForm.get('districtcode')?.value,
      districtname: this.profileForm.get('districtname')?.value,
      statecode: this.profileForm.get('statecode')?.value,
      statename: this.profileForm.get('statename')?.value,
      mobile: this.profileForm.get('mobile')?.value,
      gender: this.profileForm.get('gender')?.value,
      profileImage: this.profileImage,
      status: this.profileForm.get('status')?.value,
      updateBy: new Date().toISOString()
    };

    if (formData.profileImage) {
      localStorage.setItem('profileImage', formData.profileImage);
    }

    this.studentService.updateProfile(formData).subscribe(
      (response: any) => {
        console.log('Profile details updated successfully', response);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('email', formData.email);
        alert('Profile updated successfully');
        this.router.navigate(['/student/studenthome']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating profile details', error);
        alert(`An error occurred while updating the profile: ${error.message}`);
      }
    );
  }

  convertAndStoreProfileImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result as string;
        if (this.profileImage) {
          localStorage.setItem('profileImage', this.profileImage);
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
