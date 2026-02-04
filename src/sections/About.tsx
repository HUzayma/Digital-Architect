import { motion } from 'framer-motion';
import { Smartphone, Code, Lightbulb, Rocket, Heart, Target } from 'lucide-react';

const features = [
  {
    icon: Smartphone,
    title: 'Android Uzmanlığı',
    description: 'Kotlin ve Java ile native Android uygulamaları geliştiriyorum.',
  },
  {
    icon: Code,
    title: 'Modern Teknolojiler',
    description: 'Jetpack Compose, MVVM, Room, Retrofit gibi güncel teknolojileri kullanıyorum.',
  },
  {
    icon: Lightbulb,
    title: 'Yaratıcı Çözümler',
    description: 'Her projede yenilikçi ve kullanıcı odaklı çözümler üretiyorum.',
  },
  {
    icon: Rocket,
    title: 'Hızlı Geliştirme',
    description: 'Agile metodoloji ile hızlı ve verimli geliştirme yapıyorum.',
  },
  {
    icon: Heart,
    title: 'Kullanıcı Deneyimi',
    description: 'Kullanıcı deneyimini her zaman ön planda tutuyorum.',
  },
  {
    icon: Target,
    title: 'Kalite Odaklı',
    description: 'Her projede en yüksek kalite standartlarını hedefliyorum.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-600/10 border border-purple-500/20 text-purple-400 text-sm mb-4">
            Hakkımda
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kimim Ben?
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Tutkulu bir Android geliştiricisi olarak, kullanıcıların hayatını kolaylaştıran 
            uygulamalar yapmayı seviyorum. Her projede en iyi deneyimi sunmak için çalışıyorum.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Code block style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="code-block p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-white/40 text-sm">huzayma.kt</span>
              </div>
              <pre className="text-sm md:text-base overflow-x-auto">
                <code className="text-white/80">
                  <span className="text-purple-400">class</span>{' '}
                  <span className="text-yellow-400">AndroidDeveloper</span>{' '}
                  <span className="text-purple-400">:</span>{' '}
                  <span className="text-cyan-400">PassionateCreator</span>{' '}({'\n'}
                  {'    '}<span className="text-blue-400">val</span>{' '}
                  <span className="text-white">name</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-green-400">"Huzayma"</span>{'\n'}
                  {'    '}<span className="text-blue-400">val</span>{' '}
                  <span className="text-white">role</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-green-400">"Android Developer"</span>{'\n'}
                  {'    '}<span className="text-blue-400">val</span>{' '}
                  <span className="text-white">experience</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-orange-400">2</span>{' '}
                  <span className="text-white">+</span>{' '}
                  <span className="text-white">years</span>{'\n'}
                  {'    '}<span className="text-blue-400">val</span>{' '}
                  <span className="text-white">location</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-green-400">"Türkiye"</span>{'\n'}
                  {'\n'}
                  {'    '}<span className="text-blue-400">fun</span>{' '}
                  <span className="text-yellow-400">createAmazingApps</span>{' '}({'\n'}
                  {'        '}<span className="text-white">idea</span>:{' '}
                  <span className="text-cyan-400">Idea</span>{'\n'}
                  {'    '}){' '}:{' '}
                  <span className="text-cyan-400">AndroidApp</span>{' '}
                  <span className="text-purple-400">=</span>{' '}
                  <span className="text-white">{'{'}</span>{'\n'}
                  {'        '}<span className="text-blue-400">return</span>{' '}
                  <span className="text-white">idea</span>{'\n'}
                  {'            '}.<span className="text-yellow-400">design</span>{' '}(){'\n'}
                  {'            '}.<span className="text-yellow-400">code</span>{' '}(){'\n'}
                  {'            '}.<span className="text-yellow-400">test</span>{' '}(){'\n'}
                  {'            '}.<span className="text-yellow-400">publish</span>{' '}(){'\n'}
                  {'    '}<span className="text-white">{'}'}</span>{'\n'}
                  <span className="text-white">{'}'}</span>{'\n'}
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Right side - About text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Android Geliştirme Tutkusu
            </h3>
            <p className="text-white/60 leading-relaxed">
              Android ekosistemine olan ilgim, ilk uygulamamı yayınladığım gün başladı. 
              O günden bu yana, kullanıcıların günlük hayatlarında kullanabilecekleri 
              faydalı ve eğlenceli uygulamalar geliştirmeye odaklandım.
            </p>
            <p className="text-white/60 leading-relaxed">
              Şu anda Play Store'da 3 aktif uygulamam bulunuyor ve her biri binlerce 
              kullanıcı tarafından indirilip kullanılıyor. Kullanıcı geri bildirimlerini 
              dikkatle dinleyerek uygulamalarımı sürekli geliştiriyorum.
            </p>
            <p className="text-white/60 leading-relaxed">
              Gelecekte daha büyük projelere imza atmak ve Android geliştirme 
              topluluğuna katkıda bulunmak istiyorum.
            </p>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass rounded-xl p-4">
                <div className="text-purple-400 font-semibold mb-1">Konum</div>
                <div className="text-white/70">Türkiye</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-blue-400 font-semibold mb-1">Durum</div>
                <div className="text-white/70 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Aktif Geliştirici
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-white/60 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
