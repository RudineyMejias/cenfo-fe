import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from '@/core/guards/authentication.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthenticationGuard],
    data: { onlyUnauthenticated: true },
    loadChildren: async () => (await import('@/authentication/authentication.module')).AuthenticationModule,
  },
  {
    path: 'feed',
    canActivate: [AuthenticationGuard],
    loadChildren: async () => (await import('@/feed/feed.module')).FeedModule,
  },
  {
    path: '**',
    redirectTo: 'feed',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
