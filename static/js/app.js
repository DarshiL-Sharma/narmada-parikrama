// =============================================
// APP.JS — Page routing + Dynamic rendering
// =============================================

function staticPath(relativePath) {
  const base = (window.STATIC_URL || '/static/').replace(/\/$/, '');
  return base + '/' + relativePath;
}

// ---- SVG ICONS ----
const ICONS = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  gallery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  seva: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  parikrama: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  qr: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/><rect x="5" y="5" width="3" height="3" fill="currentColor"/><rect x="16" y="5" width="3" height="3" fill="currentColor"/><rect x="5" y="16" width="3" height="3" fill="currentColor"/></svg>`,
  img: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="36" height="36"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  phone: '📞',
  mail: '✉️',
};

// ---- GALLERY DATA — 8 images ----
const galleryData = [
  { img: staticPath("images/gallery/g1.jpg") },
  { img: staticPath("images/gallery/g2.jpg") },
  { img: staticPath("images/gallery/g3.jpg") },
  { img: staticPath("images/gallery/g4.jpg") },
  { img: staticPath("images/gallery/g5.jpg") },
  { img: staticPath("images/gallery/g6.jpg") },
  { img: staticPath("images/gallery/g7.jpg") },
  { img: staticPath("images/gallery/g8.jpg") },
];

// ---- GALLERY DESCRIPTIONS — 8 captions ----
const galleryDescs = {
  hi: [
    "अन्न वितरण शिविर — सेकड़ों यात्रियों को भोजन",
    "विश्राम केंद्र — थके यात्रियों का आश्रय",
    "अन्न वितरण शिविर — सेकड़ों यात्रियों को भोजन",
    "अन्न वितरण शिविर — सेकड़ों यात्रियों को भोजन",
    "अन्न वितरण शिविर — सेकड़ों यात्रियों को भोजन",
    "माँ नर्मदा आरती — भव्य आयोजन",
    "यात्रियों का स्वागत — संस्था परिवार",
    "अन्न वितरण शिविर — सेकड़ों यात्रियों को भोजन",
  ],
  en: [
    "Food distribution camp — meals for hundreds",
    "Rest centre — shelter for tired pilgrims",
    "Food distribution camp — meals for hundreds",
    "Food distribution camp — meals for hundreds",
    "Food distribution camp — meals for hundreds",
    "Maa Narmada Aarti — grand ceremony",
    "Welcoming pilgrims — trust family",
    "Food distribution camp — meals for hundreds",
  ],
  mr: [
    "अन्न वितरण शिबिर — शेकडो यात्रेकरूंना जेवण",
    "विश्रामगृह — थकलेल्या यात्रेकरूंचा आश्रय",
    "अन्न वितरण शिबिर — शेकडो यात्रेकरूंना जेवण",
    "अन्न वितरण शिबिर — शेकडो यात्रेकरूंना जेवण",
    "अन्न वितरण शिबिर — शेकडो यात्रेकरूंना जेवण",
    "माऊलींची आरती — भव्य कार्यक्रम",
    "यात्रेकरूंचे स्वागत — संस्था परिवार",
    "अन्न वितरण शिबिर — शेकडो यात्रेकरूंना जेवण",
  ],
  gu: [
    "અન્ન વિતરણ શિબિર — સેંકડો યાત્રીઓને ભોજન",
    "વિશ્રામ ગૃહ — થાકેલા યાત્રીઓનો આશ્રય",
    "અન્ન વિતરણ શિબિર — સેંકડો યાત્રીઓને ભોજન",
    "અન્ન વિતરણ શિબિર — સેંકડો યાત્રીઓને ભોજન",
    "અન્ન વિતરણ શિબિર — સેંકડો યાત્રીઓને ભોજન",
    "માઁ નર્મદા આરતી — ભવ્ય આયોજન",
    "યાત્રીઓનું સ્વાગત — સંસ્થા પરિવાર",
    "અન્ન વિતરણ શિબિર — સેંકડો યાત્રીઓને ભોજન",
  ],
};

// ---- SEVA BLOCK DATA — 4 blocks x 3 images ----
const sevaBlocks = [
  { imgs: [staticPath("images/seva/seva1a.jpg"), staticPath("images/seva/seva1b.jpg"), staticPath("images/seva/seva1c.jpg")] },
  { imgs: [staticPath("images/seva/seva2a.jpg"), staticPath("images/seva/seva2b.jpg"), staticPath("images/seva/seva2c.jpg")] },
  { imgs: [staticPath("images/seva/seva3a.jpg"), staticPath("images/seva/seva3b.jpg"), staticPath("images/seva/seva3c.jpg")] },
  { imgs: [staticPath("images/seva/seva4a.jpg"), staticPath("images/seva/seva4b.jpg"), staticPath("images/seva/seva4c.jpg")] },
];

// ---- PARIKRAMA STOPS — 17 stops x 2 images ----
const parikramaStops = [
  { imgs: [staticPath("images/parikrama/p1a.jpg"),  staticPath("images/parikrama/p1b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p2a.jpg"),  staticPath("images/parikrama/p2b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p3a.jpg"),  staticPath("images/parikrama/p3b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p4a.jpg"),  staticPath("images/parikrama/p4b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p5a.jpg"),  staticPath("images/parikrama/p5b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p6a.jpg"),  staticPath("images/parikrama/p6b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p7a.jpg"),  staticPath("images/parikrama/p7b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p8a.jpg"),  staticPath("images/parikrama/p8b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p9a.jpg"),  staticPath("images/parikrama/p9b.jpg")]  },
  { imgs: [staticPath("images/parikrama/p10a.jpg"), staticPath("images/parikrama/p10b.jpg")] },
  { imgs: [staticPath("images/parikrama/p11a.jpg"), staticPath("images/parikrama/p11b.jpg")] },
  { imgs: [staticPath("images/parikrama/p12a.jpg"), staticPath("images/parikrama/p12b.jpg")] },
  { imgs: [staticPath("images/parikrama/p13a.jpg"), staticPath("images/parikrama/p13b.jpg")] },
  { imgs: [staticPath("images/parikrama/p14a.jpg"), staticPath("images/parikrama/p14b.jpg")] },
  { imgs: [staticPath("images/parikrama/p15a.jpg"), staticPath("images/parikrama/p15b.jpg")] },
  { imgs: [staticPath("images/parikrama/p16a.jpg"), staticPath("images/parikrama/p16b.jpg")] },
  { imgs: [staticPath("images/parikrama/p17a.jpg"), staticPath("images/parikrama/p17b.jpg")] },
];

// ---- PARIKRAMA DESCRIPTIONS — 17 stops, 4 languages ----
const parikramaDescs = {
  hi: [
    "अमरकंटक — माँ नर्मदा का उद्गम स्थल। यहाँ से पवित्र परिक्रमा का शुभारंभ होता है।",
    "डोंगी टिकरिया — घने जंगलों के बीच से होकर गुजरने वाला रमणीय मार्ग।",
    "शहपुरा — नर्मदा तट पर बसा शांत नगर। यात्रियों के लिए विश्राम स्थल।",
    "जबलपुर — भेड़ाघाट का अद्भुत संगमरमर। धुआँधार जलप्रपात दर्शनीय स्थल है।",
    "बरमानघाट — पावन नर्मदा तट। यहाँ स्नान का विशेष महत्व है।",
    "बरेली — नर्मदा किनारे का सुंदर पड़ाव। यहाँ प्राचीन मंदिर हैं।",
    "बुधनी — नर्मदा का विशाल तट। शांत वातावरण में विश्राम का अवसर।",
    "नेमावर — नर्मदा का पवित्र तीर्थ। यहाँ सिद्धेश्वर मंदिर प्रसिद्ध है।",
    "हरदा — नर्मदा के किनारे बसा सुंदर शहर। यात्रियों के लिए सुविधाएँ उपलब्ध।",
    "खंडवा — महत्वपूर्ण पड़ाव। यहाँ से ओंकारेश्वर नजदीक है।",
    "महेश्वर — अहिल्याबाई होल्कर की नगरी। प्राचीन घाट और किला दर्शनीय।",
    "केवड़िया — स्टैच्यू ऑफ यूनिटी क्षेत्र। नर्मदा यहाँ विशाल रूप धारण करती है।",
    "गरुडेश्वर — पवित्र तीर्थ स्थल। भगवान गरुड़ का यहाँ विशेष महत्व है।",
    "तिलकवाड़ा — नर्मदा तट का रमणीय स्थान। यात्रा का महत्वपूर्ण पड़ाव।",
    "नरेश्वर — गुजरात में नर्मदा का पावन तट। यहाँ आश्रम और मंदिर हैं।",
    "भरूच — नर्मदा और अरब सागर के संगम के निकट। प्राचीन नगर।",
    "रत्ना सागर / अरब सागर संगम — परिक्रमा का पश्चिमी छोर। यहाँ माँ नर्मदा सागर में मिलती हैं।",
  ],
  en: [
    "Amarkantak — Origin of Maa Narmada. The sacred Parikrama begins here.",
    "Dongi Tikariya — A scenic route passing through dense forests.",
    "Shahpura — A peaceful town on Narmada banks. Rest stop for pilgrims.",
    "Jabalpur — The marvellous marble rocks of Bhedaghat. Dhuandhar waterfall is a must-see.",
    "Barmanighat — Sacred Narmada bank. Bathing here holds special significance.",
    "Bareli — Beautiful stop on Narmada banks. Ancient temples here.",
    "Budhni — Wide Narmada bank. Opportunity to rest in peaceful surroundings.",
    "Nemawar — Sacred pilgrimage on Narmada. Siddheshwar temple is famous here.",
    "Harda — Beautiful city on Narmada banks. Facilities available for pilgrims.",
    "Khandwa — Important stop. Omkareshwar is nearby from here.",
    "Maheshwar — City of Ahilyabai Holkar. Ancient ghats and fort are worth seeing.",
    "Kevadiya — Statue of Unity area. Narmada takes a vast form here.",
    "Garudeshwar — Sacred pilgrimage site. Lord Garuda holds special significance here.",
    "Tilakwada — Scenic spot on Narmada banks. Important stop on the journey.",
    "Nareshwar — Sacred Narmada bank in Gujarat. Ashrams and temples here.",
    "Bharuch — Near the confluence of Narmada and Arabian Sea. Ancient city.",
    "Ratna Sagar / Arabian Sea confluence — Western end of Parikrama. Maa Narmada meets the ocean here.",
  ],
  mr: [
    "अमरकंटक — माऊलींचे उगमस्थान. येथून पवित्र परिक्रमेचा प्रारंभ होतो.",
    "डोंगी टिकरिया — घनदाट जंगलातून जाणारा रम्य मार्ग.",
    "शहपुरा — नर्मदेच्या काठावरील शांत नगर. यात्रेकरूंसाठी विश्रामस्थान.",
    "जबलपूर — भेडाघाटचे अद्भुत संगमरवर. धुवांधार धबधबा पाहण्यासारखा आहे.",
    "बरमानघाट — पावन नर्मदा तट. येथे स्नानाचे विशेष महत्त्व आहे.",
    "बरेली — नर्मदेकाठचा सुंदर थांबा. येथे प्राचीन मंदिरे आहेत.",
    "बुधनी — नर्मदेचा विशाल तट. शांत वातावरणात विश्रामाची संधी.",
    "नेमावर — नर्मदेचे पवित्र तीर्थ. सिद्धेश्वर मंदिर प्रसिद्ध आहे.",
    "हरदा — नर्मदेकाठचे सुंदर शहर. यात्रेकरूंसाठी सुविधा उपलब्ध.",
    "खंडवा — महत्त्वाचा थांबा. येथून ओंकारेश्वर जवळ आहे.",
    "महेश्वर — अहिल्याबाई होळकरांचे नगर. प्राचीन घाट व किल्ला पाहण्यासारखे.",
    "केवडिया — स्टॅच्यू ऑफ युनिटी परिसर. नर्मदा येथे विशाल रूप धारण करते.",
    "गरुडेश्वर — पवित्र तीर्थस्थळ. भगवान गरुडाचे येथे विशेष महत्त्व आहे.",
    "तिलकवाडा — नर्मदेकाठचे रम्य ठिकाण. प्रवासाचा महत्त्वाचा थांबा.",
    "नरेश्वर — गुजरातमधील नर्मदेचा पावन तट. येथे आश्रम व मंदिरे आहेत.",
    "भरूच — नर्मदा व अरबी समुद्राच्या संगमाजवळ. प्राचीन नगर.",
    "रत्ना सागर / अरबी समुद्र संगम — परिक्रमेचा पश्चिम टोक. माऊली येथे सागरास मिळतात.",
  ],
  gu: [
    "અમરકંટક — માઁ નર્મદાનું ઉદ્ગમ સ્થળ. અહીંથી પવિત્ર પરિક્રમાની શરૂઆત થાય છે.",
    "ડોંગી ટિકરિયા — ગાઢ જંગલોમાંથી પસાર થતો રળિયામણો માર્ગ.",
    "શહપુરા — નર્મદા કિનારે વસેલું શાંત નગર. યાત્રીઓ માટે વિશ્રામ સ્થળ.",
    "જબલપુર — ભેડાઘાટના અદ્ભુત આરસ. ધુઆઁધાર જળધોધ દર્શનીય છે.",
    "બરમાનઘાટ — પાવન નર્મદા તટ. અહીં સ્નાનનું વિશેષ મહત્ત્વ છે.",
    "બરેલી — નર્મદા કિનારે સુંદર પડાવ. અહીં પ્રાચીન મંદિર છે.",
    "બુધની — નર્મદાનો વિશાળ ઘાટ. શાંત વાતાવરણમાં વિશ્રામની તક.",
    "નેમાવર — નર્મદાનું પવિત્ર તીર્થ. સિદ્ધેશ્વર મંદિર અહીં પ્રસિદ્ધ છે.",
    "હરદા — નર્મદા કિનારે વસેલું સુંદર શહેર. યાત્રીઓ માટે સુવિધા ઉપલબ્ધ.",
    "ખંડવા — મહત્ત્વપૂર્ણ પડાવ. અહીંથી ઓમ્કારેશ્વર નજીક છે.",
    "મહેશ્વર — અહિલ્યાબાઈ હોળકરની નગરી. પ્રાચીન ઘાટ અને કિલ્લો દર્શનીય.",
    "કેવડિયા — સ્ટેચ્યૂ ઓફ યુનિટી વિસ્તાર. નર્મદા અહીં વિશાળ રૂપ ધારણ કરે છે.",
    "ગરુડેશ્વર — પવિત્ર તીર્થ સ્થળ. ભગવાન ગરુડનું અહીં વિશેષ મહત્ત્વ છે.",
    "તિલકવાડા — નર્મદા તટનું રળિયામણું સ્થળ. યાત્રાનો મહત્ત્વપૂર્ણ પડાવ.",
    "નરેશ્વર — ગુજરાતમાં નર્મદાનો પાવન ઘાટ. અહીં આશ્રમ અને મંદિર છે.",
    "ભરૂચ — નર્મદા અને અરબ સાગરના સંગમ નજીક. પ્રાચીન નગર.",
    "રત્ના સાગર / અરબ સાગર સંગમ — પરિક્રમાનો પશ્ચિમ છેડો. માઁ નર્મદા અહીં સાગરને મળે છે.",
  ],
};

// =============================================
// RENDER HELPERS
// =============================================
function imgOrPlaceholder(src, placeholderText) {
  const id = 'img-' + Math.random().toString(36).slice(2, 8);
  return `
    <div class="img-wrap" id="${id}">
      <img src="${src}" alt="" loading="lazy"
           onerror="document.getElementById('${id}').innerHTML='<div class=\\'img-placeholder\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'2\\' width=\\'36\\' height=\\'36\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg><span>${placeholderText}</span></div>'"
      >
    </div>`;
}

// =============================================
// PAGE RENDERS
// =============================================
function renderHome() {
  const l = currentLang;
  const done = translations[l].work_done;
  const prog = translations[l].work_progress;

  document.getElementById("page-home").innerHTML = `
    <div class="hero-image-wrap">
      <img src="${staticPath('images/sanstha-hero.jpg')}" alt="${t('hero_tagline')}"
           onerror="this.style.display='none'">
      <div class="hero-overlay">
        <h1>${t("hero_tagline")}</h1>
        <p>${t("hero_subtitle")}</p>
      </div>
    </div>

    <div class="om-symbol">ॐ</div>
    <h2 class="section-title">${t("about_heading")}</h2>
    <div class="divider"></div>
    <div class="card">
      <div class="card-body">
        <p>${t("about_text")}</p>
      </div>
    </div>

    <h2 class="section-title mt-md">${t("work_heading")}</h2>
    <div class="divider"></div>

    <div class="work-block done">
      <h3>✅ ${t("work_done_heading")}</h3>
      <ul class="work-list">
        ${done.map(d => `<li>${d}</li>`).join("")}
      </ul>
    </div>

    <div class="work-block progress">
      <h3>🔄 ${t("work_progress_heading")}</h3>
      <ul class="work-list">
        ${prog.map(p => `<li>${p}</li>`).join("")}
      </ul>
    </div>

    <h2 class="section-title mt-md">${t("map_heading")}</h2>
    <div class="divider"></div>

    <!-- Narmada Parikrama Map Image -->
    <div style="margin:0 16px 12px; border-radius:14px; overflow:hidden; box-shadow:0 4px 18px rgba(59,26,0,.13); cursor:zoom-in;"
         onclick="document.getElementById('map-modal').style.display='flex'">
      <img
        src="${staticPath('images/parikrama-map.jpg')}"
        alt="नर्मदा परिक्रमा मार्ग"
        style="width:100%; display:block;"
        onerror="this.parentElement.innerHTML='<div style=\\'padding:30px;text-align:center;color:#B85C00;background:#fff4e0;border-radius:14px;\\'><b>🗺️ नर्मदा परिक्रमा मार्ग चित्र</b><br><small>static/images/parikrama-map.jpg यहाँ रखें</small></div>'"
      >
      <div style="background:rgba(59,26,0,.7); color:#F5C842; text-align:center; padding:8px; font-size:14px; font-weight:600;">
        👆 नक्शा बड़ा करने के लिए टैप करें
      </div>
    </div>

    <!-- Fullscreen Map Modal -->
    <div id="map-modal"
         style="display:none; position:fixed; inset:0; background:rgba(0,0,0,.93);
                z-index:9999; align-items:center; justify-content:center; flex-direction:column;"
         onclick="this.style.display='none'">
      <div style="color:white; font-size:13px; margin-bottom:8px; opacity:.7;">कहीं भी टैप करें — बंद करें</div>
      <img
        src="${staticPath('images/parikrama-map.jpg')}"
        alt="नर्मदा परिक्रमा मार्ग"
        style="max-width:98vw; max-height:88vh; border-radius:8px; object-fit:contain;"
      >
    </div>

    <!-- Google Maps Button -->
    <div style="margin:0 16px 20px;">
      <a href="https://www.google.com/maps/dir/Amarkantak/Mandla/Jabalpur/Harda/Omkareshwar/Maheshwar/Bharuch"
         target="_blank" rel="noopener"
         style="display:flex; align-items:center; justify-content:center; gap:10px;
                background:linear-gradient(135deg,#B85C00,#E87722); color:white;
                text-decoration:none; padding:14px 20px; border-radius:14px;
                font-size:18px; font-weight:700; box-shadow:0 4px 18px rgba(59,26,0,.2);">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" width="24" height="24">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
          <line x1="8" y1="2" x2="8" y2="18"/>
          <line x1="16" y1="6" x2="16" y2="22"/>
        </svg>
        ${t("map_open_btn")}
      </a>
    </div>

    <footer class="site-footer">
      <strong>${t("footer_trust")}</strong>
      ${t("footer_copy")}
    </footer>
  `;
}

function renderGallery() {
  const descs = galleryDescs[currentLang] || galleryDescs.hi;
  const cards = galleryData.map((g, i) => `
    <div class="gallery-card">
      ${imgOrPlaceholder(g.img, t("img_placeholder"))}
      <div class="img-desc">${descs[i] || t("img_desc")}</div>
    </div>`).join("");

  document.getElementById("page-gallery").innerHTML = `
    <h2 class="section-title">${t("gallery_heading")}</h2>
    <p class="section-sub">${t("gallery_sub")}</p>
    <div class="divider"></div>
    <div class="gallery-grid">${cards}</div>
  `;
}

function renderSeva() {
  const items = translations[currentLang].seva_items;
  const blocks = sevaBlocks.map((b, i) => `
    <div class="seva-block">
      <div class="seva-block-header">🙏 ${items[i]?.title || ""}</div>
      <div class="seva-block-desc">${items[i]?.desc || ""}</div>
      <div class="seva-img-row">
        ${b.imgs.map(img => imgOrPlaceholder(img, t("img_placeholder"))).join("")}
      </div>
    </div>`).join("");

  document.getElementById("page-seva").innerHTML = `
    <h2 class="section-title">${t("seva_heading")}</h2>
    <p class="section-sub">${t("seva_sub")}</p>
    <div class="divider"></div>
    ${blocks}
  `;
}

function renderHelp() {
  const contacts = translations[currentLang].contacts;
  const tips     = translations[currentLang].pilgrim_tips;
  const stops    = translations[currentLang].route_stops;

  const contactCards = contacts.map(c => {
    const href = c.type === "tel" ? `tel:${c.value}` : `mailto:${c.value}`;
    const icon = c.type === "tel" ? ICONS.phone : ICONS.mail;
    return `
      <a href="${href}" class="contact-card ${c.type}">
        <div class="cc-icon">${icon}</div>
        <div class="cc-label">${c.label}</div>
        <div class="cc-value">${c.value}</div>
      </a>`;
  }).join("");

  document.getElementById("page-help").innerHTML = `
    <h2 class="section-title">${t("help_heading")}</h2>
    <p class="section-sub">${t("help_sub")}</p>
    <div class="divider"></div>
    <h3 class="section-title" style="font-size:var(--fs-lg);padding-top:10px">🚨 ${t("emergency_heading")}</h3>
    <div class="emergency-grid">${contactCards}</div>
    <h3 class="section-title" style="font-size:var(--fs-lg);padding-top:18px">📋 ${t("pilgrim_heading")}</h3>
    <div class="divider"></div>
    <ul class="tips-list">
      ${tips.map(tip => `<li>${tip}</li>`).join("")}
    </ul>
    <h3 class="section-title" style="font-size:var(--fs-lg);padding-top:18px">🗺️ ${t("route_heading")}</h3>
    <div class="divider"></div>
    <ol class="route-list">
      ${stops.map(s => `<li>${s}</li>`).join("")}
    </ol>
  `;
}

function renderParikrama() {
  const stops = translations[currentLang].route_stops;
  const descs = parikramaDescs[currentLang] || parikramaDescs.hi;

  const stopBlocks = parikramaStops.map((stop, i) => `
    <div class="parikrama-stop">
      <div class="parikrama-stop-title">📍 ${stops[i] || ""}</div>
      <div class="parikrama-stop-desc">${descs[i] || ""}</div>
      <div class="parikrama-imgs">
        ${stop.imgs.map(img => imgOrPlaceholder(img, t("route_img_placeholder"))).join("")}
      </div>
    </div>`).join("");

  document.getElementById("page-parikrama").innerHTML = `
    <h2 class="section-title">${t("parikrama_heading")}</h2>
    <p class="section-sub">${t("parikrama_sub")}</p>
    <div class="divider"></div>
    <div class="route-note">ℹ️ ${t("parikrama_note")}</div>
    ${stopBlocks}
  `;
}

function renderAll() {
  renderHome();
  renderGallery();
  renderSeva();
  renderHelp();
  renderParikrama();

  const banner = document.getElementById("offline-banner");
  if (banner) banner.textContent = t("offline_banner");

  const navLabels = ["nav_home","nav_gallery","nav_seva","nav_help","nav_parikrama"];
  document.querySelectorAll(".nav-item span").forEach((el, i) => {
    el.textContent = t(navLabels[i]);
  });
}

// =============================================
// NAVIGATION
// =============================================
function goTo(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById("page-" + pageId).classList.add("active");
  document.querySelector(`.nav-item[data-page="${pageId}"]`).classList.add("active");
  window.scrollTo(0, 0);
}

// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  initLang();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
    if (btn.dataset.lang === currentLang) btn.classList.add("active");
  });

  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => goTo(item.dataset.page));
  });

  renderAll();
  goTo("home");

  function updateOnline() {
    document.body.classList.toggle("is-offline", !navigator.onLine);
  }
  window.addEventListener("online", updateOnline);
  window.addEventListener("offline", updateOnline);
  updateOnline();
});