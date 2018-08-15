import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ToastrModule } from 'toastr-ng2'; // third party module to display toast
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, CalendarModule, AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/slider';
//import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SumComponent } from './components/sum/sum.component';
//import { CounterComponent } from './components/counter/counter.component';
import { DateRangePickerComponent } from './components/daterangepicker/daterangepicker.component';
import { HomeComponent } from './components/home/home.component';

import { SumService, IntellisenseService, TagService } from './_services/index';

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        NavMenuComponent,
        AppComponent,
        NavMenuComponent,
        SumComponent,
        DateRangePickerComponent,
        HomeComponent
    ],
    providers: [
        SumService,
        IntellisenseService,
        TagService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InputTextModule, DataTableModule, ButtonModule, DialogModule, SliderModule, CalendarModule, AutoCompleteModule, MultiSelectModule, 
        //Angular2FontawesomeModule,
        RouterModule.forRoot([
            { path: 'sum', component: SumComponent },
            { path: 'home', component: HomeComponent },
            { path: '**'/*<-any url*/, redirectTo: 'sum' }
            //{ path: '', redirectTo: 'sum', pathMatch: 'full' },
        ])
    ]
})
export class AppModuleShared {
}
