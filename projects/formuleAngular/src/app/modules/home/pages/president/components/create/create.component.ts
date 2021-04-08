import { PresidentService } from 'projects/formuleAngular/src/app/core/services/president.service';
import { President } from './../../../../../../shared/models/president';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MassarValidator } from 'projects/formuleAngular/src/app/core/validators/massar.validator';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
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
  myForm: FormGroup;
  resetFormGroup() {
    this.myForm = this.fb.group({
      "panelPersonel": this.fb.group({
        "image": ["", [
          RxwebValidators.image({ maxHeight: 100, maxWidth: 100 }),
          RxwebValidators.extension({ extensions: ["jpeg", "gif"] })
        ]],
        "massar": ["", [Validators.required, Validators.email, Validators.email, MassarValidator.uniqueMassar]],
        "nom": ["", Validators.required],
        "prenom": ["", Validators.required],
        "genre": ["ذكر"],
        "dateNaissance": [this.presidentService.todayDate, Validators.required],
      }),
      "panelPere": this.fb.group({
        "nomPere": ["", Validators.required],
        "prenomPere": ["", Validators.required],
        "proffessionPere": [""],
        "niveauPere": [""]
      }),
      "panelMere": this.fb.group({
        "nomMere": ["", Validators.required],
        "prenomMere": ["", Validators.required],
        "proffessionMere": [""],
        "niveauMere": [""]
      }),
      "panelSocial": this.fb.group({
        "nbFreres": ["0"],
        "triFreres": ["1"],
        "telephone": ["", Validators.pattern(this.presidentService.patternNumberPhone)],
        "gerant": ["الأب"],
        "orphelin": [],
        "divorce": ["لا"],
      }),
      "panelResidence": this.fb.group({
        "zone": ["قروي"],
        "typeResidence": ["خيمة"],
        "chambre": ["مشتركة"],
        "primaire": [],
        "adresse": ["", Validators.required],
        "distance": [""],
      }),
      "panelBesoins": this.fb.group({
        "besoins": [],
      }),
      "panelFavorites": this.fb.group({
        "favorites": [],
      }),
      "panelMalades": this.fb.group({
        "santes": [],
        "malades": ["لا"],
        "txtMalade": [{ value: '', disabled: this.isMalade }],
      }),
      "panelRemarques": this.fb.group({
        "remarques": new FormControl(""),
      }),
    });
  }
  presidents: President[] = [];
  president: President = {};
  constructor(
    private presidentService: PresidentService,
    private router: Router,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    console.log("Length Create : "+PresidentService.staticPresidents.length);
    this.resetFormGroup();
    this.presidentService.getMassar();
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

  onSubmit() {
    // if (this.myForm.valid) {
    /* *************** || ******************/
    var myFormData = new FormData();
    /* 
    this.myForm.value['panelPersonel']['image'] = this.fichier;
    for (let key1 in this.myForm.value)
      for (let key2 in this.myForm.value[key1])
        myFormData.append(key2, this.myForm.value[key1][key2]); 
        */
    /* *************** || ******************/
    this.presidentReactiveForm();
    /* *************** || ******************/
    myFormData.append("image", this.fichier);
    myFormData.append("massar", this.president.massar);
    myFormData.append("nom", this.president.nom);
    myFormData.append("prenom", this.president.prenom);
    myFormData.append("genre", this.president.genre);
    myFormData.append("dateNaissance", this.president.dateNaissance);
    myFormData.append("pere", this.listsFormDataParent(this.president.pere, "pere"));
    myFormData.append("mere", this.listsFormDataParent(this.president.mere, "mere"));
    // myFormData.append("nomPere", this.president.pere.nomPere);
    // myFormData.append("prenomPere", this.president.pere.prenomPere);
    // myFormData.append("proffessionPere", this.president.pere.proffessionPere);
    // myFormData.append("niveauPere", this.president.pere.niveauPere);
    // myFormData.append("nomMere", this.president.mere.nomMere);
    // myFormData.append("prenomMere", this.president.mere.prenomMere);
    // myFormData.append("proffessionMere", this.president.mere.proffessionMere);
    // myFormData.append("niveauMere", this.president.mere.niveauMere);
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
    console.log("*********");
    /* *************** || ******************/

    // this.presidentService.getFileJSON().subscribe((data: President[]) => {
    //   if (data.length > 0)
    //     this.president.id = ++data[data.length - 1].id;
    //   console.warn("arrayJSON.length : " + data.length);
    //   this.presidentService.createFileJSON(this.president);
    // });
    this.presidentService.createFileJSON2(myFormData).subscribe((data) => console.log(data));
    //   this.flashMessage('success', 'President ajoutée avec succées')
    //   this.keysPanel.forEach(item => {
    //     if (item == 'panelPersonel') {
    //       this.panel[item] = false;
    //       this.panelHeaders[item].color = "text-white";
    //       this.panelHeaders[item].active = true;
    //     }
    //     else {
    //       this.panel[item] = true;
    //       this.panelHeaders[item].color = "text-dark";
    //       this.panelHeaders[item].active = false;
    //     }
    //   })
    //   this.resetFormGroup();
    // }
    // else
    //   this.flashMessage('error', 'Echec d\'ajout le president');
  }
  presidentReactiveForm() {
    //this.president.id = 1;
    //image
    // this.president.image = this.getFormGroup('panelPersonel', 'image').value;
    this.president.image = this.fichier
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
  /****************|| *******************/
  fichier: any = "";
  fileEvent(e) {
    this.fichier = e.target.files[0];
  }
  test() {

  }
}
