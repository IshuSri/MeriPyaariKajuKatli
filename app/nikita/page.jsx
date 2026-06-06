"use client"
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FLOWERS = [
  {
    emoji: "🌻", name: "Sunflower",
    color: ["#fff8e7","#f5a623"],
    poem: ["You are my sun on every cloudy morning,", "the gold the world forgot to look for.", "Without you, even the brightest days", "feel like sketches waiting to be coloured."],
    tag: "warmth",
  },
  {
    emoji: "🌷", name: "Tulip",
    color: ["#fff0f5","#d45c7a"],
    poem: ["The way you arrive in a room", "is how spring arrives — quietly,", "and then suddenly everything", "decides to be alive again."],
    tag: "grace",
  },
  {
    emoji: "🌹", name: "Rose",
    color: ["#fff0f0","#c0392b"],
    poem: ["Poets have run out of metaphors for you.", "They keep arriving back at roses —", "not because language is lazy,", "but because you are that rare."],
    tag: "love",
  },
  {
    emoji: "💐", name: "Bouquet",
    color: ["#f5f0ff","#7c5cbf"],
    poem: ["You are every good thing at once —", "too vivid to name with a single word.", "So here is a whole bouquet of feelings:", "every one of them is yours."],
    tag: "everything",
  },
  {
    emoji: "🪷", name: "Lotus",
    color: ["#f0f8ff","#5b8fa8"],
    poem: ["You have turned every dark water", "into something worth floating in.", "There is a grace in how you rise", "that the muddy world does not deserve."],
    tag: "strength",
  },
  {
    emoji: "🌺", name: "Hibiscus",
    color: ["#fff4ee","#e8632a"],
    poem: ["Some people add colour to a room.", "You add colour to a lifetime.", "Being near you is being", "permanently, helplessly awake."],
    tag: "vibrance",
  },
  {
    emoji: "🌸", name: "Cherry Blossom",
    color: ["#fff5f8","#e8a0b4"],
    poem: ["You bloom the way cherry blossoms do —", "softly, all at once, briefly, perfectly.", "And every person lucky enough to witness", "carries that quiet beauty forever."],
    tag: "beauty",
  },
  {
    emoji: "🪻", name: "Lavender",
    color: ["#f6f0ff","#9b7ec8"],
    poem: ["You have a voice that slows the world,", "eyes that make anxiety forget its name.", "Being with you is the long exhale", "I didn't know I was holding."],
    tag: "calm",
  },
  {
    emoji: "🤍", name: "Baby's Breath",
    color: ["#f8f8f8","#a0a0a0"],
    poem: ["You are the small things that hold everything:", "the pause between notes that makes music,", "the quiet between us that says more", "than any sentence ever could."],
    tag: "everything small",
  },
];

