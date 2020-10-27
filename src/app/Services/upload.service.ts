import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public uploadToCloudinary(data) {
    return this.http.post(environment.cloudinary_base_url, data)
      .pipe(
        tap(r => console.log(r))
      )
  }

}
