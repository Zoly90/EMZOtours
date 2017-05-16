import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HolidayDetailViewComponent } from './holidayDetailView.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'holiday/:id',
                component: HolidayDetailViewComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class HolidayDetailViewRoutingModule { }