import { Link } from "wouter";

export default function GrowWithUsCard() {
  return (
    <div className="bg-gradient-to-r from-primary/90 to-primary rounded-xl shadow-sm overflow-hidden text-white">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <span className="material-symbols-rounded text-3xl mr-2">rocket_launch</span>
          <h2 className="text-lg font-semibold">Grow with us</h2>
        </div>
        <h3 className="font-medium mb-4">Beyond Ramadan</h3>
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <p className="mb-2 font-medium">Achieve Your Quran Goals</p>
          <p className="text-sm text-white/80">Track Streaks, Create Custom Goals, Stay Consistent</p>
        </div>
        <Link href="/profile">
          <a className="inline-block bg-white text-primary px-6 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition">
            Get Started
          </a>
        </Link>
      </div>
    </div>
  );
}