/* ── FLOATING PETALS ── */
function Petals({ active, color }) {
  const items = useRef(
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 2.8}s`,
      dur: `${3.5 + Math.random() * 2.5}s`,
      size: 10 + Math.random() * 14,
      rot: Math.random() * 360,
    }))
  ).current;

  if (!active) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", borderRadius: 28 }}>
      {items.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          bottom: -20,
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: "60% 40% 55% 45%",
          background: color,
          opacity: 0,
          animation: `floatUp ${p.dur} ${p.delay} ease-in infinite`,
          transform: `rotate(${p.rot}deg)`,
        }} />
      ))}
    </div>
  );
}

/* ── STAR DECORATION ── */
function Stars() {
  const stars = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: `${8 + Math.random() * 50}%`,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 2}s`,
      size: 6 + Math.random() * 8,
    }))
  ).current;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          top: s.top, left: s.left,
          width: s.size, height: s.size,
          background: "#f5c842",
          clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          animation: `starTwinkle ${1.5 + Math.random()}s ${s.delay} ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── NAME ENTRY SCREEN ── */
function NameEntry({ onConfirm }) {
  const [name, setName] = useState("Nikita");
  const [focused, setFocused] = useState(false);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "linear-gradient(160deg,#f7f3ec,#ede8df)",
      position: "relative", overflow: "hidden", borderRadius: 16,
    }}>
      <Stars />

      {/* ribbon decoration */}
      <div style={{
        position: "absolute", top: 28, width: "100%", textAlign: "center",
        fontFamily: "'Caveat',cursive", fontSize: 18, color: "#c9a97a",
        letterSpacing: 3, animation: "ribbonDrift 4s ease-in-out infinite",
      }}>
        ✦ a flower for someone special ✦
      </div>

      <div style={{
        background: "rgba(255,255,255,.72)", backdropFilter: "blur(12px)",
        borderRadius: 32, padding: "52px 48px 44px",
        textAlign: "center", width: "88%", maxWidth: 480,
        border: "1px solid rgba(220,205,185,.6)",
        boxShadow: "0 20px 60px rgba(0,0,0,.07)",
        position: "relative",
      }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>🌸</div>

        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 32, fontWeight: 600,
          color: "#3a2e25", marginBottom: 6,
          lineHeight: 1.2,
        }}>
          Who is this for?
        </div>

        <div style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: 14, color: "#9a8f82",
          marginBottom: 32, lineHeight: 1.6,
        }}>
          Enter their name and we'll make every flower<br />bloom just a little more beautifully.
        </div>

        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && name.trim() && onConfirm(name.trim())}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={true}
          placeholder="their name…"
          style={{
            width: "100%", padding: "14px 20px",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 24, fontStyle: "italic",
            color: "#3a2e25",
            background: "rgba(255,252,245,.9)",
            border: `1.5px solid ${focused ? "#c0392b" : "rgba(200,185,165,.5)"}`,
            borderRadius: 16, outline: "none",
            textAlign: "center",
            transition: "border-color .3s, box-shadow .3s",
            boxShadow: focused ? "0 0 0 4px rgba(192,57,43,.08)" : "none",
          }}
        />

        <button
          onClick={() => name.trim() && onConfirm(name.trim())}
          disabled={!name.trim()}
          style={{
            marginTop: 22, width: "100%",
            padding: "14px 0",
            background: name.trim()
              ? "linear-gradient(135deg,#c0392b,#e74c3c)"
              : "rgba(200,190,175,.35)",
            color: name.trim() ? "white" : "#b0a090",
            border: "none", borderRadius: 16,
            fontFamily: "'Poppins',sans-serif",
            fontSize: 15, fontWeight: 500,
            cursor: name.trim() ? "pointer" : "default",
            transition: "all .3s",
            letterSpacing: .5,
            animation: name.trim() ? "glowPulse 2s ease-in-out infinite" : "none",
          }}
        >
          Enter the Flower Shop →
        </button>
      </div>

      <div style={{
        position: "absolute", bottom: 24,
        fontFamily: "'Caveat',cursive", fontSize: 16,
        color: "#c0b09a", letterSpacing: 1,
      }}>
        skip? just press enter with a nickname ✦
      </div>
    </div>
  );
}

/* ── BICYCLE ── */
function Bicycle({ riding }) {
  const a = riding ? { animation: "spin .52s linear infinite" } : {};
  const p = riding ? { animation: "spin .52s linear infinite" } : {};
  const b = riding ? { animation: "bob .52s ease-in-out infinite" } : {};
  return (
    <svg width="188" viewBox="0 0 200 120" style={{ display: "block" }}>
      <g style={{ transformOrigin: "52px 80px", ...a }}>
        <circle cx="52" cy="80" r="34" fill="none" stroke="#3a3028" strokeWidth="3.5"/>
        <circle cx="52" cy="80" r="5"  fill="#3a3028"/>
        <line x1="52" y1="46" x2="52" y2="114" stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="18" y1="80" x2="86" y2="80"  stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="28" y1="56" x2="76" y2="104" stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="76" y1="56" x2="28" y2="104" stroke="#5a5048" strokeWidth="1.5"/>
        <circle cx="52" cy="80" r="28" fill="none" stroke="#5a5048" strokeWidth="1"/>
        <circle cx="52" cy="80" r="4"  fill="#6a6058"/>
      </g>
      <g style={{ transformOrigin: "148px 80px", ...a }}>
        <circle cx="148" cy="80" r="34" fill="none" stroke="#3a3028" strokeWidth="3.5"/>
        <circle cx="148" cy="80" r="5"  fill="#3a3028"/>
        <line x1="148" y1="46" x2="148" y2="114" stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="114" y1="80" x2="182" y2="80"  stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="124" y1="56" x2="172" y2="104" stroke="#5a5048" strokeWidth="1.5"/>
        <line x1="172" y1="56" x2="124" y2="104" stroke="#5a5048" strokeWidth="1.5"/>
        <circle cx="148" cy="80" r="28" fill="none" stroke="#5a5048" strokeWidth="1"/>
        <circle cx="148" cy="80" r="4"  fill="#6a6058"/>
      </g>
      <g style={b}>
        <line x1="52"  y1="80" x2="100" y2="55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="52"  y1="80" x2="88"  y2="32" stroke="#c0392b" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="88"  y1="32" x2="140" y2="36" stroke="#c0392b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="140" y1="36" x2="100" y2="55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="100" y1="55" x2="88"  y2="32" stroke="#c0392b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="140" y1="36" x2="148" y2="80" stroke="#c0392b" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="140" y1="36" x2="142" y2="22" stroke="#3a3028" strokeWidth="3.5" strokeLinecap="round"/>
        <line x1="134" y1="22" x2="150" y2="22" stroke="#3a3028" strokeWidth="4" strokeLinecap="round"/>
        <line x1="88"  y1="32" x2="86"  y2="16" stroke="#3a3028" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M74,16 Q86,10 98,16" fill="none" stroke="#3a3028" strokeWidth="4" strokeLinecap="round"/>
        <path d="M28,60 Q52,46 76,60" fill="none" stroke="#3a3028" strokeWidth="2" opacity=".6"/>
        <path d="M126,58 Q148,44 170,58" fill="none" stroke="#3a3028" strokeWidth="2" opacity=".6"/>
        <circle cx="100" cy="72" r="14" fill="none" stroke="#3a3028" strokeWidth="2"/>
        <circle cx="100" cy="72" r="8"  fill="none" stroke="#5a5048" strokeWidth="1.5"/>
        <g style={{ transformOrigin: "100px 72px", ...p }}>
          <line x1="88" y1="72" x2="112" y2="72" stroke="#3a3028" strokeWidth="3" strokeLinecap="round"/>
          <rect x="82" y="68" width="10" height="8" rx="2" fill="#4a4038"/>
          <rect x="108" y="68" width="10" height="8" rx="2" fill="#4a4038"/>
        </g>
        </g>
    </svg>
  );
}

/* ── FLOWER CARD ── */
function FlowerCard({ flower, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
  whileHover={{
    y: -12,
    scale: 1.05,
    rotate: [-1, 1, -1, 0],
  }}
  whileTap={{ scale: 0.95 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 15,
  }}
  onClick={() => onSelect(flower)}
  style={{
    background: "rgba(255,255,255,.72)",
    backdropFilter: "blur(10px)",
    padding: "20px 12px",
    borderRadius: 22,
    textAlign: "center",
    cursor: "pointer",
    border: "1px solid rgba(200,190,175,.4)",
    position: "relative",
    overflow: "hidden",
  }}
    >
      {hov && (
        <div style={{
          position: "absolute", top: 8, right: 10,
          fontSize: 11, fontFamily: "'Poppins',sans-serif",
          color: flower.color[1], fontWeight: 500,
          background: `${flower.color[0]}cc`,
          padding: "2px 8px", borderRadius: 20,
          letterSpacing: .5,
        }}>
          {flower.tag}
        </div>
      )}
      <div style={{ fontSize: 52, lineHeight: 1 }}>{flower.emoji}</div>
      <div style={{
        marginTop: 8, fontFamily: "'Caveat',cursive",
        fontSize: 22, color: "#4a3f35",
      }}>{flower.name}</div>
    </motion.div>
  );
}


/* ── SPECIAL POPUP ── */
function SpecialPopup({ flower, recipientName, onClose }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    if (!flower) return;
    setLineIdx(0);
    setShowHeart(false);
    const timers = flower.poem.map((_, i) =>
      setTimeout(() => {
        setLineIdx(i + 1);
        if (i === flower.poem.length - 1) setTimeout(() => setShowHeart(true), 500);
      }, 600 + i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [flower]);

  if (!flower) return null;

  const [bgLight, accent] = flower.color;

  return (
    <div
  style={{
    position: "absolute",
    inset: 0,
    background: "rgba(30,20,15,.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: flower ? 1 : 0,
    transition: "opacity .4s",
    borderRadius: 16,
    zIndex: 30,
    backdropFilter: "blur(4px)",

    overflowY: "auto",
    overflowX: "hidden",
    padding: "20px",
  }}
>
      <Petals active={!!flower} color={accent} />

       <div
  style={{
    width: "90%",
    maxWidth: 560,
    maxHeight: "80vh",

    overflowY: "auto",

    background: `linear-gradient(145deg,${bgLight} 0%,#fffefb 100%)`,
    borderRadius: 32,
    padding: "44px 40px 36px",
    position: "relative",
    boxShadow: `0 30px 80px rgba(0,0,0,.18), 0 0 0 1px ${accent}22`,
    animation: "fadeSlideUp .5s cubic-bezier(.34,1.56,.64,1)",
  }}
