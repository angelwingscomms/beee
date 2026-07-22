<script lang="ts">
  import { browser } from '$app/environment';

  const STORAGE_KEY = 'dev-bash-state';

  let text = $state('');
  let top = $state<number | null>(null); // px from top; null = pin to bottom
  let collapsed = $state(false);
  let drawing = $state(false);
  let dragging = $state(false);
  let moved = false;
  let dragStartY = 0;
  let dragStartTop = 0;

  let overlay = $state<HTMLCanvasElement | null>(null);
  let drawCtx: CanvasRenderingContext2D | null = null;
  let strokeActive = false;
  let pendingImage = $state<Blob | null>(null);

  const log = (...args: unknown[]) => console.log('[dev-bash]', ...args);

  if (browser) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (typeof saved.top === 'number') top = saved.top;
      if (typeof saved.collapsed === 'boolean') collapsed = saved.collapsed;
    } catch {}
  }

  function persist() {
    if (!browser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ top, collapsed }));
  }

  function startDrag(e: PointerEvent) {
    dragging = true;
    moved = false;
    dragStartY = e.clientY;
    dragStartTop = top ?? window.innerHeight - 60;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onDrag(e: PointerEvent) {
    if (!dragging) return;
    const dy = e.clientY - dragStartY;
    if (Math.abs(dy) > 3) moved = true;
    const next = dragStartTop + dy;
    top = Math.max(0, Math.min(window.innerHeight - 50, next));
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    persist();
  }

  function toggleCollapsed() {
    if (moved) return; // was a drag, not a click
    collapsed = !collapsed;
    persist();
  }

  async function send() {
    if (!text.trim() && !pendingImage) return;
    log('send: text length', text.length, 'has image', !!pendingImage);

    if (pendingImage) {
      const form = new FormData();
      form.set('text', text);
      form.set('image', pendingImage, 'shot.png');
      const res = await fetch('/api/bash', { method: 'POST', body: form });
      log('send: multipart response', res.status);
    } else {
      const res = await fetch('/api/bash', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text })
      });
      log('send: json response', res.status);
    }

    text = '';
    pendingImage = null;
  }

  function clearPendingImage() {
    log('cleared pending image');
    pendingImage = null;
  }

  function startDrawMode() {
    log('draw mode: start');
    drawing = true;
    requestAnimationFrame(() => {
      if (!overlay) return;
      overlay.width = window.innerWidth;
      overlay.height = window.innerHeight;
      drawCtx = overlay.getContext('2d');
      if (drawCtx) {
        drawCtx.strokeStyle = 'red';
        drawCtx.lineWidth = 3;
        drawCtx.lineCap = 'round';
      }
    });
  }

  function cancelDrawMode() {
    log('draw mode: cancel');
    drawing = false;
    drawCtx = null;
  }

  function onStrokeStart(e: PointerEvent) {
    if (!drawCtx) return;
    strokeActive = true;
    drawCtx.beginPath();
    drawCtx.moveTo(e.offsetX, e.offsetY);
  }

  function onStrokeMove(e: PointerEvent) {
    if (!strokeActive || !drawCtx) return;
    drawCtx.lineTo(e.offsetX, e.offsetY);
    drawCtx.stroke();
  }

  function onStrokeEnd() {
    strokeActive = false;
  }

  async function captureShot() {
    if (!overlay) return;
    log('shoot: requesting display media');
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();
    await new Promise((r) => requestAnimationFrame(r));

    const out = document.createElement('canvas');
    out.width = video.videoWidth;
    out.height = video.videoHeight;
    const ctx = out.getContext('2d')!;
    ctx.drawImage(video, 0, 0, out.width, out.height);
    stream.getTracks().forEach((t) => t.stop());

    // scale the annotation layer (viewport px) onto the captured frame
    ctx.drawImage(overlay, 0, 0, overlay.width, overlay.height, 0, 0, out.width, out.height);

    out.toBlob((blob) => {
      if (!blob) return;
      log('shoot: captured blob', blob.size, 'bytes, holding for send');
      pendingImage = blob;
      drawing = false;
      drawCtx = null;
    }, 'image/png');
  }
</script>

{#if drawing}
  <canvas
    bind:this={overlay}
    class="draw-overlay"
    onpointerdown={onStrokeStart}
    onpointermove={onStrokeMove}
    onpointerup={onStrokeEnd}
  ></canvas>
{/if}

<div
  class="dev-bash"
  class:collapsed
  style={top === null ? 'bottom: 12px;' : `top: ${top}px;`}
  onpointerdown={startDrag}
  onpointermove={onDrag}
  onpointerup={endDrag}
  role="toolbar"
  tabindex="-1"
>
  {#if collapsed}
    <button class="handle" onclick={toggleCollapsed} aria-label="Expand">⌘</button>
  {:else if drawing}
    <button class="handle" onclick={cancelDrawMode} aria-label="Cancel">✕</button>
    <span class="hint">circle something, then shoot</span>
    <button onclick={captureShot}>Shoot</button>
  {:else}
    <button class="handle" onclick={toggleCollapsed} aria-label="Collapse">–</button>
    {#if pendingImage}
      <button class="attachment" onclick={clearPendingImage} title="Remove attached image">🖼✕</button>
    {/if}
    <input
      type="text"
      placeholder="tmux send-keys..."
      bind:value={text}
      onkeydown={(e) => e.key === 'Enter' && send()}
    />
    <button onclick={send}>Send</button>
    <button onclick={startDrawMode} aria-label="Draw">✎</button>
  {/if}
</div>

<style>
  .draw-overlay {
    position: fixed;
    inset: 0;
    z-index: 9998;
    cursor: crosshair;
    touch-action: none;
  }
  .dev-bash {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);
    border-radius: 8px;
    cursor: grab;
    touch-action: none;
  }
  .dev-bash.collapsed {
    padding: 4px;
    border-radius: 999px;
  }
  .handle {
    background: transparent;
    color: #fff;
    border: none;
    cursor: pointer;
    line-height: 1;
    padding: 4px 6px;
  }
  .hint {
    color: #fff;
    font-size: 12px;
    opacity: 0.8;
  }
  .attachment {
    background: rgba(255, 80, 80, 0.3);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 6px;
    cursor: pointer;
  }
  input {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    padding: 4px 8px;
    width: 200px;
  }
  button {
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 4px 10px;
    cursor: pointer;
  }
</style>
