import { bootstrapApplication, platformBrowser, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { ApiService } from './app/api.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, HttpClientModule),
        ApiService
    ]
}).catch(e => console.error(e));

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
