import { useState } from 'react';
import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock';
import { GraduationCap, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const content = {
  en: {
    title: "Private Maths Tuition in English",
    intro: "Hi, I'm Joshua. My own children are in Years 7 and 8 at Sunland International School and we live just up the road (10 minute walk from school).",
    backgroundTitle: "Background",
    background1: "I have a Ph.D. in Mathematics and have studied Mathematics Education at Masters level. I gave private maths tuition for years in the UK to all levels of school and university students, and a couple of adult learners. I have helped high-achievers with their Cambridge entrance exams, and I've also helped students with dyscalculia to develop learning strategies.",
    background2: "Since my working hours have reduced recently I have decided to get back into tutoring here in Spain. It's just something I really enjoy: when I was a Lecturer in Mathematics at Sheffield Hallam University I manned the \"Maths Help Desk\" three days a week just to help out Engineering Students with their Laplace Transforms, and Nursing students with their basic Statistics.",
    howTitle: "How it works",
    how1: "I live only a short walk from Sunland and my own children do the walk themselves every day. It would be convenient to arrange an after-school tutoring session at my house, with you picking up your child afterwards. I'd be happy for a parent to come round for a chat on the first session: I wouldn't want to send my children to a stranger's house on their own either.",
    how2: "Alternatively, if you live within a 15 minute drive of Estación de Cártama, and you have a quiet space to learn, I could come to your home and tutor there. Get in touch and we can try to arrange a time suitable for both of us.",
    pricing: "I charge €30 per 1-hour session, but I'm not going to charge extra if we run overtime or you're a bit late picking up. If you actually want a longer session (1.5 hour = €40, 2 hour = €50), that could be arranged.",
    regular: "I'm looking for clients who want a regular, weekly session at a fixed time, but if you want a one-off pre-exam session maybe we could work something out.",
  },
  es: {
    title: "Clases Particulares de Matemáticas en Inglés",
    intro: "Hola, soy Joshua. Mis hijos están en Year 7 y Year 8 en el colegio Sunland International School y vivimos muy cerca (a 10 minutos andando del colegio).",
    backgroundTitle: "Experiencia",
    background1: "Tengo un doctorado en Matemáticas y he estudiado Educación Matemática a nivel de máster. Durante años di clases particulares de matemáticas en el Reino Unido a estudiantes de todos los niveles escolares y universitarios, además de algunos adultos. He ayudado a estudiantes de alto rendimiento con sus exámenes de acceso a Cambridge, y también he ayudado a estudiantes con discalculia a desarrollar estrategias de aprendizaje.",
    background2: "Como mis horas de trabajo se han reducido recientemente, he decidido volver a dar clases particulares aquí en España. Es algo que me encanta: cuando era profesor de Matemáticas en la Universidad Sheffield Hallam, atendía el \"Servicio de Ayuda en Matemáticas\" tres días a la semana para ayudar a los estudiantes de Ingeniería con sus Transformadas de Laplace y a los estudiantes de Enfermería con su Estadística básica.",
    howTitle: "Cómo funciona",
    how1: "Vivo a poca distancia de Sunland y mis propios hijos hacen el camino solos todos los días. Sería conveniente organizar una clase particular después del colegio en mi casa, y que usted recoja a su hijo después. Me encantaría que un padre viniese a conocernos en la primera sesión: yo tampoco enviaría a mis hijos solos a casa de un desconocido.",
    how2: "Alternativamente, si vive a menos de 15 minutos en coche de la Estación de Cártama y tiene un espacio tranquilo para aprender, podría ir a su casa y dar la clase allí. Póngase en contacto y podemos intentar encontrar un horario que nos convenga a ambos.",
    pricing: "Cobro 30€ por sesión de 1 hora, pero no voy a cobrar extra si nos pasamos de tiempo o si llega un poco tarde a recoger. Si realmente quiere una sesión más larga (1,5 horas = 40€, 2 horas = 50€), se podría organizar.",
    regular: "Busco clientes que quieran una sesión regular semanal a una hora fija, pero si quiere una sesión única antes de un examen, quizás podamos llegar a un acuerdo.",
  },
  de: {
    title: "Private Mathematik-Nachhilfe auf Englisch",
    intro: "Hallo, ich bin Joshua. Meine eigenen Kinder sind in der 7. und 8. Klasse an der Sunland International School und wir wohnen ganz in der Nähe (10 Minuten zu Fuß von der Schule).",
    backgroundTitle: "Hintergrund",
    background1: "Ich habe einen Doktortitel in Mathematik und habe Mathematikdidaktik auf Masterniveau studiert. Ich habe jahrelang in Großbritannien Mathematik-Nachhilfe für Schüler und Studenten aller Stufen sowie einige Erwachsene gegeben. Ich habe leistungsstarken Schülern bei ihren Cambridge-Aufnahmeprüfungen geholfen und auch Schülern mit Dyskalkulie bei der Entwicklung von Lernstrategien unterstützt.",
    background2: "Da meine Arbeitszeiten sich kürzlich reduziert haben, habe ich beschlossen, hier in Spanien wieder Nachhilfe zu geben. Es ist einfach etwas, das mir wirklich Freude macht: Als ich Dozent für Mathematik an der Sheffield Hallam University war, betreute ich dreimal pro Woche den \"Mathe-Helpdesk\", um Ingenieurstudenten bei ihren Laplace-Transformationen und Krankenpflegestudenten bei ihrer Grundlagenstatistik zu helfen.",
    howTitle: "So funktioniert es",
    how1: "Ich wohne nur wenige Gehminuten von Sunland entfernt und meine eigenen Kinder gehen jeden Tag selbst dorthin. Es wäre praktisch, eine Nachhilfestunde nach der Schule bei mir zu Hause zu vereinbaren, wobei Sie Ihr Kind danach abholen. Ich würde mich freuen, wenn ein Elternteil bei der ersten Sitzung auf einen Kaffee vorbeikommt: Ich würde meine Kinder auch nicht allein zu einem Fremden nach Hause schicken.",
    how2: "Alternativ, wenn Sie innerhalb von 15 Autominuten von Estación de Cártama wohnen und einen ruhigen Lernort haben, könnte ich zu Ihnen nach Hause kommen und dort unterrichten. Nehmen Sie Kontakt auf und wir können versuchen, einen für uns beide passenden Termin zu finden.",
    pricing: "Ich berechne 30€ für eine einstündige Sitzung, aber ich werde keinen Aufpreis verlangen, wenn wir überziehen oder Sie etwas später zum Abholen kommen. Wenn Sie tatsächlich eine längere Sitzung wünschen (1,5 Stunden = 40€, 2 Stunden = 50€), lässt sich das einrichten.",
    regular: "Ich suche Kunden, die eine regelmäßige wöchentliche Sitzung zu einer festen Zeit wünschen, aber wenn Sie eine einmalige Sitzung vor einer Prüfung möchten, können wir vielleicht etwas vereinbaren.",
  }
};

const Tutor = () => {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  return (
    <Layout>
      <ContentBlock title={t.title} icon={GraduationCap}>

          {/* Language toggle */}
          <div className="flex justify-center sm:justify-start mb-4">
            <div className="inline-flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'es'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLang('de')}
                className={`px-3 py-1 text-sm transition-colors ${
                  lang === 'de'
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Deutsch
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p>{t.intro}</p>

            <h2 className="font-bold">{t.backgroundTitle}</h2>

            <p>{t.background1}</p>

            <p>{t.background2}</p>

            <h2 className="font-bold">{t.howTitle}</h2>

            <p>{t.how1}</p>

            <p>{t.how2}</p>

            <p>{t.pricing}</p>

            <p>{t.regular}</p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
              <a
                href="mailto:joshua@prettyman.me"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Mail size={20} />
                <span>joshua@prettyman.me</span>
              </a>
              <a
                href="https://wa.me/34711042151"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <FaWhatsapp size={20} />
                <span>+34 711 042 151</span>
              </a>
            </div>
            
          </div>
      </ContentBlock>
    </Layout>
  )
}

export default Tutor