import React, { useState } from 'react';
import { 
  Bike, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  ArrowLeft, 
  Send, 
  Award, 
  MapPin, 
  Phone, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';

interface RiderApplicationPageProps {
  onBackToHome: () => void;
}

export const RiderApplicationPage: React.FC<RiderApplicationPageProps> = ({ onBackToHome }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Lagos (Island / Lekki / VI)',
    vehicleCategory: 'Motorcycle (Urban Express)',
    hasVehicle: 'Yes, I own my motorcycle/vehicle',
    licenseNumber: '',
    experienceYears: '1-3 Years (Experienced)',
    residentialAddress: '',
    guarantorAvailable: 'Yes',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/apply-rider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setApplicationId(data.applicationId || 'RIDER-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Unable to submit your application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const NairaIcon = ({ className }: { className?: string }) => (
    <span className={`font-bold text-lg leading-none ${className || ''}`}>
      ₦
    </span>
  );

  const perks = [
    {
      title: 'Competitive Earnings & Payouts',
      desc: 'Guaranteed weekly or daily direct bank transfers with trip bonuses and corporate deliveries.',
      icon: NairaIcon,
      color: 'text-amber-400'
    },
    {
      title: 'Full Gear & Safety Kit',
      desc: 'Branded reflective uniforms, DOT-certified safety helmets, insulated courier boxes, and GPS telemetry units.',
      icon: ShieldCheck,
      color: 'text-emerald-400'
    },
    {
      title: 'Electric Bikes & Maintenance',
      desc: 'Get access to company-supported electric bikes, battery charging, routine servicing, and maintenance assistance so you can focus on completing deliveries.',
      icon: Bike,
      color: 'text-blue-400'
    },
    {
      title: 'Flexible Routes & Hubs',
      desc: 'Work in your preferred territory (Island, Mainland, Ikeja, Abuja Central, PH GRA, etc.).',
      icon: MapPin,
      color: 'text-[#D61F26]'
    }
  ];

  return (
    <div id="rider-portal" className="pt-28 pb-24 bg-[#0a0a0a] min-h-screen text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div id="hero" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-[#151515] to-[#1a1112] border border-zinc-800 p-8 sm:p-12 mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D61F26]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Drive & Ride With <br />
              <span className="text-[#D61F26]">Metro Transit Logistics</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Join Nigeria's fastest growing corporate dispatch & express courier network. Get steady daily deliveries, guaranteed payments, rider health insurance, and professional corporate training.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lagos &bull; Abuja &bull; PH &bull; Ibadan &bull; Kano
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/60">
                <Clock className="w-4 h-4 text-amber-400" /> Fast 48-Hour Onboarding
              </span>
            </div>
          </div>
        </div>

        {/* Success Confirmation or Application Form */}
        {submitted ? (
          <div className="max-w-2xl mx-auto bg-[#121212] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-emerald-500/10 rounded-full text-emerald-400 text-xs font-bold font-mono">
                Application ID: {applicationId}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Application Successfully Submitted!</h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
                Thank you for applying to join the Metro Transit fleet. Our recruitment operations desk has received your profile at <strong className="text-white">contact@metrotransit.com.ng</strong>.
              </p>
            </div>

            {/* Next Steps Box */}
            <div className="bg-[#181818] border border-zinc-800 rounded-2xl p-6 text-left space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">What Happens Next?</h4>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[#D61F26] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span><strong>Profile Screening:</strong> Our HR desk will review your details within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[#D61F26] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span><strong>SMS / Call Invitation:</strong> You'll receive a physical verification appointment at your selected hub.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-zinc-800 text-[#D61F26] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span><strong>Fleet Kit Handover & Activation:</strong> Collect your uniform, dispatch box, and begin taking orders!</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    city: 'Lagos (Island / Lekki / VI)',
                    vehicleCategory: 'Motorcycle (Urban Express)',
                    hasVehicle: 'Yes, I own my motorcycle/vehicle',
                    licenseNumber: '',
                    experienceYears: '1-3 Years (Experienced)',
                    residentialAddress: '',
                    guarantorAvailable: 'Yes',
                    notes: ''
                  });
                }}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-all"
              >
                Submit Another Application
              </button>
              <button
                onClick={onBackToHome}
                className="px-6 py-3 bg-[#D61F26] hover:bg-[#b8181e] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                Back to Logistics Portal
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Perks & Onboarding Criteria */}
            <div id="benefits" className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#D61F26] uppercase tracking-wider block">Rider Benefits & Standards</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Why Riders & Drivers Choose Metro Transit</h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  We treat our riders as primary frontline partners. We provide continuous corporate orders so your fuel is never wasted waiting around.
                </p>
              </div>

              {/* Perks List */}
              <div className="grid grid-cols-1 gap-4">
                {perks.map((perk, idx) => {
                  const Icon = perk.icon;
                  return (
                    <div key={idx} className="p-5 bg-[#121212] border border-zinc-800 rounded-2xl flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-zinc-900 border border-zinc-800 ${perk.color} shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{perk.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{perk.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Requirements Box */}
              <div id="requirements" className="p-6 bg-gradient-to-br from-zinc-900 to-[#141414] border border-zinc-800 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D61F26]" /> Minimum Requirements
                </h4>
                <ul className="space-y-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Valid Driver's License</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Functional Android / iOS smartphone</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Sound knowledge of local roads and navigation apps</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 1-2 verifiable guarantors for corporate deliveries</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div id="application" className="lg:col-span-7 bg-[#121212] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl scroll-mt-28">
              <div className="border-b border-zinc-800 pb-6 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-white">Rider & Driver Application Form</h3>
                <p className="text-xs text-zinc-400 mt-1">Complete your registration profile. Submissions are delivered to contact@metrotransit.com.ng.</p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ibrahim Babatunde"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D61F26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ibrahim@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D61F26]"
                    />
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D61F26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Preferred Operating Hub / City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#D61F26]"
                    >
                      <option value="Lagos (Island / Lekki / VI)">Lagos (Island / Lekki / VI)</option>
                      <option value="Lagos (Mainland / Ikeja / Surulere)">Lagos (Mainland / Ikeja / Surulere)</option>
                      <option value="Abuja (FCT Central / Wuse / Garki)">Abuja (FCT Central / Wuse / Garki)</option>
                      <option value="Port Harcourt (Rivers)">Port Harcourt (Rivers)</option>
                      <option value="Ibadan (Oyo State)">Ibadan (Oyo State)</option>
                      <option value="Kano (Northern Hub)">Kano (Northern Hub)</option>
                      <option value="Enugu / Onitsha">Enugu / Onitsha Corridor</option>
                      <option value="Accra (Ghana Hub)">Accra (Ghana Hub)</option>
                      <option value="Nairobi (Kenya Hub)">Nairobi (Kenya Hub)</option>
                    </select>
                  </div>
                </div>

                {/* License & Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Delivery Experience
                    </label>
                    <select
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-[#D61F26]"
                    >
                      <option value="Under 1 Year (Entry Level)">Under 1 Year (Entry Level)</option>
                      <option value="1-3 Years (Experienced)">1-3 Years (Experienced)</option>
                      <option value="3-5 Years (Senior Dispatch)">3-5 Years (Senior Dispatch)</option>
                      <option value="5+ Years (Commercial Master)">5+ Years (Commercial Master)</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Current Residential Area / Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 24 Ogundana Street, Ikeja, Lagos"
                    value={formData.residentialAddress}
                    onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                    className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D61F26]"
                  />
                </div>

                {/* Additional notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Previous Delivery Experience / Comments
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about previous courier companies or routes you have ridden..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#181818] border border-zinc-700/80 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D61F26]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#D61F26] hover:bg-[#b8181e] disabled:opacity-50 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#D61F26]/30 hover:scale-[1.01]"
                >
                  {loading ? (
                    <span className="animate-pulse">Transmitting Application Profile...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Rider Application</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-500 text-center">
                  By submitting, you certify that all information is accurate. Metro Transit conducts strict background verification.
                </p>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
