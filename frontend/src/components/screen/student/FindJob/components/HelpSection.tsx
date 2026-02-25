import { Button } from "@/components/ui/button"

const HelpSection = () => {
  return (
    <div className="bg-primary p-8 rounded-3xl shadow-xl shadow-primary/20 text-primary-foreground relative overflow-hidden group">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />
      <h2 className="text-2xl font-black mb-3 tracking-tight italic">Need Help?</h2>
      <p className="text-primary-foreground/80 mb-6 font-medium leading-relaxed">
        Our support team is ready to assist you with any questions about job listings or the application process.
      </p>
      <Button variant="secondary" className="w-full h-11 font-black shadow-lg">Contact Support</Button>
    </div>
  )
}

export default HelpSection;
