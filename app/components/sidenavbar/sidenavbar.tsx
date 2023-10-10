"use client"

import './sidenavbar.css'
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref: any, handleOutsideClick: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleOutsideClick();
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, handleOutsideClick]);
  }

export default function SideNavBar() {
    const disclosureBtnRef = useRef(null);

    const [isMenuBtnFocused, setIsMenuBtnFocused] = useState(false);
    const [isDisclosureBtnFocused, setIsDisclosureBtnFocused] = useState(false);


    const handleMenuBtnFocused = () => {
        setIsMenuBtnFocused(!isMenuBtnFocused);
        setIsDisclosureBtnFocused(!isDisclosureBtnFocused);
    }

    const handleOutsideClick = () => {
        setIsMenuBtnFocused(false);
        setIsDisclosureBtnFocused(false);
    }

    useOutsideAlerter(disclosureBtnRef, handleOutsideClick);

    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className ={isMenuBtnFocused ? "disclosureBtnFocused" : "disclosureBtn"} ref={disclosureBtnRef}>
                    <GiHamburgerMenu className={isMenuBtnFocused ? "menuBtnFocused" : "menuBtn"} aria-hidden="true" onClick={handleMenuBtnFocused}/>
                </Disclosure.Button> 
            </Disclosure>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/projects">Projects</Link>
        </div>
    )
}