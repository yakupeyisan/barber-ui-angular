import { Injectable } from '@angular/core';
import { BarberNavigationItem } from '@barber/components/navigation';
import { BarberMockApiService } from '@barber/lib/mock-api';
import { adminNavigation, landingNavigation } from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class NavigationMockApi
{
    private readonly landingNavigation: BarberNavigationItem[] = landingNavigation;
    private readonly adminNavigation: BarberNavigationItem[] = adminNavigation;
    /**
     * Constructor
     */
    constructor(private barberMockApiService: BarberMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/common/navigation')
            .reply(() =>
            {
                // Fill compact navigation children using the default navigation
                this.landingNavigation.forEach((compactNavItem) =>
                {
                    this.landingNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === compactNavItem.id )
                        {
                            compactNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Fill futuristic navigation children using the default navigation
                this.adminNavigation.forEach((futuristicNavItem) =>
                {
                    this.adminNavigation.forEach((defaultNavItem) =>
                    {
                        if ( defaultNavItem.id === futuristicNavItem.id )
                        {
                            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                // Return the response
                return [
                    200,
                    {
                        admin   : cloneDeep(this.adminNavigation),
                        landing   : cloneDeep(this.landingNavigation)
                    },
                ];
            });
    }
}
