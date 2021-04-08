import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'projects/eddirAngular/src/app/core/services/teacher.service';
import { Teacher } from 'projects/eddirAngular/src/app/shared/models/teacher';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  teacher: Teacher;
  teachers: Teacher;
  president;
  constructor(private teacherService: TeacherService, private route: ActivatedRoute) {
    console.warn("tables in show : " + IndexComponent.profs.length);

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.teacherService.getOne(param.get('id'))
        .subscribe((params: Teacher) => {
          this.teacher = params;
        });
    });
    this.show();
  }

  show() {
    this.teacherService.showFileJSON("11")
      .subscribe(data => this.president = data);
  }
}
