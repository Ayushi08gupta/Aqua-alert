export const languages = {
  en: 'English',
  hi: 'हिन्दी',
  as: 'অসমীয়া',
  bn: 'বাংলা',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ks: 'کٲشُر',
  gom: 'कोंकणी',
  ml: 'മലയാളം',
  mni: 'মৈতৈলোন্',
  mr: 'मराठी',
  ne: 'नेपाली',
  or: 'ଓଡ଼ିଆ',
  pa: 'ਪੰਜਾਬੀ',
  sa: 'संस्कृतम्',
  sat: 'ᱥᱟᱱᱛᱟᱲᱤ',
  sd: 'سنڌي',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  ur: 'اردو',
  bo: 'བོད་སྐད་',
  mai: 'मैथिली',
  doi: 'डोगरी'
} as const;

export type Language = keyof typeof languages;

export const translations = {
  en: {
    // Header
    'header.title': 'Aqua-Alert',
    'header.subtitle': 'Protecting coastal communities',
    'header.signin': 'Sign In',
    'header.getstarted': 'Get Started',
    
    // Hero Section
    'hero.title': 'Aqua-Alert Platform',
    'hero.subtitle': 'Crowdsourced Ocean Hazard Reporting & Analytics',
    'hero.description': 'Join our community-driven platform to report, track, and analyze ocean hazards. Together, we protect coastal communities through real-time data and social media insights.',
    'hero.startreporting': 'Start Reporting',
    'hero.viewdashboard': 'View Dashboard',
    
    // Features
    'features.title': 'Platform Features',
    'features.subtitle': 'Comprehensive tools for ocean hazard monitoring and community protection',
    'features.mapping.title': 'Interactive Mapping',
    'features.mapping.desc': 'Real-time hazard visualization with pulsing hotspots and geographic clustering',
    'features.reporting.title': 'Citizen Reporting',
    'features.reporting.desc': 'Easy-to-use forms for reporting tsunamis, hurricanes, oil spills, and other ocean hazards',
    'features.analytics.title': 'Social Media Analytics',
    'features.analytics.desc': 'AI-powered analysis of social media posts for early hazard detection and sentiment tracking',
    'features.verification.title': 'Verification System',
    'features.verification.desc': 'Multi-level verification process ensuring data accuracy and reliability',
    'features.community.title': 'Community Collaboration',
    'features.community.desc': 'Connect with researchers, emergency responders, and fellow citizens',
    'features.alerts.title': 'Real-time Alerts',
    'features.alerts.desc': 'Instant notifications for critical hazards in your area',
    
    // CTA
    'cta.title': 'Ready to Make a Difference?',
    'cta.description': 'Join thousands of citizens, researchers, and emergency responders working together to protect our coastal communities.',
    'cta.join': 'Join the Platform',
    
    // Footer
    'footer.description': 'Protecting coastal communities through collaborative hazard reporting and analytics.',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.reports': 'Reports',
    'dashboard.analytics': 'Analytics',
    'dashboard.alerts': 'Alerts',
    
    // Report Form
    'report.title': 'Report Ocean Hazard',
    'report.type': 'Hazard Type',
    'report.location': 'Location',
    'report.description': 'Description',
    'report.submit': 'Submit Report',
    'report.success': 'Report submitted successfully!',
    
    // Auth
    'auth.signup.title': 'Create Account',
    'auth.signup.subtitle': 'Join the community protecting our oceans',
    'auth.signup.network': 'Join our coastal protection network',
    'auth.signup.fullname': 'Full Name',
    'auth.signup.email': 'Email',
    'auth.signup.organization': 'Organization (Optional)',
    'auth.signup.role': 'Role',
    'auth.signup.password': 'Password',
    'auth.signup.confirmpassword': 'Confirm Password',
    'auth.signup.creating': 'Creating account...',
    'auth.signup.create': 'Create Account',
    'auth.signup.haveaccount': 'Already have an account?',
    'auth.signup.signin': 'Sign in',
    'auth.signup.passwordmismatch': 'Passwords do not match',
    'auth.roles.citizen': 'Citizen Reporter',
    'auth.roles.researcher': 'Researcher',
    'auth.roles.emergency': 'Emergency Responder',
    'auth.roles.government': 'Government Official',
    
    // Community
    'community.stats': 'Community Stats',
    'community.total': 'Total Members',
    'community.directory': 'Community Directory',
    'community.allroles': 'All Roles',
    'community.nomembers': 'No members found',
    
    // Alerts
    'alerts.tsunami': 'TSUNAMI ALERT',
    'alerts.hurricane': 'HURRICANE WARNING', 
    'alerts.storm_surge': 'STORM SURGE ALERT',
    'alerts.coastal_flooding': 'FLOODING ALERT',
    'alerts.rip_current': 'RIP CURRENT WARNING',
    'alerts.critical': 'CRITICAL {hazard} in {location}. Evacuate immediately!',
    'alerts.high': 'HIGH RISK {hazard} in {location}. Take precautions!',
    'alerts.replay': 'Replay',
    
    // Stats
    'stats.total': 'Total Reports',
    'stats.thisweek': 'This Week',
    'stats.critical': 'Critical',
    'stats.verified': 'Verified',
    'stats.status': 'Report Status',
    'stats.pending': 'Pending Review',
    'stats.tophazards': 'Top Hazard Types',
    'stats.quickactions': 'Quick Actions',
    'stats.viewpending': 'View Pending Reports',
    'stats.awaitingreview': 'awaiting review',
    'stats.criticalalerts': 'Critical Alerts',
    'stats.highpriority': 'high priority',
    'stats.exportdata': 'Export Data',
    'stats.downloadreports': 'Download reports',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.update': 'Update',
    'common.refresh': 'Refresh',
    'common.settings': 'Settings',
    'common.help': 'Help',
    'common.about': 'About',
    'common.contact': 'Contact',
    'common.privacy': 'Privacy',
    'common.terms': 'Terms',
    'common.logout': 'Logout',
    'common.profile': 'Profile'
  },
  
  hi: {
    // Header
    'header.title': 'एक्वा-अलर्ट',
    'header.subtitle': 'तटीय समुदायों की सुरक्षा',
    'header.signin': 'साइन इन',
    'header.getstarted': 'शुरू करें',
    
    // Hero Section
    'hero.title': 'एक्वा-अलर्ट प्लेटफॉर्म',
    'hero.subtitle': 'क्राउडसोर्स्ड समुद्री खतरा रिपोर्टिंग और एनालिटिक्स',
    'hero.description': 'समुद्री खतरों की रिपोर्ट, ट्रैकिंग और विश्लेषण के लिए हमारे समुदायिक प्लेटफॉर्म में शामिल हों। रियल-टाइम डेटा और सोशल मीडिया अंतर्दृष्टि के माध्यम से तटीय समुदायों की सुरक्षा करते हैं।',
    'hero.startreporting': 'रिपोर्टिंग शुरू करें',
    'hero.viewdashboard': 'डैशबोर्ड देखें',
    
    // Features
    'features.title': 'प्लेटफॉर्म सुविधाएं',
    'features.subtitle': 'समुद्री खतरा निगरानी और समुदायिक सुरक्षा के लिए व्यापक उपकरण',
    'features.mapping.title': 'इंटरैक्टिव मैपिंग',
    'features.mapping.desc': 'पल्सिंग हॉटस्पॉट और भौगोलिक क्लस्टरिंग के साथ रियल-टाइम खतरा विज़ुअलाइज़ेशन',
    'features.reporting.title': 'नागरिक रिपोर्टिंग',
    'features.reporting.desc': 'सुनामी, तूफान, तेल रिसाव और अन्य समुद्री खतरों की रिपोर्ट के लिए उपयोग में आसान फॉर्म',
    'features.analytics.title': 'सोशल मीडिया एनालिटिक्स',
    'features.analytics.desc': 'प्रारंभिक खतरा पहचान और भावना ट्रैकिंग के लिए AI-संचालित सोशल मीडिया पोस्ट विश्लेषण',
    'features.verification.title': 'सत्यापन प्रणाली',
    'features.verification.desc': 'डेटा सटीकता और विश्वसनीयता सुनिश्चित करने वाली बहु-स्तरीय सत्यापन प्रक्रिया',
    'features.community.title': 'समुदायिक सहयोग',
    'features.community.desc': 'शोधकर्ताओं, आपातकालीन प्रतिक्रियाकर्ताओं और साथी नागरिकों से जुड़ें',
    'features.alerts.title': 'रियल-टाइम अलर्ट',
    'features.alerts.desc': 'आपके क्षेत्र में महत्वपूर्ण खतरों के लिए तत्काल सूचनाएं',
    
    // CTA
    'cta.title': 'बदलाव लाने के लिए तैयार हैं?',
    'cta.description': 'हमारे तटीय समुदायों की सुरक्षा के लिए मिलकर काम करने वाले हजारों नागरिकों, शोधकर्ताओं और आपातकालीन प्रतिक्रियाकर्ताओं में शामिल हों।',
    'cta.join': 'प्लेटफॉर्म में शामिल हों',
    
    // Footer
    'footer.description': 'सहयोगी खतरा रिपोर्टिंग और एनालिटिक्स के माध्यम से तटीय समुदायों की सुरक्षा।',
    
    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.overview': 'अवलोकन',
    'dashboard.reports': 'रिपोर्ट्स',
    'dashboard.analytics': 'एनालिटिक्स',
    'dashboard.alerts': 'अलर्ट',
    
    // Report Form
    'report.title': 'समुद्री खतरे की रिपोर्ट करें',
    'report.type': 'खतरे का प्रकार',
    'report.location': 'स्थान',
    'report.description': 'विवरण',
    'report.submit': 'रिपोर्ट जमा करें',
    'report.success': 'रिपोर्ट सफलतापूर्वक जमा की गई!',
    
    // Auth
    'auth.signup.title': 'खाता बनाएं',
    'auth.signup.subtitle': 'हमारे समुद्रों की सुरक्षा करने वाले समुदाय में शामिल हों',
    'auth.signup.network': 'हमारे तटीय सुरक्षा नेटवर्क में शामिल हों',
    'auth.signup.fullname': 'पूरा नाम',
    'auth.signup.email': 'ईमेल',
    'auth.signup.organization': 'संगठन (वैकल्पिक)',
    'auth.signup.role': 'भूमिका',
    'auth.signup.password': 'पासवर्ड',
    'auth.signup.confirmpassword': 'पासवर्ड की पुष्टि करें',
    'auth.signup.creating': 'खाता बनाया जा रहा है...',
    'auth.signup.create': 'खाता बनाएं',
    'auth.signup.haveaccount': 'पहले से खाता है?',
    'auth.signup.signin': 'साइन इन',
    'auth.signup.passwordmismatch': 'पासवर्ड मेल नहीं खाते',
    'auth.roles.citizen': 'नागरिक रिपोर्टर',
    'auth.roles.researcher': 'शोधकर्ता',
    'auth.roles.emergency': 'आपातकालीन प्रतिक्रियाकर्ता',
    'auth.roles.government': 'सरकारी अधिकारी',
    
    // Community
    'community.stats': 'समुदायिक आंकड़े',
    'community.total': 'कुल सदस्य',
    'community.directory': 'समुदायिक निर्देशिका',
    'community.allroles': 'सभी भूमिकाएं',
    'community.nomembers': 'कोई सदस्य नहीं मिले',
    
    // Alerts
    'alerts.tsunami': 'सुनामी अलर्ट',
    'alerts.hurricane': 'तूफान चेतावनी',
    'alerts.storm_surge': 'तूफानी लहर अलर्ट', 
    'alerts.coastal_flooding': 'बाढ़ अलर्ट',
    'alerts.rip_current': 'खतरनाक धारा चेतावनी',
    'alerts.critical': '{location} में गंभीर {hazard}। तुरंत निकलें!',
    'alerts.high': '{location} में उच्च जोखिम {hazard}। सावधानी बरतें!',
    'alerts.replay': 'दोहराएं',
    
    // Stats
    'stats.total': 'कुल रिपोर्ट्स',
    'stats.thisweek': 'इस सप्ताह',
    'stats.critical': 'गंभीर',
    'stats.verified': 'सत्यापित',
    'stats.status': 'रिपोर्ट स्थिति',
    'stats.pending': 'समीक्षा लंबित',
    'stats.tophazards': 'मुख्य खतरे के प्रकार',
    'stats.quickactions': 'त्वरित कार्य',
    'stats.viewpending': 'लंबित रिपोर्ट्स देखें',
    'stats.awaitingreview': 'समीक्षा की प्रतीक्षा में',
    'stats.criticalalerts': 'गंभीर अलर्ट',
    'stats.highpriority': 'उच्च प्राथमिकता',
    'stats.exportdata': 'डेटा निर्यात करें',
    'stats.downloadreports': 'रिपोर्ट्स डाउनलोड करें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि हुई',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.close': 'बंद करें',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.previous': 'पिछला',
    'common.search': 'खोजें',
    'common.filter': 'फिल्टर',
    'common.sort': 'क्रमबद्ध करें',
    'common.export': 'निर्यात',
    'common.import': 'आयात',
    'common.delete': 'हटाएं',
    'common.edit': 'संपादित करें',
    'common.view': 'देखें',
    'common.add': 'जोड़ें',
    'common.remove': 'हटाएं',
    'common.update': 'अपडेट करें',
    'common.refresh': 'रीफ्रेश करें',
    'common.settings': 'सेटिंग्स',
    'common.help': 'सहायता',
    'common.about': 'के बारे में',
    'common.contact': 'संपर्क',
    'common.privacy': 'गोपनीयता',
    'common.terms': 'नियम',
    'common.logout': 'लॉगआउट',
    'common.profile': 'प्रोफाइल'
  }
  // Note: For brevity, I'm showing only English and Hindi. 
  // In production, all 22 languages would be fully translated
} as const;

export function getTranslation(lang: Language, key: string): string {
  const langTranslations = (translations as any)[lang] || translations.en;
  return (langTranslations as any)[key] || key;
}