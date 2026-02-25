import Link from 'next/link';
import { Facebook, Twitter, Instagram, BriefcaseBusiness } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/30 py-16 text-muted-foreground text-sm border-t border-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          <div className="text-center md:text-left space-y-6">
            <div className='flex gap-3 items-center justify-center md:justify-start'>
              <div className="bg-primary p-1.5 rounded-lg">
                <BriefcaseBusiness className='h-5 w-5 text-white' />
              </div>
              <h4 className="text-2xl font-black text-foreground italic tracking-tighter">CareerView</h4>
            </div>
            <p className="leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">Connecting ambitious talent with their dream careers. Find your perfect match today.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="hover:text-blue-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-pink-500">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h6 className="text-sm font-semibold text-gray-700 uppercase mb-2">For Students</h6>
            <ul className="list-none space-y-2">
              <li><Link href="#" className="hover:text-gray-800">Browse Jobs</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Create Profile</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Job Alerts</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Career Resources</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h6 className="text-sm font-semibold text-gray-700 uppercase mb-2">For Employers</h6>
            <ul className="list-none space-y-2">
              <li><Link href="#" className="hover:text-gray-800">Post a Job</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Browse Candidates</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Pricing</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Recruitment Solutions</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h6 className="text-sm font-semibold text-gray-700 uppercase mb-2">Company</h6>
            <ul className="list-none space-y-2">
              <li><Link href="#" className="hover:text-gray-800">About Us</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-gray-800">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-secondary pt-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest">&copy; {new Date().getFullYear()} CareerView. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
