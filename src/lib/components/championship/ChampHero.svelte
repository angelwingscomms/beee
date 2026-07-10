<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SplitText from 'gsap/SplitText';
  import Button from '$lib/components/Button.svelte';

  gsap.registerPlugin(ScrollTrigger, SplitText);

  let section_el: HTMLElement | undefined = $state();
  let canvas_host: HTMLElement | undefined = $state();
  let title_el: HTMLElement | undefined = $state();
  let sub_el: HTMLElement | undefined = $state();
  let float1: HTMLElement | undefined = $state();
  let float2: HTMLElement | undefined = $state();

  let use_3d = $state(false);
  let mx = $state(0);
  let my = $state(0);

  const card1_style = $derived(
    `transform: translate3d(${mx * -14}px, ${my * -10}px, 0)`
  );
  const card2_style = $derived(
    `transform: translate3d(${mx * 12}px, ${my * 8}px, 0)`
  );

  function on_pointer(e: PointerEvent) {
    if (!section_el) return;
    const r = section_el.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    my = ((e.clientY - r.top) / r.height - 0.5) * 2;
  }

  function can_run_3d(): boolean {
    if (typeof window === 'undefined') return false;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (matchMedia('(max-width: 768px)').matches) return false;
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  }

  onMount(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reason: text must read immediately; motion is progressive enhancement.
    if (!reduced && title_el && sub_el) {
      try {
        const t_split = new SplitText(title_el, { type: 'words' });
        const s_split = new SplitText(sub_el, { type: 'words' });
        gsap.from([...t_split.words, ...s_split.words], {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.15,
        });
      } catch {
        gsap.from('.hero-anim-elem', {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
    }

    gsap.from('.hero-anim-elem', {
      y: reduced ? 0 : 20,
      opacity: 0,
      duration: reduced ? 0 : 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.35,
    });

    const floats = [float1, float2].filter((f): f is HTMLElement => f != null);
    if (floats.length && !reduced) {
      gsap.from(floats, {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.55)',
        delay: 0.7,
      });
      floats.forEach((el, i) => {
        gsap.to(el, {
          y: '+=8',
          duration: 2.8 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }

    if (!can_run_3d() || !canvas_host) {
      use_3d = false;
      return;
    }

    let disposed = false;
    let raf = 0;
    let renderer: import('three').WebGLRenderer | null = null;
    let scroll_prog = 0;
    let st: ScrollTrigger | null = null;
    let io: IntersectionObserver | null = null;
    let on_resize: (() => void) | null = null;

    // Reason: three.js must stay client-only for Cloudflare adapter (no SSR WebGL).
    (async () => {
      const THREE = await import('three');
      if (disposed || !canvas_host) return;

      const w = canvas_host.clientWidth || 480;
      const h = canvas_host.clientHeight || 520;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
      // Reason: elevated corner view reads as spectacle without game-HUD clutter.
      camera.position.set(9.5, 11, 9.5);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      // Reason: cap DPR so mid-tier GPUs stay near 60fps.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      renderer.setClearColor(0x000000, 0);
      canvas_host.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
      use_3d = true;

      scene.add(new THREE.AmbientLight(0x1a2b4c, 0.55));
      const key = new THREE.DirectionalLight(0xffc72c, 1.35);
      key.position.set(6, 12, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x5db8a6, 0.35);
      fill.position.set(-8, 4, -4);
      scene.add(fill);

      const board = new THREE.Group();
      const light_sq = new THREE.MeshStandardMaterial({
        color: 0xf5e6c8,
        roughness: 0.72,
        metalness: 0.05,
      });
      const dark_sq = new THREE.MeshStandardMaterial({
        color: 0x1a2b4c,
        roughness: 0.78,
        metalness: 0.08,
      });
      const sq_geo = new THREE.BoxGeometry(1, 0.18, 1);
      for (let x = 0; x < 8; x++) {
        for (let z = 0; z < 8; z++) {
          const mesh = new THREE.Mesh(sq_geo, (x + z) % 2 === 0 ? light_sq : dark_sq);
          mesh.position.set(x - 3.5, 0, z - 3.5);
          board.add(mesh);
        }
      }
      const rim = new THREE.Mesh(
        new THREE.BoxGeometry(8.4, 0.28, 8.4),
        new THREE.MeshStandardMaterial({ color: 0x0a0f1a, roughness: 0.9 })
      );
      rim.position.y = -0.22;
      board.add(rim);
      scene.add(board);

      // Reason: simple solids = fast first paint, no glTF download.
      const piece_mat_w = new THREE.MeshStandardMaterial({
        color: 0xfaf9f5,
        roughness: 0.45,
        metalness: 0.15,
      });
      const piece_mat_b = new THREE.MeshStandardMaterial({
        color: 0x252523,
        roughness: 0.5,
        metalness: 0.2,
      });
      const amber_glow = new THREE.MeshStandardMaterial({
        color: 0xffb200,
        emissive: 0xffb200,
        emissiveIntensity: 0.35,
        roughness: 0.4,
        metalness: 0.25,
      });

      type PieceRef = { mesh: import('three').Group; base_y: number };
      const pieces: PieceRef[] = [];

      function make_pawn(mat: import('three').Material) {
        const g = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.12, 12), mat);
        base.position.y = 0.06;
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.2, 0.38, 12), mat);
        body.position.y = 0.32;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), mat);
        head.position.y = 0.58;
        g.add(base, body, head);
        return g;
      }

      function make_rook(mat: import('three').Material) {
        const g = new THREE.Group();
        g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.14, 12), mat));
        const tower = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.55, 0.32), mat);
        tower.position.y = 0.35;
        g.add(tower);
        const top = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.38), mat);
        top.position.y = 0.68;
        g.add(top);
        return g;
      }

      function make_knight(mat: import('three').Material) {
        const g = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.12, 12), mat);
        base.position.y = 0.06;
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.45, 0.28), mat);
        body.position.set(0, 0.35, 0.02);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.34), mat);
        head.position.set(0.02, 0.62, 0.08);
        g.add(base, body, head);
        return g;
      }

      function place(
        factory: (m: import('three').Material) => import('three').Group,
        file: number,
        rank: number,
        white: boolean,
        hero = false
      ) {
        const mat = hero ? amber_glow : white ? piece_mat_w : piece_mat_b;
        const mesh = factory(mat);
        mesh.position.set(file - 3.5, 0.1, rank - 3.5);
        if (!white) mesh.rotation.y = Math.PI;
        board.add(mesh);
        pieces.push({ mesh, base_y: 0.1 });
      }

      for (let f = 0; f < 8; f++) {
        place(make_pawn, f, 1, true, f === 4);
        place(make_pawn, f, 6, false);
      }
      place(make_rook, 0, 0, true);
      place(make_rook, 7, 0, true);
      place(make_rook, 0, 7, false);
      place(make_rook, 7, 7, false);
      place(make_knight, 1, 0, true);
      place(make_knight, 6, 0, true);
      place(make_knight, 1, 7, false);
      place(make_knight, 6, 7, false);

      const e_pawn = pieces[4];

      // Reason: star particles = cosmos vibe without textures.
      const p_count = 90;
      const p_pos = new Float32Array(p_count * 3);
      const p_vel = new Float32Array(p_count);
      for (let i = 0; i < p_count; i++) {
        p_pos[i * 3] = (Math.random() - 0.5) * 22;
        p_pos[i * 3 + 1] = Math.random() * 14 - 2;
        p_pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
        p_vel[i] = 0.004 + Math.random() * 0.01;
      }
      const p_geo = new THREE.BufferGeometry();
      p_geo.setAttribute('position', new THREE.BufferAttribute(p_pos, 3));
      const p_mat = new THREE.PointsMaterial({
        color: 0xffc72c,
        size: 0.06,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(p_geo, p_mat);
      scene.add(particles);

      // Reason: scroll drives camera + e2→e4 lift — board is the story of commitment.
      st = ScrollTrigger.create({
        trigger: section_el,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          scroll_prog = self.progress;
        },
      });

      const cam_from = { x: 9.5, y: 11, z: 9.5 };
      const cam_to = { x: 5.5, y: 7.2, z: 12.5 };

      on_resize = () => {
        if (!canvas_host || !renderer) return;
        const nw = canvas_host.clientWidth;
        const nh = canvas_host.clientHeight;
        if (nw < 2 || nh < 2) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh, false);
      };
      window.addEventListener('resize', on_resize);

      let visible = true;
      io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
        },
        { threshold: 0.05 }
      );
      if (section_el) io.observe(section_el);

      const tick = () => {
        if (disposed) return;
        raf = requestAnimationFrame(tick);
        if (!visible || !renderer) return;

        const t = scroll_prog;
        camera.position.x = cam_from.x + (cam_to.x - cam_from.x) * t;
        camera.position.y = cam_from.y + (cam_to.y - cam_from.y) * t;
        camera.position.z = cam_from.z + (cam_to.z - cam_from.z) * t;
        camera.lookAt(0, t * 0.4, 0);

        if (e_pawn) {
          const lift_t = Math.min(1, t * 2.2);
          const slide_t = Math.max(0, Math.min(1, (t - 0.35) * 2));
          e_pawn.mesh.position.y = e_pawn.base_y + lift_t * 0.85;
          e_pawn.mesh.position.z = 1 - 3.5 - slide_t * 2;
        }

        pieces.forEach((p, i) => {
          if (p === e_pawn) return;
          p.mesh.position.y =
            p.base_y + Math.sin(performance.now() * 0.0012 + i) * 0.03 * (1 - t * 0.5);
        });

        board.rotation.y = mx * 0.08 + t * 0.12;
        board.rotation.x = my * 0.04;

        const arr = p_geo.attributes.position.array as Float32Array;
        for (let i = 0; i < p_count; i++) {
          arr[i * 3 + 1] += p_vel[i] * (1 + t);
          if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = -2;
        }
        p_geo.attributes.position.needsUpdate = true;
        particles.rotation.y += 0.0004;

        renderer.render(scene, camera);
      };
      tick();
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      st?.kill();
      io?.disconnect();
      if (on_resize) window.removeEventListener('resize', on_resize);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  });
