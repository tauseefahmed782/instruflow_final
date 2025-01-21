import React from 'react'
import '../assets/css/contact.scss';
import Header from './Header';
import Footer from './Footer';

const ContactForm = () => {
  return (
    <div>
        <Header/>
           <section className="banner-contact" >
            <div className="detail">
                <div className="sub">
                    <hr />
                    <span>Contact us</span>
                </div>
                <h1>We'd love to hear from you</h1>
                <p className='' style={{color : '#fff'}}>Have any question in mind or want to enquire? Please feel free to contact us through the form or the following details.</p>
            </div>

            <div className="contact-info">
                <div className="block">
                    <h3>Let's talk! </h3>
                    <p><a href="tel:+888-888-888">888-888-888</a> <a href="mailto:hello@Lorem.com">hello@Lorem.com</a></p>
                </div>
                <div className="block">
                    <h3>Headoffice</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
                </div>
                <div className="block">
                    <h3>Branch Office</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </p>
                </div>
                <div className="block">
                    <a href=""><i className="fa-brands fa-facebook"></i></a>
                    <a href=""><i className="fa-brands fa-twitter"></i></a>
                    <a href=""><i className="fa-brands fa-linkedin"></i></a>
                </div>
            </div>
        </section>

     
        <section className="form-contact">
            <form action="">
                <div className="form-container">
                    <div className="textBx">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" name="fname" placeholder="John" />
                    </div>
                    <div className="textBx">
                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" name="lname" placeholder="Doe" />
                    </div>
                    <div className="textBx">
                        <label for="email">Email Id</label>
                        <input type="email" id="email" name="email" placeholder="johndoe@gmail.com" />
                    </div>
                    <div className="textBx">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Subject" />
                    </div>
                    <div className="textBx">
                        <label for="message">Message</label>
                        <textarea name="message" id="message" placeholder="Type your message..." rows="7"></textarea>
                    </div>
                    <div className="textBx">
                        <button type="submit">Send message</button>
                    </div>
                </div>
            </form>
        </section>
        <section className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30274.804670210287!2d73.87293965390325!3d18.46777243736982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea8a75f1ed4f%3A0xcc6015e2f426fa4a!2sKondhwa%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1722265649228!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>
         {/* <Footer/> */}
    </div>
  )
}

export default ContactForm