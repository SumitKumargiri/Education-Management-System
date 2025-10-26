import { Component } from '@angular/core';
// import { StudentsService } from '../../../services/students.service';
// import { Observable } from 'rxjs';
// import { Student } from '../../../types/student';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  // students!:Observable<Student[]>
  // students$!:Observable<Student[]>
  // studentService = inject(StudentsService);


  // ngOnInit(): void {
    // this.studentService.getStudents()
    // .subscribe(
    //   {
    //     next:(response)=>{
    //       console.log(response);
    //     },
    //     error:(err)=>{
    //       console.log(err);
    //     }
    //   }
    // )


  //   this.students$ = this.studentService.getStudents()
  // }

}
