import { CheckCircle } from "lucide-react"

const  JobSearchTips=()=> {
  const tips = [
    "Complete your profile to increase visibility to employers",
    "Set up job alerts to get notified about new opportunities",
    "Tailor your resume for each application",
    "Research companies before applying or interviewing",
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Job Search Tips</h2>
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default JobSearchTips
