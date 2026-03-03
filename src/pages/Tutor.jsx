import { useState } from 'react';
import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock';
import { Mail, CheckCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const content = {
  en: {
    title: "Private Maths Tuition in English",
    intro: [
      "Hi, I'm Joshua, an experienced maths teacher and tutor.",
      "My own children are in Years 7 and 8 at Novaschool Sunland International (Estación de Cártama) and we live just up the road (10 minute walk from school)."
    ],
    backgroundTitle: "Background",
    background1: [
      "I have a Ph.D. in Mathematics and have studied Mathematics Education at Masters level. I gave private maths tuition for years in the UK to all levels of school and university students, and a couple of adult learners. I have helped high-achievers with their Cambridge entrance exams, and I've also helped students with dyscalculia to develop learning strategies.",
      "Since my working hours have reduced recently I have decided to get back into tutoring here in Spain."
    ],
    howTitle: "How it works",
    how: [
      "If you live nearby (Cártama, Pizarra, Coín, Alhaurín, Campanillas, etc.) and you have a quiet space to learn, I can come to your home and tutor there. Get in touch and we can arrange a time.",
      "For Sunlanders: I live only a short walk from Novaschool Sunland International and my children do the walk every day. It would be convenient to arrange an after-school tutoring session at my house, with you picking up your child afterwards. I'd be happy for a parent to come round for a chat before the first session.",
      "I can also tutor online via Facetime, Teams, Zoom, etc.."
    ],
    pricingTitle: "Pricing",
    pricing: [
      "I charge €30 per 1-hour session, but I'm not going to charge extra if we run a bit late.",
      "We can also arrange longer sessions: 1.5 hour = €40; 2 hour = €50.",
      "I'm looking for clients who want a regular, weekly session at a fixed time, but am happy to do one-off, pre-exam sessions."
    ],
    highlightsTitle: "Why Choose Me",
    highlights: [
      "Former Maths teacher in the UK: secondary schools and university",
      "PhD in Mathematics",
      "Masters-level studies in Mathematics Education",
      "Years of private tuition experience in the UK",
      "Experience teaching for British GCSEs, iGCSEs, A-levels and the IB",
      "Helped high-achievers prepare for Cambridge entrance exams",
      "Experience helping students with dyscalculia develop learning strategies",
      "Native English speaker based in Cártama/Alhaurín/Coín area",
      "Flexible scheduling: regular weekly sessions or one-off exam prep",
    ],
  },
  es: {
    title: "Clases Particulares de Matemáticas en Inglés",
    intro: [
      "Hola, soy Joshua, un profesor y tutor de matemáticas con experiencia.",
      "Mis hijos están en Year 7 y Year 8 en el colegio Novaschool Sunland International (Estación de Cártama) y vivimos muy cerca (a 10 minutos andando del colegio)."
    ],
    backgroundTitle: "Experiencia",
    background1: [
      "Tengo un doctorado en Matemáticas y he estudiado Educación Matemática a nivel de máster. Durante años di clases particulares de matemáticas en el Reino Unido a estudiantes de todos los niveles escolares y universitarios, además de algunos adultos. He ayudado a estudiantes de alto rendimiento con sus exámenes de acceso a Cambridge, y también he ayudado a estudiantes con discalculia a desarrollar estrategias de aprendizaje.",
      "Como mis horas de trabajo se han reducido recientemente, he decidido volver a dar clases particulares aquí en España."
    ],
    howTitle: "Cómo funciona",
    how: [
      "Si vive cerca (Cártama, Pizarra, Coín, Alhaurín, Campanillas, etc.) y tiene un espacio tranquilo para aprender, puedo ir a su casa y dar la clase allí. Póngase en contacto y podemos organizar un horario.",
      "Para familias de Sunland: Vivo a solo unos minutos andando de Novaschool Sunland International y mis hijos hacen el camino todos los días. Sería conveniente organizar una clase particular después del colegio en mi casa, y que usted recoja a su hijo después. Estaría encantado de que un padre venga a charlar antes de la primera sesión.",
      "También puedo dar clases online por Facetime, Teams, Zoom, etc."
    ],
    pricingTitle: "Precios",
    pricing: [
      "Cobro 30€ por sesión de 1 hora, pero no voy a cobrar extra si la clase se alarga un poco.",
      "También podemos organizar sesiones más largas: 1,5 horas = 40€; 2 horas = 50€.",
      "Busco clientes que quieran una sesión regular semanal a una hora fija, pero estaré encantado de hacer sesiones puntuales antes de un examen."
    ],
    highlightsTitle: "Por qué elegirme",
    highlights: [
      "Ex profesor de Matemáticas en el Reino Unido: colegios de secundaria y universidad",
      "Doctorado en Matemáticas",
      "Estudios de máster en Educación Matemática",
      "Años de experiencia en clases particulares en el Reino Unido",
      "Experiencia enseñando para GCSEs, iGCSEs, A-levels británicos y el IB",
      "He ayudado a estudiantes de alto rendimiento a preparar exámenes de acceso a Cambridge",
      "Experiencia ayudando a estudiantes con discalculia a desarrollar estrategias de aprendizaje",
      "Hablante nativo de inglés, residente en la zona de Cártama/Alhaurín/Coín",
      "Horarios flexibles: sesiones semanales regulares o sesión puntual antes de exámenes",
    ],
  },
  de: {
    title: "Private Mathematik-Nachhilfe auf Englisch",
    intro: [
      "Hallo, ich bin Joshua, ein erfahrener Mathematiklehrer und Nachhilfelehrer.",
      "Meine eigenen Kinder sind in der 7. und 8. Klasse an der Novaschool Sunland International (Estación de Cártama) und wir wohnen ganz in der Nähe (10 Minuten zu Fuß von der Schule)."
    ],
    backgroundTitle: "Hintergrund",
    background1: [
      "Ich habe einen Doktortitel in Mathematik und habe Mathematikdidaktik auf Masterniveau studiert. Ich habe jahrelang in Großbritannien Mathematik-Nachhilfe für Schüler und Studenten aller Stufen sowie einige Erwachsene gegeben. Ich habe leistungsstarken Schülern bei ihren Cambridge-Aufnahmeprüfungen geholfen und auch Schülern mit Dyskalkulie bei der Entwicklung von Lernstrategien unterstützt.",
      "Da meine Arbeitszeiten sich kürzlich reduziert haben, habe ich beschlossen, hier in Spanien wieder Nachhilfe zu geben."
    ],
    howTitle: "So funktioniert es",
    how: [
      "Wenn Sie in der Nähe wohnen (Cártama, Pizarra, Coín, Alhaurín, Campanillas usw.) und einen ruhigen Lernort haben, kann ich zu Ihnen nach Hause kommen und dort unterrichten. Nehmen Sie Kontakt auf und wir können einen Termin vereinbaren.",
      "Für Sunland-Familien: Ich wohne nur einen kurzen Spaziergang von Novaschool Sunland International entfernt und meine Kinder gehen den Weg jeden Tag. Es wäre praktisch, eine Nachhilfestunde nach der Schule bei mir zu Hause zu vereinbaren, wobei Sie Ihr Kind danach abholen. Ich würde mich freuen, wenn ein Elternteil vor der ersten Sitzung auf einen Plausch vorbeikommt.",
      "Ich kann auch online per Facetime, Teams, Zoom usw. unterrichten."
    ],
    pricingTitle: "Preisgestaltung",
    pricing: [
      "Ich berechne 30€ für eine einstündige Sitzung, aber ich werde keinen Aufpreis verlangen, wenn es etwas länger dauert.",
      "Wir können auch längere Sitzungen vereinbaren: 1,5 Stunden = 40€; 2 Stunden = 50€.",
      "Ich suche Kunden, die eine regelmäßige wöchentliche Sitzung zu einer festen Zeit wünschen, mache aber auch gerne einmalige Sitzungen vor einer Prüfung."
    ],
    highlightsTitle: "Warum ich",
    highlights: [
      "Ehemaliger Mathematiklehrer in Großbritannien: weiterführende Schulen und Universität",
      "Doktortitel in Mathematik",
      "Masterstudium in Mathematikdidaktik",
      "Jahrelange Erfahrung in privater Nachhilfe in Großbritannien",
      "Erfahrung im Unterrichten für britische GCSEs, iGCSEs, A-Levels und das IB",
      "Habe leistungsstarke Schüler auf Cambridge-Aufnahmeprüfungen vorbereitet",
      "Erfahrung in der Unterstützung von Schülern mit Dyskalkulie bei Lernstrategien",
      "Englischer Muttersprachler, wohnhaft im Gebiet Cártama/Alhaurín/Coín",
      "Flexible Terminplanung: regelmäßige wöchentliche Sitzungen oder einmalige Prüfungsvorbereitung",
    ],
  }
};

const Tutor = () => {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  return (
    <Layout>
      <ContentBlock title="" maxWidth="4xl" centerTitle={true}>

        <div className="relative rounded-lg p-6 mb-8 overflow-hidden">
          <img src="/images/math-with-dr-joshua/light.png" alt="" className="absolute inset-0 w-full h-full object-cover dark:hidden" />
          <img src="/images/math-with-dr-joshua/dark.png" alt="" className="absolute inset-0 w-full h-full object-cover hidden dark:block" />
          <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60" />
          
          <div className="relative z-10 flex justify-center mb-8">
            <h1 className="font-black text-2xl md:text-5xl dark:text-white">Maths with Dr&nbsp;Joshua</h1>
          </div>

          <div className="relative z-10 flex justify-center mb-8">
            <h2 className="font-black text-md md:text-3xl dark:text-white">{t.title}</h2>
          </div>

          {/* Language toggle */}
          <div className="relative z-10 flex justify-center mb-2">
            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLang('de')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'de'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                }`}
              >
                Deutsch
              </button>
            </div>
          </div>
        </div>
         

          {/* Intro + Contact */}
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">

            <div className="text-center space-y-4 mb-8 text-gray-600 dark:text-white">
              {t.intro.map((text, i) => (
                <p key={i} className="text-lg">{text}</p>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="mailto:joshua@prettyman.me"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Mail size={20} />
                <span>Email</span>
              </a>
              <a
                href="https://wa.me/34711042151?text=Tutoring%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <FaWhatsapp size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">{t.highlightsTitle}</h2>
            <ul className="space-y-2 text-gray-600 dark:text-white">
              {t.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Background */}
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">{t.backgroundTitle}</h2>
            <div className="space-y-3 text-gray-600 dark:text-white">
              {t.background1.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">{t.howTitle}</h2>
            <div className="space-y-3 text-gray-600 dark:text-white">
              {t.how.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-blue-50 dark:bg-gray-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-4 text-gray-600 dark:text-white">{t.pricingTitle}</h2>
            <div className="space-y-3 text-gray-600 dark:text-white">
              {t.pricing.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Tutor