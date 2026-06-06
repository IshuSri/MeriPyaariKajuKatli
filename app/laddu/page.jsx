"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from 'react-confetti-boom';
 
const FLOWERS = [
  {
    emoji: "/sunflower.png", name: "Sunflower",
    color: ["#fff8e7", "#f5a623"],
    poem: ["You are my sunflower. I often think about the sunflower theory....how they turn to face the light....and I realize that’s exactly what my heart does with you. You are like the sun on a crisp, cold winter morning; just knowing you are there melts away all the frost and warms me from the inside out. Your presence makes me glow in a way nothing else can, turning my darkest, coldest days into something bright and worth waking up for. You don’t just shine; you make the world around you bloom, and I am so lucky to be in your light."],
    tag: "warmth",
    music: "/Sunflower.mp3",   // ← any path in your /public folder
    profileImage: "/Profile/sunflower_profile.jpg", // ← optional: path to profile image for this flower
  },
  {
    emoji: "/tulip.png", name: "Tulip",
    color: ["#fff0f5", "#d45c7a"],
    poem: ["Today only you know that tulips are the perfect way to describe the warmth and comfort you bring into my life. Just like these flowers, you have an effortless way of brightening any space you enter, bringing color to my otherwise colorless world. Every time I look at your face, everything feels more vibrant. Mini, you have such a great smile....it’s honestly the most contagious thing I’ve ever seen. The warmth that radiates from it literally gives me life, and I am so deeply grateful for your ability to do that for me every single day. You make everything feel like spring."],
    tag: "grace",
    music: "/Tulip.mp3",
    profileImage: "/Profile/tulip_profile.jpg",
  },
  {
    emoji: "/rose.png", name: "Rose",
    color: ["#fff0f0", "#c0392b"],
    poem: ["Your presence is like a rose. Traditionally, the rose is considered the ultimate symbol of love, and I finally understand why. While many flowers come and go, none can come close to being as complete and perfect as a rose. Everyone who comes across it admires its beauty, but its true value lies in the depth of what it represents. You have a way of making ordinary moments feel special, and no matter how many other beautiful things exist in this world, none can replace the one that truly means the most to me."],
    tag: "love",
    music: "/Rose.mp3", 
    profileImage: "/Profile/rose_profile.jpg",
  },
  
  {
    emoji: "/lotus.png", name: "Lotus",
    color: ["#f0f8ff", "#5b8fa8"],
    poem: ["You are like a lotus to me, and I am the murky pond you bloom in. It’s said that the lotus remains untouched by the mud it grows from, and that is exactly how I see your purity—a soul so bright and untainted that it turns my life into something beautiful just by being here. That pond gets no real recognition until a lotus finally blooms within it, and your grace is so admirable that I’m constantly scared the world might try to take you away. You’ve become such a vital, inseparable part of who I am. The world may be messy, but you always rise above it with such poise. What I admire most is not just your beauty, but your strength—the way you keep blooming, perfectly pure and resilient, no matter what life puts around you."],
    tag: "strength",
    music: "/Lotus.mp3",
    profileImage: "/Profile/lotus_profile.jpg",
  },
  {
    emoji: "/bouquet.png", name: "Bouquet",
    color: ["#f5f0ff", "#7c5cbf"],
    poem: ["To be honest, if you were a flower, you wouldn't just be one...you would be the entire bouquet. A bouquet is a collection of everything beautiful, and that’s what you are to me: a perfect, harmonious mix of everything I could ever ask for. When I look at you, I don't just see one quality; I see your kindness, your strength, your smile, and your grace all coming together to create something complete. You are the vibrant bloom that makes my entire life feel like a masterpiece, and I wouldn't want to change a single thing about how perfectly you fit into my world."],
    tag: "everything",
    music: "/Bouquet.mp3",
    profileImage: "/Profile/profile_bouquet.jpg",
  },
  {
    emoji: "/hibiscus.png", name: "Hibiscus",
    color: ["#fff4ee", "#e8632a"],
    poem: ["You are like a hibiscus flower....full of life, zeal, color, and an energy that makes the world feel more vibrant just by you being in it. You are so special that even your smallest gestures or actions turn the simplest days into memories I want to hold onto. Your care feels like a special treatment that I find myself craving every single day. A simple, thoughtful 'Aapne kuch khaya?' or 'Araam se jaana' from you is enough to make my entire day feel meaningful. Your kindness, your excitement, and the way you care about things make everything around you feel bright, warm, and alive."],
    tag: "vibrance",
    music: "/Hibiscus.mp3",
    profileImage: "/Profile/profile_hibiscus.jpg",
  },
  {
    emoji: "/cherry_blossom.png", name: "Cherry Blossom",
    color: ["#fff5f8", "#e8a0b4"],
    poem: ["You remind me of cherry blossoms. You always say that people might go but memories stay, and thanks to you, I have a collection of the sweetest memories I’ll cherish for the rest of my life. From receiving cards for the first time to those unforgettable hugs at the airport, you’ve taught me to truly appreciate the beauty of the present. Just like these blossoms, our time together is precious—not because it’s temporary, but because every second with you feels like a gift I’m meant to hold onto forever."],
    tag: "beauty",
    music: "/CherryBlossom.mp3",
    profileImage: "/Profile/profile_cherry_blossom.jpg",
  },
  {
    emoji: "/lavender.png", name: "Lavender",
    color: ["#f6f0ff", "#9b7ec8"],
    poem: ["You are like lavender to me. In a world that often feels loud and exhausting, you are my sanctuary—I find such deep comfort simply being in your presence or resting in your arms. I still remember the bouquet you gave me when I was leaving for Hyderabad; I held it so tight the entire way because it felt like I was holding onto you. You have a way of making life feel safe, calm, and grounded, and having that piece of you with me made all the difference in the world."],
    tag: "calm",
    music: "/Lavender.mp3",
    profileImage: "/Profile/profile_lavender.jpg",
  },
  {
    emoji: "/babys_breath.png", name: "Baby's Breath",
    color: ["#f8f8f8", "#a0a0a0"],
    poem: ["You are my Baby’s Breath, and there is no flower I could ever love more. I’ll never forget our first date at Marine Drive, when we plucked these together—they were special then, but they mean everything to me now because they represent you. I adore every little thing you do for me: the way you gently wipe my dirty face, your care in reminding me to avoid milk after eating fish, or how you lean down to tie my loose laces. I am constantly amazed by what you notice, the way you remember my favorite things, and how you go out of your way to send my favorite snacks just to make me smile. You are the one who makes the 'little things' feel like the biggest acts of love. Just like these flowers, you are ever-blooming, and I am so grateful to have you by my side, making life beautiful in all the smallest, most perfect ways. I love you, my sweet baby."],
    tag: "everything small",
    music: "/BabysBreath.mp3",
    profileImage: "/Profile/profile_babys_breath.jpg",
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
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
      {items.map((p) => (
        <div
          key={p.id}
          style={{
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
          }}
        />
      ))}
    </div>
  );
}
 
