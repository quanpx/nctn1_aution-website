import React, { useEffect, useRef, useState } from 'react';
import LotInfo from "./LotInfo";
import "./LotItems.css"
import { useAuth } from '../../hooks/useAuth';
import { useFetchFavoritesQuery } from '../../hooks/apis/favoriteApi';
import axios from 'axios';
import { FAVORITE } from '../../config/server';
const LotItems = ({ lots }) => {
    const { token,isAuth } = useAuth()
    const [favorites,setFavorites] = useState(null)
    const [modifiedItems,setModifiedItems] = useState([])
    let favoritedIds = useRef([])

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Acept": "application/json"
        }
    }

    useEffect(()=> {
        fetchFavorites()
        setModifiedItems(lots)
    },[lots])

    const fetchFavorites = async () => {
        if(isAuth!==null || isAuth)
        {
            try
            {
                const {data} = await axios.get(FAVORITE,config)
                console.log(data);
                favoritedIds.current = data.lots.map(item => item.id);
                console.log(favoritedIds);
                var modifiedItemsTmp = lots.map(lot => favoritedIds.current.includes(lot.id) ? { ...lot, is_favorited: true } : { ...lot, is_favorited: false })
                setModifiedItems(modifiedItemsTmp)
                setFavorites(data.lots)
                return;

            }catch(err)
            {
                console.log(err);
            }
        }

        return null;
    }
    
  
    return (
        <div className="basis-2/3  pl-6 pr-4">
            <h1 className="text-base">{lots.length} results</h1>
            <div className='flex flex-row flex-wrap justify-between justify-items-center gap-2'>
                {modifiedItems.map((lot, idx) => <LotInfo key={idx} lot={lot} />)}
            </div>

        </div>
    )
}
export default LotItems;