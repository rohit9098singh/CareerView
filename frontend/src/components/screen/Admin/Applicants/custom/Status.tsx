import { CircleCheckBig, CircleX, Clock, FileWarning } from "lucide-react"

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gray-100 text-gray-800"
    case "reviewing":
      return "bg-purple-100 text-purple-800"
    case "accepted":
      return "bg-green-100 text-green-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-2 w-2 rounded-full text-yellow-500 mr-2" />
    case "Interview Schedule":
      return <FileWarning className="h-2 w-2 rounded-full text-purple-500 mr-2" />
    case "accepted":
      return <CircleCheckBig className="h-2 w-2 rounded-full text-green-500 mr-2" />
    case "rejected":
      return <CircleX className="h-2 w-2 rounded-full text-red-500 mr-2" />
    default:
      return null
  }
}