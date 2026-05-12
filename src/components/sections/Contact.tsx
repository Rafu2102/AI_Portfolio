import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Loader2, ExternalLink } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import NeonButton from '../ui/NeonButton';
import { socialLinks } from '../../data/portfolio';
import useStore from '../../store/useStore';

export default function Contact() {
  const setCursorVariant = useStore((s) => s.setCursorVariant);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeLine, setActiveLine] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', message: '' });
  };

  const fields = [
    { name: 'name', label: 'name', type: 'text', placeholder: '你的名字' },
    { name: 'email', label: 'email', type: 'email', placeholder: 'you@example.com' },
    { name: 'message', label: 'message', type: 'textarea', placeholder: '想說些什麼...' },
  ];

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="聯絡我"
          subtitle="Contact"
          color="green"
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Terminal form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden border border-gray-800/50">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-gray-800/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-gray-300 flex items-center gap-1">
                  <Terminal size={12} />
                  contact_form.sh
                </span>
              </div>

              {/* Terminal body */}
              <form
                onSubmit={handleSubmit}
                className="p-6 bg-[#0a0a12] font-mono text-sm space-y-4"
              >
                {/* ASCII art header */}
                <div className="text-cyber-green/40 text-[10px] leading-tight whitespace-pre select-none mb-4">
{`  ╔══════════════════════════════════════╗
  ║     >> CONTACT TRANSMISSION <<      ║
  ╚══════════════════════════════════════╝`}
                </div>

                {fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="flex items-baseline gap-2 text-gray-300 text-xs">
                      <span className="text-cyber-green">
                        {activeLine === field.name ? '▶' : '$'}
                      </span>
                      <span>
                        input.{field.label}
                      </span>
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        onFocus={() => setActiveLine(field.name)}
                        onBlur={() => setActiveLine(null)}
                        placeholder={field.placeholder}
                        rows={4}
                        required
                        className="w-full bg-transparent border border-gray-800/50 rounded-lg px-4 py-3 text-cyber-green placeholder-gray-700 focus:border-cyber-green/50 focus:outline-none focus:shadow-[0_0_10px_rgba(57,255,20,0.1)] transition-all duration-300 resize-none"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        onFocus={() => setActiveLine(field.name)}
                        onBlur={() => setActiveLine(null)}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent border border-gray-800/50 rounded-lg px-4 py-3 text-cyber-green placeholder-gray-700 focus:border-cyber-green/50 focus:outline-none focus:shadow-[0_0_10px_rgba(57,255,20,0.1)] transition-all duration-300"
                        onMouseEnter={() => setCursorVariant('hover')}
                        onMouseLeave={() => setCursorVariant('default')}
                      />
                    )}
                  </div>
                ))}

                {/* Submit */}
                <div className="pt-2">
                  <NeonButton
                    variant="green"
                    size="md"
                    type="submit"
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin" />
                        傳送中...
                      </span>
                    ) : submitted ? (
                      <span>✓ 訊息已送出！</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send size={16} />
                        發送訊息
                      </span>
                    )}
                  </NeonButton>
                </div>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-cyber-green text-xs mt-2"
                  >
                    {'>'} transmission.status: SUCCESS ✓
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Info card */}
            <div className="glass neon-border rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <span className="text-cyber-cyan font-mono text-xs">//</span>
                與我連結
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                有任何專案合作的想法，或只是想聊聊？歡迎透過以下管道聯繫我。
              </p>

              {/* Social links */}
              <div className="space-y-2 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-200 hover:text-white transition-all duration-300 hover:bg-white/5 group"
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    whileHover={{ x: 5 }}
                  >
                    <social.icon size={18} style={{ color: social.color }} />
                    <span className="text-sm font-medium">{social.name}</span>
                    <ExternalLink size={12} className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            <div className="glass neon-border rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-cyber-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyber-green animate-ping opacity-75" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">目前可接案</p>
                  <p className="text-gray-300 text-xs">通常回覆時間：24 小時內</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
