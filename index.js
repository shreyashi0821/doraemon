// ==========================================
// 🌸 Shreya's Cute Doraemon Webpage Script 🌸
// ==========================================

// Data types recap:
// number = 1, 2, 3
// string = "boku"
// boolean = true or false
// null = no value
// array = [12345, "abcd", true, null, false]

const name = "shreya";
console.log("Welcome to Doraemon's World, " + name + "! 🚁✨");

// 🎵 Sound Effects Engine (Web Audio API)
let soundEnabled = true;
const audioCtx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext))
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

function playCuteChime(type = 'chime') {
  if (!soundEnabled || !audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'chime') {
      // Pleasant twin chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'pop') {
      // Cute bubble pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'magic') {
      // Magical sparkling triad
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const noteOsc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();
        noteOsc.type = 'sine';
        noteOsc.connect(noteGain);
        noteGain.connect(audioCtx.destination);

        const startTime = now + idx * 0.08;
        noteOsc.frequency.setValueAtTime(freq, startTime);
        noteGain.gain.setValueAtTime(0.18, startTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        noteOsc.start(startTime);
        noteOsc.stop(startTime + 0.35);
      });
    }
  } catch (e) {
    console.log("Audio play notice:", e);
  }
}

// 🎊 Confetti Explosion Animation
function launchConfetti(emojiMode = false) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#3ea7e0', '#ff7597', '#ffd166', '#a2d2ff', '#cdb4db', '#ffcbf2', '#ffffff'];
  const emojis = ['🚁', '💖', '✨', '🎂', '⭐', '🌸', '🔔'];

  const count = emojiMode ? 40 : 80;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 50,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: emojiMode ? Math.random() * 14 + 18 : Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      isEmoji: emojiMode || Math.random() > 0.65,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      gravity: 0.35,
      alpha: 1,
      decay: Math.random() * 0.012 + 0.008
    });
  }

  let animationId;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.isEmoji) {
          ctx.font = `${p.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.emoji, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.roundRect 
            ? ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size, 3) 
            : ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    if (alive) {
      animationId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationId);
    }
  }

  render();
}

// 🎀 Custom Cute Modal Dialog
function showCuteModal(title, message, emoji = '💖') {
  const overlay = document.getElementById('cute-modal-overlay');
  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const emojiEl = document.getElementById('modal-emoji');

  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.textContent = message;
  if (emojiEl) emojiEl.textContent = emoji;

  if (overlay) {
    overlay.classList.add('active');
  }
}

function closeCuteModal() {
  playCuteChime('pop');
  const overlay = document.getElementById('cute-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  // If a gadget was just gifted, use its magic now!
  if (pendingGadget) {
    const gadget = pendingGadget;
    pendingGadget = null;
    setTimeout(() => useGadget(gadget), 300);
  }
}

// ✨ Original functions preserved & spiced up with cuteness!
const testfn = () => {
  playCuteChime('pop');
  launchConfetti(false);
  showCuteModal(
    "Heyyy Shreya! ✨",
    "Hope you are having a super happy, fun, and adorable day! Keep shining bright! 🌟",
    "💖"
  );
};

const yourfn = () => {
  playCuteChime('magic');
  launchConfetti(true);
  showCuteModal(
    "Surpriiiise! 🚁🎂",
    "I love Doraemon! Doraemon loves Shreya and sweet cakes! Here's a bamboo copter to fly anywhere in your dreams! 🌸✨",
    "🎉"
  );
};

// 🎒 Doraemon's 4D Pocket Gadget Generator
const gadgets = [
  { name: "Take-Copter (Bamboo Copter)", emoji: "🚁", desc: "Attach it to your head and fly freely anywhere in the sky!" },
  { name: "Anywhere Door (Dokodemo Door)", emoji: "🚪", desc: "Open the door and step directly into your favorite dream place!" },
  { name: "Memory Bread (Anki Pan)", emoji: "🍞", desc: "Press bread onto your notes and eat it to remember anything for exams!" },
  { name: "Small Light (Small Light)", emoji: "🔦", desc: "Shine the beam to shrink anything into cute mini pocket size!" },
  { name: "Time Machine", emoji: "⏳", desc: "Hop in through Nobita's desk drawer and travel anywhere in time!" },
  { name: "Pass Loop", emoji: "🌀", desc: "Stick it to any wall to create an instant magical passage!" },
  { name: "Dress-Up Camera", emoji: "📸", desc: "Point and snap to instantly wear the cutest aesthetic outfits!" },
  { name: "Big Light", emoji: "✨", desc: "Shine the light on your favorite sweets to make them giant size!" }
];

let lastGadgetIndex = 0; // Take-Copter is shown first
let pendingGadget = null;

function pullGadgetFromPocket() {
  playCuteChime('magic');
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * gadgets.length);
  } while (newIndex === lastGadgetIndex && gadgets.length > 1);
  lastGadgetIndex = newIndex;

  const gadget = gadgets[newIndex];
  const nameEl = document.getElementById('gadget-name');
  const descEl = document.getElementById('gadget-desc');
  const boxEl = document.getElementById('gadget-box');

  // Trigger pocket shake animation
  if (boxEl) {
    boxEl.classList.remove('shake');
    void boxEl.offsetWidth; // trigger reflow
    boxEl.classList.add('shake');
  }

  // Update gadget card
  if (nameEl && descEl) {
    nameEl.innerHTML = `${gadget.emoji} ${gadget.name}`;
    descEl.textContent = `"${gadget.desc}"`;
  }

  // Launch celebratory confetti with emojis
  launchConfetti(true);

  // Present the Gift in the Cute Modal Popup! (magic happens when it closes)
  pendingGadget = gadget;
  showCuteModal(
    "🎁 4D Pocket Gift Unlocked!",
    `Doraemon reached into his pocket and gifted you:\n\n✨ ${gadget.name} ✨\n\n${gadget.desc}`,
    gadget.emoji
  );
}

// 🪄 Gadget Magic — every gadget really does something!
const MAGIC_DURATION = 6000;
const magicClasses = ['magic-flying', 'magic-small', 'magic-big', 'magic-time', 'magic-passloop', 'magic-dressup', 'magic-memory'];
const dreamPlaces = [
  { cls: 'place-beach', label: '🏖️ Sunny Beach' },
  { cls: 'place-space', label: '🌌 Outer Space' },
  { cls: 'place-sakura', label: '🌸 Sakura Garden' },
  { cls: 'place-sunset', label: '🌅 Sunset Hills' }
];
let magicTimer = null;

function useCurrentGadget(event) {
  if (event) event.stopPropagation(); // don't pull a new gadget
  useGadget(gadgets[lastGadgetIndex]);
}

function clearMagic() {
  clearTimeout(magicTimer);
  document.body.classList.remove(...magicClasses);
  document.querySelectorAll('.magic-layer').forEach(el => el.remove());
}

function endMagicAfter(ms = MAGIC_DURATION) {
  magicTimer = setTimeout(clearMagic, ms);
}

// Small helper: drop a temporary element on the page
function spawnMagic(text, className, lifetime = MAGIC_DURATION) {
  const el = document.createElement('div');
  el.className = `magic-layer ${className}`;
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), lifetime);
  return el;
}

function showMagicToast(text) {
  spawnMagic(text, 'magic-toast', 3500);
}

function useGadget(gadget) {
  if (!gadget) return;
  clearMagic();
  playCuteChime('magic');

  switch (gadget.name) {
    case "Take-Copter (Bamboo Copter)":
      // The whole page takes off and a copter flies across the sky
      document.body.classList.add('magic-flying');
      spawnMagic('🚁', 'magic-copter');
      showMagicToast('🚁 Wheee! The whole page is flying!');
      endMagicAfter();
      break;

    case "Anywhere Door (Dokodemo Door)": {
      // Open a door and teleport to a new dream place (stays until next door)
      spawnMagic('🚪', 'magic-door', 1600);
      const current = dreamPlaces.find(p => document.body.classList.contains(p.cls));
      const options = dreamPlaces.filter(p => p !== current);
      const place = options[Math.floor(Math.random() * options.length)];
      setTimeout(() => {
        dreamPlaces.forEach(p => document.body.classList.remove(p.cls));
        document.body.classList.add(place.cls);
        showMagicToast(`🚪 Welcome to ${place.label}!`);
      }, 900);
      break;
    }

    case "Memory Bread (Anki Pan)":
      // Every word on the page glows as it gets "memorized"
      document.body.classList.add('magic-memory');
      spawnMagic('🍞', 'magic-bread', 2000);
      showMagicToast('🍞 Nom nom! You memorized this whole page!');
      endMagicAfter(4000);
      break;

    case "Small Light (Small Light)":
      // Shrink the photos & buttons into mini pocket size
      document.body.classList.add('magic-small');
      spawnMagic('', 'magic-beam magic-beam-small', 1200);
      showMagicToast('🔦 Shrink! Everything is mini now!');
      endMagicAfter();
      break;

    case "Time Machine": {
      // Travel to a random year — page turns vintage
      const year = Math.random() > 0.5
        ? 1900 + Math.floor(Math.random() * 80)
        : 2100 + Math.floor(Math.random() * 900);
      document.body.classList.add('magic-time');
      spawnMagic('⏳', 'magic-clock');
      showMagicToast(`⏳ Whoosh! You travelled to the year ${year}!`);
      endMagicAfter();
      break;
    }

    case "Pass Loop":
      // Walls turn see-through and a portal follows your cursor
      document.body.classList.add('magic-passloop');
      spawnMagic('🌀', 'magic-portal');
      showMagicToast('🌀 You can pass through walls now!');
      endMagicAfter();
      break;

    case "Dress-Up Camera":
      // Camera flash, then the photos wear cute outfits
      spawnMagic('', 'magic-flash', 700);
      setTimeout(() => {
        document.body.classList.add('magic-dressup');
        document.querySelectorAll('.photo-card .image-frame').forEach((frame, i) => {
          const outfit = document.createElement('span');
          outfit.className = 'magic-layer magic-outfit';
          outfit.textContent = ['👑', '🎀', '🎩'][i % 3];
          frame.appendChild(outfit);
        });
        showMagicToast('📸 Snap! Everyone got a cute makeover!');
      }, 250);
      endMagicAfter();
      break;

    case "Big Light":
      // The cake grows giant and sweets rain down
      document.body.classList.add('magic-big');
      spawnMagic('', 'magic-beam magic-beam-big', 1200);
      for (let i = 0; i < 14; i++) {
        const sweet = spawnMagic(['🍰', '🍩', '🧁', '🍭', '🍫'][i % 5], 'magic-sweet');
        sweet.style.left = `${Math.random() * 95}vw`;
        sweet.style.animationDelay = `${Math.random() * 2}s`;
      }
      showMagicToast('✨ Big Light! Giant sweets for everyone!');
      endMagicAfter();
      break;
  }
}

// Pass Loop portal follows the mouse
document.addEventListener('mousemove', (e) => {
  const portal = document.querySelector('.magic-portal');
  if (portal) {
    portal.style.left = `${e.clientX}px`;
    portal.style.top = `${e.clientY}px`;
  }
});

// 🔊 Sound Toggle Handler
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.innerHTML = soundEnabled ? '🔔 Sound: ON' : '🔕 Sound: OFF';
  }
  if (soundEnabled) {
    playCuteChime('pop');
  }
}

// ✨ Mouse Sparkle Trail Effect
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.85) { // gentle frequency
    createSparkle(e.clientX, e.clientY);
  }
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  const sparkles = ['✨', '🌸', '⭐', '💫', '💖'];
  const char = sparkles[Math.floor(Math.random() * sparkles.length)];
  sparkle.textContent = char;
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkle.style.fontSize = `${Math.floor(Math.random() * 10 + 12)}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 750);
}

// Window resize listener for confetti canvas
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
