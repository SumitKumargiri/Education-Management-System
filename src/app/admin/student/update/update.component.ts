import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  formData = {
    id:null,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    districtname: '',
    districtcode: '',
    statename: '',
    statecode: '',
    mobile: '',
    gender: ''
  };
  successMessageVisible: boolean | undefined;
  errorMessageVisible: boolean | undefined;


  constructor(private http: HttpClient, private route: ActivatedRoute, private router:Router,private toastr: ToastrService) {
    this.route.params.subscribe(params => {
      this.formData.id = params['id']; 
    });
  }

  onSubmit(): void {
    this.http.put<any>('https://localhost:7166/Student/updatebyid'+ this.formData.id, this.formData)
      .subscribe(
        response => {
          console.log('Data updated successfully:', response);
          this.toastr.success('Data Updated successfully');
          this.successMessageVisible = true;
          setTimeout(() => {
            this.successMessageVisible = false;
          }, 3000);
          this.resetForm();
          this.router.navigate(['/admin/student/list']);
        },
        error => {
          console.error('Error updating data:', error);
          this.toastr.error('Error Updated data');
        }
      );
  }

  cancelUpdate(): void {
    // Implement cancel update logic, e.g., navigate back to list
  }
  resetForm(): void {
    this.formData = {
      id:null,
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      districtname: '',
      districtcode: '',
      statename: '',
      statecode: '',
      mobile: '',
      gender: ''
      
    };
  }
}






