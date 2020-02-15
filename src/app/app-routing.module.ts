import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { MenuComponent } from './menu/menu.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfilePicturesComponent } from './profile/profile-pictures/profile-pictures.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'navbar', component: NavbarComponent },
  {
    path: 'menu', component: MenuComponent,
    children: [
      { path: '', redirectTo: 'profile-detail', pathMatch: 'full' },
      {
        path: "profile", component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'profile-detail', pathMatch: 'full' },
          { path: "profile-detail", component: ProfileDetailComponent },
          { path: "profile-pictures", component: ProfilePicturesComponent },
        ]
      },
      { path: "game", component: GameComponent },
      { path: "chat", component: ChatComponent },
      { path: "settings", component: SettingsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
