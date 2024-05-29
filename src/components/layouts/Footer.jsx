import React from 'react'

import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="img__container">
            <a href='https://github.com/OlegBandrivskiy26' className="github"></a>
            <a href='https://mail.google.com/mail/u/0/#inbox' className="email"></a>
        </div>
        <div className="container__txt">
            <h3 className="copyright">© 2024 by Oleg Bandrivskiy</h3>
        </div>
        <div className="container__link">
            <a href='https://rickandmortyapi.com/documentation/'><span>API</span></a>
        </div>
    </footer>
  )
}

export default Footer
