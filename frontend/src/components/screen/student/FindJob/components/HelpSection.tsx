import { Button } from "@/components/ui/button"

const HelpSection=()=> {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
      <p className="text-gray-700 mb-4">
        Our support team is ready to assist you with any questions about job listings or the application process.
      </p>
      <Button className="w-full cursor-pointer bg-purple-500 hover:bg-purple-600">Contact Support</Button>
    </div>
  )
}

export default HelpSection;
