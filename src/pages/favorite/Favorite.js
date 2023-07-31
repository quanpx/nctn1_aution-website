import axios from "axios";
import { useEffect, useState } from "react";
import { FAVORITE } from "../../config/server";
import { useAuth } from "../../hooks/useAuth";
import { Space, Table, Tag } from "antd";
import FavoriteItem from "../../components/favorites/FavoriteItem";


const Favorite = () => {
    const [favorites, setFavorites] = useState(null)
    const {isAuth,token} = useAuth();

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Accept": "application/json"
        }
    }
    useEffect(()=> {
        fetchData()
    },[])

    const fetchData = async () => 
    {
     await axios.get(FAVORITE,config)
     .then(res => res.data)
     .then(data => setFavorites(data.lots))
     .catch(err=> console.log(err))
    }

    if(favorites === null)
    {
        return <h1>Loading</h1>
    }

    return <div className="flex flex-row">
    <div className="flex flex-col gap-x-5 basis-3/4">
        <h1 className="text-2xl mt-20">Sản phẩm yêu thích</h1>
    { favorites.map((item,idx)=> {
        return <div className="flex flex-row gap-x-10 mt-5 border-t-2 border-black-700 pt-5 pl-5">
            <FavoriteItem key={idx} lot={item}/>
        </div>
    })}
    </div>
    </div>
  

}

export default Favorite;