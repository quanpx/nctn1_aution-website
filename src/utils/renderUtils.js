import { Skeleton } from "antd"

export const handleLoading = (loading) => {
    if(loading)
    {
        return <div>
            <Skeleton active/>
            <Skeleton active/>
            <Skeleton active/>
        </div>
    }


}