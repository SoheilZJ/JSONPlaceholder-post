import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <div class="row header-style">
            <h3>{{header}}</h3>
            <ng-content></ng-content>
        </div>
    `,
    styles: ['.header-style {padding-left: 14px}']
})
export class AppHeaderComponent {

    /*
    * This is a header-component to use in hole app
    * */
    @Input() header: string = '';

}
