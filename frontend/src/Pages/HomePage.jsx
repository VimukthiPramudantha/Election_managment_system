import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/SideBar'

function HomePage() {
  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="body-container">
          <h1>Main Content</h1>
          <p>This is the body content that remains unaffected by sidebar expansion.</p>
        </main>
      </div>
    </div>
  )
}

export default HomePage