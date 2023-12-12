import React from 'react'
import DashBoard from './page'

export default function InnerLayout({children}) {
  return (
    <div>
      <DashBoard>
          {children}
      </DashBoard>
    </div>
  )
}
