import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule, SharedModule, CalendarModule,
         ConfirmDialogModule, ConfirmationService, MenuModule,
         MenuItem, DropdownModule, TabViewModule, InputTextModule,
         ButtonModule, RadioButtonModule, DialogModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import { ReleaseComponent } from './release/release.component';
import { DataService } from './data.service';
import { KeysPipe } from './keys.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    DataTableModule,
    DialogModule,
    InputTextModule,
    MenuModule,
    SharedModule,
    RadioButtonModule,
    TabViewModule
  ],
  providers: [DataService],
  declarations: [AppComponent, ReleaseComponent, KeysPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
