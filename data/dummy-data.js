/* =========================================================
   LIFELINE — dummy data (static, no backend)
   ========================================================= */

const FIRST_NAMES = ["Aarav","Priya","Rohan","Sneha","Vikram","Anita","Karan","Meera","Farhan","Divya","Suresh","Kavita","Manish","Pooja","Arjun","Neha","Rajesh","Simran","Tariq","Isha","Vivek","Ritu","Sameer","Alka","Nikhil","Shreya","Imran","Latha","Yusuf","Tanvi"];
const LAST_NAMES = ["Mehta","Sharma","Verma","Iyer","Khan","Das","Reddy","Nair","Gupta","Chatterjee","Rao","Joshi","Malhotra","Sen","Fernandes","Pillai","Bose","Kapoor","Shah","Bhatia"];
const CITIES = ["Ahmedabad","Mumbai","Delhi","Bengaluru","Pune","Chennai","Hyderabad","Kolkata","Jaipur","Surat"];
const BLOOD_GROUPS = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];

function seededPhoto(seed, gender){
  const g = gender === "F" ? "women" : "men";
  return `https://randomuser.me/api/portraits/${g}/${seed}.jpg`;
}

const DONORS = Array.from({length:30}, (_, i) => {
  const gender = i % 2 === 0 ? "M" : "F";
  const first = FIRST_NAMES[i % FIRST_NAMES.length];
  const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];
  return {
    id: i + 1,
    name: `${first} ${last}`,
    bloodGroup: BLOOD_GROUPS[i % BLOOD_GROUPS.length],
    city: CITIES[i % CITIES.length],
    age: 20 + (i % 25),
    available: i % 3 !== 0,
    lastDonated: `${2024 + (i % 2)}-0${(i % 9) + 1}-1${i % 9}`,
    donations: (i % 12) + 1,
    photo: seededPhoto((i % 90) + 1, gender),
    phone: `+91 98${(10000000 + i * 137).toString().slice(0,8)}`
  };
});

const BLOOD_REQUESTS = Array.from({length:15}, (_, i) => {
  const urgencyLevels = ["Critical","Urgent","Normal"];
  return {
    id: i + 1,
    patient: `${FIRST_NAMES[(i+5) % FIRST_NAMES.length]} ${LAST_NAMES[(i+2) % LAST_NAMES.length]}`,
    hospital: `${CITIES[i % CITIES.length]} City Hospital`,
    bloodGroup: BLOOD_GROUPS[(i * 2) % BLOOD_GROUPS.length],
    units: (i % 4) + 1,
    urgency: urgencyLevels[i % 3],
    city: CITIES[i % CITIES.length],
    postedHoursAgo: (i + 1) * 2,
    contact: `+91 90${(11000000 + i * 219).toString().slice(0,8)}`
  };
});

const TESTIMONIALS = [
  {name:"Ananya Desai", role:"Blood Donor · 12 donations", quote:"Donating blood every three months has become part of my routine. Knowing it could save someone in an emergency keeps me coming back."},
  {name:"Ramesh Iyer", role:"Recipient's family", quote:"When my father needed platelets urgently, this portal connected us to a donor within two hours. We are forever grateful."},
  {name:"Dr. Fatima Sheikh", role:"Transplant Surgeon", quote:"Organ registries like this make it possible for us to match donors and recipients faster, which directly improves survival rates."},
  {name:"Kabir Singh", role:"Organ Donor Registrant", quote:"Registering took less than five minutes. It's a small decision that could give someone else a second chance at life."},
  {name:"Meenal Joshi", role:"First-time Donor", quote:"I was nervous before my first donation, but the process was smooth and the staff explained every step clearly."},
  {name:"Aditya Nair", role:"Blood Donor · 6 donations", quote:"The reminder notifications help me track when I'm eligible to donate again. Simple and effective."},
  {name:"Sunita Rao", role:"Kidney Recipient", quote:"Two years ago I was on dialysis. Today, thanks to a donor I never got to meet, I run every morning."},
  {name:"Vishal Kapoor", role:"Corporate Donation Drive Lead", quote:"We organised a donor drive using this platform and registered 84 new donors from our office in a single day."},
  {name:"Priyanka Menon", role:"Nursing Staff", quote:"Having a searchable donor directory by blood group and city has cut our emergency response time significantly."},
  {name:"Farhan Ahmed", role:"Organ Donor Family", quote:"Honouring my brother's wish to donate his organs gave three families their loved ones back. This registry made that possible."}
];

