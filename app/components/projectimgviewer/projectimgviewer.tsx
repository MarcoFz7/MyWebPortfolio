import React, { useState } from 'react';
import './projectimgviewer.css';
import { FiExternalLink } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ProjectImgViewerProps {
    imagesToShow: string[];
    projectName: string;
    projectImageClicked: string;
    resetProjectImageClicked: () => void;
}

export default function ProjectImgViewer({ imagesToShow, projectName, projectImageClicked, resetProjectImageClicked }: ProjectImgViewerProps) {

    const handleCloseProjectImagesViewerClick = () => {
        resetProjectImageClicked();
        setCurrentImageIndex(0);
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imagesToShow.length) % imagesToShow.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToShow.length);
    };

    return (
        <div className='project-image-overlay' style={{display: projectImageClicked}}>
            <div className='project-utils'>
                <button type='button' title='Go to Website' className='go-to-website-btn'>
                    <FiExternalLink/>
                </button>
                <button type='button' title='Previous Image' className='previous-image-btn' onClick={handleNextImage}>
                    <MdOutlineKeyboardArrowLeft/>
                </button>
                <div className='image-counter'>{(currentImageIndex)+1}/{imagesToShow.length}</div>
                <button type='button' title='Next Image' className='next-image-btn' onClick={handlePreviousImage}>
                    <MdOutlineKeyboardArrowRight/>
                </button>
                <button type='button' title='Close' className='close-btn' onClick={handleCloseProjectImagesViewerClick}>
                    <IoCloseCircleOutline/>
                </button>
            </div>
            <div className='project-image-space'>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={imagesToShow[currentImageIndex]} alt={`${projectName} image loading!`} className='project-image'></img>    
                    </TransformComponent>  
                </TransformWrapper>               
            </div> 
        </div>
    )
}