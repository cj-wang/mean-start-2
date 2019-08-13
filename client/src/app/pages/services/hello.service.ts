import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hello } from '../../../../../shared/hello';

@Injectable({
  providedIn: 'root',
})
export class HelloService {

  constructor(private http: HttpClient) { }

  async hello(): Promise<string> {
    return (await this.http.get<Hello>('api/hello').toPromise()).greeting;
  }

}
