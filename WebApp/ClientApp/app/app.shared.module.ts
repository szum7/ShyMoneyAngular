// Core modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

// Addons
import { ToastrModule } from 'toastr-ng2'; // third party module to display toast
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, CalendarModule, AutoCompleteModule, MultiSelectModule } from 'primeng/primeng';
import { SliderModule } from 'primeng/slider';
//import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

// Directives
import { FocusDirective } from "./direcitves/focus.directive";

// Components
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { DateRangePickerComponent } from './components/daterangepicker/daterangepicker.component';

// Pages
import { HomePage } from './pages/Home/home.page';
import { EditSumsPage } from './pages/EditSums/editsums.page';
import { MonthlyResultPage } from './pages/MonthlyResults/monthlyresults.page';
import { TagTotalResultPage } from './pages/TagTotalResult/tagtotalresult.page';

// Services
import { GlobalService, SumService, IntellisenseService, TagService, CalculationService } from './services/index';

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
        // Directives      
        FocusDirective,
        // Components
        AppComponent,
        NavMenuComponent,
        DateRangePickerComponent,
        // Pages
        HomePage,
        EditSumsPage,
        MonthlyResultPage,
        TagTotalResultPage
    ],
    providers: [
        GlobalService,
        SumService,
        IntellisenseService,
        TagService,
        CalculationService,
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
            { path: 'Home', component: HomePage },
            { path: 'EditSums', component: EditSumsPage },
            { path: 'MonthlyResults', component: MonthlyResultPage },
            { path: 'TagTotalResult', component: TagTotalResultPage },
            { path: '**'/*<-any url*/, redirectTo: 'Home' }
            //{ path: '', redirectTo: 'sum', pathMatch: 'full' },
        ])
    ]
})
export class AppModuleShared {
}
