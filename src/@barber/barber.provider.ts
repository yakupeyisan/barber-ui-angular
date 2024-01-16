import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, ENVIRONMENT_INITIALIZER, EnvironmentProviders, importProvidersFrom, inject, Provider } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BARBER_MOCK_API_DEFAULT_DELAY, mockApiInterceptor } from '@barber/lib/mock-api';
import { BarberConfig } from '@barber/services/config';
import { BARBER_CONFIG } from '@barber/services/config/config.constants';
import { BarberConfirmationService } from '@barber/services/confirmation';
import { barberLoadingInterceptor, BarberLoadingService } from '@barber/services/loading';
import { BarberMediaWatcherService } from '@barber/services/media-watcher';
import { BarberPlatformService } from '@barber/services/platform';
import { BarberSplashScreenService } from '@barber/services/splash-screen';
import { BarberUtilsService } from '@barber/services/utils';

export type BarberProviderConfig = {
    mockApi?: {
        delay?: number;
        services?: any[];
    },
    barber?: BarberConfig
}

/**
 * Barber provider
 */
export const provideBarber = (config: BarberProviderConfig): Array<Provider | EnvironmentProviders> =>
{
    // Base providers
    const providers: Array<Provider | EnvironmentProviders> = [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide : BARBER_MOCK_API_DEFAULT_DELAY,
            useValue: config?.mockApi?.delay ?? 0,
        },
        {
            provide : BARBER_CONFIG,
            useValue: config?.barber ?? {},
        },

        importProvidersFrom(MatDialogModule),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberConfirmationService),
            multi   : true,
        },

        provideHttpClient(withInterceptors([barberLoadingInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberLoadingService),
            multi   : true,
        },

        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberMediaWatcherService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberPlatformService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberSplashScreenService),
            multi   : true,
        },
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(BarberUtilsService),
            multi   : true,
        },
    ];

    // Mock Api services
    if ( config?.mockApi?.services )
    {
        providers.push(
            provideHttpClient(withInterceptors([mockApiInterceptor])),
            {
                provide   : APP_INITIALIZER,
                deps      : [...config.mockApi.services],
                useFactory: () => (): any => null,
                multi     : true,
            },
        );
    }

    // Return the providers
    return providers;
};
