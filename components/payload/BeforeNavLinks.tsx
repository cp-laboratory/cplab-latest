'use client'

import React from 'react'

export const BeforeNavLinks: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.location.href = '/'
  }

  return (
    <div className="nav__wrap">
      <a 
        href="/" 
        onClick={handleClick}
        className="nav__link"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'left',
          color: 'var(--theme-text)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <span>Home</span>
      </a>
    </div>
  )
}
