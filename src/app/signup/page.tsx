// trekker detail page.tsx

// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import {
//   Eye,
//   EyeOff,
//   MapPin,
//   AlertTriangle,
//   ShoppingBag,
//   Check,
//   Mountain,
//   User,
//   Calendar,
// } from 'lucide-react';

// export default function SignupPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [accountType, setAccountType] = useState<'trekker' | 'agency'>('trekker');

//   return (
//     <div className="flex min-h-screen w-full items-center justify-center bg-neutral-600 p-4 sm:p-6 select-none">
//       <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
//         {/* Left Branding Panel */}
//         <div className="relative hidden w-[42%] flex-col justify-between bg-[#5B50FB] p-10 text-white md:flex">
//           <div className="absolute top-0 left-0 h-20 w-20 rounded-br-full bg-white/10" />

//           <div className="relative z-10 flex items-center gap-2.5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5B50FB]">
//               <Mountain className="h-5 w-5 fill-current" />
//             </div>
//             <span className="text-2xl font-black tracking-wide uppercase">FUNTUSH</span>
//           </div>

//           <div className="relative z-10 my-auto space-y-4 py-8">
//             <h1 className="text-xl font-bold leading-snug">
//               Your treks, your guide contacts, your safety, all in one place.
//             </h1>
//             <p className="text-xs font-normal text-white/80 leading-relaxed">
//               Log in to see your upcoming departures, chat with your guide, and access live SOS during your trek.
//             </p>

//             <div className="mt-6 flex flex-col gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
//                   <MapPin className="h-3.5 w-3.5 text-white" />
//                 </div>
//                 <span className="text-xs font-medium text-white">Real-time trek tracking</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
//                   <AlertTriangle className="h-3.5 w-3.5 text-white" />
//                 </div>
//                 <span className="text-xs font-medium text-white">One-tap emergency SOS</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
//                   <ShoppingBag className="h-3.5 w-3.5 text-white" />
//                 </div>
//                 <span className="text-xs font-medium text-white">Digital packing checklist</span>
//               </div>
//             </div>
//           </div>

//           <div />
//         </div>

//         {/* Right Form Panel */}
//         <div className="flex w-full flex-col justify-center px-8 py-10 md:w-[58%] md:px-14">
//           <div className="mx-auto w-full max-w-sm">
            
//             {/* Step Bar */}
//             <div className="mb-8 flex items-center justify-center gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B50FB] text-xs font-bold text-white">
//                   1
//                 </div>
//                 <span className="text-xs font-bold text-[#5B50FB]">Account</span>
//               </div>

//               <div className="h-[1px] w-24 bg-neutral-300" />

//               <div className="flex items-center gap-2">
//                 <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-xs font-semibold text-neutral-400">
//                   2
//                 </div>
//                 <span className="text-xs font-medium text-neutral-400">Details</span>
//               </div>
//             </div>

//             {/* Title */}
//             <div className="mb-6 text-left">
//               <h2 className="text-2xl font-black text-neutral-900">Create your account</h2>
//               <p className="mt-1 text-xs text-neutral-500">
//                 Start with your <span className="bg-amber-200 px-1 py-0.5 rounded text-neutral-900 font-medium">login</span> — we'll tailor the next step to you
//               </p>
//             </div>

//             <div className="space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-xs font-bold text-neutral-800 mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@company.com"
//                   className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#5B50FB]"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-xs font-bold text-neutral-800 mb-1">Password</label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••••••"
//                     className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#5B50FB]"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center justify-between text-xs pt-1">
//                 <label className="flex items-center gap-2 cursor-pointer text-neutral-700 font-medium">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="h-4 w-4 rounded border-neutral-300 text-[#5B50FB] focus:ring-0 cursor-pointer"
//                   />
//                   Remember me
//                 </label>
//                 <Link href="#" className="font-semibold text-[#5B50FB] hover:underline">
//                   Forgot Password?
//                 </Link>
//               </div>

//               {/* Account Type Options */}
//               <div className="pt-2">
//                 <label className="block text-xs font-bold text-neutral-800 mb-2">
//                   What are you here to do?
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
                  
