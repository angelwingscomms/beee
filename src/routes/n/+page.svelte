
<svelte:head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hero Section • Programme Name</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        .hero-bg {
            background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.75)),
                        url('https://picsum.photos/id/1015/2000/1200') center/cover no-repeat;
        }

        .hero-content {
            animation: fadeInUp 1s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .cta-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
    </style>
</svelte:head>
<body>
    <!-- HERO SECTION -->
    <section class="hero-bg min-h-screen flex items-center relative text-white">
        <!-- Navigation -->
        <nav class="absolute top-0 left-0 right-0 z-50 py-6">
            <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-2xl font-bold text-indigo-600">P</div>
                    <div>
                        <span class="text-2xl font-bold tracking-tight">Programme</span>
                    </div>
                </div>

                <div class="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#" class="hover:text-indigo-300 transition">About</a>
                    <a href="#" class="hover:text-indigo-300 transition">Curriculum</a>
                    <a href="#" class="hover:text-indigo-300 transition">Cohorts</a>
                    <a href="#" class="hover:text-indigo-300 transition">Impact</a>
                    <a href="#" class="hover:text-indigo-300 transition">Apply</a>
                </div>

                <button onclick="document.getElementById('apply').scrollIntoView({behavior: 'smooth'})"
                        class="px-6 py-3 bg-white text-indigo-700 rounded-2xl font-semibold text-sm hover:bg-indigo-50 transition">
                    Apply Now
                </button>
            </div>
        </nav>

        <div class="max-w-5xl mx-auto px-6 pt-32 pb-24">
            <div class="max-w-3xl hero-content">
                <!-- Badge -->
                <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-5 py-2 text-sm mb-8">
                    <span class="relative flex h-3 w-3">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    Applications open for Cohort 2026
                </div>

                <!-- Headline -->
                <h1 class="text-6xl md:text-7xl font-bold leading-none tracking-tighter mb-6">
                    Transform your future with<br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">The Programme</span>
                </h1>

                <!-- Subheadline -->
                <p class="text-xl md:text-2xl text-gray-200 max-w-2xl mb-10">
                    A world-class leadership and innovation programme designed to equip the next generation of changemakers with the skills, network, and mindset to solve humanity's biggest challenges.
                </p>

                <!-- CTA Buttons -->
                <div class="flex flex-wrap gap-4">
                    <button onclick="document.getElementById('apply').scrollIntoView({behavior: 'smooth'})"
                            class="cta-button px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-3xl flex items-center gap-3">
                        Join the next cohort
                        <i class="fas fa-arrow-right"></i>
                    </button>

                    <button onclick="watchVideo()"
                            class="cta-button px-8 py-5 border-2 border-white/70 hover:border-white text-white text-lg font-medium rounded-3xl flex items-center gap-3 backdrop-blur-sm">
                        <i class="fas fa-play"></i>
                        Watch 2:14 min video
                    </button>
                </div>

                <!-- Trust signals -->
                <div class="mt-16 flex flex-wrap items-center gap-x-10 gap-y-6 text-sm">
                    <div class="flex items-center gap-3">
                        <div class="flex -space-x-4">
                            <img src="https://picsum.photos/id/64/32/32" class="w-8 h-8 rounded-2xl ring-2 ring-white object-cover" alt="">
                            <img src="https://picsum.photos/id/201/32/32" class="w-8 h-8 rounded-2xl ring-2 ring-white object-cover" alt="">
                            <img src="https://picsum.photos/id/669/32/32" class="w-8 h-8 rounded-2xl ring-2 ring-white object-cover" alt="">
                        </div>
                        <div>
                            <div class="font-medium">Join 800+ alumni</div>
                            <div class="text-xs text-gray-400">from 60+ countries</div>
                        </div>
                    </div>

                    <div class="h-10 w-px bg-white/30"></div>

                    <div class="flex items-center gap-8">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" class="h-6 opacity-75" alt="Amazon">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BBC.svg/1280px-BBC.svg.png" class="h-7 opacity-75" alt="BBC">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" class="h-8 opacity-75" alt="Apple">
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-widest">
            <div class="text-white/60">SCROLL TO EXPLORE</div>
            <div class="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
        </div>

        <!-- Stats bar -->
        <div class="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 py-6">
            <div class="max-w-7xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-8 text-center">
                <div>
                    <div class="text-3xl font-bold text-indigo-400">12</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Months</div>
                </div>
                <div>
                    <div class="text-3xl font-bold">4</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Continents</div>
                </div>
                <div>
                    <div class="text-3xl font-bold text-emerald-400">98%</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Placement Rate</div>
                </div>
                <div>
                    <div class="text-3xl font-bold">250+</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Mentors</div>
                </div>
                <div>
                    <div class="text-3xl font-bold">$2.4M</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Scholarships</div>
                </div>
                <div>
                    <div class="text-3xl font-bold">∞</div>
                    <div class="text-xs uppercase tracking-widest text-white/60">Impact</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Placeholder for Apply section -->
    <section id="apply" class="py-32 bg-zinc-950 text-white">
        <div class="max-w-3xl mx-auto text-center px-6">
            <h2 class="text-5xl font-bold mb-6">Ready to make history?</h2>
            <p class="text-xl text-zinc-400 mb-10">Applications for the 2026 cohort close in 47 days.</p>
            <button class="px-12 py-6 bg-white text-black rounded-3xl text-xl font-semibold hover:scale-105 transition">
                Start your application →
            </button>
        </div>
    </section>

    <script>
        function watchVideo() {
            alert("🎥 Video would play here in a real website.\n\n(Imagine a beautiful 2-minute promo video showcasing the programme experience)");
        }

        // Tailwind script already included via CDN
        console.log("%cHero section ready for The Programme ✨", "color: #6366f1; font-size: 14px;");
    </script>
