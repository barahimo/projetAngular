import { element } from 'protractor';
import { ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import Swal from 'sweetalert2';
//import { jsPDF } from "jspdf";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

/* **************************** */

import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'projects/eddirAngular/src/app/core/services/teacher.service';
import { Teacher } from 'projects/eddirAngular/src/app/shared/models/teacher';
import { NgForm } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit, AfterViewInit {
  /* **************************** */
  @ViewChild(MdbTablePaginationComponent, { static: true }) teachersPagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = [
    'N',
    'Photo',
    'Massar',
    'Nom',
    'Prénom',
    'Genre',
    '',
  ];
  teachers: Teacher[];
  //profs: Teacher[];
  public static profs: Teacher[] = [];
  imagePath = "./../../../../../../../assets/images/oops.jpg";
  isChecked = false;
  isCheckedItems = false;
  arrayCheck = [];

  /* **************************** */
  constructor(private teacherService: TeacherService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    //this.getAll("");
    (IndexComponent.profs.length > 0) ? this.pagination(IndexComponent.profs) :
      this.get();
    console.warn("profs : " + IndexComponent.profs.length);
  }

  //   <input type="file" (change)="encodeImage(this)">
  // <button (click)="createPdf()">Create PDF</button>
  /* imgdata = null;
  encodeImage(image) {
    var img = image.files[0];
    var file = new FileReader();
    file.onloadend = () => {
      console.log(file.result);
      this.imgdata = file.result;
    }
    file.readAsDataURL(img);
  }

  createPdf() {
    var doc: any = new jsPDF();
    doc.addImage(this.imgdata, 15, 15);
    doc.save("image.pdf");
  } */

  print() {
    /* var img = "http://localhost:8000/storage/teachers/UqlkqVfGDKL7grz3gRVpoh8DXIEzijca6KNSk3zd.jpeg";
    let img = "salut";
    var doc: any = new jsPDF();
    doc.addImage(img, 15, 15);
    doc.save("image.pdf");

    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });*/


    const doc: any = new jsPDF()
    //doc.autoTable({ html: '#my-table' })
    let body = [];
    this.elements.forEach((item, index) => {
      let array = [];
      array.push(index + 1);
      array.push(item.image);
      array.push("<h1>" + item.massar + "</h1>");
      array.push(item.nom);
      array.push(item.prenom);
      array.push(item.sexe);
      body.push(array);
    })
    doc.autoTable({
      head: [['N', 'Photo', 'Massar', 'Nom', 'Prénom', 'Genre']],
      body: [
        ['1', '<img src="http://localhost:8000/storage/teachers/UqlkqVfGDKL7grz3gRVpoh8DXIEzijca6KNSk3zd.jpeg">', 'massar1', 'nom1', 'prenom1', 'male'],
        ['2', 'image2', 'massar2', 'nom2', 'prenom2', 'female'],
      ],
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 1) {
          var base64Img = 'data:image/jpeg;base64,iVBORw0KGgoAAAANS...'
          doc.addImage(base64Img, 'JPEG', data.cell.x + 2, data.cell.y + 2, 10, 10)
        }
      },
    })
    doc.save('table.pdf');
  }

  check(e) {
    let check = e.target.checked;
    (check) ? this.isChecked = true : this.isChecked = false;
    (check) ? this.arrayCheck = IndexComponent.profs : this.arrayCheck = [];
    //console.log("compt " + this.arrayCheck.length);
  }

  onCheck(e) {
    let check = e.target.checked;
    let value = e.target.value;
    let array = [];
    if (check) {
      array = this.arrayCheck;
      IndexComponent.profs.forEach(item => {
        if (item.id == value)
          array.push(item);
      });
    }
    else {
      this.arrayCheck.forEach(item => {
        if (item.id != value)
          array.push(item);
      });
    }
    this.arrayCheck = array;
    (this.arrayCheck.length == IndexComponent.profs.length) ? this.isCheckedItems = true : this.isCheckedItems = false;
    //console.log("compt " + this.arrayCheck.length);
  }

  onClear() {
    //console.log(this.arrayCheck.length);
    this.arrayCheck.forEach(element => {
      console.log(element.id);
      this.teacherService.delete(element).subscribe(() => {
        let arrays: Teacher[] = [];
        this.elements.forEach(item => {
          if (item.id != element.id)
            arrays.push(item);
        });
        this.pagination(arrays);
        IndexComponent.profs = arrays;
      });
    });

    // if (this.arrayCheck.length > 0) {
    //   Swal.fire({
    //     title: 'Confirmation',
    //     text: "êtes-vous sûr de supprimer cet élément",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Oui, supprimez-le !',
    //     cancelButtonText: 'Non, annulez !',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       this.arrayCheck.forEach(element => {
    //         this.teacherService.delete(element).subscribe(() => {
    //           let arrays: Teacher[] = [];
    //           this.elements.forEach(item => {
    //             if (item.id != element.id)
    //               arrays.push(item);
    //           });
    //           this.pagination(arrays);
    //           IndexComponent.profs = arrays;
    //         });
    //       });
    //     }
    //   })
    // }
  }

  onSearch(formSearch: NgForm) {
    //this.getAll(formSearch.value.search);
    let search = formSearch.value.search;
    if (search) {
      var requete = (str) => (str) ? str.toLowerCase().search(search.toLowerCase()) : -1
      let arrays: Teacher[] = [];
      IndexComponent.profs.forEach(item => {
        if (requete(item.nom) >= 0 ||
          requete(item.prenom) >= 0 ||
          requete(item.adresse) >= 0)
          arrays.push(item);
      });
      this.pagination(arrays);
    }
    else
      this.pagination(IndexComponent.profs);
  }

  tabTeachers = {
    table: [],
    sousTable: [],
    dim: 0
  };

  btnPage(i) {
    console.warn(this.tabTeachers.sousTable[i]);
  }
  get() {
    this.teacherService
      .getAll()
      .subscribe((params: any) => {
        if (params.data.length > 0) {
          this.tabTeachers.table = params.data;
          let n = 5;
          let dim = this.tabTeachers.table.length;
          let modulo = dim % n;
          this.tabTeachers.dim = dim / n;
          if (modulo != 0)
            this.tabTeachers.dim = parseInt((this.tabTeachers.dim) + "") + 1;
          for (let i = 0; i < this.tabTeachers.dim; i++) {
            let array = [];
            for (let index = 0; index < this.tabTeachers.table.length; index++) {
              const ele = this.tabTeachers.table[index];
              if (index >= n * i && index <= (n * (i + 1)) - 1)
                array.push(ele);
            }
            this.tabTeachers.sousTable.push(array)
          }
          console.warn('------------------------');
          console.warn(this.tabTeachers.table);
          console.warn('------------------------');
          console.warn(modulo);
          console.warn('------------------------');
          console.warn(this.tabTeachers.dim);
          console.warn('------------------------');
          IndexComponent.profs = params.data;
          this.pagination(IndexComponent.profs);
        }
      });
  }

  pagination(array) {
    this.elements = [];
    this.pushElements(array);
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  getAll($search) {
    this.elements = [];
    //
    this.teachers = [];
    //
    this.teacherService
      .getSearch($search)
      .subscribe((params: any) => {
        if (params.data.length > 0) {
          this.teachers = params.data;
          this.pushElements(this.teachers);
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        }
      });
  }

  pushElements(array: any[]) {
    for (let i = 0; i < array.length; i++)
      this.elements.push(this.myObject(array[i]));
  }

  myObject(item) {
    let headers = this.teacherService.getHeaders();
    let obj: Teacher = {};
    for (const [key, value] of Object.entries(headers))
      obj[value] = item[value];
    return obj;
  }

  ngAfterViewInit() {
    this.teachersPagination.setMaxVisibleItemsNumberTo(5);
    this.teachersPagination.calculateFirstItemIndex();
    this.teachersPagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  onDelete(obj) {
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
        this.teacherService.delete(obj).subscribe((param: any) => {
          //this.getAll("");
          /*let arrays: Teacher[] = [];
           this.elements.forEach(item => {
            if (item.id != obj.id)
              arrays.push(item);
          });
          IndexComponent.profs = arrays; 
          this.pagination(arrays);*/
          this.pagination(param.data);
          // Swal.fire(
          //   'Supprimé!',
          //   'le professeur a été bien supprimée.',
          //   'success'
          // )
        });
      }
    })
    //console.warn("obj : " + obj.id);
  }
}
