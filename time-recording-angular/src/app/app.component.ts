import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GlobalInitializer, AuthGuard } from 'my-library';

// Globals
// import { MatchComponent } from './CORE/match/match.component';
// import { GuideComponent } from './Guide/guide.component';
// import { MessagesComponent } from './CORE/Messages/messages.component';
// import { WelcomeComponent } from './CORE/Welcome/welcome.component';
// import { ProfileComponent } from './CORE/profile/profile.component';
// import { VerifiedComponent } from './verified/verified.component';
import { checkmarkOutline, personOutline, settingsOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import * as path from 'path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  RENDER: boolean = false;
  ShowHeaderFooter: boolean = true;

  constructor(
    private globalInitializer: GlobalInitializer,
    private router: Router,
  ) {
    // Dynamic Icons * can probably initialize the entire app here 
    addIcons({
      settingsOutline,
      personOutline,
      checkmarkOutline
    });
   }

  globalConfig: any;
  private globalSubscription!: Subscription;

  ngOnInit() {
    // ROUTING HANDLER
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });

    // Paths 
    /*
      ready for andrey TO FINISH
    */
    
     const RoutingArray = []
      /*{ path: '', component: GuideComponent, RestrictAcess: true },
      { path: 'guide', component: GuideComponent, RestrictAcess: true },
      { path: 'welcome', component: WelcomeComponent, RestrictAcess: true },
      { path: 'profile', component: ProfileComponent, RestrictAcess: true },
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'profile/edit', component: ProfileComponent, RestrictAcess: true },
      { path: 'verified', component: VerifiedComponent, RestrictAcess: true },
      { path: 'match', component: MatchComponent, RestrictAcess: true},
      { path: 'messages', component: MessagesComponent,RestrictAcess: true},
      { path: 'messages/:id', component: MessagesComponent, RestrictAcess: true },
    ]; */

    // run into function PathsArray
    // GLOBAL INITIALIZER
    this.globalSubscription = this.globalInitializer.initGlobals(GLOBALS_App,[], 'https://dev.collegerecruit.us/CORE_FE/GATEWAY.php').subscribe((config: any) => {
      this.globalConfig = config;

      // Set Header Footer Show
      config.SETTINGS.NoHeadFoot.some((pattern: any) => {
        const regex = new RegExp(`^${pattern.replace(/:\w+/g, '[^/]+')}$`);
        return regex.test(this.router.url);
      });

      //testing routes
      if (config.CONFIG.DEBUG === true) {
        console.log(this.globalInitializer.getRoutes());
      }

      this.RENDER = true; // Set RENDER to true when config is successfully loaded
      this.loadingSubject.next(false); // Set loading to false
    }, (error: any) => {
      this.RENDER = false; // Set RENDER to false if there is an error
      this.loadingSubject.next(false); // Set loading to false
    });
  }

  ngOnDestroy() {
    if (this.globalSubscription) {
      this.globalSubscription.unsubscribe();
    }
  }
}

// Global Declerations for add on 


export var GLOBALS_App: any[] = [
    { 
    }
];

