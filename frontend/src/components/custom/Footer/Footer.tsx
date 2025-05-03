import Link from 'next/link';
import { Facebook, Twitter, Instagram, BriefcaseBusiness } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8  text-gray-600 text-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <div className='flex gap-2 items-center'>
             <BriefcaseBusiness className='h-5 w-5 mr-2 text-purple-400'/>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">JobVista</h4>
            </div>
            <p className="mb-2 max-w-2xl">Connecting students with their dream careers. Find your perfect job match today.</p>
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
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p>&copy; 2025 JobVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
