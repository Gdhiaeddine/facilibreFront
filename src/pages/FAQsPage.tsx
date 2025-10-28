import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageLayout from "@/components/layout/PageLayout";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FAQsPage = () => {
  const { t } = useLanguage();
  
  const faqs = [
    {
      question: "How do installment payments work?",
      answer: "Our installment payments allow you to divide the total cost of your purchase into equal monthly payments. You'll make an initial payment at checkout, and the remaining balance will be automatically charged to your payment method in regular intervals."
    },
    {
      question: "Do I need to create an account for installment plans?",
      answer: "Yes, an account is required for installment plans as we need to store your payment information and installment schedule. For immediate full payments, you can checkout as a guest without creating an account."
    },
    {
      question: "Are there any interest charges or hidden fees?",
      answer: "No, we don't charge any interest or additional fees for our standard installment plans. The price you see is divided equally across your payments with no extra charges."
    },
    {
      question: "What payment methods can I use for installments?",
      answer: "We accept all major credit cards for installment plans. Debit cards may also be used depending on your bank's policies regarding recurring payments."
    },
    {
      question: "What happens if I miss a payment?",
      answer: "If a payment fails, we'll notify you immediately and attempt to process the payment again in 3 days. Multiple failed payments may result in the remaining balance becoming due immediately."
    },
    {
      question: "Can I pay off my installment plan early?",
      answer: "Yes, you can pay off your remaining balance at any time without any penalties or additional fees. This can be done through your account dashboard."
    },
    {
      question: "How are refunds handled for items purchased with installments?",
      answer: "If you return an item purchased with installments, any payments you've already made will be refunded to your original payment method, and future scheduled payments will be canceled."
    },
    {
      question: "Is there a limit to how many installment plans I can have?",
      answer: "There's no specific limit, but approval for multiple installment plans depends on your payment history with us and other factors."
    }
  ];

  return (
    <PageLayout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-4">Our customer service team is here to help you with any other questions you might have.</p>
          <a href="/contact" className="text-primary hover:underline">Contact us</a>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQsPage;
