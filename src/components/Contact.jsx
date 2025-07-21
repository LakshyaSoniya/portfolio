import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { toast } from 'react-toastify'

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef()
  const isInView = useInView(ref, { once: true })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Set a timeout for the request
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
      toast.warning('⏰ Request timed out. Please try again or contact me directly at thelakshya31@gmail.com', {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }, 5000) // 5 second timeout

    try {
      // Using Web3Forms - a more reliable service
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY', // Replace with actual key from web3forms.com
          name: formData.name,
          email: formData.email,
          message: formData.message,
          to: 'thelakshya31@gmail.com',
          subject: `New Portfolio Contact Message from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email
        }),
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success('✅ Message sent successfully! I\'ll get back to you soon.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          setFormData({
            name: '',
            email: '',
            message: ''
          })
        } else {
          toast.error('❌ Failed to send message. Please try again or contact me directly at thelakshya31@gmail.com', {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
      } else {
        toast.error('❌ Failed to send message. Please try again or contact me directly at thelakshya31@gmail.com', {
          position: "top-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      clearTimeout(timeoutId)
      console.error('Email sending failed:', error)
      toast.error('❌ Failed to send message. Please try again or contact me directly at thelakshya31@gmail.com', {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const slideInFromRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const slideInFromBottom = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-white dark:bg-gray-900" 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants}>
          <motion.div variants={slideInFromBottom} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={slideInFromLeft} className="space-y-8">
              <div>
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Get in Touch
                </motion.h3>
                <div className="space-y-4">
                  {/*
                    { icon: Mail, label: "Email", value: "huzaif@example.com" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Location", value: "San Francisco, CA" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
                    >
                      <item.icon className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                        <div className="font-medium text-gray-900 dark:text-white">{item.value}</div>
                      </div>
                    </motion.div>
                  ))}
                  */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <Mail className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                      <div className="font-medium text-sky-400">thelakshya31@gmail.com</div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <Phone className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Phone</div>
                      <div className="font-medium text-gray-900 dark:text-white">+91 7877941075</div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md"
                  >
                    <MapPin className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                      <div className="font-medium text-gray-900 dark:text-white">Naguar, Rajasthan</div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <motion.h4 
                  className="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  Follow Me
                </motion.h4>
                <motion.div 
                  className="flex space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {/* {{{
                    { icon: Github, href: "#", color: "hover:text-gray-900" },
                    { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                    { icon: Twitter, href: "#", color: "hover:text-blue-400" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className={`p-3 bg-gray-50 dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 ${social.color} transition-colors`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                 }}} */}
                  <motion.a
                    href="https://github.com/Lakshya-jangid-08"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/lakshya-jangid-0562502a2/?originalSubdomain=in"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/thelakshya31/"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full shadow-md text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={slideInFromRight}>
              <div className="mb-6">
              <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-xl shadow">
                ⚠️ This contact form is currently not working. Please reach out directly at <span className="font-semibold">thelakshya31@gmail.com</span>.
              </div>
            </div>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields with sliding animations */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <label htmlFor="name" className="block mb-2 font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                    placeholder="What's your name?"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                    placeholder="What's your email address?"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-white">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                    placeholder="What you want to say?"
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                  className={`w-full px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isLoading 
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } text-white`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
