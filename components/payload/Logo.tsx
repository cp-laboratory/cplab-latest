'use client'

import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/cpl-logo.png" 
        alt="CPLab Logo" 
        style={{ 
          height: '40px', 
          width: '40px',
          objectFit: 'contain'
        }} 
      />
      <span style={{ 
        fontSize: '18px', 
        fontWeight: 'bold',
        color: 'currentColor'
      }}>
        CPLab
      </span>
    </div>
  )
}

export default Logo

