import './contactform.css'
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { IoSend } from 'react-icons/io5';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [needsUserEmail, setNeedsUserEmail] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [needsUserMessage, setNeedsUserMessage] = useState(false);

  const handleUserEmail = (event: any) => {
    setUserEmail(event?.target.value);
  }

  const handleUserMessage = (event: any) => {
    setUserMessage(event?.target.value);
  }

  const sendEmail = (event: any) => {
    event.persist();
    event.preventDefault();
    if(userEmail != "" && userMessage != "") {
        setIsSubmitting(true);
        setNeedsUserEmail(false);
        setNeedsUserMessage(false);

        emailjs.sendForm(
            "service_7jmfr1b",
            "template_d2pevgg",
            event.currentTarget.closest('form'),
            "bygrXsuYEhUOtdzR6z"
        )
        .then(
            () => {
            setStateMessage('Message sent!');
                setIsSubmitting(false);
                setTimeout(() => {
                    setStateMessage("");
                }, 3000);
                },
                (error) => {
                console.log(error);
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
    };

    return (
        <div className="contact-form">
            <div className='contact-header'>
                Send me an <strong>email</strong>!
                <form className="form" onSubmit={sendEmail}>
                    <label className='form-label' id='form-name'>
                        Name
                    </label>
                    <input className='form-input' type="text" name="userName" placeholder='ex. Marco Ferraz'/>
                    <div className='form-label-space'>
                        <label className='form-label'>
                            Email&nbsp;<strong>*</strong>
                        </label>
                        {needsUserEmail && (
                            <label className='form-required'>
                                Required!
                            </label>
                         )}
                    </div>
                    <input className='form-input' type="email" name="userEmail" placeholder='ex. mymail@gmail.com' onBlur={handleUserEmail}/>
                    <div className='form-label-space'>
                        <label className='form-label'>
                            Message&nbsp;<strong>*</strong>
                        </label>
                        {needsUserMessage && (
                            <label className='form-required'>
                                Required!
                            </label>
                        )}
                    </div>
                    <textarea className='form-input' id='form-message' name="message" placeholder='ex. Hello World...' onBlur={handleUserMessage}/>
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
