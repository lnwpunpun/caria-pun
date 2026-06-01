export interface CareerItem {
  name: string;
  nameTh?: string;
  description: string;
}

export interface CareerGroup {
  name: string;
  nameTh?: string;
  careers: CareerItem[];
}

export const DT_BRANCH: CareerGroup[] = [
  {
    name: "Web Application Professionals",
    nameTh: "กลุ่มที่ 1: นักพัฒนาเว็บแอปพลิเคชัน",
    careers: [
      { name: "Web Designer", nameTh: "ผู้ออกแบบเว็บไซต์", description: "ออกแบบโครงสร้างและส่วนติดต่อผู้ใช้งาน (UI) ของหน้าเว็บให้มีความสวยงาม น่าใช้งาน" },
      { name: "Web Developer", nameTh: "นักพัฒนาเว็บ", description: "เขียนโค้ดเพื่อควบคุมการทำงานของเว็บไซต์ ทั้งส่วนหน้าบ้าน (Frontend) และหลังบ้าน (Backend)" },
      { name: ".NET Programmer", nameTh: "นักโปรแกรมระบบ .NET", description: "พัฒนาโปรแกรมและแอปพลิเคชันระบบองค์กรขนาดใหญ่โดยใช้เทคโนโลยีและเครื่องมือในสแต็ก .NET" },
      { name: "Web Master", nameTh: "ผู้ดูแลเว็บไซต์", description: "ดูแลระบบเซิร์ฟเวอร์ ความมั่นคงปลอดภัย และคอยดูแลภาพรวมความสมบูรณ์ของเว็บไซต์" },
      { name: "UI/UX Designer", nameTh: "ผู้ออกแบบประสบการณ์ผู้ใช้", description: "วิเคราะห์พฤติกรรมผู้ใช้และออกแบบขั้นตอนการทำงานให้ใช้งานง่ายและเกิดความพึงพอใจสูงสุด" }
    ]
  },
  {
    name: "Mobile Application Professionals",
    nameTh: "กลุ่มที่ 2: นักพัฒนาแอปพลิเคชันมือถือ",
    careers: [
      { name: "Cross-platform Mobile Developer", nameTh: "นักพัฒนาแอปหลายแพลตฟอร์ม", description: "สร้างแอปพลิเคชันบนสมาร์ทโฟนที่รันได้ทั้งระบบ iOS และ Android ด้วยโค้ดชุดเดียวกัน" },
      { name: "Xamarin Mobile Developer", nameTh: "นักพัฒนาแอป Xamarin", description: "ใช้เครื่องมือ Xamarin และภาษา C# ในการสร้างแอปพลิเคชันมือถือระดับองค์กร" },
      { name: "Android Mobile Developer", nameTh: "นักพัฒนาแอป Android", description: "เจาะลึกการพัฒนาแอปพลิเคชันสำหรับระบบปฏิบัติการ Android ด้วย Kotlin หรือ Java" },
      { name: "iOS Mobile Developer", nameTh: "นักพัฒนาแอป iOS", description: "เจาะลึกการพัฒนาแอปพลิเคชันสำหรับอุปกรณ์ iPhone และ iPad ด้วยภาษา Swift" },
      { name: "Mobile Application Developer", nameTh: "นักพัฒนาโมบายล์แอปพลิเคชัน", description: "พัฒนาและทดสอบแอปพลิเคชันบนมือถือและอุปกรณ์พกพาประเภทต่างๆ" }
    ]
  },
  {
    name: "Enterprise Software Professionals",
    nameTh: "กลุ่มที่ 3: นักพัฒนาซอฟต์แวร์ระดับองค์กร",
    careers: [
      { name: "Software Developer", nameTh: "นักพัฒนาซอฟต์แวร์", description: "พัฒนา เขียนโปรแกรม และปรับปรุงระบบซอฟต์แวร์ให้ตรงตามความต้องการทางธุรกิจ" },
      { name: "System Analyst", nameTh: "นักวิเคราะห์ระบบ", description: "วิเคราะห์ความต้องการเชิงธุรกิจแล้วนำมาออกแบบแผนผังระบบไอทีและฐานข้อมูล" },
      { name: "Software Engineer", nameTh: "วิศวกรซอฟต์แวร์", description: "ประยุกต์หลักการวิศวกรรมในการออกแบบ พัฒนา และดูแลระบบซอฟต์แวร์ขนาดใหญ่" },
      { name: "Software Tester", nameTh: "นักทดสอบซอฟต์แวร์", description: "ตรวจสอบ หาข้อผิดพลาด (Bugs) ของโปรแกรม และควบคุมคุณภาพก่อนนำไปใช้งานจริง" },
      { name: "Embedded System Programmer", nameTh: "นักเขียนโปรแกรมระบบฝังตัว", description: "เขียนโค้ดควบคุมระบบอิเล็กทรอนิกส์ ไมโครคอนโทรลเลอร์ และอุปกรณ์ IoT ขนาดเล็ก" }
    ]
  },
  {
    name: "Data Handling Professionals",
    nameTh: "กลุ่มที่ 4: ผู้จัดการคลังและคัดกรองข้อมูลดิจิทัล",
    careers: [
      { name: "Data Archivists", nameTh: "นักจัดเก็บเอกสารและข้อมูลสำคัญ", description: "จัดเก็บ รวบรวม และปกป้องบันทึกเอกสารดิจิทัลที่สำคัญในระยะยาว" },
      { name: "Digital Librarians", nameTh: "บรรณารักษ์ดิจิทัล", description: "บริหารจัดการระบบสืบค้น ข้อมูลอิเล็กทรอนิกส์ และคลังความรู้แบบออนไลน์" },
      { name: "Digital Data Curator", nameTh: "ผู้คัดสรรข้อมูลดิจิทัล", description: "จัดหมวดหมู่ ทำดัชนี และดูแลรักษาชุดข้อมูลให้มีคุณภาพและพร้อมหยิบไปใช้งาน" },
      { name: "Data Stewards", nameTh: "ผู้ดูแลสิทธิ์และคุณภาพข้อมูล", description: "ควบคุมดูแลนโยบายการใช้งานข้อมูล ความถูกต้อง และการเข้าถึงข้อมูลตามมาตรฐาน" }
    ]
  },
  {
    name: "Data Science Professionals",
    nameTh: "กลุ่มที่ 5: วิทยาการข้อมูลและการวิเคราะห์",
    careers: [
      { name: "Data Architect", nameTh: "สถาปนิกข้อมูล", description: "ออกแบบโครงสร้างและวางระบบการไหลเวียนของข้อมูลทั้งหมดในองค์กร" },
      { name: "Data Engineer", nameTh: "วิศวกรข้อมูล", description: "พัฒนาท่อส่งข้อมูล (Data Pipelines) คลังข้อมูล (Data Warehouses) เพื่อให้ข้อมูลพร้อมใช้งาน" },
      { name: "Data Scientist", nameTh: "นักวิทยาศาสตร์ข้อมูล", description: "ใช้ทักษะสถิติ คณิตศาสตร์ และโมเดล AI/ML ในการวิเคราะห์หาข้อมูลอินไซต์เชิงลึก" },
      { name: "Data Analyst", nameTh: "นักวิเคราะห์ข้อมูล", description: "รวบรวม ประมวลผล และจัดทำแดชบอร์ดรายงานข้อมูลสรุปเพื่อการตัดสินใจทางธุรกิจ" }
    ]
  },
  {
    name: "Cloud Technology Professionals",
    nameTh: "กลุ่มที่ 6: เทคโนโลยีคลาวด์และความปลอดภัยไซเบอร์",
    careers: [
      { name: "Network Administrator", nameTh: "ผู้ดูแลระบบเครือข่าย", description: "ติดตั้ง ดูแลรักษา และแก้ปัญหาระบบสายแลน ไวไฟ และเซิร์ฟเวอร์เครือข่ายองค์กร" },
      { name: "Network Analyst", nameTh: "นักวิเคราะห์ระบบเครือข่าย", description: "วิเคราะห์ความแรง ประสิทธิภาพ และวางแผนขยายความจุของช่องทางสื่อสารเครือข่าย" },
      { name: "Security Specialist", nameTh: "ผู้เชี่ยวชาญด้านความปลอดภัย", description: "ออกแบบและวางระบบป้องกันความปลอดภัยคอมพิวเตอร์และเครือข่ายไม่ให้โดนแฮก" },
      { name: "Penetration Tester", nameTh: "นักทดสอบเจาะระบบ", description: "จำลองการแฮกระบบเพื่อค้นหาช่องโหว่ความปลอดภัยแล้วจัดทำรายงานแนะนำการแก้ไข" },
      { name: "Security Analyst", nameTh: "นักวิเคราะห์ความปลอดภัยข้อมูล", description: "เฝ้าระวังความมั่นคงปลอดภัย ตรวจจับการโจมตีทางไซเบอร์ และรับมือภัยคุกคาม" }
    ]
  },
  {
    name: "Other Professionals",
    nameTh: "กลุ่มพิเศษ: ผู้ประกอบการและอาชีพออกแบบเฉพาะตัว",
    careers: [
      { name: "Digital Entrepreneur", nameTh: "ผู้ประกอบการดิจิทัล", description: "ริเริ่มและทำธุรกิจส่วนตัวโดยนำนวัตกรรมเทคโนโลยีเข้ามาเป็นแกนหลัก" },
      { name: "Personalized Career", nameTh: "อาชีพออกแบบเฉพาะตัวตามสมรรถนะ", description: "การผสมผสานสมรรถนะเฉพาะตัวเพื่อทำอาชีพใหม่ตามเป้าหมายของตน" }
    ]
  }
];

