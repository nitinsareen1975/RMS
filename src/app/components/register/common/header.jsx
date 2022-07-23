import React, { Component } from "react";
export default class TeleHeader extends Component {
    render() {
        return (
            <div>
            <link rel='stylesheet' id='boot-style-css'  href='https://telestarhealth.com/wp-content/themes/telestarhealth/css/bootstrap.min.css' media='all' />
            <header className="TeleHeader">
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                <div className="site-logo faux-heading">
                    <a href="https://telestarhealth.com/" className="custom-logo-link" rel="home" aria-current="page">
                    <img src="https://telestarhealth.com/wp-content/uploads/2022/03/telestar-logo.png" className="custom-logo" alt="Telestar Health" />
                    </a>
        
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <nav className="primary-menu-wrapper" aria-label="Horizontal">
                    <ul className="primary-menu reset-list-style">
                        <li id="menu-item-23" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-7 current_page_item menu-item-23">
                        <a href="https://telestarhealth.com/" aria-current="page">Home</a>
                        </li>
                        <li id="menu-item-25" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-25">
                        <a href="https://telestarhealth.com/about-us/">About Us</a>
                        </li>
                        <li id="menu-item-28" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-28">
                        <a href="https://telestarhealth.com/tests/">Tests</a>
                        </li>
                        <li id="menu-item-27" className="btn-outline menu-item menu-item-type-post_type menu-item-object-page menu-item-27">
                        <a href="https://telestarhealth.com/contact-us/">Contact Us</a>
                        </li>
                        <li id="menu-item-26" className="btn-theme menu-item menu-item-type-post_type menu-item-object-page menu-item-26">
                        <a href="https://telestarhealth.com/book-appointment/">Book Appointment</a>
                        </li>
                    </ul>
                    </nav>
                </div>
                </div>
            </nav>
            </header>
            <div className="admin-inner-page-banner" style={{ backgroundImage: "url('https://telestarhealth.com/wp-content/uploads/2022/03/contact-page-banner-1200x333.jpg')" }}>
                    <div className="container pb-5 pt-5">
                        <div className="page-banner-content">                           
                            <h1>Book Your Appointment</h1>
                        </div>
                    </div>
                </div>
</div>
       );
    }
}