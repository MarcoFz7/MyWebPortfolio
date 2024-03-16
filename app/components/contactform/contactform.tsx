import './contactform.css'
import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { IoSend } from 'react-icons/io5';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
    emailBtnClicked: boolean;
    onEmailBtnProcessed: () => void;
}

const ContactForm = ({ emailBtnClicked, onEmailBtnProcessed } : ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [needsUserEmail, setNeedsUserEmail] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [needsUserMessage, setNeedsUserMessage] = useState(false);

  const [isFormHighlighted, setIsFormHighlighted] = useState(false);

  const [needRecaptcha, setNeedRecaptcha] = useState(true);
  let recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (emailBtnClicked) {
      setIsFormHighlighted(true);

      setTimeout(() => {
        setIsFormHighlighted(false);
      }, 500);

      onEmailBtnProcessed();
    }
  }, [emailBtnClicked, onEmailBtnProcessed]);

  const handleUserEmail = (event: any) => {
    setUserEmail(event?.target.value);
  }

  const handleUserMessage = (event: any) => {
    setUserMessage(event?.target.value);
  }

  const sendEmail = (event: any) => {  
    event.persist();
    event.preventDefault();
    console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

    console.log(needRecaptcha);
    if (!needRecaptcha) {
        if(userEmail != "" && userMessage != "") {
            setIsSubmitting(true);
            setNeedsUserEmail(false);
            setNeedsUserMessage(false);

            emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
                event.currentTarget.closest('form'),
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_ID,
            )
            .then(
                () => {
                    setStateMessage('Message sent!');
                    setIsSubmitting(false);
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setNeedRecaptcha(true);
                    setTimeout(() => {
                        setStateMessage("");   
                    }, 3000);
                    },
                    (error) => {
                    //console.log(error);
                        setStateMessage('Something went wrong!');
                        setIsSubmitting(false);
                        setTimeout(() => {
                            setStateMessage("");
                        }, 3000); 
                    }
                );

                // Clears the form after sending the email
                event.currentTarget.closest('form').reset();
                setUserEmail("");
                setUserMessage("");

            } else {
                if (userEmail == "" && userMessage == "") {
                    setNeedsUserEmail(true);
                    setNeedsUserMessage(true);
                } else {
                    if (userEmail == "") {
                        setNeedsUserEmail(true);
                        setNeedsUserMessage(false);
                    } else {
                        setNeedsUserMessage(true);
                        setNeedsUserEmail(false);
                    }
                }
            }    
        } else {
            setStateMessage('You are a robot!');
            setIsSubmitting(false);
            setTimeout(() => {
                setStateMessage("");          
            }, 3000);
            setNeedRecaptcha(true);
        }  
    };

    return (
        <div className="contact-form">
            <div className='contact-header'>
                Send me an <strong>email</strong>!
                <form className="form" onSubmit={sendEmail}>
                    <label className='form-label' id='form-name'>
                        Name
                    </label>
                    <input className={`form-input${isFormHighlighted ? '-highlighted' : ''}`} type="text" name="userName" placeholder='ex. Marco Ferraz'/>
                    <div className='form-label-space'>
                        <label className='form-label'>
                            Email&nbsp;<strong>*</strong>
                        </label>
                        <label className={`form-required${(needsUserEmail || isFormHighlighted) ? '-highlighted' : ''}`}>
                            Required!
                        </label>
                    </div>
                    <input className={`form-input${isFormHighlighted ? '-highlighted' : ''}`} type="email" name="userEmail" placeholder='ex. mymail@gmail.com' onBlur={handleUserEmail}/>
                    <div className='form-label-space'>
                        <label className='form-label'>
                            Message&nbsp;<strong>*</strong>
                        </label>
                        <label className={`form-required${(needsUserMessage || isFormHighlighted) ? '-highlighted' : ''}`}>
                            Required!
                        </label>
                    </div>
                    <textarea className={`form-input${isFormHighlighted ? '-highlighted' : ''}`} id='form-message' name="message" placeholder='ex. Hello World...' onBlur={handleUserMessage}/>
                    <ReCAPTCHA
                        className='g-recaptcha'
                        ref={recaptchaRef}
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}                 
                        onChange={() => setNeedRecaptcha(false)}
                        hl="en"
                        data-size="compact"
                    />
                    <div className='form-send-space'>
                        {stateMessage && <p className='form-send-response'>{stateMessage}</p>}
                        <button className='form-send-btn' type="submit" disabled={isSubmitting}>
                            <span>Send</span>
                            <IoSend/>
                        </button>
                    </div>
                </form>
            </div>  
        </div>
    );
};

export default ContactForm;
