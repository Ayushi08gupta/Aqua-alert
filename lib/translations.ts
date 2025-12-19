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
  },
  
  // Bengali
  bn: {
    'header.title': 'অ্যাকোয়া-অ্যালার্ট',
    'header.signin': 'সাইন ইন',
    'hero.title': 'অ্যাকোয়া-অ্যালার্ট প্ল্যাটফর্ম',
    'report.title': 'সমুদ্র বিপদ রিপোর্ট করুন',
    'report.type': 'বিপদের ধরন',
    'report.location': 'অবস্থান',
    'report.description': 'বিবরণ',
    'report.submit': 'রিপোর্ট জমা দিন',
    'common.loading': 'লোড হচ্ছে...',
    'common.cancel': 'বাতিল',
    'hazard.tsunami': 'সুনামি',
    'hazard.hurricane': 'ঘূর্ণিঝড়',
    'hazard.oil_spill': 'তেল ছড়িয়ে পড়া',
    'severity.low': 'কম - সামান্য উদ্বেগ',
    'severity.critical': 'সংকটজনক - তাৎক্ষণিক হুমকি'
  },
  
  // Tamil
  ta: {
    'header.title': 'அக்வா-அலர்ட்',
    'header.signin': 'உள்நுழைய',
    'hero.title': 'அக்வா-அலர்ட் தளம்',
    'report.title': 'கடல் ஆபத் அறிக்கை',
    'report.type': 'ஆபத் வகை',
    'report.location': 'இடம்',
    'report.description': 'விளக்கம்',
    'report.submit': 'அறிக்கை சமர்ப்பிக்க',
    'common.loading': 'ஏற்றுகிறது...',
    'common.cancel': 'ரத்து செய்',
    'hazard.tsunami': 'சுனாமி',
    'hazard.hurricane': 'புயல்',
    'hazard.oil_spill': 'எண்ணெய் கசிவு',
    'severity.low': 'குறைவு - சிறிய கவலை',
    'severity.critical': 'முக்கியமான - உடனடி அச்சுறுத்தல்'
  },
  
  // Telugu
  te: {
    'header.title': 'అక్వా-అలర్ట్',
    'header.signin': 'సైన్ ఇన్',
    'hero.title': 'అక్వా-అలర్ట్ ప్లాట్‌ఫార్మ్',
    'report.title': 'సముద్ర ప్రమాద నివేదిక',
    'report.type': 'ప్రమాద రకం',
    'report.location': 'స్థానం',
    'report.description': 'వివరణ',
    'report.submit': 'నివేదిక సమర్పించండి',
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.cancel': 'రద్దు చేయండి',
    'hazard.tsunami': 'సునామీ',
    'hazard.hurricane': 'తుఫాను',
    'hazard.oil_spill': 'చమురు చిందటం',
    'severity.low': 'తక్కువ - చిన్న ఆందోళన',
    'severity.critical': 'క్లిష్టమైన - తక్షణ ముప్పు'
  },
  
  // Gujarati
  gu: {
    'header.title': 'એક્વા-અલર્ટ',
    'header.signin': 'સાઇન ઇન',
    'hero.title': 'એક્વા-અલર્ટ પ્લેટફોર્મ',
    'report.title': 'સમુદ્રી ખતરાની રિપોર્ટ',
    'report.type': 'ખતરાનો પ્રકાર',
    'report.location': 'સ્થાન',
    'report.description': 'વર્ણન',
    'report.submit': 'રિપોર્ટ જમા કરો',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    'common.cancel': 'રદ્દ કરો',
    'hazard.tsunami': 'સુનામી',
    'hazard.hurricane': 'વાવાઝોડા',
    'hazard.oil_spill': 'તેલનું વહેણ',
    'severity.low': 'ઓછું - આમ ચિંતા',
    'severity.critical': 'ગંભીર - તાત્કાલિક ખતરો'
  },
  
  // Kannada
  kn: {
    'header.title': 'ಅಕ್ವಾ-ಅಲರ್ಟ್',
    'header.signin': 'ಸೈನ್ ಇನ್',
    'hero.title': 'ಅಕ್ವಾ-ಅಲರ್ಟ್ ಪ್ಲ್ಯಾಟ್‌ಫಾರ್ಮ್',
    'report.title': 'ಸಮುದ್ರ ಆಪಾಯ ರಿಪೋರ್ಟ್',
    'report.type': 'ಆಪಾಯದ ಪ್ರಕಾರ',
    'report.location': 'ಸ್ಥಳ',
    'report.description': 'ವಿವರಣೆ',
    'report.submit': 'ರಿಪೋರ್ಟ್ ಸಲ್ಲಿಸಿ',
    'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    'common.cancel': 'ರದ್ದು ಮಾಡಿ',
    'hazard.tsunami': 'ಸುನಾಮಿ',
    'hazard.hurricane': 'ಚಕ್ರವಾತ',
    'hazard.oil_spill': 'ಎಣ್ಣೆ ಸಿಂತನೆ',
    'severity.low': 'ಕಮ್ಮಿ - ಕಿಚ್ಚಿನ ಚಿಂತೆ',
    'severity.critical': 'ಗಂಭೀರ - ತತ್ಕಾಲ ಆಪಾಯ'
  },
  
  // Malayalam
  ml: {
    'header.title': 'അക്വ-അലർട്ട്',
    'header.signin': 'സൈൻ ഇൻ',
    'hero.title': 'അക്വ-അലർട്ട് പ്ലാറ്റ്‌ഫോം',
    'report.title': 'സമുദ്ര ആപത്ത് റിപ്പോർട്ട്',
    'report.type': 'ആപത്തിന്റെ തരം',
    'report.location': 'സ്ഥലം',
    'report.description': 'വിവരണം',
    'report.submit': 'റിപ്പോർട്ട് സമർപ്പിക്കുക',
    'common.loading': 'ലോഡ് ചെയ്യുന്നു...',
    'common.cancel': 'റദ്ദാക്കുക',
    'hazard.tsunami': 'സുനാമി',
    'hazard.hurricane': 'ചക്രവാതം',
    'hazard.oil_spill': 'എണ്ണ ചോർച്ച',
    'severity.low': 'താഴ്ന്ന - ചെറിയ ചിന്ത',
    'severity.critical': 'ഗുരുതര - തത്കാലീന ആപത്ത്'
  },
  
  // Marathi
  mr: {
    'header.title': 'अक्वा-अलर्ट',
    'header.signin': 'साइन इन',
    'hero.title': 'अक्वा-अलर्ट प्लॅटफॉर्म',
    'report.title': 'समुद्री धोका रिपोर्ट',
    'report.type': 'धोक्याचा प्रकार',
    'report.location': 'स्थान',
    'report.description': 'वर्णन',
    'report.submit': 'रिपोर्ट सबमिट करा',
    'common.loading': 'लोड होत आहे...',
    'common.cancel': 'रद्द करा',
    'hazard.tsunami': 'सुनामी',
    'hazard.hurricane': 'चक्रीवादळ',
    'hazard.oil_spill': 'तेल गळती',
    'severity.low': 'कमी - किरकोळ चिंता',
    'severity.critical': 'गंभीर - तात्काळ धोका'
  },
  
  // Punjabi
  pa: {
    'header.title': 'ਅਕਵਾ-ਅਲਰਟ',
    'header.signin': 'ਸਾਈਨ ਇਨ',
    'hero.title': 'ਅਕਵਾ-ਅਲਰਟ ਪਲੇਟਫਾਰਮ',
    'report.title': 'ਸਮੁੰਦਰੀ ਖਤਰਾ ਰਿਪੋਰਟ',
    'report.type': 'ਖਤਰੇ ਦੀ ਕਿਸਮ',
    'report.location': 'ਸਥਾਨ',
    'report.description': 'ਵਰਣਨ',
    'report.submit': 'ਰਿਪੋਰਟ ਜਮਾਂ ਕਰੋ',
    'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    'common.cancel': 'ਰੱਦ ਕਰੋ',
    'hazard.tsunami': 'ਸੁਨਾਮੀ',
    'hazard.hurricane': 'ਤੂਫਾਨ',
    'hazard.oil_spill': 'ਤੇਲ ਦਾ ਵਗਣਾ',
    'severity.low': 'ਘੱਟ - ਮਾਮੂਲੀ ਚਿੰਤਾ',
    'severity.critical': 'ਗੰਭੀਰ - ਤੁਰੰਤ ਖਤਰਾ'
  },
  
  // Urdu
  ur: {
    'header.title': 'ایکوا-الرٹ',
    'header.signin': 'سائن ان',
    'hero.title': 'ایکوا-الرٹ پلیٹ فارم',
    'report.title': 'سمندری خطرہ کی رپورٹ',
    'report.type': 'خطرہ کی قسم',
    'report.location': 'مقام',
    'report.description': 'تفصیل',
    'report.submit': 'رپورٹ جمع کریں',
    'common.loading': 'لوڈ ہو رہا ہے...',
    'common.cancel': 'منسوخ',
    'hazard.tsunami': 'سونامی',
    'hazard.hurricane': 'طوفان',
    'hazard.oil_spill': 'تیل کا رساؤ',
    'severity.low': 'کم - معمولی تشویش',
    'severity.critical': 'نازک - فوری خطرہ'
  },
  
  // Assamese
  as: {
    'header.title': 'একোৱা-এলাৰ্ট',
    'header.signin': 'ছাইন ইন',
    'hero.title': 'একোৱা-এলাৰ্ট প্লেটফৰ্ম',
    'report.title': 'সাগৰীয় বিপদৰ ৰিপৰ্ট',
    'report.type': 'বিপদৰ প্ৰকাৰ',
    'report.location': 'স্থান',
    'report.description': 'বৰ্ণনা',
    'report.submit': 'ৰিপৰ্ট জমা দিয়ক',
    'common.loading': 'লোড হৈ আছে...',
    'common.cancel': 'ৰদ্দ কৰক',
    'hazard.tsunami': 'সুনামি',
    'hazard.hurricane': 'তুফান',
    'hazard.oil_spill': 'তেলৰ সিঁচন',
    'severity.low': 'কম - সাধাৰণ চিন্তা',
    'severity.critical': 'গুৰুতৰ - তৎক্ষণাৎ বিপদ'
  },
  
  // Odia
  or: {
    'header.title': 'ଅକ୍ୱା-ଅଲର୍ଟ',
    'header.signin': 'ସାଇନ ଇନ',
    'hero.title': 'ଅକ୍ୱା-ଅଲର୍ଟ ପ୍ଲ୍ୟାଟଫର୍ମ',
    'report.title': 'ସାଗର ଖତରାର ରିପୋର୍ଟ',
    'report.type': 'ଖତରାର ପ୍ରକାର',
    'report.location': 'ସ୍ଥାନ',
    'report.description': 'ବର୍ଣନା',
    'report.submit': 'ରିପୋର୍ଟ ଜମା କରନ୍ତୁ',
    'common.loading': 'ଲୋଡ ହୁଅଛି...',
    'common.cancel': 'ରଦ୍ଦ କରନ୍ତୁ',
    'hazard.tsunami': 'ସୁନାମି',
    'hazard.hurricane': 'ତୁଫାନ',
    'hazard.oil_spill': 'ତେଲ ଛିଟିବା',
    'severity.low': 'କମ୍ - ସାଧାରଣ ଚିନ୍ତା',
    'severity.critical': 'ଗୁରୁତର - ତତ୍କାଳୀନ ଖତରା'
  },
  
  // Kashmiri
  ks: {
    'header.title': 'اکوا-الرٹ',
    'header.signin': 'سائن اِن',
    'hero.title': 'اکوا-الرٹ پلیٹ فارم',
    'report.title': 'سمُندُر خطرہ رپورٹ',
    'report.type': 'خطرُک قِسم',
    'report.location': 'جاے',
    'report.description': 'تفصیل',
    'report.submit': 'رپورٹ جمع کرو',
    'common.loading': 'لوڈ گومُت...',
    'common.cancel': 'رَد کرو',
    'hazard.tsunami': 'سونامی',
    'hazard.hurricane': 'توفان',
    'hazard.oil_spill': 'تیل رِساو',
    'severity.low': 'کَم - معمولی فِکر',
    'severity.critical': 'نازُک - فوری خطرہ'
  },
  
  // Konkani
  gom: {
    'header.title': 'अक्वा-अलर्ट',
    'header.signin': 'सायन इन',
    'hero.title': 'अक्वा-अलर्ट प्लॅटफॉर्म',
    'report.title': 'समुद्री धोक्याचो रिपोर्ट',
    'report.type': 'धोक्याचो प्रकार',
    'report.location': 'सुवात',
    'report.description': 'वर्णन',
    'report.submit': 'रिपोर्ट दिया',
    'common.loading': 'लोड जाता...',
    'common.cancel': 'रद्द करा',
    'hazard.tsunami': 'सुनामी',
    'hazard.hurricane': 'वादळ',
    'hazard.oil_spill': 'तेल गळती',
    'severity.low': 'उणें - लहान चिंता',
    'severity.critical': 'गंभीर - तात्काळ धोको'
  },
  
  // Manipuri
  mni: {
    'header.title': 'একোৱা-এলাৰ্ট',
    'header.signin': 'সাইন ইন',
    'hero.title': 'একোৱা-এলাৰ্ট প্লেটফৰ্ম',
    'report.title': 'সমুদ্রগী খুদোংচাবা রিপোর্ট',
    'report.type': 'খুদোংচাবাগী মতম',
    'report.location': 'মফম',
    'report.description': 'বিবরণ',
    'report.submit': 'রিপোর্ট থাদোকউ',
    'common.loading': 'লোড তৌরি...',
    'common.cancel': 'রেদ তৌ',
    'hazard.tsunami': 'সুনামি',
    'hazard.hurricane': 'নুংথিল',
    'hazard.oil_spill': 'তেল থোকপা',
    'severity.low': 'অতোম্বা - অপিকপা লোইশিনবা',
    'severity.critical': 'যাম্না অকাযবা - খুদক্তা খুদোংচাবা'
  },
  
  // Nepali
  ne: {
    'header.title': 'एक्वा-अलर्ट',
    'header.signin': 'साइन इन',
    'hero.title': 'एक्वा-अलर्ट प्ल्याटफर्म',
    'report.title': 'समुद्री जोखिम रिपोर्ट',
    'report.type': 'जोखिमको प्रकार',
    'report.location': 'स्थान',
    'report.description': 'विवरण',
    'report.submit': 'रिपोर्ट पेश गर्नुहोस्',
    'common.loading': 'लोड हुँदै...',
    'common.cancel': 'रद्द गर्नुहोस्',
    'hazard.tsunami': 'सुनामी',
    'hazard.hurricane': 'आँधी',
    'hazard.oil_spill': 'तेल चुहिने',
    'severity.low': 'कम - सामान्य चिन्ता',
    'severity.critical': 'गम्भीर - तत्काल जोखिम'
  },
  
  // Santali
  sat: {
    'header.title': 'ᱟᱠᱣᱟ-ᱟᱞᱟᱨᱴ',
    'header.signin': 'ᱥᱟᱭᱱ ᱤᱱ',
    'hero.title': 'ᱟᱠᱣᱟ-ᱟᱞᱟᱨᱴ ᱯᱞᱮᱴᱯᱷᱟᱨᱢ',
    'report.title': 'ᱥᱟᱢᱩᱫᱽᱨᱤ ᱠᱷᱟᱛᱟᱨ ᱨᱤᱯᱚᱨᱴ',
    'report.type': 'ᱠᱷᱟᱛᱟᱨᱟᱜ ᱞᱮᱠᱟ',
    'report.location': 'ᱡᱟᱭᱜᱟ',
    'report.description': 'ᱵᱤᱵᱨᱚᱬ',
    'report.submit': 'ᱨᱤᱯᱚᱨᱴ ᱡᱚᱢᱟ',
    'common.loading': 'ᱞᱚᱰ ᱦᱚᱱᱚᱜ...',
    'common.cancel': 'ᱨᱟᱫᱽᱫᱚ',
    'hazard.tsunami': 'ᱥᱩᱱᱟᱢᱤ',
    'hazard.hurricane': 'ᱟᱟᱱᱫᱷᱤ',
    'hazard.oil_spill': 'ᱛᱮᱞ ᱪᱷᱤᱛᱟᱱ',
    'severity.low': 'ᱟᱞᱜᱟ - ᱥᱟᱢᱟᱱᱟ ᱪᱤᱱᱛᱟ',
    'severity.critical': 'ᱪᱷᱤᱢᱟᱱ - ᱛᱤᱱᱟᱜ ᱠᱷᱟᱛᱟᱨ'
  },
  
  // Sindhi
  sd: {
    'header.title': 'اَکوا-اَلرٽ',
    'header.signin': 'سائِن اِن',
    'hero.title': 'اَکوا-اَلرٽ پلَٽ فارم',
    'report.title': 'سمُندري خطري جو رپورٽ',
    'report.type': 'خطري جو قِسم',
    'report.location': 'جاي',
    'report.description': 'تفصيل',
    'report.submit': 'رپورٽ جمع ڪريو',
    'common.loading': 'لوڊ ٿي رهيو آهي...',
    'common.cancel': 'رد ڪريو',
    'hazard.tsunami': 'سونامي',
    'hazard.hurricane': 'طوفان',
    'hazard.oil_spill': 'تيل جو رساو',
    'severity.low': 'گهَٽ - عام فِڪر',
    'severity.critical': 'نازُڪ - فوري خطرو'
  },
  
  // Tibetan
  bo: {
    'header.title': 'ཆུ་སྐྱོན་',
    'header.signin': 'བསྐྱོན་བཅུག་',
    'hero.title': 'ཆུ་སྐྱོན་བསྐྱོན་ཁྲི་བས་',
    'report.title': 'རྒྱ་མཚོ་ཉེན་ཁྲི་བསྐྱོན་',
    'report.type': 'ཉེན་ཁྲི་རིགས་',
    'report.location': 'ས་གནས་',
    'report.description': 'རྒྱས་བཤད་',
    'report.submit': 'བསྐྱོན་བསྐྱོན་བཅུག་',
    'common.loading': 'བསྐྱོན་བཅུག་བཞིན་བཞིན...',
    'common.cancel': 'བསྐྱོན་བཞོག་',
    'hazard.tsunami': 'སུ-ན་མི་',
    'hazard.hurricane': 'རླུང་བུ་',
    'hazard.oil_spill': 'སྣུམ་བསྐྱོན་བས་',
    'severity.low': 'ནི་མ - བསྐྱོན་བས་ཆུག་བས་',
    'severity.critical': 'ཉེན་ཁྲི་ཆེ་བ - སྐད་མ་ཉེན་ཁྲི'
  },
  
  // Maithili
  mai: {
    'header.title': 'अक्वा-अलर्ट',
    'header.signin': 'साइन इन',
    'hero.title': 'अक्वा-अलर्ट प्लेटफार्म',
    'report.title': 'समुद्री खतराक रिपोर्ट',
    'report.type': 'खतराक प्रकार',
    'report.location': 'स्थान',
    'report.description': 'विवरण',
    'report.submit': 'रिपोर्ट जमा करू',
    'common.loading': 'लोड भरहल जारहल अछि...',
    'common.cancel': 'रद्द करू',
    'hazard.tsunami': 'सुनामी',
    'hazard.hurricane': 'तूफान',
    'hazard.oil_spill': 'तेलक छिटकाव',
    'severity.low': 'कम - सामान्य चिन्ता',
    'severity.critical': 'गंभीर - तत्काल खतरा'
  },
  
  // Dogri
  doi: {
    'header.title': 'अक्वा-अलर्ट',
    'header.signin': 'साइन इन',
    'hero.title': 'अक्वा-अलर्ट प्लेटफार्म',
    'report.title': 'समुंदरी खतरे दी रिपोर्ट',
    'report.type': 'खतरे दी किस्म',
    'report.location': 'जग्हा',
    'report.description': 'वर्णन',
    'report.submit': 'रिपोर्ट जमां करो',
    'common.loading': 'लोड होदा पैआ...',
    'common.cancel': 'रद्द करो',
    'hazard.tsunami': 'सुनामी',
    'hazard.hurricane': 'तूफान',
    'hazard.oil_spill': 'तेल दा रिसाव',
    'severity.low': 'घट्ट - आम चिंता',
    'severity.critical': 'गंभीर - तुरंत खतरा'
  },
  
  // Sanskrit
  sa: {
    'header.title': 'अक्व-अलर्ट्',
    'header.signin': 'प्रवेशः',
    'hero.title': 'अक्व-अलर्ट् मञ्चः',
    'report.title': 'सागरीय आपदा विवरणम्',
    'report.type': 'आपदायाः प्रकारः',
    'report.location': 'स्थानम्',
    'report.description': 'विवरणम्',
    'report.submit': 'विवरणं समर्पयतु',
    'common.loading': 'लोड् भवति...',
    'common.cancel': 'रद्दः',
    'hazard.tsunami': 'सुनामि',
    'hazard.hurricane': 'वायुझञ्झा',
    'hazard.oil_spill': 'तैल स्रावः',
    'severity.low': 'न्यून - सामान्य चिन्ता',
    'severity.critical': 'गुरुतर - तत्कालीन आपद्'
  }
} as const;

export function getTranslation(lang: Language, key: string): string {
  const langTranslations = (translations as any)[lang] || translations.en;
  return (langTranslations as any)[key] || key;
}