const FAQS = [
  {q:"Who can donate blood?", a:"Most healthy adults aged 18–65 weighing over 50kg can donate blood, subject to a brief health screening before each donation."},
  {q:"How often can I donate blood?", a:"Whole blood donors can typically donate every 90 days for men and 120 days for women, though this may vary by local guidelines."},
  {q:"Does donating blood hurt?", a:"You may feel a brief pinch when the needle is inserted, but the donation itself is generally painless and takes about 10–15 minutes."},
  {q:"What organs can be donated?", a:"A single donor can donate kidneys, liver, heart, lungs, pancreas, intestines, corneas, skin, and other tissues."},
  {q:"Is organ donation against my religion?", a:"Most major religions support organ donation as an act of compassion. We recommend speaking with your religious advisor if you have concerns."},
  {q:"Can I register as both a blood and organ donor?", a:"Yes, you can register as both during sign-up, or update your preferences anytime from your dashboard."},
  {q:"Is there an age limit for organ donation?", a:"There is no strict age cutoff; medical suitability is assessed at the time of donation rather than by age alone."},
  {q:"How do I know my blood type?", a:"Your blood type is determined and recorded during your first donation or screening, and displayed in your donor profile."},
  {q:"Can I donate if I have a tattoo?", a:"Usually yes, after a waiting period of a few months from a licensed tattoo studio, depending on local eligibility rules."},
  {q:"Will I be notified of urgent requests near me?", a:"Yes, donors can opt in to receive notifications for urgent blood requests matching their blood group and city."},
  {q:"What happens after I register as an organ donor?", a:"You'll receive a digital donor card and your details are added to the registry, viewable and editable anytime from your dashboard."},
  {q:"Can I withdraw my organ donation consent?", a:"Yes, consent can be updated or withdrawn at any time from your account settings."},
  {q:"Is my medical information kept private?", a:"All personal and medical information is kept confidential and only shared with verified medical institutions when necessary."},
  {q:"How long does a blood donation take?", a:"The entire visit, including screening, donation, and rest, usually takes 45 minutes to an hour."},
  {q:"Can I donate blood for a specific patient?", a:"Yes, directed donations for a specific patient can be arranged through the requesting hospital."},
  {q:"What should I eat before donating blood?", a:"Eat a healthy meal and stay hydrated before donating; avoid fatty foods immediately beforehand."},
  {q:"Can platelets be donated separately from whole blood?", a:"Yes, platelet donation (apheresis) is a separate process that takes longer but allows more frequent donation."},
  {q:"Is there a cost to register?", a:"Registration on this portal is completely free for both blood and organ donors."},
  {q:"How is a matching donor found for a transplant?", a:"Matching considers blood type, tissue compatibility, organ size, medical urgency, and geographic proximity."},
  {q:"Can I donate blood after recovering from an illness?", a:"Waiting periods vary by illness; a screening at the donation centre will confirm your eligibility."}
];

