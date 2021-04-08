import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { StudentService } from 'projects/eddirAngular/src/app/core/services/student.service';
import { Student } from 'projects/eddirAngular/src/app/shared/models/Student';
;
import { jsPDF } from "jspdf";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  /* **************************** */
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = ['Numéro', 'Massar', 'Nom', 'Prénom', 'Sexe', 'Edit', 'Delete'];
  /* **************************** */
  students: Student[];
  public static tables = [];
  imagePath = "./../../../../../../../assets/images/waiting-icon-gif-1.jpg";

  /* **************************** */

  constructor(private studentService: StudentService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (IndexComponent.tables.length > 0) {
      this.pagination(IndexComponent.tables);
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    }
    else
      this.getAll();
  }

  print() {
    const doc: any = new jsPDF()
    //doc.autoTable({ html: '#my-table' })
    let body = [];
    IndexComponent.tables.forEach((item, index) => {
      let array = [];
      array.push(index + 1);
      array.push(item.massar);
      array.push(item.nom);
      array.push(item.prenom);
      array.push(item.sexe);
      body.push(array);
    })
    doc.autoTable({
      head: [['N', 'Massar', 'Nom', 'Prénom', 'Genre',]],
      body: body
    })
    doc.save('table.pdf')
  }

  getAll() {
    this.studentService.getAll().subscribe((params: any) => {
      this.students = params.data;
      IndexComponent.tables = params.data;
      this.pagination(this.students);
      /* ******** Bouttons de navigation ******************** */
      this.mdbTable.setDataSource(this.elements);
      this.elements = this.mdbTable.getDataSource();
      this.previous = this.mdbTable.getDataSource();
    });
  }

  pagination(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      this.elements.push({
        numero: (i + 1).toString(),
        id: array[i].id,
        massar: array[i].massar,
        nom: array[i].nom,
        prenom: array[i].prenom,
        sexe: array[i].sexe,
        edit: 'Edit',
        delete: 'Delete'
      });
    }
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }
}
