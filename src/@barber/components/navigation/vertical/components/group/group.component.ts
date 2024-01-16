import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BarberNavigationService } from '@barber/components/navigation/navigation.service';
import { BarberNavigationItem } from '@barber/components/navigation/navigation.types';
import { BarberVerticalNavigationBasicItemComponent } from '@barber/components/navigation/vertical/components/basic/basic.component';
import { BarberVerticalNavigationCollapsableItemComponent } from '@barber/components/navigation/vertical/components/collapsable/collapsable.component';
import { BarberVerticalNavigationDividerItemComponent } from '@barber/components/navigation/vertical/components/divider/divider.component';
import { BarberVerticalNavigationSpacerItemComponent } from '@barber/components/navigation/vertical/components/spacer/spacer.component';
import { BarberVerticalNavigationComponent } from '@barber/components/navigation/vertical/vertical.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'barber-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [NgClass, NgIf, MatIconModule, NgFor, BarberVerticalNavigationBasicItemComponent, BarberVerticalNavigationCollapsableItemComponent, BarberVerticalNavigationDividerItemComponent, forwardRef(() => BarberVerticalNavigationGroupItemComponent), BarberVerticalNavigationSpacerItemComponent],
})
export class BarberVerticalNavigationGroupItemComponent implements OnInit, OnDestroy
{
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_autoCollapse: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() autoCollapse: boolean;
    @Input() item: BarberNavigationItem;
    @Input() name: string;

    private _barberVerticalNavigationComponent: BarberVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _barberNavigationService: BarberNavigationService,
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
        // Get the parent navigation component
        this._barberVerticalNavigationComponent = this._barberNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._barberVerticalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe(() =>
        {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
