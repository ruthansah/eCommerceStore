import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import *  as firebase from  'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app.user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class AuthService {
  user$: Observable<firebase.User>; 
  
  constructor(public afAuth: AngularFireAuth, private route:ActivatedRoute, private userService: UserService) {
     this.user$ = afAuth.authState;
   }

   login(){
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   logout(){
    this.afAuth.auth.signOut();
   }
   
   public get appUser$():Observable<AppUser>{
    return this.user$
    .switchMap(user =>{
      if(user) return this.userService.get(user.uid).valueChanges();
      return Observable.of<AppUser>(null);
    });
  }

}