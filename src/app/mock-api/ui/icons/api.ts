import { Injectable } from '@angular/core';
import { BarberMockApiService } from '@barber/lib/mock-api';
import { feather, heroicons, material } from 'app/mock-api/ui/icons/data';
import { cloneDeep } from 'lodash-es';

@Injectable({providedIn: 'root'})
export class IconsMockApi
{
    private readonly feather: any = feather;
    private readonly heroicons: any = heroicons;
    private readonly material: any = material;

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
        // @ Feather icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/feather')
            .reply(() => [
                200,
                {
                    namespace: 'feather',
                    name     : 'Feather',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.feather),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/heroicons-outline')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_outline',
                    name     : 'Heroicons Outline',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/heroicons-solid')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_solid',
                    name     : 'Heroicons Solid',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Heroicons mini icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/heroicons-mini')
            .reply(() => [
                200,
                {
                    namespace: 'heroicons_mini',
                    name     : 'Heroicons Mini',
                    grid     : 'icon-size-5',
                    list     : cloneDeep(this.heroicons),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material solid icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/material-solid')
            .reply(() => [
                200,
                {
                    namespace: 'mat_solid',
                    name     : 'Material Solid',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.material),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material outline icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/material-outline')
            .reply(() => [
                200,
                {
                    namespace: 'mat_outline',
                    name     : 'Material Outline',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.material),
                },
            ]);

        // -----------------------------------------------------------------------------------------------------
        // @ Material twotone icons - GET
        // -----------------------------------------------------------------------------------------------------
        this.barberMockApiService
            .onGet('api/ui/icons/material-twotone')
            .reply(() => [
                200,
                {
                    namespace: '',
                    name     : 'Material Twotone',
                    grid     : 'icon-size-6',
                    list     : cloneDeep(this.material),
                },
            ]);
    }
}
