"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FaqSection = () => {
  return (
    <div className="bg-background p-8 rounded-3xl shadow-lg border border-primary/5">
      <h2 className="text-2xl font-black text-foreground mb-6 tracking-tight italic">Common Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-secondary">
          <AccordionTrigger className="text-left font-bold text-foreground py-4 hover:text-primary transition-colors">How do I apply for a job?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-medium pb-4">
            Click the &quot;View Details&quot; button on any job listing. You&apos;ll be directed to the job details page where you can submit your application.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-secondary">
          <AccordionTrigger className="text-left font-bold text-foreground py-4 hover:text-primary transition-colors">Can I save jobs for later?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-medium pb-4">
            Yes, you can bookmark jobs by clicking the save icon. Access your saved jobs anytime from your student dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-secondary">
          <AccordionTrigger className="text-left font-bold text-foreground py-4 hover:text-primary transition-colors">How can I track applications?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-medium pb-4">
            All your applications are tracked in the &quot;Applied Jobs&quot; section. You can see real-time status updates from employers.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left font-medium cursor-pointer">What makes a strong application?</AccordionTrigger>
          <AccordionContent>
            A tailored resume highlighting relevant skills, a personalized cover letter addressing the company&quot;s needs,
            and complete profile information all contribute to a strong application.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default FaqSection;


