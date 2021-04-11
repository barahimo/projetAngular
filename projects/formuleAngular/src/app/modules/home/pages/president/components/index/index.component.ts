import { PresidentService } from 'projects/formuleAngular/src/app/core/services/president.service';
import { Component, OnInit } from '@angular/core';
import { President } from 'projects/formuleAngular/src/app/shared/models/president';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  api = this.presidentService.api;
  dir = true;
  translateFR() {
    this.translate.use('fr');
    this.dir = true;
  }
  translateAR() {
    this.translate.use('ar');
    this.dir = false;
  }
  param = { value: 'world' };
  params = { value1: 'VALEUR1', value2: 'VALEUR4', value3: 'VALEUR3' };
  keysPanel = [
    "panelPersonel",
    "panelPere",
    "panelMere",
    "panelSocial",
    "panelResidence",
    "panelBesoins",
    "panelFavorites",
    "panelMalades",
    "panelRemarques",
  ];
  panelHeaders = {
    panelPersonel: { header: "معلومات شخصية", color: "text-white", active: true },
    panelPere: { header: "معلومات الاب", color: "text-dark", active: false },
    panelMere: { header: "معلومات الام", color: "text-dark", active: false },
    panelSocial: { header: "معلومات اجتماعية", color: "text-dark", active: false },
    panelResidence: { header: "معلومات حول السكن", color: "text-dark", active: false },
    panelBesoins: { header: "الحاجيات", color: "text-dark", active: false },
    panelFavorites: { header: "المواد المفضلة", color: "text-dark", active: false },
    panelMalades: { header: "الامراض", color: "text-dark", active: false },
    panelRemarques: { header: "ملاحظات", color: "text-dark", active: false },
  };
  tableHeaders = [
    "#",
    "مسار",
    "الاسم العائلي",
    "الاسم الشخصي",
    "تاريخ الازدياد",
    "النوع",
    // "يتيم",
    // "الحاجيات",
    // "الامراض",
    "",
    "",
  ];
  lengthHeader = this.tableHeaders.length;
  presidents: President[] = [];
  sousPresidents: President[];
  pagesPresidents = { dim: 10, tables: [], nbPage: 0 };
  tableSearch: President[] = [];
  orphelin = this.presidentService.orphelin;
  besoins = this.presidentService.besoins;

  constructor(
    private presidentService: PresidentService,
    private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('fr');
  }

  ngOnInit(): void {
    if(PresidentService.staticPresidents.length == 0)
      this.get();
    else
      this.pagination(PresidentService.staticPresidents);
  }

  get() {
    this.presidentService.getFileJSON().subscribe(data => {
    console.log("Length2 : "+PresidentService.staticPresidents.length);
      this.presidents = data;
      PresidentService.staticPresidents = data;
      this.pagination(data);
    });
  }

  pagination(table) {
    this.pagesPresidents.tables = [];
    let dim = this.pagesPresidents.dim;
    let length = table.length;
    let modulo = length % dim;
    this.pagesPresidents.nbPage = length / dim;
    if (modulo != 0)
      this.pagesPresidents.nbPage = parseInt((this.pagesPresidents.nbPage) + "") + 1;
    for (let i = 0; i < this.pagesPresidents.nbPage; i++) {
      let array = [];
      for (let index = 0; index < table.length; index++) {
        const ele = table[index];
        if (index >= dim * i && index <= (dim * (i + 1)) - 1)
          array.push(ele);
      }
      this.pagesPresidents.tables.push(array);
    }
    this.sousPresidents = this.pagesPresidents.tables[0];
  }

  tablePage(i) {
    this.sousPresidents = this.pagesPresidents.tables[i];
  }

  dataSearch = [];
  dataResult(key, array) {
    function differenceOf2Arrays(array1, array2) {
      const temp = [];
      for (var i in array1)
        if (!array2.includes(array1[i])) temp.push(array1[i]);
      for (var i in array2)
        if (!array1.includes(array2[i])) temp.push(array2[i]);
      return temp.sort((a, b) => a - b);
    }
    PresidentService.staticPresidents.forEach((item: President) => {
      (differenceOf2Arrays(item[key], array).length == 0) ?
        this.tableSearch.push(item) :
        this.tableSearch = this.tableSearch.filter(txt => txt != item);
    });
    this.tableSearch = this.tableSearch.filter((v, i, a) => a.indexOf(v) === i);
    this.tableSearch = this.tableSearch.sort((a, b) => a.id - b.id);
    this.pagination(this.tableSearch);
  }
  //
  // Orphelin
  //
  isOrphelin = true;
  checkOrphelin(e: any, texte: string) {
    (e.target.checked) ?
      this.dataSearch.push(texte) :
      this.dataSearch = this.dataSearch.filter(txt => txt != texte);
    this.dataResult("orphelin", this.dataSearch);
  }
  panelOrphelin() {
    this.tableSearch = [];
    this.dataSearch = [];
    this.isOrphelin = !this.isOrphelin;
    if (this.isOrphelin)
      this.pagination(PresidentService.staticPresidents);
    else
      this.dataResult("orphelin", this.dataSearch);
  }
  //
  // Besoins
  //
  isBesoins = true;
  checkBesoins(e: any, texte: string) {
    PresidentService.staticPresidents.forEach((item: President) => {
      let besoins = item.besoins;
      if (besoins.includes(texte))
        (e.target.checked) ? this.tableSearch.push(item) : this.tableSearch = this.tableSearch.filter(txt => txt != item);
    });
    this.tableSearch = this.tableSearch.filter((v, i, a) => a.indexOf(v) === i);
    this.tableSearch = this.tableSearch.sort((a, b) => a.id - b.id);
    this.pagination(this.tableSearch);
  }
  panelBesoins() {
    this.tableSearch = [];
    this.isBesoins = !this.isBesoins;
    if (this.isBesoins)
      this.pagination(PresidentService.staticPresidents);
  }
  isSearch = true;
  panelSearch() {
    this.isSearch = !this.isSearch;
    this.isOrphelin = true;
    this.isBesoins = true;
    if (this.isSearch)
      this.pagination(PresidentService.staticPresidents);
  }
  onDelete(item) {
    Swal.fire({
      title: 'Confirmation',
      text: "êtes-vous sûr de supprimer cet élément",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, annulez !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.presidentService.deleteFileJSON(item).subscribe(() => {
          this.get();
          Swal.fire(
            'Supprimé!',
            'L\'élèment a été bien supprimée.',
            'success'
          )
        });
      }
    })
  }
  test() {

  }
}
