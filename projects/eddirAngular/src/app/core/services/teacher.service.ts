import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndexComponent } from 'projects/eddirAngular/src/app/modules/home/pages/teacher/components/index/index.component';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends DataService {

  constructor(http: HttpClient) {
    super('teachers', http);
  }

  getHeaders() {
    return {
      0: 'id',
      1: 'image',
      2: 'massar',
      3: 'nom',
      4: 'prenom',
      5: 'sexe',
      6: 'dateAffectation',
      7: 'adresse',
    }
  }
}
