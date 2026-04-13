export default function Waitlist() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white px-6">
      <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-brand-navy mb-4">Join our Waitlist</h1>
      <p className="mb-8 text-textSecondary max-w-md text-center">
        We are aggressively rolling out hyper-local 30-minute delivery nodes nationwide. 
        Sign up to get notified when QuickMeds reaches your pincode!
      </p>
      <form className="flex w-full max-w-sm flex-col gap-4">
        <input 
          type="email" 
          placeholder="Enter your email address" 
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all" 
        />
        <button 
          onClick={(e) => { e.preventDefault(); alert("Thanks for joining!"); }}
          className="bg-brand-navy text-white font-semibold py-3 rounded-lg hover:bg-brand-navy/90 transition shadow-lg shadow-brand-navy/20"
        >
          Get Notified First
        </button>
      </form>
    </div>
  );
}
