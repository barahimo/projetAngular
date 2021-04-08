import { President } from 'projects/formuleAngular/src/app/shared/models/president';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresidentService } from '../../../../../../core/services/president.service';
//import { jsPDF } from "jspdf";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  president: President;
  srcImg: string = "./../../../../../../assets/images/imageNotFound.jpg";
  constructor(
    private presidentService: PresidentService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.route.paramMap.subscribe(param => {
      this.presidentService.showFileJSON(param.get('id'))
        .subscribe((params: any) => {
          this.president = params;
          /* ************* || ****************/
          if ((params.image) && (params.image).search('presidents') != -1)
            this.srcImg = this.presidentService.url + "/storage/" + params.image;
          /* ************* || ****************/

        });
    });
  }
  getFavorites() {
    let favorites = [];
    this.presidentService.favorites.forEach(item1 => {
      this.president.favorites.forEach(item2 => {
        if (item1.key == item2)
          favorites.push(item1.value);
      })
    });
    return favorites;
  }

  test() {
  }

}
