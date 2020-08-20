import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from '@/feed/components/feed/feed.component';
import { SharedModule } from '@/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class FeedRoutingModule { }
