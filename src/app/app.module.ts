import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { StartComponent } from './start/start.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatComponent } from './chat/chat.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ResetPwComponent } from './login/reset-pw/reset-pw.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { MustMatchDirective } from './helpers/must-match.directive';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileDetailComponent } from './profile/profile-detail/profile-detail.component';
import { ProfilePicturesComponent } from './profile/profile-pictures/profile-pictures.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    StartComponent,
    HeaderComponent,
    NavbarComponent,
    ProfileComponent,
    ChatComponent,
    SettingsComponent,
    LoginComponent,
    ResetPwComponent,
    SignUpComponent,
    SignInComponent,
    MustMatchDirective,
    AdminComponent,
    MainComponent,
    MenuComponent,
    ProfileDetailComponent,
    ProfilePicturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
