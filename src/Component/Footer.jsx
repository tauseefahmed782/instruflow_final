import React from 'react'
import BrandLogo from "../assets/Logo.svg"



function Footer() {
 
  return (
    <>
      <footer >
      <div className="info-links">
        <div className="info">
          <div className="logo4">
            <img src={BrandLogo} alt="Logo"/>
          </div>
          <div className="details">
            <h4 style={{lineHeight:"",opacity:"0.8" , fontWeight : '400'}}>Instruflow is a leading distributor of high pressure autoclave reactors, bioreactors, supercritical fluid
              extraction systems, pressure vessels, mass flow controllers & furnaces in Australia & NZ</h4>
          </div>
        </div>

        <div className="links">
          <div className="usefuls">
            <h3>Useful Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="">Privacy Policy</a></li>
            </ul>
           
          </div>
          <div className="services">
            <h3>Our Services</h3>
            <ul>
              <li><a href="/Flow">Flow</a></li>
              <li><a href="/Pressure">Pressure</a></li>
              <li><a href="/Temprature">Temperature</a></li>
              <li><a href="/Sample-Preparation">Sample Preparation</a></li>
              <li><a href="/HeatExchangers">Heat Exchangers</a></li>
              <li><a href="#">Supercritical</a></li>
              <li><a href="#">Applications</a></li>
            </ul>
          </div>
          <div className="social">
            <h3>Social</h3>
            <ul>
            
              <li><a href="https://www.linkedin.com/company/instruflow-pty-ltd/" target="_blank">
              <i className="fa fa-linkedin text-primary"></i>
            </a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="contact">
        <div className="info">
          <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
          <div className="detail">
            <h4 style={{color:"black"}}>Our Location</h4>
            <p><a href="" target="_blank" rel="noopener noreferrer">Suite 526, UL40, Level 2 1341
              Dandenong rd, Chadstone, Victoria 3148</a></p>
          </div>
        </div>
        <div className="info">
          <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
          <div className="detail">
            <h4 style={{color:"black"}}>Email Us</h4>
            <p><a href="mailto:sales@instruflow.com.au">sales@instruflow.com.au</a></p>
          </div>
        </div>
        <div className="info">
          <div className="icon"><i className="fa fa-phone"></i></div>
          <div className="detail">
            <h4 style={{color:"black"}}>Phone Number</h4>
            <p><a href="tel:+61435454918">+61435454918</a></p>
          </div>
        </div>
      </div>

      <div className="copy">
        <p>Copyright © Site 2024. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default Footer
