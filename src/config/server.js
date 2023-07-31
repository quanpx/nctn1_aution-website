export const ROOT_API =  "/api/"

export const WEB_SOCKET =`${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/nctn-ws` ;

export const LOGIN_URL = ROOT_API + "login";
export const SIGNUP_URL = ROOT_API + "signup";
export const FAVORITE = ROOT_API+"favorites";

export const ITEMS = ROOT_API+"items";

export const INVOICE = ROOT_API+"payment/invoice";

export const PAY = ROOT_API+"payment/pay";


export const LOT_URL = ROOT_API + "lot";

export const LOT_MARK_AS_SOLD = LOT_URL +"/sold";

export const ADD_2_FAVORITE= LOT_URL+"/add2fav/"

export const AUCTION_URL = ROOT_API + "auction";

export const UPDATE_AUCTION_STATUS = AUCTION_URL+"/updatestatus"

export const JOIN_AUCTION = AUCTION_URL+"/join";

export const BID_URL = ROOT_API + "bid";

export const BID_IN_AUCTION = BID_URL+"/bidinauction";

export const IS_BID = BID_URL+"/isbid";

export const IS_REGISTERED_AUCTION = ROOT_API + "auction/isregistered";

export const REGISTER_AUCTION = ROOT_API + "auction/register";

export const REGISTER_REQUEST = ROOT_API + "auction/requests"

export const APPROVE_REQUEST = ROOT_API+"auction/approve"


export const REGISTERED_AUCTION = ROOT_API + "auction/register_auctions";
