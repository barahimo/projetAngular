import { PresidentService } from './../../../../../../core/services/president.service';

import { Component, OnInit } from '@angular/core';
import { Favorite } from 'projects/formuleAngular/src/app/shared/models/favorite';
import { President } from 'projects/formuleAngular/src/app/shared/models/president';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  constructor(private presidentService: PresidentService) {
    console.log(this.chartDatasets);

  }
  ngOnInit(): void {
    this.remplirLabelsFavorites();
    this.getAllPres();
  }
  presidents: President[];
  getAllPres() {
    this.presidentService.getFileJSON().subscribe(data => {
      this.presidents = data;
      this.remplirListsFavorites();
      this.calculsComp();
      this.remplirComp();
      this.remplirChartDatasets();
      this.remplirChartColors();
    });
  }
  /****************** BEGIN GRAPHS ***************/
  labelsFavorites = [];
  remplirLabelsFavorites() {
    this.presidentService.favorites.forEach((item?, key?) => {
      this.labelsFavorites.push(item.value);
    });
  }
  listsFavorites: Favorite[] = [];
  calculsComp() {
    this.listsFavorites.filter((favorite: Favorite) => favorite.comp = 0);
    this.presidents.forEach(president => {
      this.listsFavorites.forEach((favorite: Favorite) => {
        if (president.favorites.includes(favorite.key)) {
          favorite.comp++;
        }
      });
    })
  }
  listsCompts = [];
  remplirComp() {
    this.listsFavorites.forEach((favorite: Favorite) => {
      this.listsCompts.push(favorite.comp.toString());
    });
    console.log(this.listsCompts);
  }
  remplirListsFavorites() {
    this.presidentService.favorites.forEach((item?, key?) => {
      this.listsFavorites.push({
        'key': item.key,
        'value': item.value,
        'comp': 0
      });
    });
  }
  /****************** END GRAPHS ***************/
  // TEST CHARTS 
  // *********************************************************
  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [
    {
      data: [],
      label: 'المواد المفضلة'
    },
  ];
  remplirChartDatasets() {
    this.listsCompts.forEach(item => this.chartDatasets[0].data.push(item));
  }

  public chartLabels: Array<any> = this.labelsFavorites;


  public chartColors: Array<any> = [
    {
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
    }
  ];
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  remplirChartColors() {
    this.listsCompts.forEach(() => {
      this.chartColors[0].backgroundColor.push(this.getRandomColor());
      this.chartColors[0].borderColor.push('#000');
    })
  }

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  // END CHARTS

  test1() {
    this.remplirChartColors();
  }
  test2() {
    console.log(this.chartDatasets);
  }
}
