import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ROOT_API } from '../../config/server'
import { useAuth } from '../useAuth';

const favoriteApi = createApi({
    reducerPath:'favorites',
    baseQuery: fetchBaseQuery({
        baseUrl: ROOT_API,
    }),
    endpoints(builder){
        return {
            fetchFavorites: builder.query({
                query: (token)=> {
                    return {
                        url: 'favorites',
                        headers: {
                            'authorization': `Bearer ${token}`
                        },
                        method:'GET'
                    };
                }
            })
        };
    }

})
export const {useFetchFavoritesQuery} = favoriteApi;
export {favoriteApi}