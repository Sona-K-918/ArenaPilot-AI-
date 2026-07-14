import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Compass, 
  CheckCircle, 
  Volume2, 
  QrCode, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles,
  Sliders,
  X
} from "lucide-react";

interface StadiumAssistantProps {
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  activeSubViewDetail: string | null;
  setActiveSubViewDetail: (view: string | null) => void;
  gameTimeMinutes: number;
  homeScore: number;
  awayScore: number;
  selectedFood: string | null;
  setSelectedFood: (food: string | null) => void;
  foodQuantity: number;
  setFoodQuantity: (qty: number) => void;
  isFoodOrderPlaced: boolean;
  setIsFoodOrderPlaced: (placed: boolean) => void;
  selectedWashroom: string | null;
  setSelectedWashroom: (wc: string | null) => void;
  sosCountdown: number | null;
  setSosCountdown: (count: number | null) => void;
  isSosActive: boolean;
  setIsSosActive: (active: boolean) => void;
  sosStewardLocation: string;
}

export default function StadiumAssistant({
  isAssistantOpen,
  setIsAssistantOpen,
  activeSubViewDetail,
  setActiveSubViewDetail,
  gameTimeMinutes,
  homeScore,
  awayScore,
  selectedFood,
  setSelectedFood,
  foodQuantity,
  setFoodQuantity,
  isFoodOrderPlaced,
  setIsFoodOrderPlaced,
  selectedWashroom,
  setSelectedWashroom,
  sosCountdown,
  setSosCountdown,
  isSosActive,
  setIsSosActive,
  sosStewardLocation
}: StadiumAssistantProps) {

  // Drinks Mixer states
  const [drinkEnergy, setDrinkEnergy] = useState<number>(85);
  const [drinkFlavor, setDrinkFlavor] = useState<number>(60);
  const [drinkIce, setDrinkIce] = useState<number>(95);
  const [isDrinkBrewed, setIsDrinkBrewed] = useState<boolean>(false);

  // Settings states
  const [flashlightEnabled, setFlashlightEnabled] = useState<boolean>(true);
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(true);
  const [commentaryEnabled, setCommentaryEnabled] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(75);

  const features = [
    { id: "seat", title: "My Seat", subtitle: "Live compass route", color: "#3B82F6", icon: "🪑" },
    { id: "food", title: "Food", subtitle: "Halftime queue skip", color: "#F59E0B", icon: "🍔" },
    { id: "drinks", title: "Drinks", subtitle: "Refreshments & mocktails", color: "#06B6D4", icon: "🥤" },
    { id: "queue", title: "Restroom", subtitle: "AI traffic predictions", color: "#EC4899", icon: "🚻" },
    { id: "trans", title: "Translation", subtitle: "Instant volunteer voice", color: "#8B5CF6", icon: "🌐" },
    { id: "exit", title: "Exit", subtitle: "Post-match escape route", color: "#22C55E", icon: "🚪" },
    { id: "settings", title: "Settings", subtitle: "Haptics, flashlights", color: "#64748B", icon: "⚙" },
    { id: "profile", title: "Profile", subtitle: "Holographic FUT card", color: "#EAB308", icon: "👤" },
  ];

  return (
    <div id="stadium-assistant-panel" className="absolute inset-y-0 left-0 w-[75vw] md:w-[420px] z-10 animate-match-gradient overflow-y-auto no-scrollbar flex flex-col text-white">
      {/* Subtle Stadium Light overlay */}
      <div className="absolute inset-0 bg-black/35 z-0" />
      
      {/* Dynamic Physical Lighting Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 z-0">
        <div className="absolute top-0 left-1/4 w-36 h-[150%] bg-gradient-to-b from-white/30 via-white/5 to-transparent origin-top rotate-[-15deg] blur-lg"></div>
        <div className="absolute top-0 right-1/4 w-36 h-[150%] bg-gradient-to-b from-white/30 via-white/5 to-transparent origin-top rotate-[15deg] blur-lg"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_12px]"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-5 h-full justify-between">
        
        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          
          {/* Header Block */}
          <div className="flex flex-col mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏟</span>
                <span className="text-sm font-black uppercase tracking-widest text-white/90">ArenaPilot AI</span>
              </div>
              <button 
                onClick={() => setIsAssistantOpen(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors"
                title="Collapse Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 bg-black/45 border border-white/10 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 text-black rounded-full flex items-center justify-center font-black text-xs shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                SK
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-black uppercase tracking-tight text-white truncate">Sonakshi Kaushik</p>
                <div className="flex gap-2 text-[9px] text-white/70 font-mono mt-0.5 font-semibold">
                  <span className="bg-white/10 px-1.5 py-0.5 rounded text-lime-300">SEC 104</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded">ROW L</span>
                  <span className="bg-white/10 px-1.5 py-0.5 rounded">SEAT 12</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-[8px] text-lime-400 font-black uppercase tracking-widest">STADIUM LEVEL</span>
                <span className="text-[10px] font-black text-white/90 uppercase font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5 mt-0.5 inline-block">GATE 4</span>
              </div>
            </div>
          </div>

          {/* Back Button for Detail Subviews */}
          {activeSubViewDetail !== null && (
            <button 
              onClick={() => setActiveSubViewDetail(null)}
              className="mb-4 self-start bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase text-[10px] tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              ← Back to Assistant Grid
            </button>
          )}

          {/* Subview Content Router */}
          <div className="flex-1 flex flex-col justify-start">
            
            {/* GRID OF FEATURE CARDS (Visible only when no subview is open) */}
            {activeSubViewDetail === null && (
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest text-left">STADIUM COPILOT SERVICES</span>
                <div className="grid grid-cols-2 gap-3.5">
                  {features.map((f) => (
                    <motion.div
                      key={f.id}
                      whileHover={{ 
                        y: -3, 
                        scale: 1.03,
                        boxShadow: `0 0 20px ${f.color}35`,
                        borderColor: f.color 
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveSubViewDetail(f.id)}
                      className="bg-black/45 border border-white/10 p-3.5 rounded-2xl cursor-pointer transition-colors flex flex-col justify-between aspect-square select-none group text-left"
                    >
                      <div className="flex justify-between items-start">
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg bg-white/5"
                          style={{ textShadow: `0 0 10px ${f.color}` }}
                        >
                          {f.icon}
                        </div>
                        <span className="text-[10px] text-white/30 font-bold font-mono group-hover:text-white/80 transition-colors">→</span>
                      </div>
                      <div className="mt-2">
                        <h4 className="text-xs font-black uppercase tracking-tight text-white leading-tight">{f.title}</h4>
                        <p className="text-[8px] text-white/50 leading-tight mt-0.5 uppercase tracking-tighter truncate">{f.subtitle}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* 1. MY SEAT DETAIL VIEW */}
            {activeSubViewDetail === "seat" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-400">
                  <span>🪑</span> MY SEAT ROUTE PILOT
                </div>
                <div className="bg-black/45 border border-white/10 p-4 rounded-2xl relative overflow-hidden text-left">
                  <div className="absolute top-2.5 right-2.5 bg-blue-500/20 text-blue-400 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-blue-500/30">
                    PORTAL 12B
                  </div>
                  <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider block">YOUR MATCHDAY ASSIGNED HUD</span>
                  <h3 className="text-xl font-black italic uppercase text-white mt-1 leading-none">SEC 104 • ROW L • SEAT 12</h3>
                  <p className="text-[10px] text-blue-300 mt-1.5 uppercase font-semibold">Closest Concourse Entry: GATE 4 (North Side)</p>
                </div>

                <div className="flex flex-col gap-2.5 font-display mt-2 text-left">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">TACTICAL PATHFINDING</span>
                  
                  <div className="flex gap-3 items-start bg-white/2 p-2.5 rounded-xl border border-white/5">
                    <div className="w-5 h-5 bg-blue-500 text-white text-[10px] font-black rounded-full flex items-center justify-center mt-0.5 shrink-0">1</div>
                    <div>
                      <p className="text-xs font-black uppercase text-white">Enter via Gate 4 Turnstiles</p>
                      <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">Validate ticket QR code. Turnstile traffic: Clear (wait under 1 min).</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-white/2 p-2.5 rounded-xl border border-white/5">
                    <div className="w-5 h-5 bg-blue-500 text-white text-[10px] font-black rounded-full flex items-center justify-center mt-0.5 shrink-0">2</div>
                    <div>
                      <p className="text-xs font-black uppercase text-white">Concourse Ramp B (Level 1)</p>
                      <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">Walk up 40 meters. Avoid Elevator 3 as maintenance queue is congested.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start bg-white/2 p-2.5 rounded-xl border border-white/5">
                    <div className="w-5 h-5 bg-blue-500 text-white text-[10px] font-black rounded-full flex items-center justify-center mt-0.5 shrink-0">3</div>
                    <div>
                      <p className="text-xs font-black uppercase text-white">Enter Portal 104</p>
                      <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">Descend to Row L. Look for the physical green-tinted LED seat indicator.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b1220] border border-blue-500/20 p-4 rounded-xl flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <Compass className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: "12s" }} />
                    <div className="text-left">
                      <span className="text-[10px] block text-white/40 font-mono">LIVE COMPASS ACCURACY</span>
                      <span className="text-xs font-black uppercase italic text-blue-400">Heading North-West • 24m Away</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. FOOD DETAIL VIEW */}
            {activeSubViewDetail === "food" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-500">
                  <span>🍔</span> CONCESSIONS EXPRESS ORDER
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> AI SMART RECOMMENDATION
                  </div>
                  <p className="text-xs font-black italic uppercase text-white mt-1">Order now to beat the Halftime rush!</p>
                  <p className="text-[10px] text-white/70 leading-normal mt-1">
                    Sector 104 concessions wait is low. Halftime starts in 15m. Order now for instant express collection.
                  </p>
                </div>

                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">KIOSK MENU</span>
                
                <div className="flex flex-col gap-2">
                  {[
                    { id: "Jersey Tacos", title: "Pulisic's Jersey Tacos", detail: "Spicy grilled chicken, lime cream, cilantro", price: "$14.50", wait: "2m wait" },
                    { id: "Champion Nachos", title: "Championship Jalapeno Nachos", detail: "Hot cheese sauce, pickled jalapenos, double chips", price: "$12.00", wait: "4m wait" },
                  ].map((f) => (
                    <div 
                      key={f.id}
                      onClick={() => {
                        setSelectedFood(f.id);
                        setIsFoodOrderPlaced(false);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                        selectedFood === f.id ? "bg-amber-500/20 border-amber-500" : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-xs font-black uppercase text-white">{f.title}</p>
                        <p className="text-[10px] text-white/40 mt-0.5">{f.detail}</p>
                      </div>
                      <div className="text-right ml-3 shrink-0">
                        <p className="text-xs font-black text-amber-400">{f.price}</p>
                        <p className="text-[9px] text-white/40 uppercase font-mono">{f.wait}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedFood && !isFoodOrderPlaced && (
                  <div className="bg-black/45 border border-white/10 p-3 rounded-xl mt-2">
                    <div className="flex justify-between items-center text-xs mb-3">
                      <span className="font-bold uppercase text-white/60">Select Quantity:</span>
                      <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                        <button onClick={() => setFoodQuantity(Math.max(1, foodQuantity-1))} className="font-bold text-lg text-white/60 hover:text-white">-</button>
                        <span className="font-black text-sm">{foodQuantity}</span>
                        <button onClick={() => setFoodQuantity(foodQuantity+1)} className="font-bold text-lg text-white/60 hover:text-white">+</button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsFoodOrderPlaced(true)}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black uppercase italic tracking-tighter py-2.5 rounded-lg text-xs transition-colors"
                    >
                      SUBMIT EXPRESS KIOSK ORDER
                    </button>
                  </div>
                )}

                {isFoodOrderPlaced && (
                  <div className="bg-amber-500 text-black p-4 rounded-xl text-center flex flex-col items-center mt-2">
                    <CheckCircle className="w-8 h-8 mb-2" />
                    <h4 className="font-black uppercase tracking-tight text-sm">ORDER SENT TO KIOSK 4B</h4>
                    <p className="text-[10px] font-semibold uppercase text-black/70 mt-1">
                      Show barcode #AP-7491 at pick-up counter. Wait time: 3 mins.
                    </p>
                    <div className="bg-white p-2 rounded mt-3 inline-block">
                      <QrCode className="w-16 h-16 text-black" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. DRINKS DETAIL VIEW */}
            {activeSubViewDetail === "drinks" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-cyan-400">
                  <span>🥤</span> DYNAMIC DRINK MIXER
                </div>
                
                <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">★ COPA VIP ADRENALINE MIXER</span>
                  <h3 className="text-sm font-black uppercase mt-1">THE ARENAPILOT CUSTOM ELIXIR</h3>
                  <p className="text-[10px] text-white/60 mt-1 leading-relaxed">
                    Tweak the sliders below to brew your customizable refreshment cup! Pick up at Section 104 Drinkhub.
                  </p>
                </div>

                {/* Drink Mixer Sliders */}
                <div className="flex flex-col gap-3.5 bg-black/45 border border-white/10 p-4 rounded-2xl mt-1 text-left">
                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-white/75">🔋 Adrenaline Surge (Energy)</span>
                      <span className="text-cyan-400 font-bold">{drinkEnergy}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={drinkEnergy} 
                      onChange={(e) => { setDrinkEnergy(Number(e.target.value)); setIsDrinkBrewed(false); }}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-white/75">🍋 Copa Refresher (Lime & Mint)</span>
                      <span className="text-cyan-400 font-bold">{drinkFlavor}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={drinkFlavor} 
                      onChange={(e) => { setDrinkFlavor(Number(e.target.value)); setIsDrinkBrewed(false); }}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span className="text-white/75">❄ Glacier Crush (Ice Level)</span>
                      <span className="text-cyan-400 font-bold">{drinkIce}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={drinkIce} 
                      onChange={(e) => { setDrinkIce(Number(e.target.value)); setIsDrinkBrewed(false); }}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => setIsDrinkBrewed(true)}
                  className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-black uppercase italic tracking-tighter py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all active:scale-95"
                >
                  BREW CUSTOM ELIXIR ($6.50)
                </button>

                {isDrinkBrewed && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-cyan-400 text-black p-4 rounded-xl text-center flex flex-col items-center mt-2"
                  >
                    <CheckCircle className="w-8 h-8 mb-2 text-black" />
                    <h4 className="font-black uppercase tracking-tight text-sm">BREW COMPLETE - HUB 4</h4>
                    <p className="text-[10px] font-semibold uppercase text-black/80 mt-1 leading-normal">
                      Holographic Cup QR Generated. Present at Portal 104 Dispenser.
                    </p>
                    <div className="bg-white p-2 rounded mt-3 inline-block">
                      <QrCode className="w-16 h-16 text-black" />
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* 4. RESTROOM DETAIL VIEW */}
            {activeSubViewDetail === "queue" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-pink-400">
                  <span>🚻</span> SMART RESTROOM QUEUE PREDICTION
                </div>
                
                <div className="bg-pink-500/10 border border-pink-500/20 p-4 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-pink-400 text-[10px] font-black uppercase">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI WASHROOM SELECTOR
                  </div>
                  <p className="text-xs font-black italic uppercase text-white mt-1">Section 104 washrooms highly congested</p>
                  <p className="text-[10px] text-white/70 leading-normal mt-1">
                    Avoid restroom directly behind SEC 104 (wait time is currently 14m). We recommend taking the short 30m walk to Section 108.
                  </p>
                </div>

                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">NEARBY RESTROOMS</span>

                <div className="flex flex-col gap-2">
                  {[
                    { id: "104", name: "Washroom Sec 104 (Behind Row)", wait: "14 MINS WAIT", status: "Highly Congested", statusColor: "text-red-400", cleanliness: "7.2/10" },
                    { id: "108", name: "Washroom Sec 108 (Fastest Option)", wait: "2 MINS WAIT", status: "AI Recommended • Clear Path", statusColor: "text-emerald-400", cleanliness: "9.6/10 (Just Cleared)" },
                    { id: "112", name: "Washroom Sec 112 (Family WC)", wait: "5 MINS WAIT", status: "Medium Traffic", statusColor: "text-yellow-400", cleanliness: "8.8/10" },
                  ].map((wc) => (
                    <div 
                      key={wc.id}
                      onClick={() => setSelectedWashroom(wc.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedWashroom === wc.id ? "bg-pink-500/15 border-pink-400" : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase text-white truncate max-w-[170px]">{wc.name}</span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-[9px] font-black uppercase font-mono text-pink-400">{wc.wait}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/50 mt-2 text-left">
                        <span>Cleanliness: {wc.cleanliness}</span>
                        <span className={wc.statusColor}>{wc.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedWashroom === "108" && (
                  <div className="bg-pink-400 text-black p-3.5 rounded-xl text-center flex flex-col items-center">
                    <span className="text-xs font-black uppercase">ROUTE TO WASHROOM 108</span>
                    <p className="text-[10px] font-semibold text-black/80 mt-1 leading-normal">
                      Exit Sec 104, turn left, head 45 meters towards Ramp C. Restroom entrance is marked by giant glowing pink sign.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 5. TRANSLATION DETAIL VIEW */}
            {activeSubViewDetail === "trans" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-purple-400">
                  <span>🌐</span> MULTILINGUAL TRANSLATOR
                </div>
                <div className="bg-[#10172a] border border-white/10 p-4 rounded-xl text-left">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">STADIUM VOLUNTEER SYNC</span>
                  <h3 className="text-base font-black italic uppercase mt-0.5 text-white">LIVE CHAT TRANSLATOR</h3>
                  <p className="text-[10px] text-white/60 mt-1 leading-normal">
                    Instantly translate matchday sentences into English, Spanish, Portuguese, or French for MetLife volunteers and stewards.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">TRANSLATE BOX</span>
                  
                  <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex flex-col gap-2 text-left">
                    <span className="text-[9px] font-mono text-white/40 block">INPUT TEXT (SPANISH)</span>
                    <p className="text-xs italic text-white font-bold">"¿Dónde está la salida de emergencia más cercana y el puesto de primeros auxilios?"</p>
                  </div>

                  <div className="bg-purple-400/10 border border-purple-400/20 rounded-xl p-3 flex flex-col gap-2 text-left">
                    <span className="text-[9px] font-mono text-purple-400 block">ENGLISH CO-PILOT TRANSLATION</span>
                    <p className="text-xs font-black uppercase text-white">"Where is the nearest emergency exit and first aid post?"</p>
                  </div>
                </div>

                <button 
                  onClick={() => alert("Simulated mic listening! Try saying: 'Where are the hotdogs?'")}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black uppercase italic tracking-tighter py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all active:scale-95"
                >
                  <Volume2 className="w-4 h-4" /> Tap to Speak to Volunteer
                </button>
              </div>
            )}

            {/* 6. EXIT DETAIL VIEW */}
            {activeSubViewDetail === "exit" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-400">
                  <span>🚪</span> AI EXIT ROUTE PLANNING
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl text-left">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase">
                    <TrendingUp className="w-3.5 h-3.5" /> REAL-TIME EXIT PREDICTIONS
                  </div>
                  <p className="text-xs font-black italic uppercase text-white mt-1">Avoid Gate A Shuttle peak congestion</p>
                  <p className="text-[10px] text-white/70 leading-normal mt-1">
                    MetLife shuttle buses experience peak crowd surges from 88' onwards. Using Exit Path C is predicted to save you 35 minutes!
                  </p>
                </div>

                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest text-left">LIVE CAPACITIES</span>

                <div className="flex flex-col gap-2.5 text-left">
                  {[
                    { name: "Gate A (Primary Transit Exit)", percent: "92%", color: "bg-orange-500", label: "Highly Congested" },
                    { name: "Gate B (Train Station Access)", percent: "64%", color: "bg-yellow-400", label: "Medium Congested" },
                    { name: "Gate C (Secaucus Shuttle Hub)", percent: "18%", color: "bg-emerald-400", label: "Clear • AI Recommended", highlight: true }
                  ].map((exitPath, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border ${
                        exitPath.highlight ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex justify-between text-xs font-bold uppercase mb-1">
                        <span className="text-white">{exitPath.name}</span>
                        <span className={exitPath.color === "bg-orange-500" ? "text-orange-400" : exitPath.color === "bg-yellow-400" ? "text-yellow-400" : "text-emerald-400"}>{exitPath.percent}</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full ${exitPath.color}`} style={{ width: exitPath.percent }}></div>
                      </div>
                      <p className="text-[9px] text-white/40 uppercase mt-1">{exitPath.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SETTINGS DETAIL VIEW */}
            {activeSubViewDetail === "settings" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                  <span>⚙</span> STADIUM CONTROL SETTINGS
                </div>

                <div className="bg-black/45 border border-white/10 p-4 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase block text-white leading-tight">PATH FLASHLIGHT ASSIST</span>
                      <span className="text-[9px] text-white/50 uppercase leading-none block mt-1">Glow Row L floor markings</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={flashlightEnabled} 
                      onChange={() => setFlashlightEnabled(!flashlightEnabled)}
                      className="w-4 h-4 accent-lime-400 rounded cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase block text-white leading-tight">TACTILE MATCH HAPTICS</span>
                      <span className="text-[9px] text-white/50 uppercase leading-none block mt-1">Vibrate on goals, cards, VARs</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={hapticsEnabled} 
                      onChange={() => setHapticsEnabled(!hapticsEnabled)}
                      className="w-4 h-4 accent-lime-400 rounded cursor-pointer" 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black uppercase block text-white leading-tight">LIVE SPEAKER SYNCLINK</span>
                      <span className="text-[9px] text-white/50 uppercase leading-none block mt-1">Sync pitch commentary audio</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={commentaryEnabled} 
                      onChange={() => setCommentaryEnabled(!commentaryEnabled)}
                      className="w-4 h-4 accent-lime-400 rounded cursor-pointer" 
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex justify-between">
                      <span className="text-xs font-black uppercase text-white block">COMMENTARY LEVEL</span>
                      <span className="text-xs font-bold text-lime-400 font-mono">{audioLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={audioLevel} 
                      onChange={(e) => setAudioLevel(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-lime-400" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 8. PROFILE FUT CARD DETAIL VIEW */}
            {activeSubViewDetail === "profile" && (
              <div className="flex flex-col gap-4 items-center">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-yellow-400 self-start">
                  <span>👤</span> ARENA PILOT PROFILE
                </div>

                {/* Holographic FUT Card */}
                <div className="w-full max-w-[280px] bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-600 rounded-[28px] p-1 shadow-[0_0_25px_rgba(234,179,8,0.3)] relative overflow-hidden group">
                  
                  {/* Glowing holographic shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="bg-[#0c101c] rounded-[25px] p-5 flex flex-col items-center border border-yellow-300/20">
                    
                    {/* Top rating and badge */}
                    <div className="w-full flex justify-between items-start mb-2">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-yellow-400 leading-none">99</span>
                        <span className="text-[8px] font-black text-yellow-400/80 uppercase tracking-widest mt-0.5">PILOT</span>
                      </div>
                      <span className="text-xl">🏆</span>
                    </div>

                    {/* FUT Card Avatar */}
                    <div className="w-20 h-20 bg-gradient-to-b from-yellow-400/20 to-transparent rounded-full flex items-center justify-center border-2 border-yellow-400 mb-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                      <span className="text-4xl select-none">👩‍💻</span>
                    </div>

                    <h3 className="text-sm font-black italic uppercase text-yellow-400 tracking-tight leading-none mt-1">
                      Sonakshi Kaushik
                    </h3>
                    <span className="text-[9px] font-mono text-white/50 uppercase mt-1">METLIFE ADMIRAL</span>

                    {/* Stats List */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-4 border-t border-white/10 pt-4 w-full">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/40">CHR (CHEER)</span>
                        <span className="font-bold text-yellow-400">98</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/40">TAC (TACOS)</span>
                        <span className="font-bold text-yellow-400">4</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/40">STY (STYLE)</span>
                        <span className="font-bold text-yellow-400">95</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/40">ESC (ESCAPE)</span>
                        <span className="font-bold text-yellow-400">99</span>
                      </div>
                    </div>

                    {/* Bottom Member Badge */}
                    <div className="mt-4 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full">
                      <span className="text-[9px] font-black uppercase text-yellow-400 tracking-wider">
                        MEMBER SINCE 2026
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* 9. SOS DETAIL VIEW */}
            {activeSubViewDetail === "sos" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="bg-red-600 text-white p-4 rounded-xl text-center flex flex-col items-center">
                  <AlertTriangle className="w-10 h-10 mb-2 animate-bounce" />
                  <h3 className="text-lg font-black italic uppercase">CRITICAL STADIUM SOS</h3>
                  <p className="text-[10px] font-semibold uppercase text-white/90 mt-1 leading-normal">
                    Are you experiencing a medical emergency, security threat, or active incident at Row L, Seat 12?
                  </p>
                </div>

                {!isSosActive && sosCountdown === null && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <button 
                      onClick={() => setSosCountdown(5)}
                      className="w-40 h-40 bg-red-600 hover:bg-red-500 rounded-full border-4 border-white shadow-[0_0_30px_rgba(220,38,38,0.6)] flex flex-col items-center justify-center transform active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="text-4xl">🚨</span>
                      <span className="text-sm font-black uppercase italic tracking-tighter text-white mt-1">HOLD TO SOS</span>
                      <span className="text-[9px] text-white/70 uppercase">STAFFAWARE DISPATCH</span>
                    </button>
                    <p className="text-[10px] text-white/40 mt-4 text-center uppercase leading-relaxed max-w-xs">
                      Tapping opens a 5-second cancel threshold before notifying security control, local medics, and dispatching Sector 104 Stewards.
                    </p>
                  </div>
                )}

                {sosCountdown !== null && (
                  <div className="flex flex-col items-center justify-center py-12 bg-red-600/10 border border-red-500/30 rounded-2xl">
                    <span className="text-6xl font-black italic leading-none text-red-500 animate-ping">
                      {sosCountdown}
                    </span>
                    <p className="text-sm font-black uppercase text-white mt-4 tracking-widest text-center">DISPATCH TRIGGERING IN...</p>
                    
                    <button 
                      onClick={() => setSosCountdown(null)}
                      className="mt-6 bg-white text-black font-black uppercase text-xs px-6 py-2 rounded-full border border-black hover:bg-neutral-100 cursor-pointer"
                    >
                      ABORT SOS SIGNAL
                    </button>
                  </div>
                )}

                {isSosActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#0b0404] border border-red-500/50 p-4 rounded-xl flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center border-b border-red-500/20 pb-2">
                      <span className="text-[10px] font-mono text-red-400">DISPATCHED RESPONDER</span>
                      <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-widest">URGENT</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-full flex items-center justify-center text-lg">
                        👮‍♂️
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase text-white leading-tight">Steward Marcus (Zone B)</p>
                        <p className="text-[10px] text-red-400 font-bold uppercase mt-0.5 animate-pulse leading-none">
                          &gt; Status: {sosStewardLocation}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/5 p-2 rounded border border-white/5 text-[9px] text-white/60 leading-normal">
                      Marcus is carrying basic first aid, fresh hydration, and direct intercom relay to local MetLife stadium paramedics. ETA to Row L, Seat 12: <span className="font-bold text-red-400">1m 15s</span>.
                    </div>

                    <button 
                      onClick={() => {
                        setIsSosActive(false);
                        setSosCountdown(null);
                      }}
                      className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-[10px] uppercase py-2 rounded-lg"
                    >
                      Cancel / Problem Resolved
                    </button>
                  </motion.div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* SOS BUTTON - FIXED TO BOTTOM */}
        {activeSubViewDetail !== "sos" && (
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(239, 68, 68, 0.6)" }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              setActiveSubViewDetail("sos");
            }}
            className="w-full bg-[#EF4444] text-white font-black uppercase italic tracking-tighter py-4 px-6 rounded-full flex items-center justify-between shadow-[0_4px_25px_rgba(239,68,68,0.4)] cursor-pointer mt-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl animate-pulse">🚨</span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black tracking-widest text-white/80 leading-none">EMERGENCY ASSIST</span>
                <span className="text-sm font-black italic tracking-tight leading-none mt-1">REQUEST IMMEDIATE SOS</span>
              </div>
            </div>
            <span className="text-xs font-black font-mono bg-white/20 px-2 py-0.5 rounded-full">ACTIVE</span>
          </motion.button>
        )}

      </div>
    </div>
  );
}
