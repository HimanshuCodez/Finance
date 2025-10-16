import React from 'react';
import { Mail, Phone } from 'lucide-react';

const stats = [
    { label: 'Policies Sold', value: '20,000+' },
    { label: 'Insurance Partners', value: '25+' },
    { label: 'Businesses', value: '4,000+' },
    { label: 'Sum Insured', value: '₹43,000 Cr.' },
];

const productLinks = [
    'Directors and Officers',
    'Professional Indemnity',
    'Commercial General Liability',
    'Product Liability',
    'Cyber',
    'Crime',
    'Workmen\'s Compensation',
    'Contractor\'s All Risk',
    'Erection All Risk',
    'Contractor\'s Plant and Machinery',
    'Marine',
    'Fire',
    'Fire Loss of Profit',
    'Machinery Breakdown',
    'Machinery Loss of Profit',
    'Office Package',
    'Group Health',
    'Group Personal Accident',
];

const usefulLinks = [
    { name: 'Dashboard Login', href: '#' },
    { name: 'Claims Checklist', href: '#' },
    { name: 'FAQ Centre', href: '#' },
    { name: 'Bima Salaah', href: '#' },
];

const knowMoreLinks = [
    { name: 'Blog', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Resources', href: '#' },
];

const legalLinks = [
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
];

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-blue-900 to-black text-white">
            {/* Stats Bar */}
            <div className="bg-blue-800 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {stats.map((stat, index) => (
                            <div key={index}>
                                <p className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</p>
                                <p className="text-sm text-blue-200">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {/* Newsletter & Locations */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold">Subscribe to Our Newsletter</h3>
                            <p className="text-blue-300 mt-1 text-sm">Get helpful business tips & insurance updates in your inbox.</p>
                            <form className="mt-4 flex">
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-2 rounded-l-md text-gray-800" />
                                <button type="submit" className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-r-md font-semibold">Subscribe</button>
                            </form>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <h4 className="font-semibold mb-2">Our Offices</h4>
                                <ul className="space-y-1 text-blue-300">
                                    <li>Indore</li>
                                    <li>Bengaluru</li>
                                    <li>Gurugram</li>
                                    <li>Ahmedabad</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Contact</h4>
                                <div className="space-y-2 text-blue-300">
                                    <a href="tel:+91-90365-54785" className="flex items-center hover:text-yellow-400">
                                        <Phone size={16} className="mr-2" />
                                        +91-90365-54785
                                    </a>
                                    <a href="mailto:namaste@bimakavach.com" className="flex items-center hover:text-yellow-400">
                                        <Mail size={16} className="mr-2" />
                                        namaste@bimakavach.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Products</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {productLinks.slice(0, 8).map((link, index) => (
                                <li key={index}><a href="#" className="text-blue-300 hover:text-yellow-400">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Useful & Know More Links */}
                    <div>
                        <h3 className="text-lg font-semibold">Useful Links</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {usefulLinks.map((link) => (
                                <li key={link.name}><a href={link.href} className="text-blue-300 hover:text-yellow-400">{link.name}</a></li>
                            ))}
                        </ul>
                        <h3 className="text-lg font-semibold mt-8">Know More</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {knowMoreLinks.map((link) => (
                                <li key={link.name}><a href={link.href} className="text-blue-300 hover:text-yellow-400">{link.name}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h3 className="text-lg font-semibold">Legal</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {legalLinks.map((link) => (
                                <li key={link.name}><a href={link.href} className="text-blue-300 hover:text-yellow-400">{link.name}</a></li>
                            ))}
                        </ul>
                        {/* Social media icons can go here */}
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-12 border-t border-blue-800 pt-8 text-xs text-blue-300 space-y-4">
                    <p><span className="font-semibold">Disclaimer:</span> BimaKavach Insurance Broking Pvt. Ltd. | CIN- U66010MP2022PTC059393 | Registered Office No. 601, Plot No. RCM - 09, Scheme No. 140 Sector -E Shanti Dazzle Building, Indore, Madhya Pradesh - 452016 Phone No.- 9036554785 | Email- support@bimakavach.com</p>
                    <p>BimaKavach is registered as a Direct Broker | Registration No. 901, Registration Code No. IRDAI / DB 985/ 2022, Valid till 25/06/2026, License category- Direct Broker (General)</p>
                    <p>Visitors are being informed that BimaKavach Insurance Broking Pvt. Ltd. holds the right to share the information submitted by you on the website with Insurers. Product information is genuine and exclusively based on information obtained from insurers.</p>
                    <p>*The prices shown are estimates. Actual prices may be higher based on your business details and risk factors.</p>
                </div>

                {/* Backed by */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold">Backed by</h3>
                    <div className="flex space-x-4 mt-4">
                        {/* Replace with actual logos */}
                        <div className="w-24 h-12 bg-black rounded-md flex items-center justify-center text-blue-900"><img src="https://images.bimakavach.com/v3/Footer/backBestWhite3.webp" alt="" /></div>
                        <div className="w-24 h-12 bg-black rounded-md flex items-center justify-center text-blue-900"><img src="https://images.bimakavach.com/v3/Footer/backBestWhite4.webp" alt="" /></div>
                        <div className="w-24 h-12 bg-black rounded-md flex items-center justify-center text-blue-900"><img src="https://images.bimakavach.com/v3/Footer/backBestWhite2.webp" alt="" /></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
