import React from 'react'

const currentYear = () => {
    const d = new Date();
    let year = d.getFullYear();
    return year
  }

const Footer = () => {
    return (
        <footer className="footer">
            <div>
                Copyright © {currentYear()}. Equipment Monitoring System.
            </div>
      </footer>
    )
}

export default Footer