import { CheckCircle } from "lucide-react"

const JobSearchTips = () => {
  const tips = [
    "Complete your profile to increase visibility to employers",
    "Set up job alerts to get notified about new opportunities",
    "Tailor your resume for each application",
    "Research companies before applying or interviewing",
  ]

  return (
    <div className="bg-background p-8 rounded-3xl shadow-lg border border-primary/5 bg-gradient-to-br from-primary/5 to-transparent">
      <h2 className="text-2xl font-black text-foreground mb-6 tracking-tight italic">Pro Tips</h2>
      <ul className="space-y-4">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 bg-primary/10 p-1 rounded-full flex-shrink-0">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <span className="text-foreground font-bold text-sm leading-snug">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default JobSearchTips
