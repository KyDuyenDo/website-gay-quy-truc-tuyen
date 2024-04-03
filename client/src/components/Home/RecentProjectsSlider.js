import React from 'react';
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay} from "swiper/modules"
import { faCoins, faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import '../../css/project.css';
// Import Swiper styles
import "swiper/css";

//Images
import pic1 from './../../assets/images/project/pic1.jpg';
import pic2 from './../../assets/images/project/pic2.jpg';
import pic3 from './../../assets/images/project/pic3.jpg';
import avt1 from './../../assets/images/avatar/avatar1.jpg';
import avt2 from './../../assets/images/avatar/avatar2.jpg';
import avt3 from './../../assets/images/avatar/avatar3.jpg';


//SwiperCore.use([EffectCoverflow,Pagination]);

const dataBlog = [
	{image: pic1, image2:avt1, fund:'Hội chữ thập đỏ', title:'Gửi quà góp tết', role:'Tổ chức', category:'Người nghèo'},
	{image: pic2, image2:avt2, fund:'Dự án Nuôi em Mộc Châu', title:'Hỗ trợ 24 em nhỏ mồ côi cha mẹ được nuôi dưỡng...', role:'Cá nhân', category:'Trẻ em, Giáo dục'},
	{image: pic3, image2:avt3, fund:'Thiện Nguyện Nắng Vàng K3 Tân...', title:'Chiến dịch ủng hộ các con điều trị ung thư tại...', role:'Cá nhân', category:'Bệnh hiểm nghèo'},
    {image: pic1, image2:avt1, fund:'Hội chữ thập đỏ', title:'Gửi quà góp tết', role:'Tổ chức', category:'Người nghèo'},
];

const RecentProjectsSlider = () => {
    return (
        <>
             
            <Swiper className="recent-blog p-b5"
				speed= {1500}
				//parallax= {true}
				slidesPerView= {3}
				spaceBetween= {30}
				loop={true}
				autoplay= {{
				   delay: 3000,
				}}
				modules={[ Autoplay ]}
				breakpoints = {{
					1200: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    320: {
                        slidesPerView: 1,
                    },
				}}
			>	
               
				{dataBlog.map((d,i)=>(
					<SwiperSlide key={i}>
                         <Link to={"/fundraiser-detail"}>
                            <div className="dz-card style-2 overlay-skew wow fadeInUp" data-wow-delay="0.2s">
                                <div className="dz-media">
                                    <img src={d.image} alt="" />
                                </div>
                                <div className="dz-info">
                                    <ul className="dz-category">
                                        <li>
                                            {d.category}
                                        </li>
                                    </ul>
                                    <h5 className="dz-title">
                                        {d.title}
                                    </h5>
                                    <div className="progress-bx style-1">
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-secondary progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:"75%"}}></div>
                                        </div>
                                        <ul className="progress-tag">
                                            <li className="raised">
                                                <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> <span>Đã đạt được 80%</span>
                                            </li>
                                            <li className="goal">
                                            <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> <span>Còn 43 Ngày</span>
                                            </li>
                                        </ul> 
                                    </div>
                                    <div className="author-wrappper d-flex">
                                        <div className="author-content">
                                        <h6 className="author-name">{d.fund}</h6>
                                            <div className="author-head d-flex">
                                            <ul className="author-meta d-flex">
                                                <li className="location">{d.role}</li>
                                            </ul>
                                    
                                                <ul className="rating-list">
                                                    <FontAwesomeIcon className='yellow-star' icon={faStar}></FontAwesomeIcon>
                                                    <FontAwesomeIcon className='yellow-star' icon={faStar}></FontAwesomeIcon>
                                                    <FontAwesomeIcon className='yellow-star' icon={faStar}></FontAwesomeIcon>
                                                    <FontAwesomeIcon style={{color:'#CDC8C8'}} icon={faStar}></FontAwesomeIcon>
                                                    <FontAwesomeIcon style={{color:'#CDC8C8'}} icon={faStar}></FontAwesomeIcon>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>			
                        </Link>						
					</SwiperSlide>
				))}				
			</Swiper>
            <div className='d-flex justify-content-center' style={{marginTop:'30px'}}>
                <button className="cf-button cf-button--hollow cf-button--small">Xem thêm</button>
            </div>
        </>
    );
};


export default RecentProjectsSlider;
