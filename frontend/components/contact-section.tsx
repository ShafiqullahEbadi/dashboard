"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import useAddMessage from "@/hooks/use-add-reel";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

// Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function ContactSection() {
  const sendMessage = useAddMessage();
  const { toast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage.mutateAsync(form);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
      setModalOpen(true)
    } catch (err: Error | any) {
      setErrorMessage(err.response?.data?.message)
    }
  };

  return (
    <section
      id="contact"
      className="py-16 mt-10 md:py-20 bg-background dark:bg-[#0F172B]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-3 md:mb-4">
            Get In{" "}
            <span className="text-secondary dark:text-[#ffd83f]">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground dark:text-[#e5e7eb] max-w-2xl mx-auto leading-relaxed">
            Ready to start your next project? Contact us today for a free
            consultation and let's bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-4 lg:space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Mail,
                title: "Email Us",
                info: "hello@webify.dev",
                bg: "bg-secondary/10",
                color: "text-secondary",
              },
              {
                icon: Phone,
                title: "Call Us",
                info: "+1 (555) 123-4567",
                bg: "bg-accent/10",
                color: "text-accent",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "123 Tech Street, Digital City",
                bg: "bg-destructive/10",
                color: "text-destructive",
              },
              {
                icon: Clock,
                title: "Business Hours",
                info: "Mon-Fri: 9AM-6PM",
                bg: "bg-secondary/10",
                color: "text-secondary",
              },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <Card className="border-border/50 bg-card dark:bg-[#1e293b]">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center dark:bg-opacity-20`}
                      >
                        <item.icon
                          className={`h-6 w-6 ${item.color} dark:text-[#ffd83f]`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground dark:text-white text-sm sm:text-base">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground dark:text-[#e5e7eb] text-xs sm:text-sm">
                          {item.info}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <Card className="border-border/50 bg-card dark:bg-[#1e293b]">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-foreground dark:text-white">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form
                  className="space-y-4 sm:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {errorMessage && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground dark:text-white mb-1 sm:mb-2"
                      >
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="bg-input dark:bg-[#374151] border-border dark:border-[#4b5563] focus:ring-ring dark:focus:ring-[#ffd83f]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground dark:text-white mb-1 sm:mb-2"
                      >
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="bg-input dark:bg-[#374151] border-border dark:border-[#4b5563] focus:ring-ring dark:focus:ring-[#ffd83f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground dark:text-white mb-1 sm:mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="bg-input dark:bg-[#374151] border-border dark:border-[#4b5563] focus:ring-ring dark:focus:ring-[#ffd83f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground dark:text-white mb-1 sm:mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="bg-input dark:bg-[#374151] border-border dark:border-[#4b5563] focus:ring-ring dark:focus:ring-[#ffd83f]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground dark:text-white mb-1 sm:mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="bg-input dark:bg-[#374151] border-border dark:border-[#4b5563] focus:ring-ring dark:focus:ring-[#ffd83f] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sendMessage.isPending}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 dark:bg-[#ffd83f] dark:text-[#023f78] dark:hover:bg-[#ffe566] font-semibold py-3 sm:py-4 flex items-center justify-center"
                  >
                    {sendMessage.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      {/*Modal*/}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-full max-w-full sm:max-w-md">
          <div className="space-y-4">
            <label className="block font-medium">Your message have been submitted successfully. We will contact you soon!</label>
          </div>
          <DialogFooter className="flex flex-wrap justify-end gap-2 mt-4">
            <Button onClick={() => setModalOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
