/* eslint-disable */
import { BarberNavigationItem } from '@barber/components/navigation';
export const adminNavigation: BarberNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/admin/dashboard'
    },
    {
        id   : 'users',
        title: 'Users',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/admin/users'
    },
    {
        id   : 'services',
        title: 'Services',
        type : 'basic',
        icon : 'heroicons_outline:beaker',
        link : '/admin/services'
    },
    {
        id   : 'leaves',
        title: 'Leaves',
        type : 'basic',
        icon : 'heroicons_outline:clock',
        link : '/admin/leaves'
    },
    {
        id   : 'gallery',
        title: 'Gallery',
        type : 'basic',
        icon : 'heroicons_outline:photo',
        link : '/admin/gallery'
    },
    {
        id   : 'categories',
        title: 'Categories',
        type : 'basic',
        icon : 'heroicons_outline:tag',
        link : '/admin/categories'
    },
    {
        id   : 'products',
        title: 'Products',
        type : 'basic',
        icon : 'heroicons_outline:archive-box',
        link : '/admin/products'
    },
    {
        id   : 'orders',
        title: 'Orders',
        type : 'basic',
        icon : 'heroicons_outline:shopping-cart',
        link : '/admin/orders'
    },
    {
        id   : 'appointments',
        title: 'Appointments',
        type : 'basic',
        icon : 'heroicons_outline:rectangle-stack',
        link : '/admin/appointments'
    },
];
export const landingNavigation: BarberNavigationItem[] = [
    {
        id   : 'home',
        title: 'Home',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home'
    }
];
