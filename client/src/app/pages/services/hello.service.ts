import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hello } from '../../../../../shared/hello';

@Injectable({
  providedIn: 'root',
})
export class HelloService {

  constructor(private http: HttpClient) { }

  async hello(name: string): Promise<string> {
    const hello: Hello = {
      name: 'world',
    };
    return (await this.http.post<Hello>('/api/hello', hello).toPromise()).greeting;
  }

}
