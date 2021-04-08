import { MassarValidator } from './../../../../../../core/validators/massar.validator';
import { PresidentService } from 'projects/formuleAngular/src/app/core/services/president.service';
import { President } from './../../../../../../shared/models/president';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  srcImg: string = "./../../../../../../assets/images/imageNotFound.jpg";

  testForm: FormGroup = new FormGroup({
    "username": new FormControl('', [Validators.required, MassarValidator.uniqueMassar]),
    "name": new FormControl('', [this.espace])
  });
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
  panel = {
    panelPersonel: false,//1
    panelPere: true,//2
    panelMere: true,//3
    panelSocial: true,//4
    panelResidence: true,//5
    panelBesoins: true,//6
    panelFavorites: true,//7
    panelMalades: true,//8
    panelRemarques: true,//9
  }
  onPanel(ele1, ele2) {
    this.panel[ele1] = true;
    this.panel[ele2] = false;
    this.panelHeaders[ele1].color = "text-dark";
    this.panelHeaders[ele2].color = "text-white";
    this.panelHeaders[ele1].active = false;
    this.panelHeaders[ele2].active = true;
  }
  txtMalade = "";
  isMalade = true;
  isOrphelin = true;
  isPrimaire = true;
  listBoolean = [
    { key: true, value: 'نعم' },
    { key: false, value: 'لا' },
  ];
  genre = this.presidentService.genre;
  proffessions = this.presidentService.proffessions;
  niveaux = this.presidentService.niveaux;
  gerant = this.presidentService.gerant;
  getOrphelin: string[] = [];
  orphelin = this.presidentService.orphelin;
  zone = this.presidentService.zone;
  typeResidence = this.presidentService.typeResidence;
  chambre = this.presidentService.chambre;
  getPrimaire = [];
  primaire = this.presidentService.primaire;
  getBesoins = [];
  besoins = this.presidentService.besoins;
  getFavorites: string[] = [];
  favorites = this.presidentService.favorites;
  santes = this.presidentService.santes;
  presidents: President[] = [];
  static listMassar: string[] = [];
  president: President = {};
  //myForm: FormGroup;
  myForm: FormGroup = new FormGroup({
    "panelPersonel": this.fb.group({
      "image": new FormControl(""),
      "massar": new FormControl("", [Validators.required, Validators.email, MassarValidator.uniqueMassarEdit]),
      "nom": new FormControl("", Validators.required),
      "prenom": new FormControl("", Validators.required),
      "genre": new FormControl(""),
      "dateNaissance": new FormControl("", Validators.required),
    }),
    "panelPere": this.fb.group({
      "nomPere": new FormControl("", Validators.required),
      "prenomPere": new FormControl("", Validators.required),
      "proffessionPere": new FormControl(""),
      "niveauPere": new FormControl("")
    }),
    "panelMere": this.fb.group({
      "nomMere": new FormControl("", Validators.required),
      "prenomMere": new FormControl("", Validators.required),
      "proffessionMere": new FormControl(""),
      "niveauMere": new FormControl("")
    }),
    "panelSocial": this.fb.group({
      "nbFreres": new FormControl(""),
      "triFreres": new FormControl(""),
      "telephone": new FormControl("", Validators.pattern(this.presidentService.patternNumberPhone)),
      "gerant": new FormControl(""),
      "orphelin": new FormControl(""),
      "divorce": new FormControl(""),
    }),
    "panelResidence": this.fb.group({
      "zone": new FormControl(""),
      "typeResidence": new FormControl(""),
      "chambre": new FormControl(""),
      "primaire": new FormControl(""),
      "adresse": new FormControl("", Validators.required),
      "distance": new FormControl(""),
    }),
    "panelBesoins": this.fb.group({
      "besoins": new FormControl(""),
    }),
    "panelFavorites": this.fb.group({
      "favorites": new FormControl(""),
    }),
    "panelMalades": this.fb.group({
      "santes": new FormControl(""),
      "malades": new FormControl(""),
      "txtMalade": new FormControl({ value: '', disabled: true }),
    }),
    "panelRemarques": this.fb.group({
      "remarques": new FormControl(""),
    }),
  });
  constructor(
    private presidentService: PresidentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.getOne();
    this.presidentService.getMassar();
    // console.log(PresidentService.massarCourant);
  }
  getOne() {
    this.route.paramMap.subscribe(param => {
      // this.presidentService.getOnePres(param.get('id'));
      this.presidentService.showFileJSON(param.get('id'))
        .subscribe((params) => {
          this.president = params;
          /* ************* || ****************/
          if ((params.image) && (params.image).search('presidents') != -1)
            this.srcImg = this.presidentService.url + "/storage/" + params.image;
          /* ************* || ****************/
          this.resetFormGroup();
          /* ************** [MassarCourant] ***************** */
          PresidentService.massarCourant = this.president.massar;
        });
    });
  }
  resetFormGroup() {
    //image
    this.getFormGroup('panelPersonel', 'image').setValue(this.president.image);
    //Massar
    this.getFormGroup('panelPersonel', 'massar').setValue(this.president.massar);
    //Nom
    this.getFormGroup('panelPersonel', 'nom').setValue(this.president.nom);
    //Prenom
    this.getFormGroup('panelPersonel', 'prenom').setValue(this.president.prenom);
    //Genre
    this.getFormGroup('panelPersonel', 'genre').setValue(this.president.genre);
    //dateNaissance
    this.getFormGroup('panelPersonel', 'dateNaissance').setValue(this.president.dateNaissance);
    //Pere
    this.getFormGroup('panelPere', 'nomPere').setValue(this.president.pere.nomPere);
    this.getFormGroup('panelPere', 'prenomPere').setValue(this.president.pere.prenomPere);
    this.getFormGroup('panelPere', 'proffessionPere').setValue(this.president.pere.proffessionPere);
    this.getFormGroup('panelPere', 'niveauPere').setValue(this.president.pere.niveauPere);
    //Mere
    this.getFormGroup('panelMere', 'nomMere').setValue(this.president.mere.nomMere);
    this.getFormGroup('panelMere', 'prenomMere').setValue(this.president.mere.prenomMere);
    this.getFormGroup('panelMere', 'proffessionMere').setValue(this.president.mere.proffessionMere);
    this.getFormGroup('panelMere', 'niveauMere').setValue(this.president.mere.niveauMere);
    //nbFreres
    this.getFormGroup('panelSocial', 'nbFreres').setValue(this.president.nbFreres);
    //triFreres
    this.getFormGroup('panelSocial', 'triFreres').setValue(this.president.triFreres);
    //adresse
    this.getFormGroup('panelResidence', 'adresse').setValue(this.president.adresse);
    //distance
    this.getFormGroup('panelResidence', 'distance').setValue(this.president.distance);
    //telephone
    this.getFormGroup('panelSocial', 'telephone').setValue(this.president.telephone);
    //gerant
    this.getFormGroup('panelSocial', 'gerant').setValue(this.president.gerant);
    //divorce
    this.getFormGroup('panelSocial', 'divorce').setValue(this.president.divorce);
    //zone
    this.getFormGroup('panelResidence', 'zone').setValue(this.president.zone);
    //typeResidence
    this.getFormGroup('panelResidence', 'typeResidence').setValue(this.president.typeResidence);
    //chambre
    this.getFormGroup('panelResidence', 'chambre').setValue(this.president.chambre);
    //remarques
    this.getFormGroup('panelRemarques', 'remarques').setValue(this.president.remarques);
    //Orphelin
    if (this.president.orphelin.length > 0) {
      this.isOrphelin = false;
      this.president.orphelin
        .forEach(item => this.getOrphelin.push(item));
    }
    //Primaire
    if (this.president.primaire.length > 0) {
      this.isPrimaire = false;
      this.president.primaire
        .forEach(item => this.getPrimaire.push(item));
    }
    //Besoins
    if (this.president.besoins.length > 0) {
      this.president.besoins
        .forEach(item => this.getBesoins.push(item));
    }
    //Favorites
    if (this.president.favorites.length > 0) {
      this.president.favorites
        .forEach(item => this.getFavorites.push(item));
    }
    //Santes
    this.president.santes.forEach((item, key) => {
      this.santes[key].key = item.key;
      this.santes[key].value = item.value;
      this.santes[key].isSante = item.isSante;
    });
    //Malades
    let valTrue = this.listBoolean.filter(param => param.key == true);
    let valFalse = this.listBoolean.filter(param => param.key == false);
    if (this.president.malades != valFalse[0].value)
      this.isMalade = false;
    (this.isMalade) ? this.getFormGroup('panelMalades', 'txtMalade').disable() : this.getFormGroup('panelMalades', 'txtMalade').enable();
    (this.isMalade) ? this.getFormGroup('panelMalades', 'malades').setValue(valFalse[0].value) : this.getFormGroup('panelMalades', 'malades').setValue(valTrue[0].value);
    if (!this.isMalade) {
      this.getFormGroup('panelMalades', 'txtMalade').setValue(this.president.malades);
    }
  }

  checkOrphelin(e: any, item: string) {
    (e.target.checked) ? this.getOrphelin.push(item) :
      this.getOrphelin = this.getOrphelin.filter(param => param != item);
  }
  checkPrimaire(e: any, item: string) {
    (e.target.checked) ? this.getPrimaire.push(item) :
      this.getPrimaire = this.getPrimaire.filter(param => param != item);
  }
  checkFavorites(e: any, item: string) {
    (e.target.checked) ? this.getFavorites.push(item) :
      this.getFavorites = this.getFavorites.filter(param => param != item);
  }
  checkSantes(obj: any, bool: boolean) {
    let index = this.santes.indexOf(obj);
    let val = this.santes[index];
    val.isSante = bool;
  }
  checkBesoins(besoin: string, bool: boolean) {
    (bool) ? this.getBesoins.push(besoin) :
      this.getBesoins = this.getBesoins.filter(param => param != besoin);
  }
  checkMalade() {
    this.isMalade = !this.isMalade;
    (this.isMalade) ? this.getFormGroup('panelMalades', 'txtMalade').disable() : this.getFormGroup('panelMalades', 'txtMalade').enable();
    if (this.isMalade)
      this.getFormGroup('panelMalades', 'txtMalade').setValue('');
  }
  /* ************* || ****************/
  fichier: any = "";
  fileEvent(e) {
    this.fichier = e.target.files[0];
  }
  /****************|| *******************/
  listsFormData(lists) {
    let txt = '';
    txt += `[`;
    lists.forEach((item, key) => {
      txt += `"${item}"`;
      if (key != (lists.length - 1)) txt += `,`;
    });
    txt += `]`;
    return txt;
  }
  listsFormDataSantes(lists) {
    let txt = '';
    txt += `[`;
    lists.forEach((item, key) => {
      txt += `{ "key": "${item.key}", "value": "${item.value}", "isSante": ${item.isSante} }`;
      if (key != (lists.length - 1)) txt += `,`;
    });
    txt += `]`;
    return txt;
  }
  listsFormDataParent(lists, parent) {
    let txt = '';
    if (parent == "pere")
      txt += `{"nomPere": "${lists.nomPere}", "niveauPere": "${lists.niveauPere}", "prenomPere": "${lists.prenomPere}", "proffessionPere": "${lists.proffessionPere}"}`;
    if (parent == "mere")
      txt += `{"nomMere": "${lists.nomMere}", "niveauMere": "${lists.niveauMere}", "prenomMere": "${lists.prenomMere}", "proffessionMere": "${lists.proffessionMere}"}`;
    return txt;
  }
  /* ************* || ****************/
  onSubmit() {
    // if (this.myForm.valid) {
    this.presidentReactiveForm();
    // this.presidentService.updateFileJSON(this.president.id, this.president).subscribe((data) => {
    /* ************* || ****************/
    var myFormData = new FormData();
    console.log("*********");
    myFormData.append("image", this.fichier);
    myFormData.append("massar", this.president.massar);
    myFormData.append("nom", this.president.nom);
    myFormData.append("prenom", this.president.prenom);
    myFormData.append("genre", this.president.genre);
    myFormData.append("dateNaissance", this.president.dateNaissance);
    myFormData.append("pere", this.listsFormDataParent(this.president.pere, "pere"));
    myFormData.append("mere", this.listsFormDataParent(this.president.mere, "mere"));
    myFormData.append("nbFreres", this.president.nbFreres);
    myFormData.append("triFreres", this.president.triFreres);
    myFormData.append("adresse", this.president.adresse);
    myFormData.append("distance", this.president.distance);
    myFormData.append("telephone", this.president.telephone);
    myFormData.append("gerant", this.president.gerant);
    myFormData.append("divorce", this.president.divorce);
    myFormData.append("zone", this.president.zone);
    myFormData.append("typeResidence", this.president.typeResidence);
    myFormData.append("chambre", this.president.chambre);
    myFormData.append("remarques", this.president.remarques);
    myFormData.append("orphelin", this.listsFormData(this.president.orphelin));
    myFormData.append("primaire", this.listsFormData(this.president.primaire));
    myFormData.append("besoins", this.listsFormData(this.president.besoins));
    myFormData.append("favorites", this.listsFormData(this.president.favorites));
    myFormData.append("santes", this.listsFormDataSantes(this.president.santes));
    myFormData.append("malades", this.president.malades);
    console.log("*********");
    /* ************* || ****************/
    this.presidentService.updateFileJSON2(this.president.id, myFormData).subscribe((data) => {
      // console.log(data);
      // this.flashMessage('success', 'President modifiée avec succées')
      // return this.router.navigate(['/presidents']);
    });
    // }
    // else
    //   this.flashMessage('error', 'Echec d\'ajout le president');
  }
  presidentReactiveForm() {
    //image
    //this.president.image = this.getFormGroup('panelPersonel', 'image').value;
    //Massar
    this.president.massar = this.getFormGroup('panelPersonel', 'massar').value;
    //Nom
    this.president.nom = this.getFormGroup('panelPersonel', 'nom').value;
    //Prenom
    this.president.prenom = this.getFormGroup('panelPersonel', 'prenom').value;
    //Genre
    this.president.genre = this.getFormGroup('panelPersonel', 'genre').value;
    //dateNaissance
    this.president.dateNaissance = this.getFormGroup('panelPersonel', 'dateNaissance').value;
    //Pere
    this.president.pere = {
      nomPere: this.getFormGroup('panelPere', 'nomPere').value,
      prenomPere: this.getFormGroup('panelPere', 'prenomPere').value,
      proffessionPere: this.getFormGroup('panelPere', 'proffessionPere').value,
      niveauPere: this.getFormGroup('panelPere', 'niveauPere').value
    }
    //proffessionPere
    if (!this.president.pere.proffessionPere || this.president.pere.proffessionPere == "")
      this.president.pere.proffessionPere = "بدون عمل";
    //niveauPere
    if (!this.president.pere.niveauPere || this.president.pere.niveauPere == "")
      this.president.pere.niveauPere = "بدون";
    //Mere
    this.president.mere = {
      nomMere: this.getFormGroup('panelMere', 'nomMere').value,
      prenomMere: this.getFormGroup('panelMere', 'prenomMere').value,
      proffessionMere: this.getFormGroup('panelMere', 'proffessionMere').value,
      niveauMere: this.getFormGroup('panelMere', 'niveauMere').value
    }
    //proffessionMere
    if (!this.president.mere.proffessionMere || this.president.mere.proffessionMere == "")
      this.president.mere.proffessionMere = "بدون عمل";
    //niveauMere
    if (!this.president.mere.niveauMere || this.president.mere.niveauMere == "")
      this.president.mere.niveauMere = "بدون";
    //nbFreres
    this.president.nbFreres = this.getFormGroup('panelSocial', 'nbFreres').value;
    //triFreres
    this.president.triFreres = this.getFormGroup('panelSocial', 'triFreres').value;
    //adresse
    this.president.adresse = this.getFormGroup('panelResidence', 'adresse').value;
    //distance
    this.president.distance = this.getFormGroup('panelResidence', 'distance').value;
    //telephone
    this.president.telephone = this.getFormGroup('panelSocial', 'telephone').value;
    //gerant
    this.president.gerant = this.getFormGroup('panelSocial', 'gerant').value;
    //divorce
    this.president.divorce = this.getFormGroup('panelSocial', 'divorce').value;
    //zone
    this.president.zone = this.getFormGroup('panelResidence', 'zone').value;
    //typeResidence
    this.president.typeResidence = this.getFormGroup('panelResidence', 'typeResidence').value;
    //chambre
    this.president.chambre = this.getFormGroup('panelResidence', 'chambre').value;
    //remarques
    this.president.remarques = this.getFormGroup('panelRemarques', 'remarques').value;
    //orphelin
    if (this.isOrphelin)
      this.getOrphelin = [];
    this.president.orphelin = this.getOrphelin;
    //primaire
    if (this.isPrimaire)
      this.getPrimaire = [];
    this.president.primaire = this.getPrimaire;
    //besoins
    this.president.besoins = this.getBesoins;
    //favorites
    this.president.favorites = this.getFavorites;
    //santes
    this.president.santes = this.santes;
    //malades
    let malades = this.getFormGroup('panelMalades', 'malades').value;
    let txtMalade = this.getFormGroup('panelMalades', 'txtMalade').value;
    let array = this.listBoolean.filter(param => param.key == false);
    (malades == array[0].value) ?
      this.president.malades = malades :
      this.president.malades = txtMalade;
  }
  flashMessage(icon, title) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      timer: 3000
    })
  }
  getFormGroup(panel, item) {
    return this.myForm.controls[panel].get(item);
  }




  test() {
    console.clear();
    console.log("");
    console.log("*****************************************");
  }
  espace(control: AbstractControl): ValidationErrors | null {
    if (PresidentService.getMassarList.includes(control.value)) {
      return {
        espace: true
      }
    }
    return null;
  }
}
