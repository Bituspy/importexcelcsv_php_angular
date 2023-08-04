import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: String;
  code: String;
}

@Injectable({
  providedIn: 'root',
})
export class testserviceService {
  baseUrl: string = 'http://localhost/Testimport/';

  constructor(private httpClient: HttpClient) {}

  //upload excel file to DB //

  ImportDataFromExcel(csvFile: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('fileToUpload', csvFile);
    return this.httpClient.post<any>(this.baseUrl + 'countries/uploadCountriesData.php', formData);
  }

  // get DATA from DB //
  getCountries(): Observable<any> {
    return this.httpClient.get<Country>(
      this.baseUrl + 'countries/getCountries.php'
    );
  }
}