export const DC_BRANCH: CareerGroup[] = [
  {
    name: "Visual Design Communication Professionals",
    nameTh: "กลุ่มที่ 1: การสื่อสารการออกแบบทัศนศิลป์",
    careers: [
      { name: "Graphic Designer", nameTh: "นักออกแบบกราฟิก", description: "สร้างสรรค์งานศิลปะ รูปภาพ และสื่อสิ่งพิมพ์ดิจิทัลเพื่อใช้ในการสื่อสารข้อมูล" },
      { name: "Motion Graphic Designer", nameTh: "นักออกแบบกราฟิกเคลื่อนไหว", description: "สร้างภาพเคลื่อนไหว เอฟเฟกต์ และวิดีโออนิเมชันขนาดสั้นเพื่อการโฆษณา" },
      { name: "UX/UI Designer", nameTh: "ผู้ออกแบบอินเตอร์เฟซและประสบการณ์", description: "วางโครงร่างหน้าตาแอปพลิเคชันและเว็บเน้นความสวยงามร่วมกับการใช้งานจริง" },
      { name: "Web Designer", nameTh: "นักออกแบบหน้าเว็บ", description: "ออกแบบธีม อาร์ตเวิร์ก และเลย์เอาต์หน้าเว็บไซต์ให้ดึงดูดสายตาผู้เข้าใช้งาน" }
    ]
  },
  {
    name: "Digital Content Creator Professionals",
    nameTh: "กลุ่มที่ 2: ผู้สร้างสรรค์เนื้อหาดิจิทัล",
    careers: [
      { name: "Digital Photographer", nameTh: "ช่างภาพดิจิทัล", description: "ถ่ายภาพและตกแต่งภาพถ่ายด้วยโปรแกรมกราฟิกให้ตรงใจลูกค้าและเหมาะสมกับงานดิจิทัล" },
      { name: "Digital Copy Writer / Blogger", nameTh: "นักเขียนคอนเทนต์และบล็อกเกอร์", description: "เรียบเรียงเนื้อหา คำโฆษณา บทความที่เป็นเอกลักษณ์เพื่อลงเว็บบล็อกและโซเชียลมีเดีย" },
      { name: "YouTuber / Vlogger / TikToker", nameTh: "ผู้ผลิตเนื้อหาวิดีโอโซเชียล", description: "วางแผน ถ่ายทำ และผลิตคอนเทนต์วิดีโอเพื่อความบันเทิงหรือให้ความรู้บนแพลตฟอร์มวิดีโอ" },
      { name: "Social Media Specialist", nameTh: "ผู้เชี่ยวชาญการตลาดโซเชียลมีเดีย", description: "บริหารจัดการ คิดแคมเปญกระตุ้นยอดไลก์ยอดแชร์ และวิเคราะห์กระแสในโลกออนไลน์" },
      { name: "Social Media Administrator", nameTh: "แอดมินเพจโซเชียลมีเดีย", description: "คอยโพสต์เนื้อหา ตอบแชตพูดคุยกับลูกค้า และดูแลความเรียบร้อยทั่วไปในเพจแบรนด์" }
    ]
  },
  {
    name: "Animation Professionals",
    nameTh: "กลุ่มที่ 3: นักสร้างสรรค์อนิเมชัน",
    careers: [
      { name: "2D/3D Modeller", nameTh: "นักปั้นโมเดล 2 มิติ / 3 มิติ", description: "ใช้โปรแกรมขึ้นรูปวัตถุ ตัวละคร หรือสิ่งของเสมือนจริงสำหรับงานอนิเมชันและเกม" },
      { name: "Character and Scene Designer", nameTh: "นักออกแบบตัวละครและฉาก", description: "วาดคอนเซปต์อาร์ต คาแรกเตอร์ และออกแบบสภาพแวดล้อมให้เข้ากับเรื่องราว" },
      { name: "Animator", nameTh: "นักทำอนิเมชันขยับเคลื่อนไหว", description: "ใส่คีย์เฟรม ปรับการเคลื่อนที่ของตัวละคร 3D หรือ 2D ให้ขยับพริ้วไหวเป็นธรรมชาติ" },
      { name: "Multimedia Artist", nameTh: "นักออกแบบศิลปะสื่อผสม", description: "ประยุกต์สื่อที่หลากหลาย เช่น ภาพ เสียง และเอฟเฟกต์ เพื่อสร้างผลงานทัศนศิลป์" }
    ]
  },
  {
    name: "Digital Film and Video Professionals",
    nameTh: "กลุ่มที่ 4: ภาพยนตร์และวิดีโอดิจิทัล",
    careers: [
      { name: "Screenplay Writer", nameTh: "นักเขียนบทภาพยนตร์", description: "ประพันธ์เรื่องราว โครงเรื่อง และบทสนทนาสำหรับภาพยนตร์ ละคร หรือสปอตโฆษณา" },
      { name: "Director / Assistant Director", nameTh: "ผู้กำกับภาพยนตร์ / ผู้ช่วยผู้กำกับ", description: "คุมทิศทางการแสดง งานกล้อง และถ่ายทอดเรื่องราวจากกระดาษบทให้ออกมาเป็นภาพภาพยนตร์" },
      { name: "Cameraman", nameTh: "ช่างภาพภาพยนตร์/ผู้กำกับภาพ", description: "ควบคุมทิศทางการเคลื่อนกล้องและการจัดแสงหน้ากองถ่ายตามผู้กำกับสั่ง" },
      { name: "Video & Audio Editor", nameTh: "นักตัดต่อภาพและเสียง", description: "นำฟุตเทจมาตัดต่อเรียงร้อย ใส่เสียงประกอบ เพลง และทำสมาธิเวลาให้ภาพไหลลื่น" },
      { name: "Special Effect Designer", nameTh: "นักออกแบบเอฟเฟกต์พิเศษ (VFX)", description: "สร้างเทคนิคพิเศษทางสายตา ระเบิด ควัน หรือสภาพแวดล้อม 3D ที่ถ่ายทำจริงไม่ได้" }
    ]
  },
  {
    name: "Game Professionals",
    nameTh: "กลุ่มที่ 5: นักพัฒนาและสร้างสรรค์เกม",
    careers: [
      { name: "Game Assets Designer", nameTh: "นักออกแบบชิ้นงานทรัพย์สินในเกม", description: "วาดและเตรียมชิ้นส่วน ไอเทม และสิ่งของตกแต่งต่างๆ ที่จะใช้ประกอบในเกม" },
      { name: "Game Designer", nameTh: "นักออกแบบระบบการเล่นเกม", description: "ออกแบบกติกา ระดับความยาก กลไกความสนุก และโครงเรื่องของเกม" },
      { name: "Technician Artist", nameTh: "ศิลปินฝ่ายเทคนิคเกม", description: "ประสานงานระหว่างโปรแกรมเมอร์และฝ่ายอาร์ตเพื่อนำชิ้นงานกราฟิกใส่เข้าไปในเอ็นจิ้นเกม" }
    ]
  },
  {
    name: "Digital Media Planning Professionals (Production)",
    nameTh: "กลุ่มที่ 6: การวางแผนและการผลิตสื่อดิจิทัล",
    careers: [
      { name: "Producer", nameTh: "ผู้อำนวยการสร้าง", description: "จัดสรรงบประมาณ วางไทม์ไลน์โปรเจกต์ และดูแลควบคุมงานผลิตทั้งหมดจนจบ" },
      { name: "Creative", nameTh: "นักคิดสร้างสรรค์เนื้อหาสื่อ", description: "ระดมสมองคิดคอนเซปต์ ไอเดียแปลกใหม่ และแนวทางการนำเสนอรายการหรือโฆษณา" },
      { name: "Account Executive", nameTh: "ผู้บริหารฝ่ายบริการลูกค้า (AE)", description: "ประสานงานระหว่างฝั่งลูกค้าที่จ้างงานและทีมผลิตงานในบริษัทเพื่อให้ออกมาตรงบรีฟ" }
    ]
  },
  {
    name: "Marketing & Communication Professionals",
    nameTh: "กลุ่มที่ 7: การตลาดและการสื่อสารประชาสัมพันธ์",
    careers: [
      { name: "Public Relations Officer", nameTh: "เจ้าหน้าที่ประชาสัมพันธ์ (PR)", description: "เขียนข่าวแจกสื่อมวลชน วางแผนสร้างภาพลักษณ์ที่ดีให้กับองค์กรหรือแบรนด์สินค้า" },
      { name: "Marketing Coordinator / Digital Marketing", nameTh: "ผู้ประสานงานและนักการตลาดดิจิทัล", description: "วางแผนโฆษณา ยิงแอด วิเคราะห์กลุ่มเป้าหมาย และติดตามผลการขายผ่านสื่อออนไลน์" },
      { name: "Social Media Expert / Social Media Strategist", nameTh: "นักวางกลยุทธ์สื่อโซเชียล", description: "กำหนดแนวทางภาพรวม ระยะยาวในการสร้างแบรนด์ผ่านช่องทาง TikTok, IG, FB" }
    ]
  },
  {
    name: "Real-time Reporting Professionals (New Media)",
    nameTh: "กลุ่มที่ 8: วารสารศาสตร์ยุคใหม่และการรายงานสด",
    careers: [
      { name: "Data Journalist", nameTh: "นักข่าวข้อมูล", description: "สืบค้นข่าวลึกซึ้งจากชุดข้อมูลดิบ สถิติ แล้วนำเสนอผ่านภาพอินโฟกราฟิกเข้าใจง่าย" },
      { name: "Online News Reporter", nameTh: "ผู้รายงานข่าวด่วนออนไลน์", description: "เขียนสรุปประเด็นข่าวร้อน เกาะกระแสสังคม และนำเสนอผ่านแพลตฟอร์มข่าวดิจิทัล" },
      { name: "One-Man-Band Journalist", nameTh: "นักข่าวมัลติมีเดียครบวงจร", description: "ทำงานคนเดียวครบทุกบทบาท ทั้งสืบข่าว ถ่ายภาพ เขียนบท ตัดต่อ และบรรยายรายงานสด" }
    ]
  },
  {
    name: "Application Professionals",
    nameTh: "กลุ่มที่ 9: พัฒนาแอปพลิเคชันสื่อและข้อมูล",
    careers: [
      { name: "UX/UI Designer (Mobile)", nameTh: "นักออกแบบ UI/UX แอปพลิเคชันมือถือ", description: "ออกแบบโครงร่างและส่วนติดต่อผู้ใช้งานเฉพาะทางสำหรับการใช้นิ้วปัดแตะบนหน้าจอมือถือ" },
      { name: "Cross-platform Mobile Developer", nameTh: "นักพัฒนาแอปมือถือหลายระบบ", description: "พัฒนาเขียนแอปพลิเคชันนำเสนอสื่อแบบมัลติมีเดียที่ทำงานลื่นไหลทั้ง Android และ iOS" }
    ]
  },
  {
    name: "Personalized / Research Professionals",
    nameTh: "กลุ่มที่ 10: งานวิจัย ประเมินผล และผู้ประกอบการสื่อ",
    careers: [
      { name: "Digital Media Evaluator and Testing", nameTh: "นักประเมินและทดสอบสื่อดิจิทัล", description: "ตรวจสอบประเมินคุณภาพ คอนเทนต์ ความสอดคล้องทางกฎหมาย และจริยธรรมของสื่อ" },
      { name: "Digital Entrepreneur", nameTh: "ผู้ประกอบการธุรกิจสื่อดิจิทัล", description: "เปิดธุรกิจ สตูดิโอ หรือเอเจนซี่ผลิตงานศิลปะและคอนเทนต์ความบันเทิงดิจิทัลของตนเอง" },
      { name: "Personalized Career", nameTh: "อาชีพสื่อประยุกต์เฉพาะทาง", description: "อาชีพใหม่ผสมผสานระหว่างศาสตร์สื่อสาร มัลติมีเดีย และทักษะเฉพาะด้านที่ต้องการ" }
    ]
  }
];
