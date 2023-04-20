import './Body.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import introImg from '../../../images/intro-img.svg';
import aboutImg from '../../../images/about-img.svg';
import aboutExtra from '../../../images/about-extra-1.svg';
import { motion } from "framer-motion"

const Body = () => {
    return(
        <div className='body-wrap'>
            <section className="intro-container">
                <motion.div   
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="intro-info"
                >
                    <h2>We provide<br/>
                    <span>solutions</span>
                    <br/>for your business!</h2>

                    <div className='intro-buttons'>
                        <button>Get started</button>
                        <button>Our Services</button>
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{ type: "spring", stiffness: 155, damping: 20 }}
                    className="intro-img"
                >
                    <img src={introImg} alt="intro-svg" />
                </motion.div>
            </section>
            <section className='about-container'>
                <div className='about-header'>
                    <h1>About Us</h1>
                    <span>
                        Lorem ipsum dolor sit amet, 
                        consectetur adipiscing elit, sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua.
                    </span>
                </div>
                <div className='about-body'>
                    <div className='about-body__info'>
                        <div className='about-body__info-text'>
                            <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing 
                                elit, sed do eiusmod tempor incididunt ut labore et 
                                dolore magna aliqua. Ut enim ad minim veniam, quis 
                                nostrud exercitation ullamco laboris nisi ut 
                                aliquip ex ea commodo consequat.
                            </span>
                            <div className='about-body__tools'>
                                <div className='about-body__tool'>
                                    <StarBorderIcon className='about-body__tool-icon' />
                                    <div className='about-body__tool-text'>
                                        <h1>Eiusmod Tempor</h1>
                                        <span>
                                            Et harum quidem rerum facilis est et 
                                            expedita distinctio. Nam libero tempore, 
                                            cum soluta nobis est eligendi
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='about-body__tools'>
                                <div className='about-body__tool'>
                                    <AddLocationAltOutlinedIcon className='about-body__tool-icon' />
                                    <div className='about-body__tool-text'>
                                        <h1>Eiusmod Tempor</h1>
                                        <span>
                                            Et harum quidem rerum facilis est et 
                                            expedita distinctio. Nam libero tempore, 
                                            cum soluta nobis est eligendi
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='about-body__tools'>
                                <div className='about-body__tool'>
                                    <AlarmOutlinedIcon className='about-body__tool-icon' />
                                    <div className='about-body__tool-text'>
                                        <h1>Eiusmod Tempor</h1>
                                        <span>
                                            Et harum quidem rerum facilis est et 
                                            expedita distinctio. Nam libero tempore, 
                                            cum soluta nobis est eligendi
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='about-body__info-img'>
                            <img src={aboutImg} alt="" />
                        </div>
                    </div>
                    <div className='about-body__info-2'>
                        <div className='about-body__info-2-img'>
                            <img src={aboutExtra} alt="" />
                        </div>
                        <div className='about-body__info-2-text'>
                            <h1>
                                Voluptatem dignissimos provident 
                                quasi corporis voluptates sit assumenda.
                            </h1>
                            <span>
                                Ipsum in aspernatur ut possimus sint. Quia omnis est occaecati 
                                possimus ea. Quas molestiae perspiciatis occaecati qui rerum. 
                                Deleniti quod porro sed quisquam saepe. Numquam mollitia recusandae 
                                non ad at et a.<br/><br/>

                                Ad vitae recusandae odit possimus. Quaerat 
                                cum ipsum corrupti. Odit qui asperiores ea 
                                corporis deserunt veritatis quidem expedita 
                                perferendis. Qui rerum eligendi ex doloribus 
                                quia sit. Porro rerum eum eum.
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Body;