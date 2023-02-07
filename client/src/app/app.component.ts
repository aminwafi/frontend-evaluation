import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    isHome: boolean;

    constructor(
        media: MediaMatcher,
        changeDetectorRef: ChangeDetectorRef
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    };

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

    onActivate(event: any) {
        this.isHome = event.constructor.name == 'HomeComponent';
    }
}
