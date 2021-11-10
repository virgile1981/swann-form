import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private http: HttpClient) { }

  save(form: any){
    console.log(form);
    //var formData: any = new FormData(form);
    // formData.append("avatar", form.demandeForm.imageEmplacement);

    return this.http.post('http://localhost:8081/api/form', form, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*',
        'mon-entete-personnalise':'maValeur'
      })
    }).pipe(
      catchError(this.errorMgmt)
    )
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

