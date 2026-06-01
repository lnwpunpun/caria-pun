export interface SutCourse {
  course_id: string;
  name_th: string;
  name_en: string;
  credits: number;
  module: string;
  year: number;
  term: number;
  competency_tags: string[];
  prerequisite: string[];
  description: string;
}

export const SUT_COURSES: SutCourse[] = [
  // --- DT - Digital Technology Courses ---
  {
    course_id: "1101010",
    name_th: "การบริหารเทคโนโลยีดิจิทัล",
    name_en: "Digital Technology Administration Module",
    credits: 3,
    module: "Digital Tech Admin",
    year: 1,
    term: 1,
    competency_tags: ["DigitalTechAdmin"],
    prerequisite: [],
    description: "การเรียนรู้เกี่ยวกับการบริหารจัดการโครงสร้างพื้นฐานดิจิทัล เทคโนโลยีระดับองค์กร นโยบายความปลอดภัย และการประเมินนวัตกรรมเทคโนโลยีสมัยใหม่"
  },
  {
    course_id: "1101020",
    name_th: "ความรู้เบื้องต้นนักพัฒนาซอฟต์แวร์",
    name_en: "Introduction to Software Developer Professionals Module",
    credits: 3,
    module: "Software Dev Intro",
    year: 1,
    term: 1,
    competency_tags: ["SoftwareDev"],
    prerequisite: [],
    description: "พื้นฐานการออกแบบระบบซอฟต์แวร์ การเขียนโค้ดเบื้องต้น แนวคิดกระบวนการพัฒนาซอฟต์แวร์ และการเตรียมพร้อมสู่วิชาชีพนักพัฒนาระบบ"
  },
  {
    course_id: "1101030",
    name_th: "ความรู้เบื้องต้นนักวิทยาการข้อมูล",
    name_en: "Introduction to Data Science Professionals Module",
    credits: 3,
    module: "Data Science Intro",
    year: 1,
    term: 1,
    competency_tags: ["DataScience"],
    prerequisite: [],
    description: "ความเข้าใจเชิงลึกเกี่ยวกับวงจรชีวิตข้อมูล บทบาทหน้าที่ของนักวิทยาศาสตร์ข้อมูล วิธีการรวบรวม วิเคราะห์ข้อมูลเบื้องต้น และจริยธรรมข้อมูล"
  },
  {
    course_id: "1101040",
    name_th: "ภาษาอังกฤษสำหรับวิชาชีพ DT",
    name_en: "English for Digital Technology Professionals Module",
    credits: 3,
    module: "English for DT",
    year: 1,
    term: 2,
    competency_tags: ["EnglishForDT"],
    prerequisite: [],
    description: "พัฒนาทักษะการสื่อสารภาษาอังกฤษสำหรับแวดวงไอที การเขียนเอกสารคู่มือ การพรีเซนต์งานระบบดิจิทัล และคำศัพท์ทางเทคนิคเฉพาะทาง"
  },
  {
    course_id: "1101910",
    name_th: "โครงงานเทคโนโลยีดิจิทัล",
    name_en: "Project in Digital Technology Module",
    credits: 6,
    module: "DT Project",
    year: 4,
    term: 3,
    competency_tags: ["Project"],
    prerequisite: [],
    description: "โครงงานวิจัยพัฒนาเทคโนโลยีดิจิทัลที่นำความรู้ทักษะตามสายงานมาประยุกต์ใช้เพื่อแก้ปัญหาจริงทางอุตสาหกรรม"
  },
  {
    course_id: "1101050",
    name_th: "การเขียนเนื้อหาดิจิทัล",
    name_en: "Digital Content Writing Module",
    credits: 3,
    module: "Content Creation",
    year: 2,
    term: 1,
    competency_tags: ["ContentWriting"],
    prerequisite: [],
    description: "หลักการวางแผนการสร้างและจัดทำเนื้อหาสำหรับสื่อออนไลน์ การเขียนบล็อก การจัดระเบียบเนื้อหาของเว็บไซต์และการใช้คำค้นเพื่อ SEO"
  },
  {
    course_id: "1101060",
    name_th: "การออกแบบทัศนสาร",
    name_en: "Visual Message Design Module",
    credits: 3,
    module: "Visual Design",
    year: 2,
    term: 1,
    competency_tags: ["VisualDesign"],
    prerequisite: [],
    description: "การสื่อสารผ่านกราฟิก ทฤษฎีสี เลย์เอาต์ และองค์ประกอบทัศนศิลป์เพื่อการแสดงผลบนจอภาพดิจิทัลอย่างมืออาชีพ"
  },
  {
    course_id: "1101070",
    name_th: "การออกแบบประสบการณ์ผู้ใช้",
    name_en: "User Experience Design Module",
    credits: 3,
    module: "UX/UI Design",
    year: 2,
    term: 2,
    competency_tags: ["UXDesign"],
    prerequisite: [],
    description: "การวิเคราะห์ผู้ใช้งาน การสร้างเส้นทางการเดินทางของผู้ใช้ (User Journey Map) การจัดโครงสร้างสารสนเทศ และการทดสอบความง่ายในการใช้งาน"
  },
  {
    course_id: "1101080",
    name_th: "การออกแบบเทคโนโลยีปฏิสัมพันธ์ที่มีผู้ใช้เป็นศูนย์กลาง",
    name_en: "User Centered Design for Interactive Technologies Module",
    credits: 3,
    module: "UX/UI Design",
    year: 3,
    term: 1,
    competency_tags: ["UserCenteredDesign"],
    prerequisite: ["1101070"],
    description: "การออกแบบและสร้างต้นแบบแอปพลิเคชันเชิงโต้ตอบเน้นปฏิสัมพันธ์และการตอบสนองของผู้ใช้งานโดยใช้แนวคิดผู้ใช้เป็นศูนย์กลาง"
  },
  {
    course_id: "1101090",
    name_th: "การเขียนโปรแกรมเชิงอ็อบเจกต์และโครงสร้างข้อมูล",
    name_en: "OOP and Data Structures Module",
    credits: 4,
    module: "Programming",
    year: 1,
    term: 2,
    competency_tags: ["OOP", "DataStructures"],
    prerequisite: [],
    description: "แนวคิดการเขียนโปรแกรมเชิงวัตถุ โครงสร้างข้อมูลพื้นฐาน เช่น Linked List, Stack, Queue, Tree และการประยุกต์ใช้งานเชิงวิศวกรรม"
  },
  {
    course_id: "1101100",
    name_th: "การพัฒนาโปรแกรมประยุกต์ด้วยภาษาสคริปต์",
    name_en: "Scripting Language Application Development Module",
    credits: 3,
    module: "Programming",
    year: 2,
    term: 1,
    competency_tags: ["ScriptProgramming"],
    prerequisite: ["1101090"],
    description: "การพัฒนาซอฟต์แวร์ประยุกต์ด้วยภาษาประเภทสคริปต์ เช่น JavaScript, TypeScript และ Python สำหรับสแต็กพัฒนาสมัยใหม่"
  },
  {
    course_id: "1101110",
    name_th: "การพัฒนาโปรแกรมประยุกต์ข้ามแพลตฟอร์ม",
    name_en: "Cross-Platform Application Development Module",
    credits: 4,
    module: "Programming",
    year: 3,
    term: 1,
    competency_tags: ["CrossPlatform"],
    prerequisite: ["1101100"],
    description: "การออกแบบและสร้างซอฟต์แวร์แอปพลิเคชันที่สามารถทำงานบนสแต็กระบบปฏิบัติการที่หลากหลายด้วยซอร์สโค้ดชุดเดียวกัน"
  },
  {
    course_id: "1101120",
    name_th: "การพัฒนาโปรแกรมประยุกต์แอนดรอยด์",
    name_en: "Android Application Development Module",
    credits: 4,
    module: "Mobile App Development",
    year: 3,
    term: 2,
    competency_tags: ["AndroidDev"],
    prerequisite: ["1101090"],
    description: "เจาะลึกสถาปัตยกรรมแอนดรอยด์ การพัฒนา UI ใน Android การจัดเก็บข้อมูลในสมาร์ทโฟน และการอัปโหลดแอปพลิเคชันขึ้น Play Store"
  },
  {
    course_id: "1101130",
    name_th: "การพัฒนาโปรแกรมประยุกต์ไอโอเอส",
    name_en: "IOS Application Development Module",
    credits: 4,
    module: "Mobile App Development",
    year: 3,
    term: 2,
    competency_tags: ["IOSDev"],
    prerequisite: ["1101090"],
    description: "ศึกษา Swift และการพัฒนาโมบายล์แอปพลิเคชันบนสแต็ก iOS ด้วย SwiftUI หรือ UIKit การจัดการหน่วยความจำและความปลอดภัยไอโฟน"
  },
  {
    course_id: "1101140",
    name_th: "อินเทอร์เน็ตของสรรพสิ่ง",
    name_en: "Internet of Things Module",
    credits: 3,
    module: "IoT",
    year: 3,
    term: 1,
    competency_tags: ["IoT"],
    prerequisite: [],
    description: "การรับส่งข้อมูลผ่านโมดูลเครือข่ายไร้สาย อุปกรณ์ฝังตัว ไมโครคอนโทรลเลอร์ เซ็นเซอร์วัดระดับ และการวิเคราะห์ควบคุมระบบ IoT"
  },
  {
    course_id: "1101150",
    name_th: "การวิเคราะห์และออกแบบระบบสารสนเทศ",
    name_en: "Information System Analysis and Design Module",
    credits: 3,
    module: "System Analysis",
    year: 2,
    term: 2,
    competency_tags: ["SystemAnalysis"],
    prerequisite: [],
    description: "กระบวนการ SDLC การกำหนดความต้องการการใช้งาน โมเดล UML การวิเคราะห์ระบบงานเดิมและการประเมินโครงการไอที"
  },
  {
    course_id: "1101160",
    name_th: "วิศวกรรมซอฟต์แวร์",
    name_en: "Software Engineering Module",
    credits: 3,
    module: "System Analysis",
    year: 3,
    term: 1,
    competency_tags: ["SoftwareEngineering"],
    prerequisite: ["1101150"],
    description: "หลักทฤษฎีทางวิศวกรรมในการผลิตซอฟต์แวร์ การทดสอบระบบ (Software Testing) การประกันคุณภาพซอฟต์แวร์ และกระบวนการ Agile"
  },
  {
    course_id: "1101170",
    name_th: "การบริหารฐานข้อมูล",
    name_en: "Database Administration Module",
    credits: 3,
    module: "Database",
    year: 2,
    term: 1,
    competency_tags: ["DatabaseAdmin"],
    prerequisite: [],
    description: "การจัดเก็บ ออกแบบ และสอบถามข้อมูลด้วยภาษา SQL ระบบฐานข้อมูลเชิงสัมพันธ์ ตลอดจนโครงสร้าง NoSQL สำหรับข้อมูลขนาดใหญ่"
  },
  {
    course_id: "1101180",
    name_th: "การบริหารเครือข่าย",
    name_en: "Network Administration Module",
    credits: 3,
    module: "Network & Security",
    year: 2,
    term: 2,
    competency_tags: ["NetworkAdmin"],
    prerequisite: [],
    description: "การวางระบบสวิตชิ่ง เราเตอร์ โปรโตคอลสัญจร TCP/IP และการกำหนดค่าพารามิเตอร์ของระบบเครือข่ายสารสนเทศ"
  },
  {
    course_id: "1101190",
    name_th: "การบริหารระบบ",
    name_en: "System Administration Module",
    credits: 3,
    module: "Network & Security",
    year: 2,
    term: 2,
    competency_tags: ["SystemAdmin"],
    prerequisite: [],
    description: "การบริหารจัดการระบบปฏิบัติการเซิร์ฟเวอร์ สิทธิ์การใช้งานระบบ การสำรองข้อมูล และการดูแลรักษาความมีเสถียรภาพของเครื่องคอมพิวเตอร์แม่ข่าย"
  },
  {
    course_id: "1101200",
    name_th: "ความมั่นคงปลอดภัยทางไซเบอร์",
    name_en: "Cyber Security Module",
    credits: 3,
    module: "Network & Security",
    year: 3,
    term: 2,
    competency_tags: ["CyberSecurity"],
    prerequisite: ["1101180"],
    description: "ภัยคุกคามไซเบอร์ การเข้ารหัสเพื่อรักษาความลับ หลักนโยบายความมั่นคงปลอดภัย และแนวทางกู้คืนระบบคอมพิวเตอร์หลังโดนแฮก"
  },
  {
    course_id: "1101210",
    name_th: "บล็อกเชนและสกุลเงินดิจิทัล",
    name_en: "Blockchain and Cryptocurrency Module",
    credits: 3,
    module: "Emerging Tech",
    year: 4,
    term: 1,
    competency_tags: ["Blockchain"],
    prerequisite: [],
    description: "โครงสร้างความปลอดภัยแบบกระจายศูนย์ การเขียนสัญญาอัจฉริยะ (Smart Contract) และกลไกทำงานของสกุลเงินดิจิทัล"
  },
  {
    course_id: "1101220",
    name_th: "การปรับเปลี่ยนองค์กรเข้าสู่ความเป็นดิจิทัล",
    name_en: "Digital Transformation Module",
    credits: 3,
    module: "Enterprise Tech",
    year: 3,
    term: 2,
    competency_tags: ["Transformation"],
    prerequisite: [],
    description: "การปรับเปลี่ยนกลยุทธ์ขององค์กร วัฒนธรรม กระบวนการทำงานเดิม และการควบรวมเทคโนโลยีสมัยใหม่เข้าเพื่อการแข่งขัน"
  },
  {
    course_id: "1101230",
    name_th: "เทคโนโลยีข้อมูลขนาดใหญ่",
    name_en: "Big Data Technology Module",
    credits: 3,
    module: "Data Science",
    year: 3,
    term: 1,
    competency_tags: ["BigData"],
    prerequisite: ["1101170"],
    description: "ระบบสถาปัตยกรรมข้อมูลขนาดใหญ่ คลาสเตอร์จัดเก็บข้อมูลแบบกระจาย ตลอดจนการประมวลผลวิเคราะห์ข้อมูลความจุสูง"
  },
  {
    course_id: "1101240",
    name_th: "วิศวกรรมข้อมูล",
    name_en: "Data Engineering Module",
    credits: 3,
    module: "Data Science",
    year: 3,
    term: 2,
    competency_tags: ["DataEngineering"],
    prerequisite: ["1101230"],
    description: "การสกัด ถ่ายโอน และนำส่งชุดข้อมูลดิบ (ETL Pipelines) การกำหนดคลังเก็บข้อมูลส่วนกลางและวางนโยบายความถูกต้องข้อมูล"
  },
  {
    course_id: "1101250",
    name_th: "สถิติเพื่อการวิเคราะห์ข้อมูล",
    name_en: "Statistics for Data Analytics Module",
    credits: 3,
    module: "Data Science",
    year: 2,
    term: 2,
    competency_tags: ["Statistics"],
    prerequisite: [],
    description: "หลักความน่าจะเป็น การวิเคราะห์ประเมินผลสมมติฐานทางสถิติ และโมเดลการถดถอยคาดการณ์เพื่อตัดสินใจ"
  },
  {
    course_id: "1101260",
    name_th: "การค้นพบความรู้จากฐานข้อมูล",
    name_en: "Knowledge Discovery in Database Module",
    credits: 3,
    module: "Data Science",
    year: 4,
    term: 1,
    competency_tags: ["KDD"],
    prerequisite: ["1101250"],
    description: "เทคนิคเหมืองข้อมูล การจำแนกประเภทข้อมูล การสร้างกลุ่มสุ่มสัมพันธ์ และการวิเคราะห์หาข้อมูลรูปแบบเฉพาะ"
  },
  {
    course_id: "1101270",
    name_th: "ปัญญาประดิษฐ์สำหรับการวิเคราะห์ข้อมูล",
    name_en: "Artificial Intelligence for Data Analytics Module",
    credits: 3,
    module: "Emerging Tech",
    year: 4,
    term: 1,
    competency_tags: ["AI"],
    prerequisite: ["1101260"],
    description: "โครงข่ายประสาทเทียม การประมวลผลภาพ การวิเคราะห์ทำนายด้วยแมชชีนเลิร์นนิงขั้นสูง และการประยุกต์ตอบสนองธุรกิจ"
  },
  {
    course_id: "1101280",
    name_th: "ธุรกิจอัจฉริยะและการจินตทัศน์สารสนเทศ",
    name_en: "Business Intelligence and Information Visualization Module",
    credits: 3,
    module: "Data Science",
    year: 3,
    term: 2,
    competency_tags: ["BI", "Visualization"],
    prerequisite: ["1101170"],
    description: "การออกแบบรายงานผลลัพธ์ข้อมูลผ่านแดชบอร์ดสรุปผล เทคนิคการเลือกใช้กราฟิก และการใช้เครื่องมือ BI ชั้นนำทางธุรกิจ"
  },
  {
    course_id: "1101290",
    name_th: "ธุรกิจเชิงลึกและการวิเคราะห์ข้อมูล",
    name_en: "Business Insights and Data Analytics Module",
    credits: 3,
    module: "Data Science",
    year: 3,
    term: 2,
    competency_tags: ["BusinessInsights"],
    prerequisite: [],
    description: "วิเคราะห์การตลาด คาดการณ์ความต้องการของลูกค้าด้วยข้อมูลเชิงสถิติ เพื่อระบุอินไซต์ที่เป็นโอกาสทางธุรกิจ"
  },
  {
    course_id: "1101300",
    name_th: "การบริหารจัดการเมทาดาทา",
    name_en: "Metadata Management Module",
    credits: 3,
    module: "Data Handling",
    year: 2,
    term: 2,
    competency_tags: ["Metadata"],
    prerequisite: [],
    description: "ทฤษฎีและมาตรฐานการระบุคุณสมบัติระเบียนข้อมูล โครงสร้างคำอธิบายเมทาดาทา และการเข้าถึงสิทธิ์การจัดเก็บข้อมูล"
  },
  {
    course_id: "1101310",
    name_th: "คลังข้อมูลดิจิทัลและเทคโนโลยีห้องสมุด",
    name_en: "Digital Repository and Library Technology Module",
    credits: 3,
    module: "Data Handling",
    year: 3,
    term: 1,
    competency_tags: ["DigitalRepository"],
    prerequisite: [],
    description: "ระบบสืบค้นหนังสือสารสนเทศ คลังเอกสารสำคัญดิจิทัลของสถาบัน และเทคโนโลยีการจัดหมวดหมู่วรรณกรรมดิจิทัล"
  },
  {
    course_id: "1101320",
    name_th: "การจัดการความรู้",
    name_en: "Knowledge Management Module",
    credits: 3,
    module: "Data Handling",
    year: 3,
    term: 1,
    competency_tags: ["KnowledgeMgmt"],
    prerequisite: [],
    description: "การรวบรวม แลกเปลี่ยน และเผยแพร่องค์ความรู้ที่เป็นสัจธรรมและโดยอ้อมขององค์กร เพื่อพัฒนาขีดสมรรถนะองค์กร"
  },
  {
    course_id: "1101330",
    name_th: "การดูแลรักษาข้อมูลดิจิทัล",
    name_en: "Data Curation Module",
    credits: 3,
    module: "Data Handling",
    year: 3,
    term: 2,
    competency_tags: ["DataCuration"],
    prerequisite: [],
    description: "วงจรคัดเลือก จัดเตรียม บำรุงรักษา และการแปลงสภาพข้อมูลดิจิทัลที่เสื่อมสภาพเพื่อให้คงอยู่อย่างยั่งยืนและพร้อมใช้ใหม่"
  },
  {
    course_id: "1101340",
    name_th: "การจัดระบบและการวิเคราะห์สารสนเทศ",
    name_en: "Information Organization and Analysis Module",
    credits: 3,
    module: "Data Handling",
    year: 2,
    term: 2,
    competency_tags: ["InformationOrganization"],
    prerequisite: [],
    description: "กระบวนการจัดเก็บดัชนี การวิเคราะห์กรองเนื้อหาที่สำคัญ และการจัดแยกประเภทข้อมูลสารสนเทศตามโครงสร้างหมวดหมู่"
  },
  {
    course_id: "1101350",
    name_th: "การจัดการบริการสารสนเทศ",
    name_en: "Information Service Management Module",
    credits: 3,
    module: "Data Handling",
    year: 3,
    term: 2,
    competency_tags: ["InformationService"],
    prerequisite: [],
    description: "การให้บริการข้อมูล การจัดทำเว็บแนะแนวทาง ตลอดจนการประเมินความพึงพอใจการใช้บริการสืบค้นข้อมูลในระบบ"
  },
  {
    course_id: "1101360",
    name_th: "การจัดการสารสนเทศสำนักงาน",
    name_en: "Office Information Management Module",
    credits: 3,
    module: "Data Handling",
    year: 2,
    term: 1,
    competency_tags: ["OfficeInfo"],
    prerequisite: [],
    description: "ระบบการจัดการหนังสือเวียน อิเล็กทรอนิกส์เมล์ การจัดเก็บไฟล์ความจำ ตลอดจนกฎระเบียบปฏิบัติความปลอดภัยสารสนเทศสำนักงาน"
  },
  {
    course_id: "1101400",
    name_th: "การพัฒนาส่วนต่อประสานกับผู้ใช้",
    name_en: "User Interface Development Module",
    credits: 3,
    module: "Visual Design",
    year: 3,
    term: 1,
    competency_tags: ["UIDevelopment"],
    prerequisite: ["1101060"],
    description: "การเขียนส่วนควบคุมหน้าจอด้านหน้าบ้าน (HTML/CSS) การจัดระเบียบตารางเลย์เอาต์การตอบสนอง และเทมเพลตดีไซน์คอมโพเนนต์"
  },
  {
    course_id: "วิชาโท",
    name_th: "วิชาความเป็นผู้ประกอบการ",
    name_en: "Entrepreneurship Module",
    credits: 3,
    module: "Entrepreneurship",
    year: 3,
    term: 2,
    competency_tags: ["Entrepreneurship"],
    prerequisite: [],
    description: "หลักธุรกิจจัดตั้งกิจการใหม่ การตลาดดิจิทัลเบื้องต้น แผนรายรับรายจ่าย ตลอดจนการ Pitching เสนอนวัตกรรมเชิงธุรกิจ"
  },
  {
    course_id: "1101901",
    name_th: "เตรียมสหกิจศึกษา",
    name_en: "Pre-Cooperative Education",
    credits: 1,
    module: "Cooperative",
    year: 3,
    term: 3,
    competency_tags: ["Cooperative"],
    prerequisite: [],
    description: "การวางแผนเตรียมพร้อมพฤติกรรม สัมภาษณ์ แนะนำระบบฝึกงาน และกฎหมายระเบียบปฏิบัติตามมาตรฐานสถานประกอบการ"
  },
  {
    course_id: "1101902",
    name_th: "สหกิจศึกษา 1",
    name_en: "Cooperative Education I",
    credits: 3,
    module: "Cooperative",
    year: 4,
    term: 1,
    competency_tags: ["Cooperative"],
    prerequisite: ["1101901"],
    description: "การเข้าปฏิบัติหน้าที่จริงในองค์กรที่เกี่ยวข้องกับเทคโนโลยีดิจิทัล ระยะที่หนึ่ง"
  },
  {
    course_id: "1101903",
    name_th: "สหกิจศึกษา 2",
    name_en: "Cooperative Education II",
    credits: 3,
    module: "Cooperative",
    year: 4,
    term: 2,
    competency_tags: ["Cooperative"],
    prerequisite: ["1101902"],
    description: "ปฏิบัติหน้าที่ขยายขอบเขตการทำงานร่วมกับทีมผู้พัฒนาระบบไอที ระยะที่สอง"
  },
  {
    course_id: "1101904",
    name_th: "สหกิจศึกษา 3",
    name_en: "Cooperative Education III",
    credits: 3,
    module: "Cooperative",
    year: 4,
    term: 3,
    competency_tags: ["Cooperative"],
    prerequisite: ["1101903"],
    description: "สิ้นสุดปฏิบัติงานสหกิจศึกษา การนำเสนอปัญหาการแก้ไข ตลอดจนจัดทำแบบประเมินและเอกสารรายงานฉบับสมบูรณ์"
  },

  // --- DC - Digital Communication Courses ---
  {
    course_id: "DGT20 0100",
    name_th: "ความรู้เบื้องต้นเกี่ยวกับนิเทศศาสตร์ดิจิทัล",
    name_en: "Introduction to Digital Communication Module",
    credits: 3,
    module: "DC Core",
    year: 1,
    term: 1,
    competency_tags: ["DCCore"],
    prerequisite: [],
    description: "พื้นฐานนิเทศศาสตร์การสื่อสาร ช่องทางการส่งสารยุคใหม่ ผลกระทบการเปลี่ยนแปลงสื่อ ตลอดจนหลักจริยธรรมผู้ส่งสารดิจิทัล"
  },
  {
    course_id: "DGT01 0200",
    name_th: "ความรู้เบื้องต้นเกี่ยวกับเทคโนโลยีอุบัติใหม่",
    name_en: "Introduction to Emerging Technologies Module",
    credits: 3,
    module: "DC Core",
    year: 1,
    term: 1,
    competency_tags: ["DCCore"],
    prerequisite: [],
    description: "บทเรียนสั้นทำความเข้าใจเกี่ยวกับ AI, IoT, VR/AR และ Cloud Services ที่เข้ามาดิสรัปต์อุตสาหกรรมสร้างสรรค์"
  },
  {
    course_id: "DGT20 0600",
    name_th: "การวิเคราะห์ วิพากษ์และประเมินสื่อดิจิทัล",
    name_en: "Digital Media Analysis, Criticism and Evaluation Module",
    credits: 3,
    module: "DC Core",
    year: 1,
    term: 2,
    competency_tags: ["DCCore"],
    prerequisite: [],
    description: "ศึกษาทฤษฎีการวิจารณ์สื่อ การแยกแยะเฟกนิวส์ จิตวิทยาการตลาดที่แฝงในสาร ตลอดจนการประเมินคุณภาพทัศนศิลป์"
  },
  {
    course_id: "DGT20 0700",
    name_th: "ทักษะการสื่อสารและการประกอบการ",
    name_en: "Communication Skill and Entrepreneurship Module",
    credits: 3,
    module: "DC Core",
    year: 2,
    term: 1,
    competency_tags: ["DCCore"],
    prerequisite: [],
    description: "ฝึกฝนศิลปะการโน้มน้าว การพูดในที่ชุมชน การทำแผนงบประมาณ การจัดโครงสร้างความคุ้มค่าทางเศรษฐกิจของงานสื่อ"
  },
  {
    course_id: "DGT20 9800",
    name_th: "โครงงานเชิงพัฒนานิเทศศาสตร์ดิจิทัลและความพร้อมสู่ธุรกิจ",
    name_en: "Capstone Project in Digital Communication and Business Readiness Module",
    credits: 6,
    module: "DC Core",
    year: 4,
    term: 3,
    competency_tags: ["DCCore"],
    prerequisite: [],
    description: "ทำโปรเจกต์งานภาพยนตร์ อนิมชัน แคมเปญการสื่อสาร โฆษณา หรือเกมฉบับสมบูรณ์เพื่อนำเสนอกรรมการอุตสาหกรรม"
  },
  {
    course_id: "DGT20 0200",
    name_th: "การออกแบบกราฟิก",
    name_en: "Graphic Design Module",
    credits: 3,
    module: "Visual Design",
    year: 2,
    term: 1,
    competency_tags: ["GraphicDesign"],
    prerequisite: [],
    description: "การจัดองค์ประกอบภาพ ทฤษฎีสี ฟอนต์ การวาดภาพเวกเตอร์ และการจัดระเบียบดีไซน์สิ่งพิมพ์ออนไลน์"
  },
  {
    course_id: "DGT20 0300",
    name_th: "การผลิตสื่อประสมและแอนิเมชัน",
    name_en: "Multimedia and Animation Production Module",
    credits: 3,
    module: "Multimedia",
    year: 2,
    term: 1,
    competency_tags: ["Animation"],
    prerequisite: [],
    description: "เทคนิคการวาดภาพตัดแต่ง เสียงเคลื่อนไหว วิดีโอบอร์ด และการประกอบชิ้นส่วนขึ้นอนิเมชันแบบ 2 มิติขั้นพื้นฐาน"
  },
  {
    course_id: "DGT20 1100",
    name_th: "การออกแบบประสบการณ์ผู้ใช้",
    name_en: "User Experience Design Module",
    credits: 3,
    module: "UX/UI Design",
    year: 2,
    term: 2,
    competency_tags: ["UXDesign"],
    prerequisite: [],
    description: "การวิจัยออกแบบลำดับเหตุการณ์การใช้นิ้วเลื่อนสัมผัส พฤติกรรมอารมณ์ และการสร้าง Prototype สำหรับอุปกรณ์พกพา"
  },
  {
    course_id: "DGT20 1900",
    name_th: "การผลิตสื่อดิจิทัลที่มีมนุษย์เป็นศูนย์กลาง",
    name_en: "Human-Centered Digital Media Production Module",
    credits: 3,
    module: "Visual Design",
    year: 3,
    term: 1,
    competency_tags: ["HumanCenteredDesign"],
    prerequisite: [],
    description: "จิตวิทยารับรู้เชิงสายตา การศึกษาความทุพพลภาพและการเข้าถึงสื่อของคนพิการ (Accessibility) รวมถึงการรับเสียง"
  },
  {
    course_id: "DGT01 2100",
    name_th: "การพัฒนาส่วนต่อประสานกับผู้ใช้",
    name_en: "User Interface Development Module",
    credits: 3,
    module: "UX/UI Design",
    year: 3,
    term: 1,
    competency_tags: ["UIDevelopment"],
    prerequisite: [],
    description: "โครงร่างองค์ประกอบปุ่ม เมนู ฟรอนต์เอนด์ และหลักการพัฒนาอินเตอร์เฟซแอปพลิเคชันที่สอดคล้องกับ UX ดีไซน์"
  },
  {
    course_id: "DGT20 0400",
    name_th: "การผลิตข่าวสำหรับแพลตฟอร์มที่หลากหลาย",
    name_en: "Multi-Platform Journalism Production Module",
    credits: 3,
    module: "Journalism",
    year: 2,
    term: 1,
    competency_tags: ["NewsProduction"],
    prerequisite: [],
    description: "หลักจารีตวารสารศาสตร์ยุคใหม่ การเขียนข่าวด่วนลงเว็บ ทริคหาประเด็นข่าว การจับภาพตัดต่อเล่าเรื่อง และการสตรีมมิ่งข่าวสด"
  },
  {
    course_id: "DGT20 0800",
    name_th: "การเขียนเนื้อหาดิจิทัล",
    name_en: "Digital Content Writing Module",
    credits: 3,
    module: "Content Creation",
    year: 2,
    term: 2,
    competency_tags: ["ContentWriting"],
    prerequisite: [],
    description: "ศิลปะการปั้นแคมเปญคอนเทนต์ การตลาดเนื้อหา (Content Marketing) และการเขียนสโลแกนเชิญชวนบนโพสต์โซเชียลมีเดีย"
  },
  {
    course_id: "DGT20 1200",
    name_th: "การสื่อสารการตลาดดิจิทัล",
    name_en: "Digital Marketing Communication Module",
    credits: 3,
    module: "Marketing",
    year: 3,
    term: 1,
    competency_tags: ["MarketingComm"],
    prerequisite: [],
    description: "ยุทธวิธีโฆษณาผ่านอินฟลูเอนเซอร์ เฟซบุ๊กแอด กูเกิลแอนะลิติกส์ และการควบคุมตัวเลขความคุ้มค่าของการลงทุนแอดดิจิทัล"
  },
  {
    course_id: "DGT20 0900",
    name_th: "การผลิตแอนิเมชัน 3 มิติ",
    name_en: "3D Animation Production Module",
    credits: 3,
    module: "Animation",
    year: 3,
    term: 1,
    competency_tags: ["Animation3D"],
    prerequisite: ["DGT20 0300"],
    description: "ศึกษาโครงสร้างโพลีกอน ขึ้นรูปทรงกล่อง ตัวละคร พื้นผิว วางโครงกระดูกข้อต่อ (Rigging) ตลอดจนการเคลื่อนไหว 3 มิติเบื้องต้น"
  },
  {
    course_id: "DGT20 1600",
    name_th: "การผลิตแอนิเมชันขั้นสูง",
    name_en: "Advanced Animation Production Module",
    credits: 3,
    module: "Animation",
    year: 3,
    term: 2,
    competency_tags: ["AnimationAdvanced"],
    prerequisite: ["DGT20 0900"],
    description: "จำลองกฎฟิสิกส์ การขยับข้อต่อพริ้วไหว เทคนิคเรนเดอร์จัดแสง และการรวมคอมโพสิตของโมเดล 3D เข้ากับกองถ่ายจริง"
  },
  {
    course_id: "DGT20 0500",
    name_th: "การผลิตสื่อภาพและเสียงดิจิทัล",
    name_en: "Digital Video and Audio Production Module",
    credits: 3,
    module: "Film & Video",
    year: 2,
    term: 1,
    competency_tags: ["VideoAudioProd"],
    prerequisite: [],
    description: "ทฤษฎีกล้อง ทิศทางการเคลื่อน มุมกล้อง การจัดฉาก การอัดบันทึกเสียง ตลอดจนสแต็กการนำเสียงผสมประสานคลิปภาพ"
  },
  {
    course_id: "DGT20 1300",
    name_th: "การผลิตภาพยนตร์ดิจิทัล",
    name_en: "Digital Filmmaking Module",
    credits: 3,
    module: "Film & Video",
    year: 3,
    term: 1,
    competency_tags: ["Filmmaking"],
    prerequisite: ["DGT20 0500"],
    description: "การวางสตอรี่บอร์ด การกำกับ นักแสดง การกำกับภาพในฉากกองถ่ายขนาดใหญ่ ตลอดจนกระบวนการจัดหางบประมาณสร้างหนัง"
  },
  {
    course_id: "DGT20 1500",
    name_th: "การผลิตวิดีทัศน์ในระบบสตูดิโอดิจิทัล",
    name_en: "Digital Studio Video Production Module",
    credits: 3,
    module: "Film & Video",
    year: 3,
    term: 2,
    competency_tags: ["StudioProduction"],
    prerequisite: ["DGT20 0500"],
    description: "การถ่ายทำรายการในห้องควบคุม สวิตเชอร์สลับกล้องสด การจัดแสงระดับสามจุด ตลอดจนการผสมแสงฉากหลังกรีนสกรีนโครมาคีย์"
  },
  {
    course_id: "DGT20 1000",
    name_th: "การออกแบบและพัฒนาเกมคอมพิวเตอร์",
    name_en: "Computer Game Design and Development Module",
    credits: 3,
    module: "Game Dev",
    year: 2,
    term: 2,
    competency_tags: ["GameDev"],
    prerequisite: [],
    description: "โครงสร้างความสนุกในเกม การออกแบบกฎการแพ้ชนะ ทฤษฎีความยาก และการเขียนโปรแกรมควบคุมเอ็นจิ้นพัฒนาเกมพื้นฐาน"
  },
  {
    course_id: "DGT20 1800",
    name_th: "การออกแบบและพัฒนาเกมคอมพิวเตอร์ขั้นสูง",
    name_en: "Advance Game Design and Development Module",
    credits: 3,
    module: "Game Dev",
    year: 3,
    term: 2,
    competency_tags: ["GameDevAdvanced"],
    prerequisite: ["DGT20 1000"],
    description: "การออกแบบระบบเครือข่ายสำหรับเกมมัลติเพลย์เยอร์ การประมวลผลฟิสิกส์ ความปลอดภัยป้องกันโปรแกรมแฮกในระบบเกม"
  },
  {
    course_id: "DGT20 1700",
    name_th: "การสร้างสรรค์งานโฆษณาและการตลาดเชิงกิจกรรม",
    name_en: "Creative Advertising and Event Marketing Module",
    credits: 3,
    module: "Marketing",
    year: 3,
    term: 2,
    competency_tags: ["Advertising"],
    prerequisite: [],
    description: "การคิดสปอตโฆษณาเพื่อสร้างไวรัล การวางแผนจัดเตรียมทำบูธ อีเวนต์ออนกราวด์ และแผนวัดประเมินผลงานจัดแสดง"
  },
  {
    course_id: "DGT20 1400",
    name_th: "การจัดการสื่อเพื่อพันธกิจทางสังคม",
    name_en: "Media Management for Social Engagement Module",
    credits: 3,
    module: "Marketing",
    year: 3,
    term: 1,
    competency_tags: ["SocialEngagement"],
    prerequisite: [],
    description: "การใช้อำนาจของสื่อในการช่วยเหลือสังคม รณรงค์สร้างความเท่าเทียม แบรนด์ดิ้งเพื่อส่วนรวม ตลอดจนนโยบายสื่อสาธารณะ"
  },
  {
    course_id: "DGT01 1200",
    name_th: "การพัฒนาโปรแกรมประยุกต์ข้ามแพลตฟอร์ม",
    name_en: "Cross-Platform Application Development Module",
    credits: 3,
    module: "Programming",
    year: 3,
    term: 2,
    competency_tags: ["CrossPlatform"],
    prerequisite: [],
    description: "พัฒนา Mobile Apps ข้ามแพลตฟอร์มด้วยเฟรมเวิร์ก เช่น React Native หรือ Flutter สำหรับงานนิเทศศาสตร์"
  },
  {
    course_id: "DGT01 0600",
    name_th: "การเขียนโปรแกรมเชิงอ็อบเจกต์และโครงสร้างข้อมูล",
    name_en: "OOP and Data Structures Module",
    credits: 3,
    module: "Programming",
    year: 2,
    term: 2,
    competency_tags: ["OOP"],
    prerequisite: [],
    description: "ศึกษาคลาส อ็อบเจกต์ โครงสร้างจัดระเบียบข้อมูลเบื้องต้น เพื่อนำมาประกอบสแต็กพัฒนาระบบซอฟต์แวร์แอปพลิเคชัน"
  },
  {
    course_id: "DGT01 0300",
    name_th: "ความรู้เบื้องต้นนักพัฒนาซอฟต์แวร์",
    name_en: "Introduction to Software Developer Professionals",
    credits: 3,
    module: "Programming",
    year: 2,
    term: 1,
    competency_tags: ["ProgrammingIntro"],
    prerequisite: [],
    description: "ตรรกะคณิตศาสตร์สำหรับโค้ดดิ้ง ตัวแปร เงื่อนไข การวนซ้ำ ตลอดจนกระบวนการจัดเก็บไฟล์งานพัฒนาด้วย Git"
  },
  {
    course_id: "DGT01 1300",
    name_th: "วิศวกรรมข้อมูล",
    name_en: "Data Engineering Module",
    credits: 3,
    module: "Data Science",
    year: 3,
    term: 2,
    competency_tags: ["DataEngineering"],
    prerequisite: [],
    description: "การจัดเก็บ การสกัด และการเตรียมข้อมูลขนาดใหญ่สำหรับการวิเคราะห์เนื้อหาสื่อของนิเทศศาสตร์"
  },
  {
    course_id: "CWI01 4100",
    name_th: "เตรียมสหกิจศึกษาบูรณาการกับการทำงาน",
    name_en: "Pre-Cooperative and Work-Integrated Education",
    credits: 1,
    module: "Cooperative",
    year: 3,
    term: 3,
    competency_tags: ["Cooperative"],
    prerequisite: [],
    description: "การเตรียมพร้อมสำหรับการปฏิบัติงานสหกิจศึกษาในสถานประกอบการสื่อดิจิทัล"
  },
  {
    course_id: "DGT20 9910",
    name_th: "สหกิจศึกษาบูรณาการกับการทำงาน 1",
    name_en: "Cooperative and Work-Integrated Education I",
    credits: 3,
    module: "Cooperative",
    year: 4,
    term: 1,
    competency_tags: ["Cooperative"],
    prerequisite: ["CWI01 4100"],
    description: "การปฏิบัติงานจริงเต็มเวลากับสถานประกอบการด้านนิเทศศาสตร์ สื่อสารมวลชน หรือดิจิทัลแพลตฟอร์ม ระยะที่หนึ่ง"
  },
  {
    course_id: "DGT20 9920",
    name_th: "สหกิจศึกษาบูรณาการกับการทำงาน 2",
    name_en: "Cooperative and Work-Integrated Education II",
    credits: 3,
    module: "Cooperative",
    year: 4,
    term: 2,
    competency_tags: ["Cooperative"],
    prerequisite: ["DGT20 9910"],
    description: "ขยายผลสหกิจศึกษาปฏิบัติงานจริงเต็มเวลากับบริษัทสร้างสรรค์สื่อดิจิทัล โทรทัศน์ หรือค่ายผลิตเกม ระยะที่สอง"
  }
];

