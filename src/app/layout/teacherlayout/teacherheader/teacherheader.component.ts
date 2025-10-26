import { Component } from '@angular/core';
import { StudentsService } from '../../../services/students.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacherheader',
  templateUrl: './teacherheader.component.html',
  styleUrl: './teacherheader.component.css'
})
export class TeacherheaderComponent {


  username: string = '';
  profileImage: string = '../../../../assets/profile_image.png';
  isPanelOpen: boolean = false;

  constructor(private studentService: StudentsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // const storedUsername = localStorage.getItem('username');
    // if (storedUsername) {
    //   this.username = storedUsername.replace(/['"]+/g, '');
    // }

    // const storedProfileImage = localStorage.getItem('profileImage');
    // if (storedProfileImage) {
    //   this.profileImage = storedProfileImage.replace(/['"]+/g, '');
    // }
  }

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  onUploadImage() {
    console.log('Upload Image clicked');
    this.isPanelOpen = true;
  }

  onLogout() {
    console.log('Logout clicked');
    this.isPanelOpen = true;
  }

  onProfileImageSelected(event: any) {
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const profileImage = reader.result as string;
    //     this.profileImage = profileImage;
    //     localStorage.setItem('profileImage', profileImage);
    //     this.studentService.adminupdateProfileImage(this.username, profileImage).subscribe(
    //       (response: any) => {
    //         console.log('Profile image updated successfully', response);
    //         this.toastr.success('Image uploaded successfully');
    //       },
    //       (error: any) => {
    //         console.error('Error updating profile image', error);
    //         this.toastr.error('Image upload error');
    //       }
    //     );
    //   };
    //   reader.readAsDataURL(file);
    // }
  }
}