const ARTICLES = [
  {title:"5 Myths About Blood Donation, Debunked", tag:"Blood", img:"https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600&q=60", excerpt:"From needle fears to iron loss, we separate fact from fiction so you can donate with confidence."},
  {title:"A Day in the Life of a Transplant Coordinator", tag:"Organ", img:"https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=60", excerpt:"Behind every successful transplant is a coordinator racing against the clock to match donor and recipient."},
  {title:"Why Your Blood Type Matters More Than You Think", tag:"Blood", img:"https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=60", excerpt:"Understanding compatibility can help you see why rare blood types are always in high demand."},
  {title:"One Donor, Eight Lives: The Power of Organ Donation", tag:"Organ", img:"https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=60", excerpt:"A single organ and tissue donor can save or improve the lives of up to eight people."},
  {title:"Preparing for Your First Blood Donation", tag:"Blood", img:"https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=60", excerpt:"A simple checklist to help first-time donors feel confident and comfortable."},
  {title:"How Corneal Donation Restores Sight", tag:"Organ", img:"https://images.unsplash.com/photo-1571772805064-207c8435df79?w=600&q=60", excerpt:"Corneal transplants are among the most successful and common transplant surgeries performed today."},
  {title:"The Science Behind Blood Typing", tag:"Science", img:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=60", excerpt:"A closer look at antigens, antibodies, and why type O-negative is called the universal donor."},
  {title:"Talking to Your Family About Organ Donation", tag:"Awareness", img:"https://images.unsplash.com/photo-1516549655669-df64a4a4e7c9?w=600&q=60", excerpt:"Having this conversation early can make a difficult moment easier for your loved ones later."},
  {title:"World Blood Donor Day: What It Means", tag:"Awareness", img:"https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600&q=60", excerpt:"Celebrated every June 14th, this global day honours voluntary, unpaid blood donors everywhere."},
  {title:"Living Donation: What You Need to Know", tag:"Organ", img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=60", excerpt:"Kidneys and portions of the liver can be donated by living donors under careful medical evaluation."},
  {title:"How to Start a Blood Donation Drive at Work", tag:"Blood", img:"https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=60", excerpt:"A step-by-step guide to organising a successful donation camp in your organisation."},
  {title:"Nutrition Tips for Regular Blood Donors", tag:"Health", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=60", excerpt:"Iron-rich foods and good hydration habits that help your body recover faster between donations."},
  {title:"The Journey of a Donated Kidney", tag:"Organ", img:"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=60", excerpt:"From recovery to transplant, follow the carefully timed journey that saves a recipient's life."},
  {title:"Understanding the Organ Waiting List", tag:"Awareness", img:"https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=60", excerpt:"Thousands remain on waiting lists at any given time — here's how priority and matching work."},
  {title:"Blood Donation and Mental Wellbeing", tag:"Health", img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=60", excerpt:"Many regular donors report a genuine sense of purpose and connection from giving back."}
];

const MYTHS_FACTS = [
  {myth:"Donating blood makes you weak for weeks.", fact:"Most donors feel completely normal within 24 hours with proper hydration and rest."},
  {myth:"You can get an infection from donating blood.", fact:"Sterile, single-use equipment is used for every donor, eliminating infection risk."},
  {myth:"Only certain blood types are needed.", fact:"Every blood type is needed regularly; O-negative and AB-positive are especially valuable."},
  {myth:"Organ donors don't receive full medical care.", fact:"Doctors treating a patient are always separate from the transplant team; saving your life comes first."},
  {myth:"Older adults can't donate organs.", fact:"Medical suitability, not age, determines eligibility — donors in their 70s and 80s have successfully donated."},
  {myth:"Donating blood is a lengthy, painful process.", fact:"The actual draw takes 10–15 minutes and involves only a brief pinch."}
];

const DASHBOARD_STATS = {
  bloodGroup:"O+",
  donationStatus:"Eligible now",
  registeredOrgan:"Kidney, Corneas",
  totalDonations:9,
  livesImpacted:27,
  nextEligible:"Eligible today",
  upcomingRequests:[
    {patient:"Rahul Trivedi", hospital:"Sterling Hospital, Ahmedabad", bloodGroup:"O+", urgency:"Urgent"},
    {patient:"Meena Kulkarni", hospital:"Apollo Hospital, Pune", bloodGroup:"O+", urgency:"Normal"}
  ],
  notifications:[
    {text:"Your donation on 12 Jun was successfully recorded.", time:"2 days ago"},
    {text:"A donor drive is happening near you this weekend.", time:"4 days ago"},
    {text:"You're eligible to donate blood again.", time:"Today"}
  ],
  recentActivity:[
    {text:"Donated whole blood at City Blood Bank", time:"12 Jun 2026"},
    {text:"Updated organ donor preferences", time:"28 Apr 2026"},
    {text:"Registered as organ donor", time:"03 Jan 2025"}
  ]
};

const DONATION_HISTORY = [
  {date:"12 Jun 2026", type:"Whole Blood", hospital:"City Blood Bank, Ahmedabad", status:"Completed"},
  {date:"20 Feb 2026", type:"Platelets", hospital:"Sterling Hospital, Ahmedabad", status:"Completed"},
  {date:"05 Nov 2025", type:"Whole Blood", hospital:"Apollo Hospital, Ahmedabad", status:"Completed"},
  {date:"14 Aug 2025", type:"Whole Blood", hospital:"Red Cross Camp, Gandhinagar", status:"Completed"},
  {date:"02 May 2025", type:"Plasma", hospital:"City Blood Bank, Ahmedabad", status:"Completed"},
  {date:"19 Jan 2025", type:"Whole Blood", hospital:"Civil Hospital, Ahmedabad", status:"Cancelled"},
  {date:"30 Oct 2024", type:"Whole Blood", hospital:"Sterling Hospital, Ahmedabad", status:"Completed"}
];

const ORGANS = [
  {name:"Kidney", icon:"🫘", note:"Most commonly transplanted organ; can be donated by a living donor."},
  {name:"Liver", icon:"🫀", note:"Can regenerate; a portion can be donated by a living donor."},
  {name:"Heart", icon:"❤️", note:"Transplanted only after deceased donation, within hours of retrieval."},
  {name:"Lungs", icon:"🫁", note:"Can be donated as a pair or, rarely, as a single lung lobe."},
  {name:"Pancreas", icon:"🩺", note:"Often transplanted alongside a kidney for diabetic patients."},
  {name:"Corneas", icon:"👁️", note:"Restores sight; one donor can help two recipients."},
  {name:"Skin", icon:"🩹", note:"Used for burn victims and reconstructive surgery."},
  {name:"Intestines", icon:"➰", note:"Rarely transplanted, typically for patients with intestinal failure."}
];
