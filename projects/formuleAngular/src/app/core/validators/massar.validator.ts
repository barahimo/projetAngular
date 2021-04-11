import { AbstractControl, ValidationErrors, ValidatorFn, } from "@angular/forms";
import { PresidentService } from "../services/president.service";

export class MassarValidator {
    static uniqueMassar(control: AbstractControl): ValidationErrors | null {
        if (PresidentService.getMassarList.includes(control.value)) {
            return {
                uniqueMassar: true
            }
        }
        return null;
    }
    // static uniqueMassarEdit(control: AbstractControl): ValidationErrors | null {
    //     if (PresidentService.getMassarList.includes(control.value) && (control.value) != PresidentService.massarCourant) {
    //         return {
    //             uniqueMassarEdit: true
    //         }
    //     }
    //     return null;
    // }
    static uniqueMassarEdit(val :string): ValidatorFn {
        return  (control: AbstractControl): ValidationErrors | null => {
            if (val == control.value) {
                return {
                    'uniqueMassarEdit': true,'val':val
                }
            }
            return null;
        }
    }
}