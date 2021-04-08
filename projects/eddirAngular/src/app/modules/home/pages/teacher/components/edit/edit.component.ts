import { Teacher } from './../../../../../../shared/models/teacher';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'projects/eddirAngular/src/app/core/services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  fichier: any;
  teacher: Teacher;
  massar = null;
  img = null;

  tabGenre = [
    { id: "genre1", value: "male", display: "Homme", isChecked: false },
    { id: "genre2", value: "female", display: "Femme", isChecked: false }
  ];

  constructor(private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getOne();
  }

  fileEvent(e) {
    this.fichier = e.target.files[0];
    e.target.files[0].URL
  }

  getOne() {
    this.route.paramMap.subscribe(param => {
      this.teacherService.getOne(param.get('id'))
        .subscribe((params: any) => {
          this.teacher = params.data;
          (this.teacher.sexe == "Homme") ?
            this.teacher.sexe = "male" :
            this.teacher.sexe = "female";
          this.img = params.data.image;
          this.massar = params.data.massar;
        });
    });
  }

  onSubmit(formTeacher: NgForm) {
    if (formTeacher.valid) {
      formTeacher.value.image = this.fichier;
      var myFormData = new FormData();
      for (let key in formTeacher.value)
        myFormData.append(key, formTeacher.value[key]);
      this.teacherService.updateFile(this.teacher.id, myFormData)
        .subscribe((params: any) => {
          this.img = params.data.image;
          this.massar = params.data.massar;
        });
      this.flashMessage('success', 'Professeur a été modifiée avec succées');
      //return this.router.navigate(['/teachers']);
    }
    else
      this.flashMessage('error', 'Echec de modification de professeur');
    //console.log(this.fichier);
  }

  flashMessage(icon, title) {
    Swal.fire({
      position: 'top-end',
      icon: icon,
      title: title,
      timer: 3000
    })
  }

}
