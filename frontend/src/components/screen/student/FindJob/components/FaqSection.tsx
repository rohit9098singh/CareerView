"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FaqSection=()=> {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left font-medium cursor-pointer">How do I apply for a job?</AccordionTrigger>
          <AccordionContent>
            Click the Apply Now button on any job listing. You&quot;ll be directed to the application form where you can
            submit your resume and cover letter.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left font-medium cursor-pointer">Can I save jobs for later?</AccordionTrigger>
          <AccordionContent>
            Yes, you can bookmark jobs by clicking the save icon on any job listing. You can access your saved jobs from
            your profile dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left font-medium cursor-pointer">How can I track my applications?</AccordionTrigger>
          <AccordionContent>
            All your applications are tracked in the My Applications section of your profile. You can see their status
            and any messages from employers.
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


