import React from 'react';
import './projectimgviewer.css';
import { FiExternalLink } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ProjectImgViewerProps {
    imageToShow: string;
    projectName: string;
    projectImageClicked: string;
    resetProjectImageClicked: () => void;
}

export default function ProjectImgViewer({ imageToShow, projectName, projectImageClicked, resetProjectImageClicked }: ProjectImgViewerProps) {

    const handleProjectUtilsClick = () => {
        resetProjectImageClicked();
    };

    return (
        <div className='project-image-overlay' style={{display: projectImageClicked}}>
            <div className='project-utils' onClick={handleProjectUtilsClick}>
                <button type='button' title='Go to Website' className='go-to-website-btn'>
                    <FiExternalLink/>
                </button>
                <button type='button' title='Close' className='close-btn'>
                    <IoCloseCircleOutline/>
                </button>
            </div>
            <div className='project-image-space'>
                <TransformWrapper>
                    <TransformComponent>
                        <img src={imageToShow} alt={`${projectName} image loading!`} className='project-image'></img>    
                    </TransformComponent>  
                </TransformWrapper>               
            </div> 
        </div>
    )
}