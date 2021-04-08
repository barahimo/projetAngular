import { Favorite } from 'projects/formuleAngular/src/app/shared/models/favorite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { President } from '../../shared/models/president';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PresidentService extends DataService {
  constructor(http: HttpClient) {
    super('presidents', http);
  }
  static president: President;
  static getMassarList: string[] = [];
  static massarCourant: string = "";
  presidents: President[];
  static pres: string;
  getOnePres(obj) {
    this.showFileJSON(obj).subscribe(data => PresidentService.president = data);
  }
  getMassar() {
    this.getFileJSON().subscribe((data: President[]) => {
      data.forEach(ele => {
        PresidentService.getMassarList.push(ele.massar)
      });
    });
  }
  getAllPres() {
    this.getFileJSON().subscribe(data => {
      data.forEach(element => {
        if (element.massar == "massar10@mail.com")
          PresidentService.pres = element.massar;
      });
      this.presidents = data;
      this.remplirListsFavorites();
      this.calculsComp();
      this.remplirComp();
    });
  }
  /****************** BEGIN GRAPHS ***************/
  listsFavorites: Favorite[] = [];
  labelsFavorites = [];
  listsCompts = [];
  static listsCompts2 = [];
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
  remplirComp() {
    this.listsFavorites.forEach((favorite: Favorite) => {
      this.listsCompts.push(favorite.comp.toString());
      PresidentService.listsCompts2.push(favorite.comp.toString());
    });
  }
  remplirLabelsFavorites() {
    this.favorites.forEach((item?, key?) => {
      this.labelsFavorites.push(item.value);
    });
  }
  remplirListsFavorites() {
    this.favorites.forEach((item?, key?) => {
      this.listsFavorites.push({
        'key': item.key,
        'value': item.value,
        'comp': 0
      });
    });
  }
  /****************** END GRAPHS ***************/
  genre = [
    'ذكر',
    'انثى',
  ];
  proffessions = [
    'الزراعة',
    'فقدان الشغل',
    'التقاعد',
    'الوظيفة العمومية',
    'الصيد',
    'العدول',
    'الأئمة',
    'الحرفة',
    'صاحب محل',
    'الشركة',
    'التعليم',
    'الشرطة والامن',
    'الهندسة',
    'تقني',
    'السياقة',
    'مهنة حرة',
    'بدون عمل',
  ];
  niveaux = [
    'السلك الابتدائي',
    'السلك الاعدادي',
    'السلك الثانوي',
    'التعليم العالي',
    'محاربة الامية',
    'المسجد',
    'بدون',
  ];
  gerant = [
    'الأب',
    'الأم',
    'شخص آخر',
  ];
  orphelin = [
    'الأب',
    'الأم',
  ];
  zone = [
    'حضري',
    'قروي',
  ];
  typeResidence = [
    'صلب',
    'صفيح',
    'خيمة',
  ];
  chambre = [
    'فردية',
    'مشتركة',
  ];
  primaire = [
    'حضانة',
    'المسجد',
    'الروض',
  ];
  besoins = [
    'الماء',
    'الكهرباء',
    'المرافق الصحية',
    'شبكة الهاتف',
    'التلفاز',
    'الهاتف الذكي',
    'الحاسوب',
    'شبكة الانترنت',
  ];
  favorites = [
    { key: 'is', value: 'التربية الإسلامية' },
    { key: 'ar', value: 'اللغة العربية' },
    { key: 'fr', value: 'اللغة الفرنسية' },
    { key: 'an', value: 'اللغة الانجليزية' },
    { key: 'hg', value: 'الاجتماعيات' },
    { key: 'mt', value: 'الرياضيات' },
    { key: 'svt', value: 'علوم الحياة والأرض' },
    { key: 'pc', value: 'الفزياء والكيمياء' },
    { key: 'tech', value: 'التكنولوجيا' },
    { key: 'inf', value: 'المعلوميات' },
    { key: 'sp', value: 'التربية البدنية' }
  ];
  santes = [
    { key: 'parties', value: 'سلامة الأطراف', isSante: true },
    { key: 'vue', value: 'سلامة البصر', isSante: true },
    { key: 'audience', value: 'سلامة السمع', isSante: true },
    { key: 'prononciation', value: 'سلامة النطق', isSante: true },
  ];
  patternNumberPhone = "^((\\+212-?)|0)?[0-9]{9}$";
  todayDate: string = new Date().toISOString().slice(0, 10);
}
