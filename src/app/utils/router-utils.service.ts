import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class RouterUtilsService {

    constructor(
        private router: Router
    ) {
    }

    /*
    * simple navigation
    * */
    navigate(url: string): void {
        this.router.navigateByUrl(url).then();
    }

    /*
    * navigation and pass data
    * */
    navigateWithData(url: string, data?: object) {
        this.router.navigate([url], {state: {data: data}}).then();
    }

    /*
    * get data after navigation
    * */
    getDataAfterNavigate() {
        // @ts-ignore
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            // @ts-ignore
            return this.router.getCurrentNavigation().extras.state.data;
        }
    }

}
