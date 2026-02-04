import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Database, 
  Palette, 
  Layers,
  Cpu,
  Terminal
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programlama Dilleri',
    icon: Terminal,
    skills: [
      { name: 'Kotlin', level: 90 },
      { name: 'Java', level: 75 },
      { name: 'Python', level: 60 },
      { name: 'JavaScript', level: 50 },
    ],
  },
  {
    title: 'Android Framework',
    icon: Smartphone,
    skills: [
      { name: 'Jetpack Compose', level: 85 },
      { name: 'XML Layouts', level: 80 },
      { name: 'MVVM Architecture', level: 85 },
      { name: 'Coroutines & Flow', level: 80 },
    ],
  },
  {
    title: 'Veritabanı & API',
    icon: Database,
    skills: [
      { name: 'Room', level: 85 },
      { name: 'Retrofit', level: 90 },
      { name: 'Firebase', level: 80 },
      { name: 'SQLite', level: 75 },
    ],
  },
  {
    title: 'UI/UX Tasarım',
    icon: Palette,
    skills: [
      { name: 'Material Design 3', level: 90 },
      { name: 'Figma', level: 70 },
      { name: 'Custom Views', level: 75 },
      { name: 'Animations', level: 80 },
    ],
  },
  {
    title: 'Araçlar & Teknolojiler',
    icon: Layers,
    skills: [
      { name: 'Android Studio', level: 95 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'Gradle', level: 75 },
      { name: 'CI/CD', level: 60 },
    ],
  },
  {
    title: 'Diğer Beceriler',
    icon: Cpu,
    skills: [
      { name: 'Play Store Console', level: 90 },
      { name: 'App Monetization', level: 70 },
      { name: 'ASO', level: 65 },
      { name: 'Analytics', level: 75 },
    ],
  },
];

const technologies = [
  'Android Studio', 'Kotlin', 'Java', 'Jetpack Compose', 'XML', 'MVVM',
  'Room', 'Retrofit', 'Firebase', 'Coroutines', 'Flow', 'Dagger Hilt',
  'Navigation Component', 'WorkManager', 'DataStore', 'Glide', 'Coil',
  'JUnit', 'Espresso', 'Git', 'GitHub', 'Gradle', 'Figma'
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm mb-4">
            Yeteneklerim
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Teknik Becerilerim
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Modern Android geliştirme ekosisteminde güncel kalmak için sürekli 
            öğreniyor ve kendimi geliştiriyorum.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white/70">{skill.name}</span>
                      <span className="text-sm text-white/50">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: 0.3 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-white text-center mb-6">
            Kullandığım Teknolojiler
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-purple-600/20 hover:border-purple-500/30 hover:text-white transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* GitHub contribution style decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Öğrenme Aktivitem</h3>
            <span className="text-sm text-white/50">Son 6 Ay</span>
          </div>
          <div className="grid grid-cols-26 gap-1">
            {Array.from({ length: 156 }).map((_, i) => {
              const intensity = Math.random();
              let bgClass = 'bg-white/5';
              if (intensity > 0.8) bgClass = 'bg-purple-500';
              else if (intensity > 0.6) bgClass = 'bg-purple-500/70';
              else if (intensity > 0.4) bgClass = 'bg-purple-500/50';
              else if (intensity > 0.2) bgClass = 'bg-purple-500/30';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.002 }}
                  className={`w-3 h-3 rounded-sm ${bgClass}`}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3 text-xs text-white/50">
            <span>Az</span>
            <div className="w-3 h-3 rounded-sm bg-white/5" />
            <div className="w-3 h-3 rounded-sm bg-purple-500/30" />
            <div className="w-3 h-3 rounded-sm bg-purple-500/50" />
            <div className="w-3 h-3 rounded-sm bg-purple-500/70" />
            <div className="w-3 h-3 rounded-sm bg-purple-500" />
            <span>Çok</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