//                   {/* Option 1: Trekker */}
//                   <button
//                     type="button"
//                     onClick={() => setAccountType('trekker')}
//                     className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all outline-none ${
//                       accountType === 'trekker'
//                         ? 'border-[#5B50FB] bg-[#F1F0FF]'
//                         : 'border-neutral-200 bg-white hover:border-neutral-300'
//                     }`}
//                   >
//                     <div className="pointer-events-none flex items-center justify-between">
//                       <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'trekker' ? 'bg-[#5B50FB] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
//                         <User className="h-4 w-4" />
//                       </div>
//                       <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${accountType === 'trekker' ? 'border-[#5B50FB] bg-[#5B50FB] text-white' : 'border-neutral-300'}`}>
//                         {accountType === 'trekker' && <Check className="h-2.5 w-2.5 stroke-[3]" />}
//                       </div>
//                     </div>
//                     <p className="pointer-events-none mt-3 text-xs font-bold text-neutral-900">I want to book treks</p>
//                     <p className="pointer-events-none mt-1 text-[10px] text-neutral-500 leading-snug">
//                       Browse agencies, book departures, and track your trips in one place.
//                     </p>
//                   </button>

//                   {/* Option 2: Agency */}
//                   <button
//                     type="button"
//                     onClick={() => setAccountType('agency')}
//                     className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all outline-none ${
//                       accountType === 'agency'
//                         ? 'border-[#5B50FB] bg-[#F1F0FF]'
//                         : 'border-neutral-200 bg-white hover:border-neutral-300'
//                     }`}
//                   >
//                     <div className="pointer-events-none flex items-center justify-between">
//                       <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'agency' ? 'bg-[#5B50FB] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
//                         <Calendar className="h-4 w-4" />
//                       </div>
//                       <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${accountType === 'agency' ? 'border-[#5B50FB] bg-[#5B50FB] text-white' : 'border-neutral-300'}`}>
//                         {accountType === 'agency' && <Check className="h-2.5 w-2.5 stroke-[3]" />}
//                       </div>
//                     </div>
//                     <p className="pointer-events-none mt-3 text-xs font-bold text-neutral-900">I run a trekking agency</p>
//                     <p className="pointer-events-none mt-1 text-[10px] text-neutral-500 leading-snug">
//                       Set up your workspace, list your treks, and manage bookings and guides.
//                     </p>
//                   </button>

//                 </div>
//               </div>

//               {/* LINKED CONTINUE BUTTON */}
//               <Link
//                 href={{
//                   pathname: '/signup/details',
//                   query: { type: accountType },
//                 }}
//                 className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#5B50FB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#4a3fe4] active:scale-[0.99]"
//               >
//                 Continue
//               </Link>
//             </div>

//             <div className="relative my-4 text-center">
//               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
//               <span className="relative bg-white px-2 text-[10px] text-neutral-400">or continue with</span>
//             </div>

