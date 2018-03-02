import { Injectable } from '@angular/core';
import { HttpsService } from './https.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public getData () {
  	let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
	let options = new RequestOptions({ headers: headers });
  	return new Promise((resolve, reject) => {
  		this.http.get('assets/data.json', options)
  			.map((res: Response) => res.json())
			.subscribe((response:any) => {
				console.log(response)
				resolve(response)
			},
			err => {
				console.log('error', err);
				reject(false)
			})
	})
  }
}