</script>

<section
  class="champ-hero"
  bind:this={section_el}
  onpointermove={on_pointer}
  aria-label="BEEE Spectacular Chess Championship hero"
>
  <div class="champ-hero__blob" aria-hidden="true"></div>
  <div class="champ-hero__particles-css" aria-hidden="true"></div>

  <div class="champ-hero__grid">
    <div class="champ-hero__copy">
      <h1 bind:this={title_el} class="champ-hero__title">
        BEEE Spectacular Chess Championship Abuja 2026
      </h1>

      <h2 bind:this={sub_el} class="champ-hero__sub">
        Your child.<br />One board.<br />A lifetime of advantage.
      </h2>

      <p class="hero-anim-elem champ-hero__lead">
        A transformative youth development experience that combines competitive chess with AI-powered
        chess training, mentorship, and personal growth
      </p>

      <div class="hero-anim-elem champ-hero__meta" role="list">
        <div class="champ-hero__meta-item" role="listitem">
          <span class="champ-hero__meta-icon" aria-hidden="true">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              /></svg
            >
          </span>
          <span>10–14 years</span>
        </div>
        <div class="champ-hero__meta-item" role="listitem">
          <span class="champ-hero__meta-icon" aria-hidden="true">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              /></svg
            >
          </span>
          <span>July 28 – October 2026</span>
        </div>
        <div class="champ-hero__meta-item" role="listitem">
          <span class="champ-hero__meta-icon" aria-hidden="true">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              /><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" /></svg
            >
          </span>
          <span>₦15,000</span>
        </div>
      </div>

      <div class="hero-anim-elem champ-hero__venue">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true"
          ><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z"
          /></svg
        >
        <span>Preliminaries and Grand Finale<br />Venue: National Stadium, Abuja</span>
      </div>

      <div class="hero-anim-elem champ-hero__notes">
        <p class="champ-hero__note champ-hero__note--accent">
          <span aria-hidden="true">💻</span>
          Online chess training and self development programs commence July 28, 2026
        </p>
        <p class="champ-hero__note">
          <span aria-hidden="true">✨</span>
          Sign up early to give your child a richer, more rewarding championship experience.
        </p>
      </div>

      <div class="hero-anim-elem champ-hero__actions">
        <Button href="/register" class="px-8 py-4 w-full sm:w-auto text-base"
          >Start Your Child's Journey</Button
        >
        <a href="/championship" class="champ-hero__btn-ghost">See How It Works</a>
      </div>
    </div>

    <div class="champ-hero__stage">
      <div class="champ-hero__canvas-wrap" class:is-3d={use_3d}>
        <!-- Reason: separate host so Svelte conditionals never wipe the WebGL canvas node. -->
        <div class="champ-hero__webgl" bind:this={canvas_host}></div>
        {#if !use_3d}
          <div class="champ-hero__fallback" aria-hidden="true">
            <div class="champ-hero__css-board"></div>
            <img
              src="/images/hero.png"
              alt="Student playing chess"
              class="champ-hero__fallback-img"
              fetchpriority="high"
            />
          </div>
        {/if}
      </div>

      <!-- glass cards: HTML so they stay sharp and a11y-friendly -->
      <div
        bind:this={float1}
        class="champ-hero__glass champ-hero__glass--e4"
        style={card1_style}
      >
        <div class="champ-hero__glass-head">
          <span class="champ-hero__glass-dot" aria-hidden="true">🧠</span>
          <span class="champ-hero__glass-label">e4™ AI</span>
        </div>
        <p>Excellent strategic defense. Consider Knight to F3 to develop your center.</p>
      </div>

      <div
        bind:this={float2}
        class="champ-hero__glass champ-hero__glass--task"
        style={card2_style}
      >
        <p class="champ-hero__glass-title">TASKIFY™ Progress</p>
        <div class="champ-hero__bar" aria-hidden="true">
          <div class="champ-hero__bar-fill"></div>
        </div>
        <div class="champ-hero__chips" aria-hidden="true">
          <span>💡</span><span>♟</span><span>🚀</span>
        </div>
      </div>
    </div>
  </div>
</section>
