import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'projects/eddirAngular/src/app/core/services/student.service';
import { Student } from 'projects/eddirAngular/src/app/shared/models/Student';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  student: Student;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(param1 => {
        this.studentService.getOne(param1.get('id'))
          .subscribe((param2: any) => {
            this.student = param2.data;
            console.log(this.student);
          });
      });
  }
}
