import React from "react"
import "./Home.css"
const Introduction = () => {

    return <div className="introduction p-10 z-0 m-10 flex flex-col justify-between">
        <p className="custFont z-1 text-white text-2xl w-4/5 font-custom">Đề tài này cung cấp giải pháp bán và mua hàng chủ yếu cho người Việt Nam tạo thuận lợi cho người Việt Nam,
            đồng thời thu hút được khách hàng quốc tế quan tâm đến các sản phẩm Việt Nam.
            Qua đó có thể giới thiệu những nét đẹp văn hóa, các sản phẩm thủ công mỹ nghệ của nước ta từ xưa đến nay.
        </p>
        <div className="z-1 text-white text-2xl w-3/5 font-custom">
          <p>Sản phẩm này được thực hiện bởi sinh viên Phùng Xuân Quân, với sự góp ý, hướng dẫn từ 
            giáo viên ThS. Đỗ Tuấn Anh <br/> Trường CNTT & TT - Đại học BKHN .</p>
           
        </div>
    </div>

}

export default Introduction;