import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class ZjErrorStateMatcher implements ErrorStateMatcher {

    /*
    * a method that checks error in form control
    * */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
