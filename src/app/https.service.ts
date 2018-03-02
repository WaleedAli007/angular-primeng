import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpsService {
	constructor(private http: Http){
		
	}

	get(endpoint): Observable<any>{

		// let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  		let options = new RequestOptions()
		return this.http.get(environment.API_URL + endpoint, options)
			.map((res:Response) => res.json() || {}) 
            .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
	}

	post(endpoint, data, options?):any{
		if(!options) {
			let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
	    	let options = new RequestOptions({ headers: headers });
		}
		return this.http.post(environment.API_URL + endpoint, data, options)
			.map((res:Response) => res.json() || {}) 
            .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
	}

	put(endpoint, data, opts?): Observable<any>{

	  	let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

		return this.http.put(environment.API_URL + endpoint, data, options)
			.map((res:Response) => res.json() || {}) 
            .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
	}

	delete(endpoint, opts?): Observable<any>{

		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

		return this.http.delete(environment.API_URL+endpoint, options)
			.map((res:Response) => res.json() || {}) 
            .catch((error:any) => Observable.throw(error.json().message || 'Server error'));
	}
}
