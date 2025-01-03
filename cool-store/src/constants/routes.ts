export const ROUTES = {
    PRODUCTS: {
        BASE: 'products',
        CREATE: '',
        GET_ALL: '',
        SEARCH: 'search',
        GET_BY_CATEGORY: 'category/:name',
        GET_ONE: ':id',
        DELETE: ':id',
        UPDATE: ':id'
    },
    CATEGORIES: {
        BASE: 'categories',
        CREATE: '',
        GET_ALL: '',
        GET_ONE: ':id',
        DELETE: ':id',
        UPDATE: ':id'
    },
    BRANDS: {
        BASE: 'brands',
        CREATE: '',
        GET_ALL: '',
        GET_ONE: ':id',
        DELETE: ':id',
        UPDATE: ':id'
    },
    CUSTOMERS: {
        BASE: 'customers',
        CREATE: '',
        GET_ALL: '',
        SEARCH: 'search',
        GET_ONE: ':id',
        UPDATE: ':id',
        DELETE: ':id',
    },
    USERS: {
        BASE: 'users',
        CREATE: '',
        GET_ALL: '',
        SEARCH: 'search',
        GET_BY_ROLE: 'role/:role',
        GET_ONE: ':id',
        UPDATE: ':id',
        DELETE: ':id',
    },
    ORDERS: {
        BASE: 'orders',
        CREATE: '',
        GET_ALL: '',
        SEARCH: 'search',
        GET_BY_STATUS: 'status/:status',
        GET_BY_CUSTOMER: 'customer/:id',
        GET_ONE: ':id',
        UPDATE: ':id',
        DELETE: ':id',
        GET_TOTAL_PRICE: ':id/total',
    },
};
