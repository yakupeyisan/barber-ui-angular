import { Injectable } from '@angular/core';
import { BarberDrawerComponent } from '@barber/components/drawer/drawer.component';

@Injectable({providedIn: 'root'})
export class BarberDrawerService
{
    private _componentRegistry: Map<string, BarberDrawerComponent> = new Map<string, BarberDrawerComponent>();

    /**
     * Constructor
     */
    constructor()
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: BarberDrawerComponent): void
    {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): BarberDrawerComponent | undefined
    {
        return this._componentRegistry.get(name);
    }
}
