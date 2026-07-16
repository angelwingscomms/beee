// Remove ontouchstart from window to prevent jsdom from simulating touch device
delete (window as any).ontouchstart;
