<script lang="ts">
  import { Medal, BadgeCheck, FileText, Award, Sparkles, Users, Lightbulb, Star, School } from '@lucide/svelte';
  import { motionStaggered } from '$lib/actions/motion';

  const awards = [
    { icon: Medal, title: 'Medals and Awards', body: 'Top performers are honoured with medals across competitive categories.' },
    { icon: BadgeCheck, title: 'Badges of Competence', body: 'Earned badges mark verified skills, milestones, and proficiencies.' },
    { icon: FileText, title: 'Certificates of Participation', body: 'Every participant receives recognition for joining the championship.' },
    { icon: Award, title: 'Certificates of Achievement', body: 'Awarded for measurable growth and accomplishment through the journey.' },
    { icon: Sparkles, title: 'T.E.A.M.U.P.™ Excellence Awards', body: 'Celebrating whole-child excellence across Technology, Enterprise, Art, Mentorship and Upskill.' },
    { icon: Users, title: 'Leadership Recognition Awards', body: 'For participants who step up, guide others, and lead by example.' },
    { icon: Lightbulb, title: 'Innovation and Creativity Awards', body: 'Honouring original thinking, design, and problem-solving.' },
    { icon: Star, title: 'Special Merit Awards', body: 'Distinctive recognition for outstanding individual contribution.' },
    { icon: School, title: 'School Recognition Awards', body: 'Schools are celebrated for participation, spirit, and collective achievement.' },
  ];
</script>

<section id="awards" class="py-24 md:py-36 bg-navy">
  <div class="max-w-7xl mx-auto px-6">
    <div class="max-w-3xl mb-14">
      <p class="font-['Inter'] text-amber-400 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4">Awards and Recognition</p>
      <h2 class="font-hero text-4xl md:text-6xl text-white font-bold tracking-tight mb-4">Honours Every Participant Can Earn</h2>
      <p class="font-['Inter'] text-gray-400 text-lg md:text-xl leading-relaxed">
        Participants compete for a wide range of honours that celebrate chess skill, personal growth, leadership, and school spirit.
      </p>
    </div>

    <div use:motionStaggered={{ stagger: 0.06, y: 20 }} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each awards as a}
        <div class="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-amber-400/40 hover:bg-white/[0.06]">
          <div class="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 transition-colors group-hover:bg-amber-400 group-hover:text-[#0A0F1A]">
            <svelte:component this={a.icon} size={24} />
          </div>
          <h3 class="font-hero text-xl font-bold text-white mb-2">{a.title}</h3>
          <p class="font-['Inter'] text-gray-400 text-[15px] leading-relaxed">{a.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
