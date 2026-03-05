import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Shield, BookOpen } from 'lucide-react';

const COMMON_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
  'aol.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com',
  'live.com', 'msn.com', 'me.com', 'mac.com', 'googlemail.com',
];

function suggestDomain(email: string): string | null {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) return null;
  const typed = email.slice(atIndex + 1).toLowerCase();
  if (!typed || typed.length < 3) return null;
  if (COMMON_DOMAINS.includes(typed)) return null;

  let bestMatch: string | null = null;
  let bestDistance = Infinity;

  for (const domain of COMMON_DOMAINS) {
    const dist = levenshtein(typed, domain);
    if (dist > 0 && dist <= 2 && dist < bestDistance) {
      bestDistance = dist;
      bestMatch = domain;
    }
  }
  return bestMatch;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0) as number[]);
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

interface SignupFormProps {
  onBack: () => void;
}

export function SignupForm({ onBack }: SignupFormProps) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_AIRTABLE_TABLE_ID}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            records: [{
              fields: {
                'First name': formData.firstName.trim(),
                'Last name': formData.lastName.trim(),
                'Email': formData.email.trim(),
              },
            }],
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to submit');
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailSuggestion(suggestDomain(value));
    }
  }, []);

  const acceptSuggestion = useCallback(() => {
    if (!emailSuggestion) return;
    const localPart = formData.email.slice(0, formData.email.indexOf('@'));
    setFormData(prev => ({ ...prev, email: `${localPart}@${emailSuggestion}` }));
    setEmailSuggestion(null);
  }, [emailSuggestion, formData.email]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-300 antialiased flex flex-col relative overflow-hidden">
      <div className="hero-bg" aria-hidden="true"></div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.9, 0.2, 1] }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <img src="/IMG_5985.png" alt="Hujjah.org Logo" className="h-10 w-auto" />
              <span className="text-2xl font-semibold tracking-tighter text-gray-50">Hujjah.org</span>
            </div>
          </motion.div>

          {!isSubmitted ? (
            <>
              {/* Hero Text */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm px-3 py-2 rounded-full mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span>Be the First</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-50 mb-4">
                  Join the <span className="text-emerald-400">Mailing List</span>
                </h1>
                <p className="text-base text-gray-400 leading-relaxed">
                  Be among the first to experience AI-powered Islamic education,
                  guided by authentic scholarship.
                </p>
              </motion.div>

              {/* Form Card */}
              <motion.div
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-gray-50 placeholder-gray-500 pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-gray-50 placeholder-gray-500 pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-white/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-gray-50 placeholder-gray-500 pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-white/20 transition-all duration-300"
                      />
                    </div>
                    {emailSuggestion && (
                      <button
                        type="button"
                        onClick={acceptSuggestion}
                        className="mt-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        Did you mean <span className="font-medium underline">{formData.email.slice(0, formData.email.indexOf('@'))}@{emailSuggestion}</span>?
                      </button>
                    )}
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl text-sm hover:bg-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Mailing List</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  By joining, you agree to receive updates about Hujjah.org. We respect your privacy.
                </p>
              </motion.div>

              {/* Back button */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-50 transition-colors text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to landing page
                </button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-6 flex flex-col sm:flex-row gap-3 justify-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Scholar Verified</span>
                </div>
                <div className="hidden sm:block text-gray-600">|</div>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Authentic Sources</span>
                </div>
              </motion.div>
            </>
          ) : (
            /* Success State */
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 sm:p-10">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-medium text-gray-50 mb-3">
                  You're on the list!
                </h2>

                <p className="text-gray-400">
                  Thank you, <span className="text-emerald-400 font-medium">{formData.firstName}</span>.
                  We'll notify you at <span className="text-gray-300">{formData.email}</span> when
                  access becomes available.
                </p>
              </div>

              <button
                onClick={onBack}
                className="mt-6 inline-flex items-center gap-2 text-gray-400 hover:text-gray-50 transition-colors text-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to landing page
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Hujjah.org. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
