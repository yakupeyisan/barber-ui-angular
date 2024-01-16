import { DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BarberConfig, BarberConfigService } from '@barber/services/config';
import { BarberMediaWatcherService } from '@barber/services/media-watcher';
import { BarberPlatformService } from '@barber/services/platform';
import { BARBER_VERSION } from '@barber/version';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { SettingsComponent } from './common/settings/settings.component';
import { EmptyLayoutComponent } from './layouts/empty/empty.component';
import { CenteredLayoutComponent } from './layouts/horizontal/centered/centered.component';
import { EnterpriseLayoutComponent } from './layouts/horizontal/enterprise/enterprise.component';
import { MaterialLayoutComponent } from './layouts/horizontal/material/material.component';
import { ModernLayoutComponent } from './layouts/horizontal/modern/modern.component';
import { ClassicLayoutComponent } from './layouts/vertical/classic/classic.component';
import { ClassyLayoutComponent } from './layouts/vertical/classy/classy.component';
import { CompactLayoutComponent } from './layouts/vertical/compact/compact.component';
import { DenseLayoutComponent } from './layouts/vertical/dense/dense.component';
import { FuturisticLayoutComponent } from './layouts/vertical/futuristic/futuristic.component';
import { ThinLayoutComponent } from './layouts/vertical/thin/thin.component';
import { LandingLayoutComponent } from './layouts/horizontal/landing/landing.component';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, EmptyLayoutComponent, LandingLayoutComponent, CenteredLayoutComponent, EnterpriseLayoutComponent, MaterialLayoutComponent, ModernLayoutComponent, ClassicLayoutComponent, ClassyLayoutComponent, CompactLayoutComponent, DenseLayoutComponent, FuturisticLayoutComponent, ThinLayoutComponent, SettingsComponent],
})
export class LayoutComponent implements OnInit, OnDestroy
{
    config: BarberConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    private unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        private renderer2: Renderer2,
        private router: Router,
        private barberConfigService: BarberConfigService,
        private barberMediaWatcherService: BarberMediaWatcherService,
        private barberPlatformService: BarberPlatformService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the theme and scheme based on the configuration
        combineLatest([
            this.barberConfigService.config$,
            this.barberMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)']),
        ]).pipe(
            takeUntil(this.unsubscribeAll),
            map(([config, mql]) =>
            {
                const options = {
                    scheme: config.scheme,
                    theme : config.theme,
                };

                // If the scheme is set to 'auto'...
                if ( config.scheme === 'auto' )
                {
                    // Decide the scheme using the media query
                    options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
                }

                return options;
            }),
        ).subscribe((options) =>
        {
            // Store the options
            this.scheme = options.scheme;
            this.theme = options.theme;

            // Update the scheme and theme
            this.updateScheme();
            this.updateTheme();
        });

        // Subscribe to config changes
        this.barberConfigService.config$
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe((config: BarberConfig) =>
            {
                // Store the config
                this.config = config;

                // Update the layout
                this.updateLayout();
            });

        // Subscribe to NavigationEnd event
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this.unsubscribeAll),
        ).subscribe(() =>
        {
            // Update the layout
            this.updateLayout();
        });

        // Set the app version
        this.renderer2.setAttribute(this.document.querySelector('[ng-version]'), 'barber-version', BARBER_VERSION);

        // Set the OS name
        this.renderer2.addClass(this.document.body, this.barberPlatformService.osName);
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the selected layout
     */
    private updateLayout(): void
    {
        // Get the current activated route
        let route = this.activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        // 1. Set the layout from the config
        this.layout = this.config.layout;

        // 2. Get the query parameter from the current route and
        // set the layout and save the layout to the config
        const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');
        if ( layoutFromQueryParam )
        {
            this.layout = layoutFromQueryParam;
            if ( this.config )
            {
                this.config.layout = layoutFromQueryParam;
            }
        }

        // 3. Iterate through the paths and change the layout as we find
        // a config for it.
        //
        // The reason we do this is that there might be empty grouping
        // paths or componentless routes along the path. Because of that,
        // we cannot just assume that the layout configuration will be
        // in the last path's config or in the first path's config.
        //
        // So, we get all the paths that matched starting from root all
        // the way to the current activated route, walk through them one
        // by one and change the layout as we find the layout config. This
        // way, layout configuration can live anywhere within the path and
        // we won't miss it.
        //
        // Also, this will allow overriding the layout in any time so we
        // can have different layouts for different routes.
        const paths = route.pathFromRoot;
        paths.forEach((path) =>
        {
            // Check if there is a 'layout' data
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout )
            {
                // Set the layout
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

    /**
     * Update the selected scheme
     *
     * @private
     */
    private updateScheme(): void
    {
        // Remove class names for all schemes
        this.document.body.classList.remove('light', 'dark');

        // Add class name for the currently selected scheme
        this.document.body.classList.add(this.scheme);
    }

    /**
     * Update the selected theme
     *
     * @private
     */
    private updateTheme(): void
    {
        // Find the class name for the previously selected theme and remove it
        this.document.body.classList.forEach((className: string) =>
        {
            if ( className.startsWith('theme-') )
            {
                this.document.body.classList.remove(className, className.split('-')[1]);
            }
        });

        // Add class name for the currently selected theme
        this.document.body.classList.add(this.theme);
    }
}
