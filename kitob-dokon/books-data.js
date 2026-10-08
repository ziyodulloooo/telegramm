// Online Kitob Do'koni - Kitoblar bazasi
const INITIAL_BOOKS = [
  {
    id: 1,
    title: "Atom Odatlari",
    originalTitle: "Atomic Habits",
    author: "Jeyms Klir",
    category: "psixologiya",
    categoryName: "Psixologiya & Rivojlanish",
    price: 59000,
    oldPrice: 75000,
    rating: 4.9,
    reviewsCount: 342,
    badge: "Bestseller",
    format: "Qog'oz muqova",
    pages: 320,
    year: 2023,
    publisher: "Ziyo Nashriyoti",
    isbn: "978-9943-582-12-4",
    language: "O'zbekcha",
    description: "Mayda o'zgarishlar, ulkan natijalar! Hayotingizni o'zgartirish uchun katta inqiloblar qilish shart emas. Har kuni bor-yo'g'i 1% ga yaxshilanish uzoq muddatda aql bovar qilmas cho'qqilarga olib chiqadi. Bu kitob yaxshi odatlarni shakllantirish va yomonlaridan xalos bo'lish bo'yicha dunyo bo'ylab millionlab insonlar tanlagan eng samarali qo'llanmadir.",
    sampleTitle: "1-Bob: Kichik odatlarning hayratlanarli kuchi",
    sampleText: `1908-yildan 2003-yilgacha Buyuk Britaniya velosiped sportchilari deyarli hech qachon xalqaro musobaqalarda g'olib bo'lishmagan edi. 110 yil davomida britaniyalik velosipedchilar birorta ham Olimpiada oltin medalini qo'lga kiritmagan.

Keyin esa Deyv Breylsford jamoaga bosh murabbiy etib tayinlandi. U 'mayda yutuqlar agregatsiyasi' deb nomlangan strategiyani qo'lladi. Uning falsafasi oddiy edi: agar siz velosiped haydash bilan bog'liq har bir mayda jihatni 1 foizga yaxshilasangiz, ularning jamlanmasi katta sakrash beradi.

Ular velopoyafzallarni qulayroq qilishdi, o'rindiqlarni yengillashtirishdi, hatto qaysi yostiq sportchilarga yaxshiroq uxlash imkonini berishini o'rganishdi. 5 yil ichida ular Pekin Olimpiadasida jami oltin medallarning 60 foizini yutib olishdi.

Odatlar — bu o'z-o'zini takomillashtirishning murakkab foizlaridir. Bir xil harakatni har kuni takrorlasangiz, natijalar geometrik progressiyada ko'payadi...`,
    coverGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #78350f 100%)",
    accentColor: "#f59e0b",
    coverIcon: "⚡",
    stock: 14
  },
  {
    id: 2,
    title: "O'tkan Kunlar",
    originalTitle: "O'tkan kunlar",
    author: "Abdulla Qodiriy",
    category: "badiiy",
    categoryName: "Badiiy adabiyot",
    price: 45000,
    oldPrice: 55000,
    rating: 5.0,
    reviewsCount: 890,
    badge: "Klassika",
    format: "Qattiq muqova",
    pages: 416,
    year: 2022,
    publisher: "Sharq Yulduzi",
    isbn: "978-9943-001-11-0",
    language: "O'zbekcha",
    description: "O'zbek adabiyotidagi ilk roman. Otabek va Kumushbibining sof, ammo fojiali sevgisi, 19-asr Turkiston hayoti, xonliklar davridagi ijtimoiy-siyosiy ziddiyatlar yuksak mahorat bilan qalamga olingan. Har bir o'zbek xonadonida bo'lishi shart bo'lgan nodir durdona.",
    sampleTitle: "Muqaddima va Otabekning Marg'ilonga kelishi",
    sampleText: `1265-hijriy, dalv oyining yigirmanchi kunlari... Qishning sovuq bir kuni bo'lishiga qaramay, Marg'ilon bozorlarida odam gavjum edi. Karvonsaroy hujralaridan birida yigirma to'rt yoshlar chamasidagi kelishgan, xushbiychim bir yigit o'tirar edi.

Bu yigit toshkentlik Yusufbek hojining o'g'li Otabek edi. Uning yuzida jiddiylik, ko'zlarida teran ma'no aks etgan. U o'zining kelajak taqdirini butunlay o'zgartirib yuboradigan uchrashuv arafasida turganini hali bilmas edi...`,
    coverGradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e1b4b 100%)",
    accentColor: "#3b82f6",
    coverIcon: "📖",
    stock: 28
  },
  {
    id: 3,
    title: "Clean Code: Toza Kod",
    originalTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert S. Martin (Uncle Bob)",
    category: "it",
    categoryName: "Dasturlash & IT",
    price: 88000,
    oldPrice: 110000,
    rating: 4.8,
    reviewsCount: 215,
    badge: "Top IT",
    format: "Qattiq muqova",
    pages: 464,
    year: 2023,
    publisher: "IT Hub Press",
    isbn: "978-9943-776-90-5",
    language: "O'zbekcha / Ruscha",
    description: "Dasturchilar uchun muqaddas qo'llanma! Qanday qilib tushunarli, o'qish oson va kelajakda kengaytirish oson bo'lgan professional dasturiy kod yozish sirlari. O'zgaruvchilar nomlashdan tortib arxitektura tamoyillarigacha (SOLID, DRY, KISS) to'liq yoritilgan.",
    sampleTitle: "1-Bob: Nega toza kod yozishimiz kerak?",
    sampleText: `Yomon kod orqasida nima turadi? Shoshilish, muddatlarning qisqaligi, loyiha menejerlarining bosimi... Bularning barchasi sizga tanish. Ammo yomon kod bilan ishlash vaqt o'tishi bilan butun jamoaning tezligini nolga tushiradi.

Toza kod — bu o'qilganda xuddi she'r kabi ravon o'qiladigan, har bir funksiyasi faqat bitta vazifani bajaradigan koddir. Agar dasturchi o'z kodini san'at asari deb bilsa, u hech qachon chala ish qoldirmaydi.

Boshqalar sizning kodingizni o'qiyotganda qarg'ashmasin, aksincha rahmat aytishsin!`,
    coverGradient: "linear-gradient(135deg, #047857 0%, #10b981 50%, #064e3b 100%)",
    accentColor: "#10b981",
    coverIcon: "💻",
    stock: 9
  },
  {
    id: 4,
    title: "Boy Ota, Kambag'al Ota",
    originalTitle: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "biznes",
    categoryName: "Biznes & Moliya",
    price: 52000,
    oldPrice: 65000,
    rating: 4.7,
    reviewsCount: 512,
    badge: "Bestseller",
    format: "Qog'oz muqova",
    pages: 256,
    year: 2024,
    publisher: "Nihol Nashriyoti",
    isbn: "978-9943-345-88-2",
    language: "O'zbekcha",
    description: "Moliya savodxonligi bo'yicha dunyodagi birinchi raqamli kitob. Muallif ikki ota – biri yuqori martabali davlat xizmatchisi (kam ta'minlangan), ikkinchisi maktabni ham bitirmagan muvaffaqiyatli tadbirkor (boy) tarbiyasini taqqoslaydi. Aktiv va passivlar o'rtasidagi farqni ochib beradi.",
    sampleTitle: "1-Dars: Boylar pul uchun ishlamaydi",
    sampleText: `Ko'pchilik odamlar maktabda yaxshi o'qishadi, diplom olishadi va ertalabdan kechgacha pul ishlash uchun xizmat qilishadi. Ular 'kalamush poygasi' domiga tushib qolishgan.

Boy ota menga shunday dedi: 'Kambag'al va o'rta tabaqa pul uchun ishlaydi. Boylar esa pulni o'zlari uchun ishlashga majbur qiladi.'

Moliya savodxonligi — bu siz qancha pul topishingiz emas, qancha pulni o'zingizda saqlab qolishingiz va uni qanday ko'paytirishingizdir.`,
    coverGradient: "linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #4c1d95 100%)",
    accentColor: "#8b5cf6",
    coverIcon: "💰",
    stock: 19
  },
  {
    id: 5,
    title: "Temur Tuzuklari",
    originalTitle: "Tuzuki Temuriy",
    author: "Sohibqiron Amir Temur",
    category: "tarix",
    categoryName: "Tarix & Falsafa",
    price: 68000,
    oldPrice: 80000,
    rating: 5.0,
    reviewsCount: 430,
    badge: "Tarixiy boylik",
    format: "Qattiq muqova (Zarhalli)",
    pages: 352,
    year: 2023,
    publisher: "O'zbekiston Milliy Nashriyoti",
    isbn: "978-9943-120-77-9",
    language: "O'zbekcha",
    description: "Dunyo tarixidagi eng qudratli sarkarda va davlat arboblaridan biri bo'lgan Amir Temurning davlat boshqaruvi, adolat, harbiy san'at va axloqiy prinsiplari bayon etilgan nodir tarixiy-memuar asar.",
    sampleTitle: "Adolat va saltanat qoidalari",
    sampleText: `'Kuch — adolatdadir!' Bu shior mening butun saltanatimning tamal toshi bo'ldi. 

Qayerdaki adolat hukm sursa, o'sha yurtda obodlik, xalqida xotirjamlik va davlatida bardavomlik bo'lur. Mansabdorlarning har bir xatti-harakatini qat'iy nazorat qildim, mazlumning dodini zolimdan olib berishni o'zimning birinchi burchim deb bildim.

O'n ikki toifadagi kishilar bilan kengashib ish tutdim va hech qachon g'azab ustida hukm chiqarmadim...`,
    coverGradient: "linear-gradient(135deg, #831843 0%, #be185d 50%, #500724 100%)",
    accentColor: "#be185d",
    coverIcon: "👑",
    stock: 12
  },
  {
    id: 6,
    title: "Stiv Jobs",
    originalTitle: "Steve Jobs: The Exclusive Biography",
    author: "Uolter Ayzekson",
    category: "biznes",
    categoryName: "Biznes & Moliya",
    price: 79000,
    oldPrice: 95000,
    rating: 4.8,
    reviewsCount: 184,
    badge: "Biografiya",
    format: "Qattiq muqova",
    pages: 688,
    year: 2022,
    publisher: "Asaxiy Books",
    isbn: "978-9943-230-10-8",
    language: "O'zbekcha",
    description: "Apple asoschisi, dunyoni texnologiya va dizayn orqali tubdan o'zgartirgan afsonaviy daho Stiv Jobsning hayot yo'li. Uning qudrati, murosasizligi, mahsulotlarga bo'lgan telba muhabbati va yetakchilik uslubi haqida ochiq va xolis kitob.",
    sampleTitle: "Garajdan boshlangan inqilob",
    sampleText: `1976-yilda ikki yigit — Stiv Jobs va Stiv Voznyak — Kaliforniyadagi kichik garajda shaxsiy kompyuter yaratishga kirishdilar. O'sha paytda kompyuterlar ulkan xonalarni egallagan xira mashinalar edi.

Jobs har doim ta'kidlardi: 'Odamlar o'zlari nimani xohlashlarini, siz ularga buni ko'rsatmaguningizcha bilishmaydi.'

U mukammallikdan boshqa hech narsaga rozi bo'lmasdi. Har bir piksel, har bir quti dizayni, har bir tugma foydalanuvchiga hayrat ulashishi shart edi...`,
    coverGradient: "linear-gradient(135deg, #374151 0%, #111827 50%, #030712 100%)",
    accentColor: "#9ca3af",
    coverIcon: "🍎",
    stock: 15
  },
  {
    id: 7,
    title: "Kichkina Shahzoda",
    originalTitle: "Le Petit Prince",
    author: "Antuan de Sent-Ekzyuperi",
    category: "bolalar",
    categoryName: "Bolalar & Falsafa",
    price: 35000,
    oldPrice: 45000,
    rating: 4.9,
    reviewsCount: 620,
    badge: "Barcha yoshlar uchun",
    format: "Rangli rasmli",
    pages: 112,
    year: 2023,
    publisher: "Ziyo Bolalar",
    isbn: "978-9943-889-12-0",
    language: "O'zbekcha",
    description: "Dunyodagi eng ko'p tarjima qilingan kitoblardan biri. Bolalar uchun sehrli ertak, kattalar uchun esa mehr, do'stlik, sadoqat va insoniy mas'uliyat haqidagi chuqur falsafiy asar. 'Sen o'zing o'rgatgan, qo'lga o'rgatgan narsang uchun hamisha javobgarsan!'",
    sampleTitle: "Tulki bilan uchrashuv",
    sampleText: `- Salom, — dedi Tulki.
- Salom, — muloyimlik bilan javob berdi Kichkina Shahzoda.
- Kel, men bilan o'yna, — dedi Shahzoda. — Mening ko'nglim g'ash...
- Men sen bilan o'ynay olmayman, — javob berdi Tulki. — Chunki men qo'lga o'rgatilmaganman.
- Bu nima degani?
- Bu 'o'zaro rishta bog'lash' degani. Hozir sen men uchun minglab boshqa bolalarga o'xshagan oddiy bolasan. Lekin agar sen meni o'rgatsang, biz bir-birimizga kerak bo'lib qolamiz. Sen men uchun dunyoda yagona bo'lasan...`,
    coverGradient: "linear-gradient(135deg, #0284c7 0%, #38bdf8 50%, #0369a1 100%)",
    accentColor: "#38bdf8",
    coverIcon: "⭐",
    stock: 35
  },
  {
    id: 8,
    title: "Alkimyogar",
    originalTitle: "O Alquimista",
    author: "Paulo Koelo",
    category: "badiiy",
    categoryName: "Badiiy adabiyot",
    price: 48000,
    oldPrice: 60000,
    rating: 4.8,
    reviewsCount: 740,
    badge: "Xalqaro bestseller",
    format: "Qog'oz muqova",
    pages: 224,
    year: 2023,
    publisher: "Yangi Asr Avlodi",
    isbn: "978-9943-098-44-1",
    language: "O'zbekcha",
    description: "Andalusiyalik cho'pon yigit Santyagoning o'z Orzusi, o'z Oliy Maqsadi sari bosib o'tgan hayratomuz sayohati. Kitob har bir inson o'z taqdirining yaratuvchisi ekani va butun Koinot uning orzusini amalga oshirishga ko'maklashishi haqida.",
    sampleTitle: "Santyagoning tushi va saxro tomon yo'l",
    sampleText: `Yigitning ismi Santyago edi. Oqshom tushishi bilan u qo'ylarini tashlandiq cherkov hovlisiga kiritdi. Uning orzusi dunyo kezish edi, shuning uchun ham u cho'ponlikni tanlagan edi.

Ammo Misr ehromlari haqidagi tush uni tinch qo'ymasdi. Qari shoh Melxisedek unga aytdi:
'Qachonki sen chin dildan nimagadir intilsang, butun Koinot sening bu orzuing ushalishi uchun yordamga keladi...'`,
    coverGradient: "linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)",
    accentColor: "#d97706",
    coverIcon: "✨",
    stock: 22
  },
  {
    id: 9,
    title: "JavaScript: Chuqur O'rganish",
    originalTitle: "JavaScript: The Definitive Guide",
    author: "Devid Flanagan",
    category: "it",
    categoryName: "Dasturlash & IT",
    price: 95000,
    oldPrice: 125000,
    rating: 4.9,
    reviewsCount: 160,
    badge: "Ekspert darajasi",
    format: "Qattiq muqova",
    pages: 720,
    year: 2024,
    publisher: "IT Hub Press",
    isbn: "978-9943-456-11-7",
    language: "O'zbekcha",
    description: "Veb dasturlashning asosi hisoblangan JavaScript tilini noldan professional darajagacha o'rganish uchun to'liq ensiklopediya. Asinxron dasturlash, Event Loop, Closures, Prototiplar, ES6+ yangiliklari va brauzer API'lari amaliy misollar bilan.",
    sampleTitle: "Event Loop va Asinxronlik mexanizmi",
    sampleText: `JavaScript bitta oqimli (single-threaded) dasturlash tili bo'lsa-da, qanday qilib bir vaqtning o'zida yuzlab so'rovlarni boshqara oladi? Javob: Event Loop va Call Stack arxitekturasi.

Microtask va Macrotask navbatlari orasidagi farqni tushunish — Junior va Senior dasturchi orasidagi farqni belgilaydi. Promise'lar qanday bajariladi? async/await kapot ostida nima qiladi?

Ushbu bo'limda siz brauzer dvigatelining yuragi qanday urishini bilib olasiz...`,
    coverGradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #854d0e 100%)",
    accentColor: "#eab308",
    coverIcon: "⚡",
    stock: 8
  },
  {
    id: 10,
    title: "Diqqat (Deep Work)",
    originalTitle: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Kel Nyuport",
    category: "psixologiya",
    categoryName: "Psixologiya & Rivojlanish",
    price: 58000,
    oldPrice: 70000,
    rating: 4.7,
    reviewsCount: 290,
    badge: "Tavsiya etiladi",
    format: "Qog'oz muqova",
    pages: 288,
    year: 2023,
    publisher: "Asaxiy Books",
    isbn: "978-9943-551-09-3",
    language: "O'zbekcha",
    description: "Ijtimoiy tarmoqlar, xabarnomalar va doimiy shovqinga to'la zamonaviy dunyoda chalg'imasdan diqqatni jamlash qobiliyati — bu 21-asrning superqudratidir. Ushbu kitob orqali siz kamroq vaqt sarflab, 10 barobar sifatliroq ish bajarish usullarini o'rganasiz.",
    sampleTitle: "Chuqur diqqat qoidasi",
    sampleText: `Zamonaviy iqtisodiyotda ikkita qobiliyat yuqori baholanadi: birinchisi — qiyin narsalarni tez o'rganish, ikkinchisi — yuqori tezlikda yuqori sifatli mahsulot ishlab chiqarish.

Ikkala qobiliyat ham faqat 'Deep Work' (Chuqur Diqqat) holatida mumkin. Har safar telefoningizga bildirishnoma kelib, unga qaraganingizda, miyangiz o'z diqqatini tiklash uchun kamida 20 daqiqa sarflaydi...`,
    coverGradient: "linear-gradient(135deg, #059669 0%, #10b981 50%, #065f46 100%)",
    accentColor: "#10b981",
    coverIcon: "🎯",
    stock: 17
  },
  {
    id: 11,
    title: "Ufq Roman-Trilogiyasi",
    originalTitle: "Ufq",
    author: "Said Ahmad",
    category: "badiiy",
    categoryName: "Badiiy adabiyot",
    price: 85000,
    oldPrice: 105000,
    rating: 4.9,
    reviewsCount: 480,
    badge: "O'zbek romani",
    format: "Qattiq muqova",
    pages: 640,
    year: 2022,
    publisher: "Sharq",
    isbn: "978-9943-019-33-7",
    language: "O'zbekcha",
    description: "O'zbek xalqining Ikkinchi jahon urushi yillaridagi mashaqqatli hayoti, fidokorligi, matonati va or-nomusi haqidagi unutilmas trilogiya. Ikromjon, Jannat xola, Tursunboy kabi qahramonlarning kechinmalari orqali xalqning ruhiy kuchi ochib beriladi.",
    sampleTitle: "Katta Farg'ona kanali va front orti mehnati",
    sampleText: `Katta Farg'ona kanali qazilishi xalq tarixidagi eng buyuk hashar edi. Odamlar belbog'larini mahkam bog'lab, qizg'in mehnatga sho'ng'igan edilar.

Ikromjon o'g'li Tursunboyning qadamini kutardi. Lekin urush boshlanishi bilan hayot boshqacha o'zanga burildi... Haqiqiy mardlik va nomus sinovi boshlangan edi.`,
    coverGradient: "linear-gradient(135deg, #b91c1c 0%, #ef4444 50%, #7f1d1d 100%)",
    accentColor: "#ef4444",
    coverIcon: "🌅",
    stock: 20
  },
  {
    id: 12,
    title: "Raqamli Qal'a",
    originalTitle: "Digital Fortress",
    author: "Den Braun",
    category: "badiiy",
    categoryName: "Badiiy adabiyot",
    price: 54000,
    oldPrice: 65000,
    rating: 4.7,
    reviewsCount: 310,
    badge: "Triller & Detektiv",
    format: "Qog'oz muqova",
    pages: 368,
    year: 2023,
    publisher: "Nihol",
    isbn: "978-9943-772-12-9",
    language: "O'zbekcha",
    description: "Dunyoga mashhur 'Da Vinchi siri' muallifidan kiberxavfsizlik va shifrlash sirlariga bag'ishlangan hayajonli triller. AQSh Milliy Xavfsizlik Agentligining o'ta maxfiy superkompyuteri buzib bo'lmas shifrga duch keladi. Daho kriptograf Syuzan Fletcher insoniyatni falokatdan qutqarishi kerak.",
    sampleTitle: "TRANSLTR superkompyuteri inqirozi",
    sampleText: `AQSh Milliy Xavfsizlik Agentligining yer ostidagi uch qavatli bunkerida dunyodagi eng qudratli superkompyuter — TRANSLTR joylashgan edi. U har qanday kodni bir necha daqiqada buzishga qodir edi.

Biroq bu gal u 15 soatdan beri bitta shifr ustida ishlar, harorati esa xavfli darajaga ko'tarilib borardi. Shifr muallifi Ensey Tankado unga 'Raqamli Qal'a' deb nom bergandi...`,
    coverGradient: "linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #0c4a6e 100%)",
    accentColor: "#0284c7",
    coverIcon: "🔐",
    stock: 16
  }
];

// Savat va sevimlilar local storage kalitlari
const STORAGE_KEYS = {
  CART: 'ziyo_kitob_cart',
  FAVORITES: 'ziyo_kitob_favorites',
  THEME: 'ziyo_kitob_theme',
  CUSTOM_BOOKS: 'ziyo_kitob_custom_books'
};
