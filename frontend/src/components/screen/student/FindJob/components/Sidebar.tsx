import React from 'react'
import FaqSection from './FaqSection'
import JobSearchTips from './JobSearchTips'
import HelpSection from './HelpSection'

const Sidebar = () => {
  return (
    <div className="space-y-6">
    <FaqSection />
    <JobSearchTips />
    <HelpSection />
  </div>
  )
}

export default Sidebar
