import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import {EditCategoryComponent} from "../edit-category/edit-category.component";

const routes: Routes = [{
  path: ':id',
  component: EditCategoryComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ShowCategoryRoutingModule {
}
