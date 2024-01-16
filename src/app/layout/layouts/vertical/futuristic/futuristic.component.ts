import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BarberFullscreenComponent } from '@barber/components/fullscreen';
import { BarberLoadingBarComponent } from '@barber/components/loading-bar';
import { BarberNavigationService, BarberVerticalNavigationComponent } from '@barber/components/navigation';
import { BarberMediaWatcherService } from '@barber/services/media-watcher';
import { User } from 'app/core/models';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/services';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'futuristic-layout',
    templateUrl  : './futuristic.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [BarberLoadingBarComponent, BarberVerticalNavigationComponent, UserComponent, MatButtonModule, MatIconModule, LanguagesComponent, BarberFullscreenComponent,  NgIf, RouterOutlet],
})
export class FuturisticLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private navigationService: NavigationService,
        private userService: UserService,
        private barberMediaWatcherService: BarberMediaWatcherService,
        private barberNavigationService: BarberNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to navigation data
        this.navigationService.navigation$
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((navigation: Navigation) =>
            {
                this.navigation = navigation;
            });

        // Subscribe to the user service
        this.userService.user$
            .pipe((takeUntil(this.unsubscribeAll)))
            .subscribe((user: User) =>
            {
                this.user = user;
            });

        // Subscribe to media changes
        this.barberMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next(null);
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this.barberNavigationService.getComponent<BarberVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
