import Layout from '../components/Layout'
import ContentBlock from '../components/ContentBlock';
import { GraduationCap, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Tutor = () => {
  return (
    <Layout>
      <ContentBlock title="Private Maths Tuition in English" icon={GraduationCap}>

          {/* Intro text */}
          <div className="space-y-4">
            <p>Hi, I'm Joshua. My own children are in Years 7 and 8 at Sunland International School and we live just up the road (10 minute walk from school).</p>

            <h2 className="font-bold">Background</h2>

            <p>I have a Ph.D. in Mathematics and have studied Mathematics Education at Masters level. I gave private maths tuition for years in the UK to all levels of school and university students, and a couple of adult learners. I have helped high-achievers with their Cambridge entrance exams, and I've also helped students with dyscalculia to develop learning strategies.</p>

            <p>Since my working hours have reduced recently I have decided to get back into tutoring here in Spain. It's just something I really enjoy: when I was a Lecturer in Mathematics at Sheffield Hallam University I manned the "Maths Help Desk" three days a week just to help out Engineering Students with their Laplace Transforms, and Nursing students with their basic Statistics.</p>

            <h2 className="font-bold">How it works</h2>
            
            <p>I live only a short walk from Sunland and my own children do the walk themselves every day. It would be convenient to arrange an after-school tutoring session at my house, with you picking up your child afterwards. I'd be happy for a parent to come round for a chat on the first session: I wouldn't want to send my children to a stranger's house on their own either.</p>

            <p>Alteratively, if you live within a 15 minute drive of Estación de Cártama, and you have a quiet space to learn, I could come to your home and tutor there. Get in touch and we can try to arrange a time suitable for both of us.</p>

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