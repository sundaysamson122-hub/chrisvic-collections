import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { ErrorResponse, HealthStatus, ListProductsParams, Order, OrderInput, Product } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListProductsUrl: (params?: ListProductsParams) => string;
/**
 * Returns products available in the storefront.
 * @summary List storefront products
 */
export declare const listProducts: (params?: ListProductsParams, options?: Parameters<typeof customFetch>[1]) => Promise<Product[]>;
export declare const getListProductsQueryKey: (params?: ListProductsParams) => readonly ["/api/products", ...ListProductsParams[]];
export declare const getListProductsQueryOptions: <TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductsQueryResult = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
export type ListProductsQueryError = ErrorType<unknown>;
/**
 * @summary List storefront products
 */
export declare function useListProducts<TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(params?: ListProductsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProductUrl: (id: string) => string;
/**
 * @summary Get a storefront product
 */
export declare const getProduct: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<Product>;
export declare const getGetProductQueryKey: (id: string) => readonly [`/api/products/${string}`];
export declare const getGetProductQueryOptions: <TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProductQueryResult = NonNullable<Awaited<ReturnType<typeof getProduct>>>;
export type GetProductQueryError = ErrorType<ErrorResponse>;
/**
 * @summary Get a storefront product
 */
export declare function useGetProduct<TData = Awaited<ReturnType<typeof getProduct>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProduct>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getCreateOrderUrl: () => string;
/**
 * @summary Create a checkout order
 */
export declare const createOrder: (orderInput: OrderInput, options?: Parameters<typeof customFetch>[1]) => Promise<Order>;
export declare const getCreateOrderMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export type CreateOrderMutationResult = NonNullable<Awaited<ReturnType<typeof createOrder>>>;
export type CreateOrderMutationBody = BodyType<OrderInput>;
export type CreateOrderMutationError = ErrorType<ErrorResponse>;
/**
* @summary Create a checkout order
*/
export declare const useCreateOrder: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createOrder>>, TError, {
        data: BodyType<OrderInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createOrder>>, TError, {
    data: BodyType<OrderInput>;
}, TContext>;
export declare const getGetOrderUrl: (id: string) => string;
/**
 * @summary Get an order by id
 */
export declare const getOrder: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<Order>;
export declare const getGetOrderQueryKey: (id: string) => readonly [`/api/orders/${string}`];
export declare const getGetOrderQueryOptions: <TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getOrder>>>;
export type GetOrderQueryError = ErrorType<ErrorResponse>;
/**
 * @summary Get an order by id
 */
export declare function useGetOrder<TData = Awaited<ReturnType<typeof getOrder>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getOrder>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map
