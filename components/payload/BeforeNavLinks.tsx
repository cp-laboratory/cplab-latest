'use client'

import React from 'react'
import Link from 'next/link'

export const BeforeNavLinks: React.FC = () => {
  return (
    <div className="nav__wrap">
      <Link 
        href="/" 
        className="nav__link"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          color: 'var(--theme-text)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--theme-elevation-150)',
        }}
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        <span>Home</span>
      </Link>
    </div>
  )
}
