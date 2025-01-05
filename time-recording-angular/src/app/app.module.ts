import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { TimeRecordingComponent } from './time-recording/time-recording.component';
import { GraphComponent } from './graph/graph.component';
import { IonicModule } from '@ionic/angular';
import { MyLibraryModule } from 'my-library';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimeRecordingComponent,
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
     MyLibraryModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

