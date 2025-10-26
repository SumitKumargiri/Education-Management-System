import { Component, OnInit } from '@angular/core';
import { TeacherCourseSubject } from '../../types/student';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-stdsubject',
  templateUrl: './stdsubject.component.html',
  styleUrl: './stdsubject.component.css'
})
export class StdsubjectComponent implements OnInit{

  subjects: TeacherCourseSubject[] = [];
  uniqueSubjects: { departmentname: string, semester: number }[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.studentsService.getTeacherSubjectAssignments()
      .subscribe(data => {
        this.subjects = data;

        const uniqueSet = new Set(data.map(subject => JSON.stringify({
          departmentname: subject.departmentname,
          semester: subject.semester
        })));
        
        this.uniqueSubjects = Array.from(uniqueSet).map(item => JSON.parse(item));
      });
      };
  }
