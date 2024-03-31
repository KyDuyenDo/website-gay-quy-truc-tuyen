import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';
// import PageBanner from '../layouts/PageBanner';
// import {CommentBlog} from '../components/BlogDetailsLeftBar';

import bg from '../assets/images/bg.jpg';
import avat1 from '../assets/images/avatar/avatar1.jpg';
import avat2 from '../assets/images/avatar/avatar2.jpg';
import avat3 from '../assets/images/avatar/avatar3.jpg';
import avat4 from '../assets/images/avatar/avatar4.jpg';
import avat5 from '../assets/images/avatar/avatar5.jpg';
import blog1 from '../assets/images/avatar/avatar7.jpg';
import blog2 from '../assets/images/avatar/avatar7.jpg';
import OverView from '../components/FundraiserDetail/OverView';
import Activity from '../components/FundraiserDetail/Activity';
import DonorList from '../components/FundraiserDetail/DonorList';
import '../css/fundraiserDetail.css'
import GallerySlider from '../components/FundraiserDetail/GallerySlider';
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook } from '@fortawesome/free-brands-svg-icons';
import Comment from '../components/FundraiserDetail/Comment';


const postBlog = [
    {image:blog1, title:"How To Teach Education Like A Pro."},
    {image:blog2, title:"Quick and Easy Fix For Your Education."},
];
const teamBlog =[
    {title:"Jake Johnson", image:avat1},
    {title:"Celesto Anderson", image:avat2},
    {title:"John Doe", image:avat3},
    {title:"Jake Johnson", image:avat4}
];

const donorsBlog = [
    {title:"Celesto Anderson", image:avat5, price:"$ 1,812"},
    {title:"John Doe", image:avat4, price:"$ 1,564"},
    {title:"Celesto Anderson", image:avat3, price:"$ 1,225"},
    {title:"Jake Johnson", image:avat2, price:"$ 9,00"},
];


const FundraiserDetail = () => {
    const [modalDonate, setModalDonate] = useState(false);
    const [referModal, setReferModal] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  
    return (
        <>
            <div className="page-content bg-white">
                {/* <PageBanner maintitle="Fundraiser" pagetitle="Fundraiser Detail" background={bg}/> */}
                <section className="content-inner-2">
                    <div className="container">	
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 m-b30">
						                    <div className="fundraiser-single">
                                    <div className="swiper fundraiser-gallery-wrapper">
                                        <GallerySlider />
                                    </div>
                                    <h2 class="title">Lời khẩn cầu của một người mẹ tìm liều thuốc mắc nhất thế giới để cứu mạng con trai! <span className='state'>Đang gây quỹ</span></h2>
                                    {/* <!--  selection --> */}
                                    <div className='inner-section'>
                                      <ul className='step-section' activeStep={activeStep} label={false}>
                                        <li className={"fc-section " + (activeStep === 0? "action" : "") } style={{marginLeft:'0px'}} onClick={() => handleStepClick(0)}>Câu chuyện</li>
                                        <li className={"fc-section " + (activeStep === 1? "action" : "") } onClick={() => handleStepClick(1)}>Hoạt động</li>
                                        <li className={"fc-section " + (activeStep === 2? "action" : "") } onClick={() => handleStepClick(2)}>Danh sách ủng hộ</li>
                                        <li className={"fc-section " + (activeStep === 3? "action" : "") } onClick={() => handleStepClick(3)}>Bình luận</li>
                                      </ul>
                                      {/* Render content based on activeStep */}
                                      {activeStep === 0 && <OverView/>}
                                      {activeStep === 1 && <Activity />}
                                      {activeStep === 2 && <DonorList itemsPerPage={10}/>}
                                      {activeStep === 3 && <Comment/>}
                                    </div>
                                </div>
                                
                            </div>
                            {/* <!--  keep --> */}
                            <div className="col-xl-4 col-lg-4">
                                <div>
                                    <div className="widget style-1 widget_donate">
                                        <Link to="/payment" className="btn btn-donate btn-primary w-100"  data-bs-toggle="modal" data-bs-target="#modalDonate"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faHeart}></FontAwesomeIcon> Ủng hộ </Link>
                                        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="btn btn-primary facebook w-100 btn-bottom"><FontAwesomeIcon style={{marginRight:'5px'}} icon={faFacebook}></FontAwesomeIcon> Chia sẻ Facebook</a>
                                    </div>
                                    
                                    {/* <!--  Widget Fund --> */}
                                    <div className="widget style-1 widget_fund">
                                      <div className='content-fund'>
                                        <div><img src={avat5} /></div>
                                        <div>
                                          <span style={{color: '#8d8d8d'}}>Tiền ủng hộ được chuyển đến</span>
                                          <h5>Hội chữ thập đỏ việt nam</h5>
                                        </div>
                                      </div>
                                      <hr className='horizontalLines'/>
                                      
                                        <div className='ranking'>
                                        <span style={{color:'#8d8d8d'}}>Đánh giá chiến dịch {" "}</span>
                                            <FontAwesomeIcon
                                            className="yellow-star"
                                            icon={faStar}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon
                                            className="yellow-star"
                                            icon={faStar}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon
                                            className="yellow-star"
                                            icon={faStar}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon
                                            className="yellow-star"
                                            icon={faStar}
                                            ></FontAwesomeIcon>
                                            <FontAwesomeIcon
                                            className="yellow-star"
                                            icon={faStar}
                                            ></FontAwesomeIcon>
                                        </div>
                                        <h3 className="title" style={{color:'#1b8271'}}>926.199.944 VND</h3>
                                        <div className="progress-bx style-1">
                                            <div className="progress">
                                                <div className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated" role="progressbar" style={{width:"90%"}}></div>
                                            </div> 
                                        </div>
                                        <p style={{color:'#8d8d8d'}}>Mục tiêu gây quỹ <span style={{fontWeight:'bold', color:'#212529'}}>1.000.000.000 VND</span></p>
                                        <ul className="detail">
                                            <li className="d-flex"><h5>14.516</h5><span style={{color:'#8d8d8d'}} className="ms-2">đã ủng hộ</span></li>
                                            <li className="d-flex"><h5>52</h5><span style={{color:'#8d8d8d'}} className="ms-2">ngày còn lại</span></li>
                                        </ul>
                                    </div>
                                    {/* <!-- Top Donors --> */}
                                    <div className="widget style-1 widget_avatar">
                                        <div className="widget-title">
                                            <h5 className="title">Top nhà quyên góp</h5>
                                        </div>
                                        <div className="avatar-wrapper">
                                            {donorsBlog.map((item, ind)=>(
                                                <div className="avatar-item" key={ind}>
                                                    <div className="avatar-media"> 
                                                        <img src={item.image} alt="" />
                                                    </div>
                                                    <div className="avatar-info">
                                                        <h6 className="title"><Link to={"#"}>{item.title}</Link></h6>
                                                        <span className="donors-item">{item.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>            
                        </div>
                    </div>
                </section>
                <div className="call-action style-1 content-inner-1">
                  {/* <!--  relate project --> */}
                </div>
            </div>  
        </>
    )
}

export default FundraiserDetail;