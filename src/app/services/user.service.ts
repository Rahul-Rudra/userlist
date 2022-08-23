import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { map, mergeMap, switchMap , catchError , tap} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { addUser } from '../interfaces/user.add.interface';
import { user } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }
   users$=new BehaviorSubject<user[]>([]);
   totalCount$=new BehaviorSubject<number>(0);

getusers(page:number){
 return this.http.get(this.baseUrl + 'api/users'+'?page='+page)
 .pipe(
   map((data:any )=> {
       return (data) ? data : false;
     }
   ),
   tap((items) => { if (items) {
    this.users$.next(items.data);
    this.totalCount$.next(items.total)
  }}),
   catchError(err => {
     return of(false);
   }),
 );
}

update(id: number , payload: addUser): Observable<any> {
  return this.http.put(this.baseUrl+ 'api/users/' + id , payload)
    .pipe(
      map(responseData => {
          return responseData
        }
      ),
      tap(item => { if (item) { this.updateItem(id , item); 
      }}), 
      catchError(err => {
        return of(false);
      }),
    );
}


updateItem(id: number , item: any): boolean {
  const currentItems: user[]  = this.users$.getValue()
  if (currentItems.length > 0) {
    const index1  = currentItems.findIndex((element) => {
      return element.id === Number(id);
    });
   item.id=Number(id)
    if (index1 >= 0 ) {
      currentItems[index1] = item;
      console.log('item',item)
      this.users$.next(currentItems);
      return true;
    }
  }
  return false;
}

getUserById(id: number): Observable<any> {
  return this.http.get(this.baseUrl+ 'api/users/' + id)
    .pipe(
      map(data => {
          return data
        }
      ),
      catchError((err) => {
        return of(false);
      }),
    );
}


deleteuser(id: number): Observable<any> {
  return this.http.delete(this.baseUrl + 'api/users/' + id)
    .pipe(
      map(data => {
        
          return data;
        }
      ),
      tap((success) => { 
         this.delete(id)}),
      catchError((err) => {
        return of(false);
      }),
    );
}


delete(id: number): boolean  {
  const currentUsers: user[]  = this.users$.getValue();
  if (currentUsers.length > 0) {
    const index1  = currentUsers.findIndex((element) => {
      return element.id === id;
    });
    if (index1 >= 0 ) {
      currentUsers.splice(index1, 1);
      this.users$.next(currentUsers);
      let total=this.totalCount$.getValue()-1
      this.totalCount$.next(total)
      return true;
    }
  }
  return false;
}

add(payload:addUser): Observable<any> {
  return this.http.post(this.baseUrl+ 'api/users' , payload)
    .pipe(
      map((responseData:any) => {
          return responseData;
        }
      ),
      tap(item => { if (item) {
       
         const currentItems: user[]  = this.users$.getValue();
         currentItems.pop();
    currentItems.push(item);
    // let total=this.totalCount$.getValue()+1
    //   this.totalCount$.next(total)
    this.users$.next(currentItems);
        
        }}),
      catchError(err => {
        return of(false);
      }),
    );
}





}
