import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import PublicLayout from '../../layouts/PublicLayout';
import { Button } from '../../components/ui';
import logo from '../../assets/logo.svg';
import { Database, Zap, Server, Cloud, Shield, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  // Handle anchor navigation from routes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothY = useSpring(y, { damping: 30, stiffness: 200 });
  const smoothScale = useSpring(scale, { damping: 30, stiffness: 200 });

  const features = [
    {
      title: 'Múltiples Motores de Base de Datos',
      description: 'Soporte para MySQL, PostgreSQL, MongoDB y Redis con contenedores Docker reales',
      icon: Database,
      gradient: 'from-brand-500 to-brand-600',
    },
    {
      title: 'Orquestación Docker',
      description: 'Creación, suspensión y eliminación automática de contenedores en servidores VPS',
      icon: Zap,
      gradient: 'from-brand-500 to-brand-600',
    },
    {
      title: 'Gestión Simplificada',
      description: 'Interfaz intuitiva para crear y administrar instancias sin conocimientos técnicos avanzados',
      icon: Shield,
      gradient: 'from-accent-emerald-500 to-accent-emerald-600',
    },
    {
      title: 'Integración Mercado Pago',
      description: 'Sistema de pagos automatizado para planes Standard y Premium',
      icon: TrendingUp,
      gradient: 'from-accent-amber-500 to-accent-amber-600',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Desarrolladores Activos', icon: Users },
    { value: '50K+', label: 'Instancias Creadas', icon: Database },
    { value: '99.9%', label: 'Uptime Garantizado', icon: Clock },
  ];

  return (
    <PublicLayout>
      {/* Hero Section - Apple Style */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50"
      >
        {/* Simple Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-brand-50/30" />

        <div className="relative z-10 text-center space-y-12 max-w-6xl mx-auto px-6">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 md:space-y-10"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-white/20 shadow-glass"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-700">
                Plataforma SaaS para Bases de Datos en Contenedores Docker
              </span>
            </motion.div>

            <h1 className="w-full flex justify-center items-center">
              <img
                src={logo}
                alt="CrudCloud"
                className="block mx-auto h-24 sm:h-36 md:h-56 lg:h-64 mt-4 sm:mt-6 md:mt-8 mb-6"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              Crea y gestiona instancias reales de bases de datos en la nube con{' '}
              <span className="font-semibold text-slate-900">contenedores Docker</span>.
              Sin configuración manual, con planes flexibles y{' '}
              <span className="font-semibold text-slate-900">integración con Mercado Pago</span>.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Link to="/register">
              <Button
                size="xl"
                className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300 px-12 py-6 text-lg"
              >
                Comenzar Gratis
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Database Engines Section */}
      <section id="db-engines" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Motores de Base de Datos</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Gestionamos los motores más populares y escalables para tus aplicaciones.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: 'MySQL', desc: 'Relacional, ligero y muy usado en producción', icon: Database },
              { name: 'SQL Server', desc: 'Soporte empresarial de Microsoft', icon: Server },
              { name: 'PostgreSQL', desc: 'Relacional avanzado y open source', icon: Database },
              { name: 'Redis', desc: 'Almacenamiento en memoria para caché y pub/sub', icon: Zap },
              { name: 'Cassandra', desc: 'NoSQL distribuido, alta disponibilidad', icon: Cloud },
              { name: 'MongoDB', desc: 'NoSQL orientado a documentos', icon: Database },
            ].map((engine, idx) => (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                tabIndex={0}
                className="group relative p-8 bg-white rounded-3xl shadow-elevation-2 border border-slate-100 hover:shadow-2xl hover:shadow-accent-emerald-500/50 transition-all duration-500 text-center focus:outline-none focus:ring-2 focus:ring-brand-200 group-hover:border-brand-600 focus:border-brand-600"
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-700 transition-transform duration-300 group-hover:scale-105 group-focus:scale-105">
                  <div className="w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-300 bg-transparent group-hover:bg-white/10 group-focus:bg-white/10">
                    <engine.icon className="w-7 h-7 text-white group-hover:text-white group-focus:text-white" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 mb-1">{engine.name}</h4>
                <p className="text-sm text-slate-600">{engine.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section - Scroll Driven */}
      <section
        id="features"
        ref={featuresRef}
        className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Potencia tu{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                Desarrollo
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Todo lo que necesitas para construir aplicaciones escalables,
              con el rendimiento y confiabilidad que tu negocio merece.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group"
              >
                <div className="relative p-8 bg-white rounded-3xl shadow-elevation-2 border border-slate-100 hover:shadow-2xl hover:shadow-accent-emerald-500/50 transition-all duration-500">
                  {/* Icon Background */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="pt-8 text-center space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-brand-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-500/5 to-brand-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section - Integrated Pricing */}
      <section
        id="pricing"
        ref={statsRef}
        className="py-24 bg-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Planes{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                Transparentes
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Elige el plan perfecto para tu proyecto. Sin sorpresas, sin costos ocultos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                period: '',
                description: 'Perfecto para desarrollo y pruebas',
                features: [
                  '2 Instancias de bases de datos',
                  'MySQL y PostgreSQL',
                  'Gestión básica de contenedores',
                  'Soporte comunitario'
                ],
                popular: false,
                color: 'from-brand-500 to-brand-600'
              },
              {
                name: 'Standard',
                price: '$19',
                period: '/mes',
                description: 'Ideal para startups y proyectos medianos',
                features: [
                  '5 Instancias de bases de datos',
                  'MySQL, PostgreSQL, MongoDB',
                  'Gestión avanzada de contenedores',
                  'Soporte prioritario',
                  'Integración con Mercado Pago',
                  'Monitoreo básico'
                ],
                popular: true,
                color: 'from-brand-600 to-brand-700'
              },
              {
                name: 'Premium',
                price: '$49',
                period: '/mes',
                description: 'Para aplicaciones empresariales',
                features: [
                  '10 Instancias de bases de datos',
                  'Todos los motores: MySQL, PostgreSQL, MongoDB, Redis',
                  'Gestión completa de contenedores',
                  'Soporte 24/7',
                  'Integración con Mercado Pago',
                  'Monitoreo avanzado',
                  'Escalado automático'
                ],
                popular: false,
                color: 'from-brand-500 to-brand-600'
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl shadow-elevation-2 border border-slate-100 hover:shadow-2xl hover:shadow-accent-emerald-500/50 transition-all duration-500 ${
                  plan.popular ? 'ring-2 ring-brand-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-brand-600 to-brand-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-slate-900">
                        {plan.price}
                      </span>
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                    <p className="text-slate-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center`}>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/register">
                    <Button
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800"
                    >
                      Comenzar Ahora
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Confían en{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                CrudCloud
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Miles de desarrolladores y empresas confían en nuestra plataforma para sus aplicaciones más críticas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'María González',
                role: 'Desarrolladora Full Stack',
                content: 'CrudCloud me permite crear bases de datos reales en minutos sin configurar servidores. Perfecto para proyectos freelance.',
                avatar: '👩‍💼'
              },
              {
                name: 'Carlos Rodríguez',
                role: 'CTO, StartupTech',
                content: 'La integración con Mercado Pago y la gestión automatizada de contenedores nos ahorró semanas de desarrollo.',
                avatar: '👨‍💻'
              },
              {
                name: 'Ana Martínez',
                role: 'DevOps Engineer',
                content: 'La simplicidad para crear instancias de MySQL, PostgreSQL y MongoDB con Docker es increíble. Muy estable.',
                avatar: '👩‍🎓'
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-elevation-2 border border-slate-100 hover:shadow-2xl hover:shadow-accent-emerald-500/50 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full flex items-center justify-center text-white text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                    <p className="text-slate-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Sobre{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                Nosotros
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Somos un equipo apasionado de desarrolladores y expertos en bases de datos
              comprometidos con simplificar la gestión de infraestructura para todos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-slate-900">Nuestra Misión</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Simplificar la creación y gestión de bases de datos en la nube mediante
                contenedores Docker, eliminando la complejidad de la infraestructura para
                que los desarrolladores puedan enfocarse en construir aplicaciones.
              </p>
              <div className="space-y-4">
                {[
                  'Infraestructura basada en contenedores Docker',
                  'Soporte para MySQL, PostgreSQL, MongoDB y Redis',
                  'Gestión automatizada de instancias',
                  'Integración con Mercado Pago para pagos'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={ctaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-3xl p-8"
            >
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-slate-900">Nuestros Valores</h4>
                {[
                  { title: 'Simplicidad', description: 'Hacemos lo complejo, simple' },
                  { title: 'Confianza', description: 'Tu data está segura con nosotros' },
                  { title: 'Innovación', description: 'Siempre buscando mejorar' },
                  { title: 'Comunidad', description: 'Creamos juntos' }
                ].map((value, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                    <h5 className="font-semibold text-slate-900 mb-1">{value.title}</h5>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        ref={ctaRef}
        className="py-24 bg-gradient-to-br from-slate-50 to-brand-50"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
              ¿Listo para{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
                comenzar
              </span>
              ?
            </h2>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Comienza a crear instancias de bases de datos reales con Docker
              en minutos. Plan Free disponible sin tarjeta de crédito.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/register">
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300"
                >
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-slate-500 text-sm"
            >
              Plan Free disponible • Sin tarjeta de crédito requerida • Cancelación en cualquier momento
            </motion.p>
          </motion.div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;