>

        {/* shimmer band */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg,transparent,${accent},transparent,${accent},transparent)`,
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
        }}/>

        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 18,
          background: "none", border: "none", fontSize: 22,
          color: "#9a8f82", cursor: "pointer",
        }}>✕</button>

        {/* header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <motion.div
            animate={{
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                repeat: Infinity,
                duration: 3,
            }}
            style={{ fontSize: 52 }}
            >
            {flower.emoji}
            </motion.div>

          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 13, color: accent,
            letterSpacing: 3, textTransform: "uppercase",
            marginTop: 10, marginBottom: 4,
            fontWeight: 600,
          }}>
            {flower.tag}
          </div>

          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 34, fontWeight: 600, color: "#2c2420",
            lineHeight: 1.1,
          }}>
            for&nbsp;
            <span style={{
              color: accent,
              animation: "nameReveal .8s .3s both ease-out",
              display: "inline-block",
            }}>
              {recipientName}
            </span>
          </div>
        </div>

        {/* poem lines */}
        <div style={{
          borderTop: `1px solid ${accent}30`,
          borderBottom: `1px solid ${accent}30`,
          padding: "22px 8px",
          marginBottom: 22,
          minHeight: 120,
        }}>
          {flower.poem.map((line, i) => (
            <p key={i} style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 19, fontStyle: "italic",
              color: i < lineIdx ? "#3a2e25" : "transparent",
              lineHeight: 1.75, margin: "2px 0",
              textAlign: "center",
              transition: "color .6s ease, opacity .6s ease",
              opacity: i < lineIdx ? 1 : 0,
            }}>
              {line}
            </p>
          ))}
        </div>

        <div
        style={{
          position: "relative",
          background: "white",
          borderRadius: 20,
          padding: "40px 20px 20px",
        }}
      >
        <img
          src="/tape.gif"
          alt="tape"
          style={{
            position: "absolute",
            top: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* Your content */}
          </div>

        {/* heart sign-off */}
        {showHeart && (
          <div style={{
            textAlign: "center",
            animation: "fadeSlideUp .5s ease",
          }}>
            <span style={{
              fontFamily: "'Caveat',cursive", fontSize: 18,
              color: "#9a8f82", letterSpacing: 1,
            }}>
              with all the warmth this flower carries
            </span>
            <div style={{ fontSize: 28, marginTop: 6 }}>❤️</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── MAIN APP ── */
export default function FlowerShopStory() {
  const [phase, setPhase] = useState("name");   // name | ride | shop
  const [recipientName, setRecipientName] = useState("");
  const [riding, setRiding]     = useState(false);
  const [arrived, setArrived]   = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [selected, setSelected] = useState(null);
  const [exitLabel, setExitLabel] = useState("⬅ Exit Flower Shop");
  const timers = useRef([]);
  useEffect(() => {
  const styleEl = document.createElement("style");

  styleEl.textContent = `
    @keyframes spin { to { transform: rotate(360deg) } }
    @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
    @keyframes floatUp {
      0%{opacity:0;transform:translateY(0) rotate(0deg) scale(.7)}
      30%{opacity:.9}
      100%{opacity:0;transform:translateY(-320px) rotate(40deg) scale(1.1)}
    }
    @keyframes shimmer {
      0%{background-position:200% center}
      100%{background-position:-200% center}
    }
    @keyframes heartPop {
      0%{transform:scale(0) rotate(-20deg);opacity:0}
      60%{transform:scale(1.3) rotate(5deg);opacity:1}
      100%{transform:scale(1) rotate(0deg);opacity:1}
    }
    @keyframes fadeSlideUp {
      from{opacity:0;transform:translateY(18px)}
      to{opacity:1;transform:translateY(0)}
    }
    @keyframes glowPulse {
      0%,100%{box-shadow:0 0 0 0 rgba(212,100,100,.3)}
      50%{box-shadow:0 0 0 14px rgba(212,100,100,0)}
    }
    @keyframes ribbonDrift {
      0%,100%{transform:translateY(0) rotate(-2deg)}
      50%{transform:translateY(-6px) rotate(2deg)}
    }
    @keyframes nameReveal {
      from{letter-spacing:8px;opacity:0}
      to{letter-spacing:1px;opacity:1}
    }
    @keyframes starTwinkle {
      0%,100%{opacity:.2;transform:scale(.8)}
      50%{opacity:1;transform:scale(1.2)}
    }
  `;

  document.head.appendChild(styleEl);

  return () => {
    document.head.removeChild(styleEl);
  };
}, []);
  

  function addT(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }
  function clearTs() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function confirmName(n) {
    setRecipientName(n);
    setPhase("ride");
  }

  function startRide() {
    if (arrived) return;
    setRiding(true);
    addT(() => setArrived(true), 600);
    addT(() => { setRiding(false); setShowBack(true); }, 3800);
  }

  function enterShop() {
    if (!arrived) return;
    setPhase("shop");
  }

  function goStart() {
    clearTs();
    setPhase("name");
    setRecipientName("");
    setRiding(false); setArrived(false); setShowBack(false);
    setSelected(null);
  }

  function handleExit() {
    if (selected) { setSelected(null); setExitLabel("⬅ Exit Flower Shop"); }
    else { setPhase("ride"); setExitLabel("⬅ Exit Flower Shop"); }
  }

  function pickFlower(f) {
    setSelected(f);
    setExitLabel("⬅ Back To Flowers");
  }
 

  /* ── RENDER ── */
  if (phase === "name") return <NameEntry onConfirm={confirmName} />;

  return (
    <div  style={{
      fontFamily: "'Poppins',sans-serif",
      background: "linear-gradient(160deg,#f7f3ec,#ede8df)",
      minHeight: "100vh", position: "relative",
      overflow: "hidden", borderRadius: 16,
    }}>

      {/* ── RIDE SCREEN ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: phase === "ride" ? 1 : 0,
        pointerEvents: phase === "ride" ? "auto" : "none",
        transition: "opacity .65s",
      }}>
        <div style={{
          fontFamily: "'Caveat',cursive", fontSize: 44,
          color: "#2c2825", letterSpacing: -1,
          position: "absolute", top: 36, left: "50%",
          transform: "translateX(-50%)", whiteSpace: "nowrap",
        }}>
          Ride to the Flower Shop
        </div>
        <div style={{
          position: "absolute", top: 92, left: "50%",
          transform: "translateX(-50%)",
          color: "#9a8f82", fontSize: 14, whiteSpace: "nowrap",
        }}>
          tap the bicycle to begin the journey
        </div>

        {showBack && (
          <button onClick={goStart} style={{
            position: "absolute", top: 18, left: 18,
            background: "white", padding: "9px 18px", borderRadius: 25,
            fontFamily: "'Caveat',cursive", fontSize: 20, color: "#5a4e43",
            cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,.08)",
            border: "none", zIndex: 10,
          }}>⬅ Start Over</button>
        )}

        {/* trees */}
        <svg style={{ position:"absolute",bottom:128,left:0,width:"100%",height:90,overflow:"visible" }}
          viewBox="0 0 700 90" preserveAspectRatio="xMidYMid meet">
          {[60,190,340,500,640].map((x,i) => (
            <g key={i} transform={`translate(${x},${i%2===0?0:8})`}>
              <rect x="-3" y="48" width="6" height="28" fill="#b09070" rx="2"/>
              <ellipse cx="0" cy="38" rx={14+(i%3)*3} ry={18+(i%3)*4}
                fill={["#8aaa6a","#9aba7a","#7aa060","#90b06e","#82a860"][i]} opacity=".68"/>
            </g>
          ))}
        </svg>

        {/* road */}
        <div style={{ position:"absolute",bottom:128,width:"100%" }}>
          <div style={{ width:"100%",height:8,background:"#d0c8bc",position:"relative" }}>
            <div style={{
              position:"absolute",top:"50%",left:0,width:"100%",height:2,transform:"translateY(-50%)",
              background:"repeating-linear-gradient(90deg,#b8b0a5 0,#b8b0a5 30px,transparent 30px,transparent 60px)",
            }}/>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:0,width:"100%",height:128,background:"linear-gradient(180deg,#e8e2d8,#ddd6c8)" }}>
          <div style={{
            position:"absolute",top:0,width:"100%",height:14,
            background:"repeating-linear-gradient(90deg,#b4c99a 0,#b4c99a 8px,#a8be8a 8px,#a8be8a 18px,#b8cd9f 18px,#b8cd9f 26px,#aec190 26px,#aec190 34px)",
          }}/>
        </div>

        {/* bicycle */}
        <motion.div
  onClick={startRide}
  whileHover={{
    scale: 1.08,
    rotate: -2,
  }}
  whileTap={{
    scale: 0.95,
  }} title="Click to ride" style={{
          position:"absolute", bottom:136,
          left: arrived ? "65%" : "6%",
          transition:"left 10.5s cubic-bezier(.03,0,.1,1)",
          cursor:"pointer",
          filter:"drop-shadow(2px 6px 10px rgba(0,0,0,.12))",
          zIndex: 10,
        }} >
          <Bicycle  riding={riding}/>
        </motion.div>

        {/* shop */}
        <div onClick={enterShop}
  style={{
    position: "absolute",
    bottom: 136,
    right: arrived ? "6%" : "-420px",
    transition: "right 3.5s cubic-bezier(.4,0,.2,1)",
    width: 280,
    cursor: "pointer",
    zIndex: 1, // Lower than bicycle
  }}>
          {showBack && (
            <div style={{
              position:"absolute",top:-52,left:"50%",transform:"translateX(-50%)",
              background:"white",padding:"8px 18px",borderRadius:30,
              fontFamily:"'Caveat',cursive",fontSize:22,color:"#5a4e43",
              boxShadow:"0 4px 14px rgba(0,0,0,.1)",whiteSpace:"nowrap",
            }}>✨ Enter Flower Shop ✨</div>
          )}
          <img
            src="/flowerShop.png"
            alt="Flower shop"
            style={{ width:"100%", filter:"sepia(15%) contrast(1.05) brightness(.97)",borderRadius:6 }}
          />
        </div>
      </div>

      {/* ── SHOP SCREEN ── */}
      <div style={{
        position:"absolute", inset:0,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"flex-start",
        background:"linear-gradient(160deg,#f9f6f0,#f0ebe0)",
        opacity: phase === "shop" ? 1 : 0,
        pointerEvents: phase === "shop" ? "auto" : "none",
        transition:"opacity .65s",
        minHeight:620,
        overflowY:"auto",
      }}>
        <button onClick={handleExit} style={{
          position:"absolute",top:18,left:18,zIndex:10,
          background:"white",padding:"9px 18px",borderRadius:25,
          fontFamily:"'Caveat',cursive",fontSize:20,color:"#5a4e43",
          cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.08)",border:"none",
        }}>{exitLabel}</button>

        {/* personalised header */}
        <div style={{ marginTop:70, textAlign:"center" }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:15,color:"#c0392b",letterSpacing:3,
            textTransform:"uppercase",marginBottom:4,
          }}>
            a gift for
          </div>
          <div style={{
            fontFamily:"'Caveat',cursive",fontSize:46,
            color:"#2c2825",lineHeight:1,
            background:"linear-gradient(90deg,#c0392b,#e67e22,#c0392b)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            animation:"shimmer 4s linear infinite",
          }}>
            {recipientName}
          </div>
          <div style={{ color:"#9a8f82",fontSize:13,marginTop:4,marginBottom:22 }}>
            choose the flower that speaks your heart
          </div>
        </div>

        <div style={{
          display:"grid",gridTemplateColumns:"repeat(3,1fr)",
          gap:14,width:"92%",maxWidth:620,paddingBottom:28,
        }}>
          {FLOWERS.map(f => (
            <FlowerCard key={f.name} flower={f} onSelect={pickFlower}/>
          ))}
        </div>

        {/* SPECIAL POPUP */}
        <SpecialPopup
          flower={selected}
          recipientName={recipientName}
          onClose={() => { setSelected(null); setExitLabel("⬅ Exit Flower Shop"); }}
        />
      </div>

    </div>
  );
}
