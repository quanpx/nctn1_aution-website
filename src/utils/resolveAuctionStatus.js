export const resolveStatus = (status) => {
    switch(status){
        case "start": return "Đang diễn ra"
        case "active": return "Đang mở đăng ký"
        case "end": return "Đã kết thúc"
        default: return ""

    }
}