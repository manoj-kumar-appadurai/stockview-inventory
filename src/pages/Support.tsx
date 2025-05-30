import React, { useState } from 'react';
import PageTitle from '@/components/shared/PageTitle';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, MessageSquare, FileQuestion, Phone, Users, UserCog, BarChart3, Settings, Package } from 'lucide-react';
import { toast } from 'sonner';

// FAQ Data
const faqs = [
  {
    question: "How do I add a new inventory item?",
    answer: "To add a new inventory item, navigate to the Inventory page and click the 'Add New Product' button. Fill in the required information in the form and click 'Add Product'."
  },
  {
    question: "How can I track low stock items?",
    answer: "Low stock items are automatically highlighted in the inventory list with a 'Low Stock' status badge. You can also see them summarized on the Dashboard under Critical Stock."
  },
  {
    question: "How do I export inventory data?",
    answer: "On the Inventory page, click the 'Export' button and select your preferred format: PDF, Excel, or copy to clipboard."
  },
  {
    question: "How do I add a new vendor?",
    answer: "Navigate to the Vendors page and click the 'Add Vendor' button. Complete the vendor details form and save."
  },
  {
    question: "Can I assign multiple roles to a user?",
    answer: "Yes, you can assign multiple roles to users. Go to the Manage Roles page, and add the user to each role you want them to have."
  },
  {
    question: "How do I update stock quantities?",
    answer: "Click on an item in the Inventory list to open the details drawer. From there, you can edit the item including its stock quantity."
  },
  {
    question: "Is there a way to set stock alerts?",
    answer: "Yes, you can configure stock threshold alerts in the Settings section. When an item falls below the threshold, it will be marked as 'Low Stock'."
  },
];

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! Our team will get back to you soon.");
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  return (
    <>
      <PageTitle 
        title="Support Center"
        description="Get help and support for your inventory management system"
      />
      
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="faq" className="flex items-center">
            <FileQuestion className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact Us
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Guides
          </TabsTrigger>
        </TabsList>
        
        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about using the StockView system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Contact Us Tab */}
        <TabsContent value="contact">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Contact Support Team</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input 
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactFormChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Other ways to get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">Phone Support</h4>
                    <p className="text-sm text-gray-500">Available Monday-Friday, 9AM-5PM</p>
                    <p className="text-sm mt-1">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">Email Support</h4>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    <p className="text-sm mt-1">support@stockview.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-primary mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium">Knowledge Base</h4>
                    <p className="text-sm text-gray-500">Browse our help articles</p>
                    <Button variant="link" className="p-0 h-auto text-sm text-primary">Visit Knowledge Base</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Help Guides Tab */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help Guides</CardTitle>
              <CardDescription>
                Step-by-step guides to help you get the most out of StockView
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Getting Started",
                    description: "Learn the basics of using StockView for inventory management",
                    icon: <FileQuestion className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Inventory Management",
                    description: "How to add, edit, and track inventory items",
                    icon: <Package className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Vendor Management",
                    description: "Managing your supplier relationships effectively",
                    icon: <Users className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "User Roles & Permissions",
                    description: "Setting up proper access controls for your team",
                    icon: <UserCog className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "Reporting & Analytics",
                    description: "Getting insights from your inventory data",
                    icon: <BarChart3 className="h-8 w-8 text-primary" />
                  },
                  {
                    title: "System Settings",
                    description: "Configuring StockView to fit your business needs",
                    icon: <Settings className="h-8 w-8 text-primary" />
                  },
                ].map((guide, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-3 p-3 bg-primary/10 rounded-full">
                          {guide.icon}
                        </div>
                        <h3 className="font-medium text-lg mb-1">{guide.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{guide.description}</p>
                        <Button variant="outline" className="w-full">View Guide</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                Can't find what you need? <Button variant="link" className="p-0 h-auto">Contact Support</Button>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Support;