/* ── STAR DECORATION ── hydration-safe: generated client-side only ── */
function Stars() {
  const [stars, setStars] = useState([]);
 
  useEffect(() => {
    setStars(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        top: `${8 + Math.random() * 50}%`,
        left: `${5 + Math.random() * 90}%`,
        delay: `${Math.random() * 2}s`,
        size: 6 + Math.random() * 8,
        duration: `${1.5 + Math.random()}s`,
      }))
    );
  }, []);
 
  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: "#f5c842",
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
            animation: `starTwinkle ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
 
/* ── NAME ENTRY SCREEN ── */
function NameEntry({ onConfirm }) {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden rounded-2xl"
      style={{ background: "linear-gradient(160deg,#f7f3ec,#ede8df)" }}>
      <Stars />
 
      {/* ribbon */}
      <div
        className="absolute top-7 w-full text-center text-[#c9a97a] tracking-[3px] text-lg"
        style={{ fontFamily: "'Caveat',cursive", animation: "ribbonDrift 4s ease-in-out infinite" }}
      >
        ✦ a flower for someone special ✦
      </div>
 
      <div
        className="relative text-center w-[88%] max-w-[480px] rounded-[32px] px-12 py-14"
        style={{
          background: "rgba(255,255,255,.72)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(220,205,185,.6)",
          boxShadow: "0 20px 60px rgba(0,0,0,.07)",
        }}
      >
        <div className="text-[56px] mb-2">🌸</div>
 
        <div
          className="text-[32px] font-semibold text-[#3a2e25] mb-1 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond',serif" }}
        >
          Who is this for?
        </div>
 
        <div
          className="text-sm text-[#9a8f82] mb-8 leading-relaxed"
          style={{ fontFamily: "'Poppins',sans-serif" }}
        >
          Enter their name and we'll make every flower
          <br />
          bloom just a little more beautifully.
        </div>
 
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onConfirm(name.trim())}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="their name…"
          className="w-full px-5 py-3.5 text-[24px] text-[#3a2e25] text-center rounded-2xl outline-none transition-all duration-300"
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            background: "rgba(255,252,245,.9)",
            border: `1.5px solid ${focused ? "#c0392b" : "rgba(200,185,165,.5)"}`,
            boxShadow: focused ? "0 0 0 4px rgba(192,57,43,.08)" : "none",
          }}
        />
 
        <button
          onClick={() => name.trim() && onConfirm(name.trim())}
          disabled={!name.trim()}
          className="mt-5 w-full py-3.5 rounded-2xl text-[15px] font-medium tracking-[0.5px] border-none transition-all duration-300"
          style={{
            fontFamily: "'Poppins',sans-serif",
            background: name.trim()
              ? "linear-gradient(135deg,#c0392b,#e74c3c)"
              : "rgba(200,190,175,.35)",
            color: name.trim() ? "white" : "#b0a090",
            cursor: name.trim() ? "pointer" : "default",
            animation: name.trim() ? "glowPulse 2s ease-in-out infinite" : "none",
          }}
        >
          Enter the Flower Shop →
        </button>
      </div>
 
      <div
        className="absolute bottom-6 text-[#c0b09a] tracking-[1px] text-base"
        style={{ fontFamily: "'Caveat',cursive" }}
      >
        skip? just press enter with a nickname ✦
      </div>
    </div>
  );
}
 
/* ── BICYCLE ── */
function Bicycle({ riding }) {
  const a = riding
    ? { animation: "spin .8s linear infinite", animationPlayState: "running" }
    : { animation: "spin .8s linear infinite", animationPlayState: "paused" };

  const p = riding
    ? { animation: "spin .52s linear infinite", animationPlayState: "running" }
    : { animation: "spin .52s linear infinite", animationPlayState: "paused" };

  const b = riding
    ? { animation: "bob .52s ease-in-out infinite", animationPlayState: "running" }
    : { animation: "bob .52s ease-in-out infinite", animationPlayState: "paused" };

  return (
    <svg width="188" viewBox="0 0 200 120" style={{ display: "block" }}>
      <g style={{ transformOrigin: "52px 80px", ...a }}>
        <circle cx="52" cy="80" r="34" fill="none" stroke="#3a3028" strokeWidth="3.5" />
        <circle cx="52" cy="80" r="5" fill="#3a3028" />
        <line x1="52" y1="46" x2="52" y2="114" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="18" y1="80" x2="86" y2="80" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="28" y1="56" x2="76" y2="104" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="76" y1="56" x2="28" y2="104" stroke="#5a5048" strokeWidth="1.5" />
        <circle cx="52" cy="80" r="28" fill="none" stroke="#5a5048" strokeWidth="1" />
        <circle cx="52" cy="80" r="4" fill="#6a6058" />
      </g>
      <g style={{ transformOrigin: "148px 80px", ...a }}>
        <circle cx="148" cy="80" r="34" fill="none" stroke="#3a3028" strokeWidth="3.5" />
        <circle cx="148" cy="80" r="5" fill="#3a3028" />
        <line x1="148" y1="46" x2="148" y2="114" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="114" y1="80" x2="182" y2="80" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="124" y1="56" x2="172" y2="104" stroke="#5a5048" strokeWidth="1.5" />
        <line x1="172" y1="56" x2="124" y2="104" stroke="#5a5048" strokeWidth="1.5" />
        <circle cx="148" cy="80" r="28" fill="none" stroke="#5a5048" strokeWidth="1" />
        <circle cx="148" cy="80" r="4" fill="#6a6058" />
      </g>
      <g style={b}>
        <line x1="52" y1="80" x2="100" y2="55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
        <line x1="52" y1="80" x2="88" y2="32" stroke="#c0392b" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="88" y1="32" x2="140" y2="36" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="36" x2="100" y2="55" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
        <line x1="100" y1="55" x2="88" y2="32" stroke="#c0392b" strokeWidth="4" strokeLinecap="round" />
        <line x1="140" y1="36" x2="148" y2="80" stroke="#c0392b" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="140" y1="36" x2="142" y2="22" stroke="#3a3028" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="134" y1="22" x2="150" y2="22" stroke="#3a3028" strokeWidth="4" strokeLinecap="round" />
        <line x1="88" y1="32" x2="86" y2="16" stroke="#3a3028" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M74,16 Q86,10 98,16" fill="none" stroke="#3a3028" strokeWidth="4" strokeLinecap="round" />
        <path d="M28,60 Q52,46 76,60" fill="none" stroke="#3a3028" strokeWidth="2" opacity=".6" />
        <path d="M126,58 Q148,44 170,58" fill="none" stroke="#3a3028" strokeWidth="2" opacity=".6" />
        <circle cx="100" cy="72" r="14" fill="none" stroke="#3a3028" strokeWidth="2" />
        <circle cx="100" cy="72" r="8" fill="none" stroke="#5a5048" strokeWidth="1.5" />
        <g style={{ transformOrigin: "100px 72px", ...p }}>
          <line x1="88" y1="72" x2="112" y2="72" stroke="#3a3028" strokeWidth="3" strokeLinecap="round" />
          <rect x="82" y="68" width="10" height="8" rx="2" fill="#4a4038" />
          <rect x="108" y="68" width="10" height="8" rx="2" fill="#4a4038" />
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
      whileHover={{ y: -12, scale: 1.05 }}
      animate={{ rotate: hov ? [-1, 1, -1, 0] : 0 }}
      transition={{
        y: { type: "spring", stiffness: 300, damping: 15 },
        rotate: { type: "tween", duration: 0.35 },
      }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onClick={() => onSelect(flower)}
      className="relative overflow-hidden text-center cursor-pointer rounded-[22px] px-3 py-5"
      style={{
        background: "rgba(255,255,255,.72)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(200,190,175,.4)",
      }}
    >
      {hov && (
        <div
          className="absolute top-2 right-2.5 text-[11px] font-medium px-2 py-0.5 rounded-full tracking-[0.5px]"
          style={{
            fontFamily: "'Poppins',sans-serif",
            color: flower.color[1],
            background: `${flower.color[0]}cc`,
          }}
        >
          {flower.tag}
        </div>
      )}
      <div className="text-[52px] leading-none flex items-center justify-center">
        <img src={flower.emoji} alt={flower.name} className="w-16 h-16 object-cover" />
      </div>
      <div
        className="mt-2 text-[22px] text-[#4a3f35]"
        style={{ fontFamily: "'Caveat',cursive" }}
      >
        {flower.name}
      </div>
    </motion.div>
  );
}
 
/* ── MUSIC TAPE PLAYER ── */
function MusicTapePlayer({ accent, bgLight, tapeGifPath, defaultSrc,profileImagePath }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackName, setTrackName] = useState(null);
  const [rotate,setRotate]=useState(true);
  const audioRef = useRef(null);
  const animFrameRef = useRef(null);

  // ── auto-play defaultSrc when component mounts ──
  useEffect(() => {
    if (!defaultSrc || !audioRef.current) return;
    // derive a display name from the filename  e.g. "myBaby.mp3" → "myBaby"
    const name = defaultSrc.split("/").pop().replace(/\.[^/.]+$/, "");
    setTrackName(name);
    audioRef.current.src = defaultSrc;
    audioRef.current.load();
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // browser blocked autoplay (requires prior user gesture) — sit silently
        setIsPlaying(false);
      });
    return () => {
      // pause & reset when popup closes / component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      setIsPlaying(false);
     
    };
  }, [defaultSrc]);

  

  

  const updateProgress = () => {
    if (!audioRef.current) return;
    const curr = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 0;
    
    animFrameRef.current = requestAnimationFrame(updateProgress);
  };

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateProgress);
    } else {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);

 
  const spoolStyle = {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: `3px solid ${accent}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: isPlaying ? "spinSpool 2s linear infinite" : "none",
  };

  return (
    <div
      onClick={()=>setRotate(!rotate)}
      className="relative overflow-hidden rounded-[18px] mb-5"
      style={{
        background: "linear-gradient(135deg,#2b1f18 0%,#1a1210 100%)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >

      {
        rotate ? <>
         {/* top accent line */}
          <div 
            className="absolute top-0 left-0 right-0 h-[3px] z-[2]"
            style={{
              background: `linear-gradient(90deg,${accent}aa,${accent},${accent}aa)`,
              opacity: 0.7,
            }}
          />

          {/* GIF / fallback visual area */}
          <div className="relative w-full h-70 overflow-hidden rounded-t-[18px]">
            {tapeGifPath ? (
              <img
                src={tapeGifPath}
                alt="cassette tape"
                className="w-full h-full object-cover block transition-all duration-500"
                style={{
                  filter: isPlaying ? "none" : "grayscale(60%) brightness(0.6)",
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center gap-5"
                style={{ background: "linear-gradient(135deg,#2b1f18 0%,#1a1210 100%)" }}
              >
                {[0, 1].map((i) => (
                  <div key={i} style={{ ...spoolStyle, animationDelay: i === 1 ? "0.3s" : "0s" }}>
                    <div
                      style={{
                        width: 10, height: 10, borderRadius: "50%",
                        border: `2px solid ${accent}`, background: "#1a1210",
                      }}
                    />
                  </div>
                ))}
                <div
                  className="absolute h-1 rounded-sm"
                  style={{
                    width: "30%", background: `${accent}66`,
                    top: "50%", left: "35%", transform: "translateY(-50%)",
                  }}
                />
              </div>
            )}

            {/* bottom gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-12"
              style={{ background: "linear-gradient(transparent,rgba(20,12,8,0.85))" }}
            />

            {/* NOW PLAYING badge — pulses when playing */}
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-lg"
              style={{
                background: `${accent}22`,
                border: `1px solid ${accent}55`,
                backdropFilter: "blur(6px)",
                animation: isPlaying ? "glowPulse 2s ease-in-out infinite" : "none",
              }}
            >
              <span
                className="text-[10px] font-semibold tracking-[2px] uppercase"
                style={{ fontFamily: "'Cormorant Garamond',serif", color: accent }}
              >
                {isPlaying ? "▶ " : "♪ "}{trackName ?? "Now Playing"}
              </span>
            </div>

          </div>
        </>:
        <div className="relative w-full h-70 overflow-hidden rounded-t-[18px]">
          <img src={profileImagePath } alt="profile" className="w-full h-70 object-cover block" />
           <Confetti  particleCount={100} shapeSize={30} deg={270} x={0.1}  y={0.8} fadeOutHeight={1} />
           <Confetti  particleCount={100} shapeSize={30} deg={270} x={0.8}  y={0.8} fadeOutHeight={1} />

      
        </div>
      }
     

      {/* controls strip */}
      

      <audio
        ref={audioRef}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

      <style>{`
        @keyframes spinSpool {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
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
      className="absolute inset-0 flex items-center justify-center rounded-2xl z-30 overflow-y-auto overflow-x-hidden p-5"
      style={{
        background: "rgba(30,20,15,.5)",
        opacity: flower ? 1 : 0,
        transition: "opacity .4s",
        backdropFilter: "blur(4px)",
      }}
    >
      <Petals active={!!flower} color={accent} />
 
      <div
        className="relative w-[90%] max-w-[560px] max-h-[80vh] overflow-y-auto rounded-[32px] px-10 py-11"
        style={{
          background: `linear-gradient(145deg,${bgLight} 0%,#fffefb 100%)`,
          boxShadow: `0 30px 80px rgba(0,0,0,.18), 0 0 0 1px ${accent}22`,
          animation: "fadeSlideUp .5s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* shimmer band */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: `linear-gradient(90deg,transparent,${accent},transparent,${accent},transparent)`,
            backgroundSize: "200% auto",
            animation: "shimmer 3s linear infinite",
          }}
        />
 
        <button
          onClick={onClose}
          className="absolute top-4 right-[18px] bg-transparent border-none text-[22px] text-[#9a8f82] cursor-pointer"
        >
          ✕
        </button>
 
        {/* header */}
        <div className="text-center mb-7">
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-[52px] flex items-center justify-center leading-none flex-shrink-0"
          >
            <img src={flower.emoji} alt={flower.name} className="w-16 h-16 object-cover" />
          </motion.div>
 
          <div
            className="text-[13px] font-semibold tracking-[3px] uppercase mt-2.5 mb-1"
            style={{ fontFamily: "'Cormorant Garamond',serif", color: accent }}
          >
            {flower.tag}
          </div>
 
          <div
            className="text-[34px] font-semibold text-[#2c2420] leading-tight"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            for&nbsp;
            <span
              className="inline-block"
              style={{
                color: accent,
                animation: "nameReveal .8s .3s both ease-out",
              }}
            >
              {recipientName}
            </span>
          </div>
        </div>
 
        {/* poem lines */}
        <div
          className="py-5 px-2 mb-5 min-h-[120px]"
          style={{
            borderTop: `1px solid ${accent}30`,
            borderBottom: `1px solid ${accent}30`,
          }}
        >
          {flower.poem.map((line, i) => (
            <p
              key={i}
              className="text-[19px] italic text-center m-0.5 leading-[1.75] transition-all duration-[600ms] ease-in-out"
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                color: i < lineIdx ? "#3a2e25" : "transparent",
                opacity: i < lineIdx ? 1 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>
 
        {/* ── TAPE PLAYER (above heart sign-off) ── */}
        <MusicTapePlayer
        accent={accent}
        bgLight={bgLight}
        tapeGifPath="/tape.gif"
        defaultSrc={flower.music}   // ← any path in your /public folder
        profileImagePath={flower.profileImage}
        />
 
        {/* heart sign-off */}
        {showHeart && (
          <div className="text-center" style={{ animation: "fadeSlideUp .5s ease" }}>
            <span
              className="text-[18px] text-[#9a8f82] tracking-[1px]"
              style={{ fontFamily: "'Caveat',cursive" }}
            >
              with all the warmth this flower carries
            </span>
            <div className="text-[28px] mt-1.5">❤️</div>
          </div>
        )}
      </div>
    </div>
  );
}
 
/* ── MAIN APP ── */
export default function FlowerShopStory() {
  const [phase, setPhase] = useState("name");
  const [recipientName, setRecipientName] = useState("");
  const [riding, setRiding] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [selected, setSelected] = useState(null);
  const [exitLabel, setExitLabel] = useState("⬅ Exit Flower Shop");
  const bgMusicRef = useRef(null);
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
    return () => document.head.removeChild(styleEl);
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
    // start background music
  if (bgMusicRef.current) {
    bgMusicRef.current.currentTime = 0;
    bgMusicRef.current.play().catch(() => {});
  }
    addT(() => setArrived(true), 600);
    addT(() => { setRiding(false); setShowBack(true); }, 10000);
  }
 
  function enterShop() {
    if (!arrived) return;

     // stop background music
  if (bgMusicRef.current) {
    bgMusicRef.current.pause();
    bgMusicRef.current.currentTime = 0;
  }
    setPhase("shop");
  }
 
  function goStart() {
    clearTs();
    setPhase("name");
    setRecipientName("");
        // stop background music
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
  
    setRiding(false);
    setArrived(false);
    setShowBack(false);
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
 
  if (phase === "name") return <NameEntry onConfirm={confirmName} />;
 
  return (
    <div
      className="relative overflow-hidden rounded-2xl min-h-screen"
      style={{
        fontFamily: "'Poppins',sans-serif",
        background: "linear-gradient(160deg,#f7f3ec,#ede8df)",
      }}
    >
      {/* ── RIDE SCREEN ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-[650ms]"
        style={{
          opacity: phase === "ride" ? 1 : 0,
          pointerEvents: phase === "ride" ? "auto" : "none",
        }}
      >
        <div
          className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[44px] text-[#2c2825] tracking-[-1px]"
          style={{ fontFamily: "'Caveat',cursive" }}
        >
          Ride to the Flower Shop
        </div>
        <div className="absolute top-[92px] left-1/2 -translate-x-1/2 text-[#9a8f82] text-sm whitespace-nowrap">
          tap the bicycle to begin the journey
        </div>
 
        {showBack && (
          <button
            onClick={goStart}
            className="absolute top-[18px] left-[18px] bg-white px-[18px] py-[9px] rounded-[25px] text-[20px] text-[#5a4e43] cursor-pointer border-none z-10"
            style={{
              fontFamily: "'Caveat',cursive",
              boxShadow: "0 4px 14px rgba(0,0,0,.08)",
            }}
          >
            ⬅ Start Over
          </button>
        )}
 
        {/* trees */}
        <svg
          className="absolute bottom-32 left-0 w-full overflow-visible"
          style={{ height: 90 }}
          viewBox="0 0 700 90"
          preserveAspectRatio="xMidYMid meet"
        >
          {[60, 190, 340, 500, 640].map((x, i) => (
            <g key={i} transform={`translate(${x},${i % 2 === 0 ? 0 : 8})`}>
              <rect x="-3" y="48" width="6" height="28" fill="#b09070" rx="2" />
              <ellipse
                cx="0" cy="38"
                rx={14 + (i % 3) * 3}
                ry={18 + (i % 3) * 4}
                fill={["#8aaa6a", "#9aba7a", "#7aa060", "#90b06e", "#82a860"][i]}
                opacity=".68"
              />
            </g>
          ))}
        </svg>
 
        {/* road */}
        <div className="absolute bottom-32 w-full">
          <div className="w-full h-2 bg-[#d0c8bc] relative">
            <div
              className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#b8b0a5 0,#b8b0a5 30px,transparent 30px,transparent 60px)",
              }}
            />
          </div>
        </div>
        <div
          className="absolute bottom-0 w-full h-32"
          style={{ background: "linear-gradient(180deg,#e8e2d8,#ddd6c8)" }}
        >
          <div
            className="absolute top-0 w-full h-3.5"
            style={{
              background:
                "repeating-linear-gradient(90deg,#b4c99a 0,#b4c99a 8px,#a8be8a 8px,#a8be8a 18px,#b8cd9f 18px,#b8cd9f 26px,#aec190 26px,#aec190 34px)",
            }}
          />
        </div>
 
        {/* bicycle */}
        <motion.div
          onClick={startRide}
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            x: arrived ? 1000 : 0, // adjust distance
          }}
          transition={{
            duration: 14.5,
            ease: [0.3, 0, 0.01, 1],
          }}
          className="absolute bottom-[136px] cursor-pointer z-10"
          style={{
            left: "6%",
            filter: "drop-shadow(2px 6px 10px rgba(0,0,0,.12))",
            willChange: "transform",
          }}
        >
          <Bicycle riding={riding} />
        </motion.div>
 
        {/* shop */}
        <div
          onClick={enterShop}
          className="absolute bottom-[136px] w-[280px] cursor-pointer z-[1]"
          style={{
            right: arrived ? "6%" : "-420px",
            transition: "right 14s cubic-bezier(.4,0,.2,1)",
          }}
        >
          {showBack && (
            <div
              className="absolute -top-[52px] left-1/2 -translate-x-1/2 bg-white px-[18px] py-2 rounded-[30px] text-[22px] text-[#5a4e43] whitespace-nowrap"
              style={{
                fontFamily: "'Caveat',cursive",
                boxShadow: "0 4px 14px rgba(0,0,0,.1)",
              }}
            >
              ✨ Enter Flower Shop ✨
            </div>
          )}
          <img
            src="/flowerShop.png"
            alt="Flower shop"
            className="w-full rounded-[6px]"
            style={{ filter: "sepia(15%) contrast(1.05) brightness(.97)" }}
          />
        </div>
        <audio
        ref={bgMusicRef}
        src="/BgMusic.mp3"
        loop
      />
      </div>
 
      {/* ── SHOP SCREEN ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-start min-h-[620px] overflow-y-auto transition-opacity duration-[650ms]"
        style={{
          background: "linear-gradient(160deg,#f9f6f0,#f0ebe0)",
          opacity: phase === "shop" ? 1 : 0,
          pointerEvents: phase === "shop" ? "auto" : "none",
        }}
      >
        <button
          onClick={handleExit}
          className="absolute top-[18px] left-[18px] z-10 bg-white px-[18px] py-[9px] rounded-[25px] text-[20px] text-[#5a4e43] cursor-pointer border-none"
          style={{
            fontFamily: "'Caveat',cursive",
            boxShadow: "0 4px 14px rgba(0,0,0,.08)",
          }}
        >
          {exitLabel}
        </button>
 
        {/* header */}
        <div className="mt-[70px] text-center">
          <div
            className="text-[15px] tracking-[3px] uppercase text-[#c0392b] mb-1"
            style={{ fontFamily: "'Cormorant Garamond',serif" }}
          >
            a gift for
          </div>
          <div
            className="text-[46px] leading-none"
            style={{
              fontFamily: "'Caveat',cursive",
              color: "#2c2825",
              background: "linear-gradient(90deg,#c0392b,#e67e22,#c0392b)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}
          >
            {recipientName}
          </div>
          <div className="text-[#9a8f82] text-[13px] mt-1 mb-5">
            choose the flower that speaks your heart
          </div>
        </div>
 
        <div className="grid grid-cols-3 gap-3.5 w-[92%] max-w-[620px] pb-7">
          {FLOWERS.map((f) => (
            <FlowerCard key={f.name} flower={f} onSelect={pickFlower} />
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