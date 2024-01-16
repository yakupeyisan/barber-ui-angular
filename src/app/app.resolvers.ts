import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { forkJoin } from 'rxjs';

export const initialDataResolver = () =>
{
    const navigationService = inject(NavigationService);

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService.get(),
    ]);
};
