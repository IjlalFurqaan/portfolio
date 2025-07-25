import React, { useState, useRef, useCallback } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Memoized form handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all duration-300"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all duration-300"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Subject Field */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all duration-300"
                  placeholder="Subject"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-all duration-300 resize-none"
                  placeholder="Your Message"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-slate-900 border-t-transparent" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                <p className="text-green-300 font-medium">Message sent successfully!</p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-400/20 rounded-full">
                    <Mail className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-blue-200">ijlalfurqaan5@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-400/20 rounded-full">
                    <Phone className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-blue-200">+49 152 15155020</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-400/20 rounded-full">
                    <MapPin className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-blue-200">Marburg, Germany</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/IjlalFurqaan"
                  className="p-3 bg-white/10 rounded-full text-white hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ijlal-furqaan32b7251b6/"
                  className="p-3 bg-white/10 rounded-full text-white hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:ijlalfurqaan5@gmail.com"
                  className="p-3 bg-white/10 rounded-full text-white hover:bg-amber-400 hover:text-slate-900 transition-all duration-300 hover:scale-110"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">Availability</h3>
              <p className="text-green-200 mb-4">
                Currently pursuing Master's in Computer Science and open to internship opportunities and part-time positions in software development.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 font-medium">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;