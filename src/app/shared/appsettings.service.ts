import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { map,catchError  } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { AppSettings } from "./appsettings";

const SETTINGS_LOCATION = "assets/appsettings.json";
const SETTINGS_KEY = "configuration";

@Injectable()
export class AppSettingsService {

  constructor(private http: HttpClient){

  }  

  getSettings(): Observable<AppSettings> {
    let settings = localStorage.getItem(SETTINGS_KEY);
  
    if (settings) {
      return of(JSON.parse(settings));
    }
    else {
        return this.http.get(SETTINGS_LOCATION)
        .pipe(map((response: any) => response || {}))
        .pipe(catchError(this.handleErrors));
    }
  }

  saveSettings(settings: AppSettings) {
    localStorage.setItem(SETTINGS_KEY,
                         JSON.stringify(settings));
  }
  
  deleteSettings(): void {
    localStorage.removeItem(SETTINGS_KEY);
  }  

  private handleErrors(error: any): Observable<AppSettings> {
    // Log the error to the console
    switch (error.status) {
      case 404:
        console.error("Can't find file: " + SETTINGS_LOCATION);
        break;
      default:
        console.error(error);
        break;
    }

    // Return default configuration values
    return of<AppSettings>(new AppSettings());
  }
}