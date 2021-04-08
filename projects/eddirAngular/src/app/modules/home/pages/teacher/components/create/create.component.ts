import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TeacherService } from 'projects/eddirAngular/src/app/core/services/teacher.service';
import { Teacher } from 'projects/eddirAngular/src/app/shared/models/teacher';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  fichier: any;
  teacher: Teacher = {
    nom: null,
    prenom: null,
    sexe: 'male',
    dateAffectation: null,
    adresse: null,
    massar: null,
    image: null,
  };

  tabGenre = [
    { id: "genre1", value: "male", display: "Homme" },
    { id: "genre2", value: "female", display: "Femme" }
  ];

  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit(): void {
  }

  fileEvent(e) {
    this.fichier = e.target.files[0];
  }

  onSubmit(formTeacher: NgForm) {
    if (formTeacher.valid) {
      var myFormData = new FormData();
      formTeacher.value.image = this.fichier;
      for (let key in formTeacher.value)
        myFormData.append(key, formTeacher.value[key]);
      this.teacherService.createFile(myFormData).subscribe();
      this.flashMessage('success', 'Professeur ajoutée avec succées')
      formTeacher.reset();
      return this.router.navigate(['/teachers']);
    }
    else
      this.flashMessage('error', 'Echec d\'ajout le professeur');
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
