import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Download, ChevronRight, Moon, Sun, User, Github, Mail, Linkedin, ArrowLeft } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [typedName, setTypedName] = useState('');
  const fullName = 'severin mills';

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
    document.title = 'Severin Mills - Teaching Portfolio';
    
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setTypedName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Type one character every 100ms

    return () => clearInterval(typingInterval);
  }, []);

  // Minimalistic color scheme
  const getThemeClasses = (darkClasses, lightClasses) => 
    isDarkMode ? darkClasses : lightClasses;

  const themeClasses = {
    bg: getThemeClasses('bg-black text-white', 'bg-gray-50 text-black'),
    nav: getThemeClasses('border-gray-800 bg-black/80', 'border-gray-200 bg-white/80'),
    text: {
      primary: getThemeClasses('text-white', 'text-black'),
      secondary: getThemeClasses('text-gray-300', 'text-gray-700'),
      muted: getThemeClasses('text-gray-500', 'text-gray-500'),
      accent: getThemeClasses('text-white', 'text-black'),
    },
    accent: {
      bg: getThemeClasses('bg-white/10', 'bg-black/10'),
      border: getThemeClasses('border-white/20', 'border-black/20'),
    },
    button: {
      nav: getThemeClasses('text-gray-400 hover:text-white hover:bg-white/10', 'text-gray-600 hover:text-black hover:bg-black/10'),
      theme: getThemeClasses('bg-white/10 text-white hover:bg-white/20', 'bg-black/10 text-black hover:bg-black/20'),
    }
  };

  // Data
  const courses = [
    {
      id: 'cs101',
      code: '252-0341-01L',
      name: 'Information Retrieval',
      semester: 'FS25',
      room: 'HG F26',
      schedule: 'Fri 10:00 - 12:00',
      description: 'Introduction to data retrieval and data storage',
      materials: [
        {
          week: 1,
          date: '2025-02-28',
          title: 'Introduction',
          description: 'No exercise session.',
          slideUrl: './infret_files/Ex_session_week2.pdf',
          topics: []
        },
        {
          week: 2,
          date: '2025-03-07',
          title: 'Boolean Retrieval',
          description: 'Conditionals and loops',
          slideUrl: '#',
          topics: ['If Statements', 'For Loops', 'While Loops']
        },
        {
          week: 3,
          date: '2025-02-03',
          title: 'Functions and Methods',
          description: 'Modular programming concepts',
          slideUrl: '#',
          topics: ['Function Declaration', 'Parameters', 'Return Values']
        }
      ]
    }
  ];

  // Components
  const NavButton = ({ section, icon: Icon, label }) => {
    const isActive = activeSection === section;
    return (
      <button 
        onClick={() => setActiveSection(section)} 
        className={`
          relative px-6 py-3 font-mono text-sm transition-all duration-300
          ${isActive 
            ? `${themeClasses.text.primary} bg-white/10 dark:bg-white/10` 
            : themeClasses.button.nav
          }
        `}
      >
        <div className="flex items-center gap-2">
          <Icon size={18} />
          <span>{label}</span>
        </div>
      </button>
    );
  };

  const CourseCard = ({ course }) => (
    <div 
      onClick={() => setSelectedCourse(course)}
      className={`relative p-8 border ${themeClasses.accent.border} cursor-pointer group hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-300`}
    >
      <div className="relative z-10">
        <p className={`font-mono text-xs ${themeClasses.text.muted} mb-2`}>
          {`// ${course.semester}`}
        </p>
        <h3 className={`text-2xl font-bold mb-2 ${themeClasses.text.primary} font-mono`}>
          {course.code}
        </h3>
        <p className={`text-base mb-4 ${themeClasses.text.secondary}`}>{course.name}</p>
        <p className={`${themeClasses.text.muted} mb-6 text-sm`}>{course.description}</p>
        
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-center gap-2">
            <span className="opacity-50">schedule:</span>
            <span>{course.schedule}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">room:</span>
            <span>{course.room}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-50">materials:</span>
            <span>{course.materials.length} weeks</span>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-4 right-4 ${themeClasses.text.muted} group-hover:translate-x-1 transition-transform duration-300`}>
        <ChevronRight size={20} />
      </div>
    </div>
  );

  const SlideCard = ({ material }) => (
    <div className={`relative p-6 border-l-4 ${themeClasses.accent.border} hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`text-base font-bold ${themeClasses.text.primary} font-mono`}>
            Week[{material.week}]
          </h3>
          <p className={`text-xs ${themeClasses.text.muted} font-mono`}>
            {`// ${material.date}`}
          </p>
        </div>
      </div>
      
      <h4 className={`text-lg mb-2 ${themeClasses.text.primary}`}>{material.title}</h4>
      <p className={`${themeClasses.text.secondary} mb-4 text-sm`}>{material.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {material.topics.map((topic, idx) => (
          <span key={idx} className={`px-3 py-1 text-xs font-mono ${themeClasses.accent.bg} ${themeClasses.text.primary}`}>
            {topic}
          </span>
        ))}
      </div>
      
      <button className={`flex items-center gap-2 text-sm font-mono ${themeClasses.text.primary} hover:opacity-70 transition-opacity duration-300`}>
        <Download size={16} />
        <span>download()</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} flex items-center justify-center`}>
        <div className="w-16 h-16 border-4 border-white/20 dark:border-white/20 border-t-white dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`} style={{ fontFamily: 'JetBrains Mono, Fira Code, Source Code Pro, Consolas, monospace' }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Navigation */}
      <nav className={`border-b ${themeClasses.nav} backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setActiveSection('about');
                setSelectedCourse(null);
              }}
              className={`text-xl font-bold ${themeClasses.text.primary} hover:opacity-70 transition-opacity duration-300 font-mono`}
            >
              {typedName}<span className={`animate-blink ${getThemeClasses('text-gray-500', 'text-gray-400')}`}>_</span>
            </button>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <NavButton section="about" icon={Home} label="About" />
                <NavButton section="teaching" icon={BookOpen} label="Teaching" />
              </div>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 transition-all duration-300 ${themeClasses.button.theme}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div className={`transition-all duration-500 ${activeSection === 'about' ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center px-6 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto w-full relative">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                <div className="flex-1 max-w-2xl">
                  <p className={`text-sm font-mono ${themeClasses.text.muted} mb-4`}>
                    {`// Teaching Assistant`}
                  </p>
                  <h1 className={`text-6xl lg:text-7xl font-bold mb-6 ${themeClasses.text.primary} leading-tight`}>
                    Severin<br />
                    <span className="text-5xl lg:text-6xl">Mills</span>
                  </h1>
                  <div className={`text-lg font-light mb-8 ${themeClasses.text.secondary} font-mono`}>
                    <span className="text-sm opacity-50">const role = </span>
                    <span>"4th Semester BSc CS"</span>
                  </div>
                  <p className={`text-base ${themeClasses.text.secondary} leading-relaxed mb-8 max-w-lg`}>
                    Passionate educator dedicated to making complex algorithms accessible and helping students debug their understanding of computer science.
                  </p>
                  
                  {/* Contact Icons */}
                  <div className="flex gap-4">
                    {[
                      { icon: Mail, href: "mailto:smills@ethz.ch", label: "email" },
                      { icon: Github, href: "https://github.com/Azyrma", label: "github" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/severin-mills/", label: "linkedin" }
                    ].map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        target={link.href.startsWith('http') ? "_blank" : undefined}
                        rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                        className={`group flex items-center gap-2 px-4 py-2 border ${themeClasses.accent.border} hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300`}
                      >
                        <link.icon size={18} />
                        <span className="text-sm font-mono hidden sm:inline">.{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Profile Image on far right, aligned with title */}
                <div className="relative hidden lg:block" style={{ marginTop: '3.5rem' }}>
                  <div className={`absolute -inset-4 border ${themeClasses.accent.border} opacity-20`} />
                  <div className={`relative w-56 h-56 ${getThemeClasses('bg-gray-900', 'bg-gray-100')} overflow-hidden border ${themeClasses.accent.border}`}>
                    <div className={`w-full h-full ${getThemeClasses('bg-gray-800', 'bg-gray-200')} flex items-center justify-center`}>
                      <User size={80} className={getThemeClasses('text-gray-700', 'text-gray-400')} />
                    </div>
                  </div>
                  <div className={`absolute -bottom-4 left-0 text-xs font-mono ${themeClasses.text.muted} opacity-50`}>
                    &lt;/profile&gt;
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="px-6 py-20 relative">
            <div className="max-w-4xl mx-auto">
              <h2 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
                <span className="font-mono text-sm opacity-50">01.</span> About
              </h2>
              <div className={`w-20 h-0.5 ${themeClasses.accent.bg} mb-12`} />
              <div className={`${themeClasses.text.secondary} text-base leading-relaxed space-y-6`}>
                <p>
                  I'm a passionate Teaching Assistant in Computer Science, dedicated to making complex algorithms and data structures accessible to all students. 
                  My approach combines theoretical foundations with practical coding examples to ensure deep understanding.
                </p>
                <p>
                  Through interactive debugging sessions, code reviews, and comprehensive materials, I help students develop strong problem-solving skills 
                  and confidence in their programming abilities. I believe in learning by doing and encourage students to build real projects.
                </p>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="px-6 py-20 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
              <h2 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
                <span className="font-mono text-sm opacity-50">02.</span> Teaching Philosophy
              </h2>
              <div className={`w-20 h-0.5 ${themeClasses.accent.bg} mb-16`} />
              <div className="space-y-12">
                {[
                  'Debug understanding through hands-on coding and real-world projects',
                  'Build strong foundations with algorithms and data structures',
                  'Foster collaborative learning through code reviews and pair programming'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6">
                    <div className={`font-mono text-sm ${themeClasses.text.muted} mt-1`}>
                      [{String(idx).padStart(2, '0')}]
                    </div>
                    <p className={`text-base ${themeClasses.text.secondary} flex-1`}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Office Hours & Contact */}
          <section className={`px-6 py-20 border-t ${themeClasses.accent.border}`}>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">
              <div>
                <h2 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
                  <span className="font-mono text-sm opacity-50">03.</span> Exercise Class
                </h2>
                <div className={`w-20 h-0.5 ${themeClasses.accent.bg} mb-12`} />
                <div className="space-y-6 font-mono">
                  {[
                    { days: 'MON && WED', time: '14:00 - 16:00' },
                    { days: 'FRI', time: '13:00 - 15:00' }
                  ].map((schedule, idx) => (
                    <div key={idx} className={`p-4 border-l-2 ${themeClasses.accent.border}`}>
                      <p className={`text-sm ${themeClasses.text.muted} mb-1`}>
                        {`if (day === "${schedule.days}") {`}
                      </p>
                      <p className={`text-lg ${themeClasses.text.primary} ml-4`}>
                        {`available = "${schedule.time}";`}
                      </p>
                      <p className={`text-sm ${themeClasses.text.muted}`}>
                        {`}`}
                      </p>
                    </div>
                  ))}
                  <p className={`text-sm ${themeClasses.text.muted} mt-8 italic`}>
                    {`// Available by appointment for debugging sessions`}
                  </p>
                </div>
              </div>

              <div>
                <h2 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
                  <span className="font-mono text-sm opacity-50">04.</span> Contact
                </h2>
                <div className={`w-20 h-0.5 ${themeClasses.accent.bg} mb-12`} />
                <p className={`${themeClasses.text.secondary} text-base mb-8`}>
                  Have questions about assignments, algorithms, or need help debugging? Reach out anytime.
                </p>
                <div className="space-y-4 font-mono">
                  {[
                    { icon: Mail, text: 'ta.email@university.edu', href: 'mailto:ta.email@university.edu', method: 'email' },
                    { icon: Github, text: 'github.com/yourusername', href: 'https://github.com/yourusername', method: 'github' },
                    { icon: Linkedin, text: 'linkedin.com/in/yourusername', href: 'https://linkedin.com/in/yourusername', method: 'linkedin' }
                  ].map((contact, idx) => (
                    <a
                      key={idx}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? "_blank" : undefined}
                      rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-4 group ${themeClasses.text.secondary} hover:${themeClasses.text.primary} transition-colors duration-300`}
                    >
                      <span className="text-sm opacity-50">const</span>
                      <span>{contact.method}</span>
                      <span className="opacity-50">=</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 text-sm">
                        {`"${contact.text}"`}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={`transition-all duration-500 ${activeSection === 'teaching' ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="px-6 py-12 max-w-6xl mx-auto">
            {selectedCourse ? (
              <>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className={`flex items-center gap-2 mb-8 font-mono text-sm ${themeClasses.text.muted} hover:${themeClasses.text.primary} transition-colors duration-300`}
                >
                  <ArrowLeft size={18} />
                  <span>cd ..</span>
                </button>
                
                <div className="mb-12">
                  <p className={`font-mono text-xs ${themeClasses.text.muted} mb-2`}>
                    {'// {selectedCourse.semester}'}
                  </p>
                  <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary} font-mono`}>
                    {selectedCourse.code}
                  </h1>
                  <p className={`text-lg ${themeClasses.text.secondary}`}>
                    {selectedCourse.name}
                  </p>

                </div>
                
                <div className="space-y-6">
                  {selectedCourse.materials.map((material, index) => (
                    <div
                      key={index}
                      className="animate-slideUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <SlideCard material={material} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className={`text-4xl font-bold mb-2 ${themeClasses.text.primary}`}>
                  <span className="font-mono text-sm opacity-50">{'~/'}</span>Teaching
                </h1>
                <div className={`w-20 h-0.5 ${themeClasses.accent.bg} mb-12`} />
                <p className={`${themeClasses.text.secondary} mb-12 font-mono text-sm`}>
                  Select a course to access materials →
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="animate-slideUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideUp {
          opacity: 0;
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;