export function getRequiredCoursesForCareer(careerName: string, groupName: string): SutCourse[] {
  const normCareer = careerName.toLowerCase();
  const normGroup = groupName.toLowerCase();
  
  const matchedIds = new Set<string>();
  
  // DT Branch course resolution
  if (
    normGroup.includes("web application") ||
    normGroup.includes("mobile application") ||
    normGroup.includes("enterprise software") ||
    normGroup.includes("data handling") ||
    normGroup.includes("data science") ||
    normGroup.includes("cloud technology") ||
    normGroup.includes("other professionals")
  ) {
    // 1. Group 1: Web Application Professionals
    if (normGroup.includes("web application")) {
      // Compulsory for all DT Group 1 careers
      matchedIds.add("1101010");
      matchedIds.add("1101020");
      matchedIds.add("1101030");
      matchedIds.add("1101040");
      matchedIds.add("1101910");
      
      if (normCareer.includes("web master")) {
        matchedIds.add("1101050");
        matchedIds.add("1101150");
      } else if (normCareer.includes("web designer")) {
        matchedIds.add("1101060");
        matchedIds.add("1101070");
        matchedIds.add("1101080");
        matchedIds.add("1101150");
        matchedIds.add("1101400");
      } else if (normCareer.includes("ux/ui") || normCareer.includes("user experience")) {
        matchedIds.add("1101060");
        matchedIds.add("1101070");
        matchedIds.add("1101080");
        matchedIds.add("1101400");
      } else if (normCareer.includes("web developer")) {
        matchedIds.add("1101090");
        matchedIds.add("1101100");
        matchedIds.add("1101110");
      } else if (normCareer.includes(".net")) {
        matchedIds.add("1101090");
        matchedIds.add("1101110");
      }
    }
    
    // 2. Group 2: Mobile Application Professionals
    else if (normGroup.includes("mobile application")) {
      // Compulsory for all DT Group 2 careers
      matchedIds.add("1101090");
      matchedIds.add("1101100");
      
      if (normCareer.includes("cross-platform") || normCareer.includes("xamarin")) {
        matchedIds.add("1101110");
      } else if (normCareer.includes("android")) {
        matchedIds.add("1101120");
      } else if (normCareer.includes("ios")) {
        matchedIds.add("1101130");
      } else if (normCareer.includes("mobile application developer")) {
        matchedIds.add("1101080");
      }
    }
    
    // 3. Group 3: Enterprise Software Professionals
    else if (normGroup.includes("enterprise software")) {
      // Compulsory for all DT Group 3 careers
      matchedIds.add("1101090");
      matchedIds.add("1101100");
      
      if (normCareer.includes("embedded")) {
        matchedIds.add("1101140");
      } else if (normCareer.includes("system analyst")) {
        matchedIds.add("1101150");
        matchedIds.add("1101220");
      } else if (normCareer.includes("software engineer")) {
        matchedIds.add("1101150");
        matchedIds.add("1101160");
      } else if (normCareer.includes("tester")) {
        matchedIds.add("1101150");
        matchedIds.add("1101160");
      } else if (normCareer.includes("software developer")) {
        matchedIds.add("1101160");
      }
    }
    
    // 4. Group 4: Data Handling Professionals
    else if (normGroup.includes("data handling")) {
      matchedIds.add("1101170");
      matchedIds.add("1101300");
      matchedIds.add("1101310");
      matchedIds.add("1101320");
      matchedIds.add("1101330");
      matchedIds.add("1101340");
      matchedIds.add("1101350");
      matchedIds.add("1101360");
    }
    
    // 5. Group 5: Data Science Professionals
    else if (normGroup.includes("data science")) {
      // Compulsory for all DT Group 5
      matchedIds.add("1101170");
      matchedIds.add("1101230");
      matchedIds.add("1101250");
      matchedIds.add("1101290");
      matchedIds.add("1101220");
      
      if (normCareer.includes("engineer") || normCareer.includes("architect")) {
        matchedIds.add("1101240");
      } else if (normCareer.includes("scientist")) {
        matchedIds.add("1101260");
        matchedIds.add("1101270");
      } else if (normCareer.includes("analyst")) {
        matchedIds.add("1101270");
        matchedIds.add("1101280");
      }
    }
    
    // 6. Group 6: Cloud Technology Professionals
    else if (normGroup.includes("cloud technology")) {
      if (normCareer.includes("administrator")) {
        matchedIds.add("1101180");
        matchedIds.add("1101190");
      } else if (normCareer.includes("network analyst")) {
        matchedIds.add("1101180");
      } else if (normCareer.includes("security specialist")) {
        matchedIds.add("1101200");
      } else if (normCareer.includes("penetration")) {
        matchedIds.add("1101190");
        matchedIds.add("1101200");
        matchedIds.add("1101210");
      } else if (normCareer.includes("security analyst")) {
        matchedIds.add("1101200");
        matchedIds.add("1101210");
      }
    }
    
    // 7. Group 7: Other / Special
    else if (normGroup.includes("other") || normGroup.includes("พิเศษ")) {
      matchedIds.add("วิชาโท");
      matchedIds.add("1101901");
      matchedIds.add("1101902");
      matchedIds.add("1101903");
      matchedIds.add("1101904");
    }
  }
  
  // DC Branch course resolution
  else {
    // 1. DC Core Compulsory Courses (Required for every DC career)
    matchedIds.add("DGT20 0100");
    matchedIds.add("DGT01 0200");
    matchedIds.add("DGT20 0600");
    matchedIds.add("DGT20 0700");
    matchedIds.add("DGT20 9800");
    
    // 2. Group specific mappings
    if (normGroup.includes("visual design")) {
      matchedIds.add("DGT20 0200");
      matchedIds.add("DGT20 0300");
      matchedIds.add("DGT20 1100");
      matchedIds.add("DGT20 1900");
      matchedIds.add("DGT01 2100");
    }
    else if (normGroup.includes("content creator")) {
      matchedIds.add("DGT20 0400");
      matchedIds.add("DGT20 0800");
      matchedIds.add("DGT20 1200");
    }
    else if (normGroup.includes("animation")) {
      matchedIds.add("DGT20 0300");
      matchedIds.add("DGT20 0900");
      matchedIds.add("DGT20 1600");
    }
    else if (normGroup.includes("film") || normGroup.includes("video")) {
      matchedIds.add("DGT20 0500");
      matchedIds.add("DGT20 1300");
      matchedIds.add("DGT20 1500");
    }
    else if (normGroup.includes("game")) {
      matchedIds.add("DGT20 1000");
      matchedIds.add("DGT20 1800");
    }
    else if (normGroup.includes("planning") || normGroup.includes("production")) {
      matchedIds.add("DGT20 1200");
      matchedIds.add("DGT20 1700");
      matchedIds.add("DGT20 1400");
    }
    else if (normGroup.includes("marketing")) {
      matchedIds.add("DGT20 1200");
      matchedIds.add("DGT20 1700");
      matchedIds.add("DGT20 0800");
    }
    else if (normGroup.includes("reporting") || normGroup.includes("new media")) {
      matchedIds.add("DGT20 0400");
      matchedIds.add("DGT20 0500");
      matchedIds.add("DGT20 1500");
    }
    else if (normGroup.includes("application")) {
      matchedIds.add("DGT20 1100");
      matchedIds.add("DGT01 1200");
      matchedIds.add("DGT01 0600");
      matchedIds.add("DGT01 0300");
    }
    else if (normGroup.includes("personalized") || normGroup.includes("research") || normGroup.includes("ประเมินผล")) {
      matchedIds.add("DGT01 1300");
      matchedIds.add("CWI01 4100");
      matchedIds.add("DGT20 9910");
      matchedIds.add("DGT20 9920");
    }
  }

  // Fallback in case of unmatched items
  if (matchedIds.size <= 5 && !matchedIds.has("DGT20 0100")) {
    // DT Fallbacks
    matchedIds.add("1101010");
    matchedIds.add("1101020");
  }

  return SUT_COURSES.filter(c => matchedIds.has(c.course_id));
}
