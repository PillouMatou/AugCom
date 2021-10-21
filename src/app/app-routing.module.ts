import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KeyboardComponent} from './components/keyboard/keyboard.component';
import {ShareComponent} from './components/share/share.component';
import {EditionComponent} from './components/edition/edition.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsComponent} from './components/settings/settings.component';
import {AccountComponent} from './components/account/account.component';
import {BrowserModule} from '@angular/platform-browser';
import {PrintComponent} from './components/print/print.component';

const routes: Routes = [
  { path:'en', redirectTo: 'en/keyboard', pathMatch: 'full' },
  { path:'fr', redirectTo: 'fr/keyboard', pathMatch: 'full' },
  // {path: 'logging', component: UserPageComponent, data: {animation: 'x'}},
  {path: 'fr/keyboard', component: KeyboardComponent, data: {animation: 'HomePage'}},
  {path: 'fr/share', component: ShareComponent, data: {animation: 'x'}},
  {path: 'fr/print', component: PrintComponent, data: {animation: 'x'}},
  {path: 'fr/edit', component: EditionComponent, data: {animation: 'x'}},
  {path: 'fr/settings', component: SettingsComponent, data: {animation: 'x'}},
  {path: 'fr/account', component: AccountComponent, data: {animation: 'x'}},
  {path: 'en/keyboard', component: KeyboardComponent, data: {animation: 'HomePage'}},
  {path: 'en/share', component: ShareComponent, data: {animation: 'x'}},
  {path: 'en/print', component: PrintComponent, data: {animation: 'x'}},
  {path: 'en/edit', component: EditionComponent, data: {animation: 'x'}},
  {path: 'en/settings', component: SettingsComponent, data: {animation: 'x'}},
  {path: 'en/account', component: AccountComponent, data: {animation: 'x'}},
  {path: '', redirectTo: 'fr/keyboard', pathMatch: 'full', data: {animation: 'empty'}}
];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

/**
 * the class describing the different routes available in the project
 */
export class AppRoutingModule {
}