//             <div className="text-center text-xs text-neutral-600">
//               Already have an account?{' '}
//               <Link href="#" className="font-semibold text-[#5B50FB]">
//                 Log in
//               </Link>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// Agency-detail page.tsx


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  MapPin,
  AlertTriangle,
  ShoppingBag,
  Check,
  Mountain,
  User,
  Calendar,
} from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [accountType, setAccountType] = useState<'trekker' | 'agency'>('agency');

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-600 p-4 sm:p-6 select-none font-sans">
      <div className="flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        
        {/* Left Branding Panel */}
        <div className="relative hidden w-[42%] flex-col justify-between bg-[#5B50FB] p-10 text-white md:flex">
          <div className="absolute top-0 left-0 h-20 w-20 rounded-br-full bg-white/10" />

          <div className="relative z-10 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5B50FB]">
              <Mountain className="h-5 w-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-wide uppercase">FUNTUSH</span>
          </div>

          <div className="relative z-10 my-auto space-y-4 py-8">
            <h1 className="text-xl font-bold leading-snug">
              Your treks, your guide contacts, your safety, all in one place.
            </h1>
            <p className="text-xs font-normal text-white/80 leading-relaxed">
              Log in to see your upcoming departures, chat with your guide, and access live SOS during your trek.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">Real-time trek tracking</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <AlertTriangle className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">One-tap emergency SOS</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                  <ShoppingBag className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-xs font-medium text-white">Digital packing checklist</span>
              </div>
            </div>
          </div>

          <div />
        </div>

        {/* Right Form Panel */}
        <div className="flex w-full flex-col justify-center px-8 py-10 md:w-[58%] md:px-14">
          <div className="mx-auto w-full max-w-sm">
            
            {/* Step Bar */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B50FB] text-xs font-bold text-white">
                  1
                </div>
                <span className="text-xs font-bold text-[#5B50FB]">Account</span>
              </div>

              <div className="h-[1px] w-24 bg-neutral-300" />

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-300 text-xs font-semibold text-neutral-400">
                  2
                </div>
                <span className="text-xs font-medium text-neutral-400">Details</span>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6 text-left">
              <h2 className="text-2xl font-black text-neutral-900">Create your account</h2>
              <p className="mt-1 text-xs text-neutral-500">
                Start with your <span className="bg-amber-200 px-1 py-0.5 rounded text-neutral-900 font-medium">login</span> — we'll tailor the next step to you
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#5B50FB]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-neutral-200 px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-[#5B50FB]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-700 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-[#5B50FB] focus:ring-0 cursor-pointer"
                  />
                  Remember me
                </label>
                <Link href="#" className="font-semibold text-[#5B50FB] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Account Type Options */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-neutral-800 mb-2">
                  What are you here to do?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Option 1: Trekker */}
                  <button
                    type="button"
                    onClick={() => setAccountType('trekker')}
                    className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all outline-none ${
                      accountType === 'trekker'
                        ? 'border-[#5B50FB] bg-[#F1F0FF]'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="pointer-events-none flex items-center justify-between">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'trekker' ? 'bg-[#5B50FB] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                        <User className="h-4 w-4" />
                      </div>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${accountType === 'trekker' ? 'border-[#5B50FB] bg-[#5B50FB] text-white' : 'border-neutral-300'}`}>
                        {accountType === 'trekker' && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="pointer-events-none mt-3 text-xs font-bold text-neutral-900">I want to book treks</p>
                    <p className="pointer-events-none mt-1 text-[10px] text-neutral-500 leading-snug">
                      Browse agencies, book departures, and track your trips in one place.
                    </p>
                  </button>

                  {/* Option 2: Agency */}
                  <button
                    type="button"
                    onClick={() => setAccountType('agency')}
                    className={`w-full cursor-pointer rounded-xl border p-3.5 text-left transition-all outline-none ${
                      accountType === 'agency'
                        ? 'border-[#5B50FB] bg-[#F1F0FF]'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="pointer-events-none flex items-center justify-between">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${accountType === 'agency' ? 'bg-[#5B50FB] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${accountType === 'agency' ? 'border-[#5B50FB] bg-[#5B50FB] text-white' : 'border-neutral-300'}`}>
                        {accountType === 'agency' && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p className="pointer-events-none mt-3 text-xs font-bold text-neutral-900">I run a trekking agency</p>
                    <p className="pointer-events-none mt-1 text-[10px] text-neutral-500 leading-snug">
                      Set up your workspace, list your treks, and manage bookings and guides.
                    </p>
                  </button>

                </div>
              </div>

              {/* DYNAMIC NAVIGATING LINK */}
              <Link
                href={{
                  pathname: accountType === 'agency' ? '/signup/agency-details' : '/signup/details',
                  query: { type: accountType },
                }}
                className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-xl bg-[#5B50FB] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#4a3fe4] active:scale-[0.99]"
              >
                Continue
              </Link>
            </div>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200" /></div>
              <span className="relative bg-white px-2 text-[10px] text-neutral-400">or continue with</span>
            </div>

            <div className="text-center text-xs text-neutral-600">
              Already have an account?{' '}
              <Link href="#" className="font-semibold text-[#5B50FB]">
                Log in
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

