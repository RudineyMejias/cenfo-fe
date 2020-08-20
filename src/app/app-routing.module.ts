import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: async () => (await import('@/authentication/authentication.module')).AuthenticationModule,
  },
  {
    path: 'feed',
    loadChildren: async () => (await import('@/feed/feed.module')).FeedModule,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
