import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import "./LotItems.css"


const LotCard = ({lot})=> {
  const [user,token,isAuth]=useAuth();
    const navigate = useNavigate()
    const bids = useSelector((state)=>state.bid)
    const handleLoveItem = (id)=>
    {
        if(!isAuth)
        {
            navigate("/login")
        }
        console.log(id);
    }
    const handleBidItem = (id) =>
    {
        if(!isAuth)
        {
            navigate("/login")
        }if(checkBidded(id))
        {
            notification.open({
                message:"Server message",
                description:"You have bided for this lot before. Check you bids",
                icon:<CheckOutlined />
            })
        }
        else
        {
            navigate("/lot/"+id)
        }
       
    }
    const checkBidded= (id)=>{
        console.log(bids);
        return bids.includes(id);
    }
  return (
    <div className='lot-info'>
        <Card sx={{ width: 300,height:300,position:'relative' }}>
      <CardMedia
        component="img"
        height="100"
        image={lot.image_url}
        alt="Paella dish"
      />
      <CardContent>
      <Typography gutterBottom component="div" color="text.primary">
         <Link to={"/lot/"+lot.id}> {lot.name}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          Estm price : {lot.estm_price} <br/>
          {lot.bid_num} bids
        </Typography>
        {checkBidded(lot.id)&&<Typography variant="body2" color="text.secondary" component="div">
            You bided
        </Typography>}
      </CardContent>
      <CardActions disableSpacing sx={{right:0,bottom:0,position:'absolute'}}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <img width={25} height={25} src={process.env.PUBLIC_URL+"/auction.png"} onClick={()=>handleBidItem(lot.id)}/>
        </IconButton>
      </CardActions>
    </Card>
    </div>
    
  );
}
export default LotCard;