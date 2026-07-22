import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { execFile, spawn } from 'node:child_process';

const log = (...args: unknown[]) => console.log('[dev-bash]', ...args);

function run(cmd: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    log('exec', cmd, args.join(' '));
    execFile(cmd, args, (err) => {
      if (err) {
        log('exec failed', cmd, err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// tmux send-keys only types keystrokes, it can't carry raw binary. To get the
// screenshot bytes into the pane we base64 it and paste a one-liner that
// reconstructs the file with `base64 -d`, using load-buffer/paste-buffer
// (binary-safe) instead of send-keys (which chokes on long args). The
// message text, if any, rides along in the same pasted line so both arrive
// together as one command.
async function pasteToTmux(cmd: string) {
  log('load-buffer, length', cmd.length);
  await new Promise<void>((resolve, reject) => {
    const proc = spawn('tmux', ['load-buffer', '-b', 'devbash', '-']);
    proc.on('error', reject);
    proc.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`load-buffer exited ${code}`))));
    proc.stdin.end(cmd);
  });

  await run('tmux', ['paste-buffer', '-b', 'devbash', '-t', 'beee', '-d']);
  await run('tmux', ['send-keys', '-t', 'beee', 'Enter']);
  log('pasted + sent Enter');
}

export const POST: RequestHandler = async ({ request }) => {
  if (!dev) return json({ error: 'Not available' }, { status: 403 });

  const contentType = request.headers.get('content-type') || '';
  log('request received, content-type:', contentType);

  if (contentType.startsWith('multipart/form-data')) {
    const form = await request.formData();
    const text = (form.get('text') as string | null) ?? '';
    const image = form.get('image') as File | null;
    log('multipart: text length', text.length, 'has image', !!image);

    let cmd = '';
    if (image) {
      const buf = Buffer.from(await image.arrayBuffer());
      const filePath = `/tmp/dev-bash-shot-${Date.now()}.png`;
      log('image bytes', buf.length, '-> writing via base64 to', filePath);
      cmd += `printf '%s' '${buf.toString('base64')}' | base64 -d > ${filePath}; echo saved ${filePath}`;
    }
    if (text) {
      cmd += cmd ? ` && ${text}` : text;
    }
    if (!cmd) {
      log('multipart: nothing to send');
      return json({ error: 'Empty' }, { status: 400 });
    }

    await pasteToTmux(cmd);
    return json({ ok: true });
  }

  const { text } = await request.json();
  if (typeof text !== 'string' || !text) {
    log('rejected: missing text');
    return json({ error: 'Missing text' }, { status: 400 });
  }

  log('send-keys text length', text.length);
  execFile('tmux', ['send-keys', '-t', 'beee', text, 'Enter']);

  return json({ ok: true });
};
