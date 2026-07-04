<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let track: HTMLElement | undefined = $state();
  let section: HTMLElement | undefined = $state();

  const stages = [
    { num: '01', title: 'Registration & Enrollment', desc: 'Register through your participating school and gain access to the MASTER CHESS PLAYER™, TASKIFY™ and T.E.A.M.U.P.™ platforms.' },
    { num: '02', title: 'Innovative Learning', desc: 'Engage with AI-powered chess training, mentorship modules, and personal development activities through our integrated digital tools.' },
    { num: '03', title: 'Preliminary Rounds', desc: 'Compete in exciting live preliminary events and qualifying stages across Abuja schools.' },
    { num: '04', title: 'Elite Qualification', desc: 'Advance through higher levels of competition while developing collaboration, coordination, and strategic communication.' },
    { num: '05', title: 'Grand Finale', desc: 'Finalists participate in an immersive championship experience unlike conventional chess competitions. October 2026.' },
  ];

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !track || !section) return;

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => '+=' + (track!.scrollWidth - window.innerWidth + window.innerWidth * 2),
      scrub: 1,
      invalidateOnRefresh: true,
    });

    gsap.to(track, {
      x: () => -(track!.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + (track!.scrollWidth - window.innerWidth),
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });
</script>

<section bind:this={section} id="journey" class="h-[300vh] relative bg-navy">
  <div class="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
    <h2 class="font-hero text-4xl text-white ml-[10vw] tracking-tight">The Championship Journey</h2>
    <div bind:this={track} class="flex gap-8 px-[10vw] mt-12 w-max">
      {#each stages as stage}
        <div class="w-[80vw] md:w-[400px] h-[500px] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between flex-shrink-0">
          <span class="text-7xl font-bold text-amber-400 font-hero leading-none">{stage.num}</span>
          <div>
            <h3 class="text-2xl font-bold text-white mb-4 font-hero tracking-tight">{stage.title}</h3>
            <p class="font-['Inter'] text-gray-400 leading-relaxed">{stage.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
