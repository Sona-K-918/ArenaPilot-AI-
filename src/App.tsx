/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import StadiumAssistant from "./components/StadiumAssistant";
import { 
  Navigation, 
  Compass, 
  Utensils, 
  Flame, 
  ShieldAlert, 
  Users, 
  LogOut, 
  Volume2, 
  MapPin, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Search, 
  Bell, 
  User, 
  CheckCircle, 
  TrendingUp, 
  Tv, 
  AlertTriangle, 
  HeartPulse, 
  QrCode, 
  Ticket, 
  UploadCloud, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Map,
  MessageCircle,
  VolumeX,
  RefreshCw,
  Zap,
  Info
} from "lucide-react";

// --- Types & Interfaces ---
interface MatchStats {
  possession: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

interface MatchEvent {
  id: string;
  time: string;
  type: "goal" | "card" | "substitution" | "info";
  title: string;
  detail: string;
  team: "USA" | "MEX" | "NEUTRAL" | string;
}

const getTeamsFromMatch = (matchName: string) => {
  const parts = matchName.split(/\s+vs\s+/i);
  const home = parts[0] || "USA";
  const away = parts[1] || "MEX";
  return { home, away };
};

const getMatchColors = (matchName: string) => {
  const normalized = matchName.toLowerCase();
  if (normalized.includes("portugal") || normalized.includes("turkey")) {
    return { left: "#042d18", right: "#4a0303" }; // Portugal Green & Turkey Red
  } else if (normalized.includes("brazil") || normalized.includes("argen")) {
    return { left: "#0e3a1f", right: "#004b6e" }; // Brazil Green & Argentina Sky Blue
  } else if (normalized.includes("france") || normalized.includes("germany")) {
    return { left: "#002395", right: "#1a1a1a" }; // France Blue & Germany Black
  } else if (normalized.includes("spain") || normalized.includes("morocco")) {
    return { left: "#8a0303", right: "#043b1c" }; // Spain Red & Morocco Green
  } else {
    // Default: USA vs Mexico
    return { left: "#0A3161", right: "#006847" }; // USA Navy Blue (#0A3161) & Mexico Green (#006847)
  }
};

function TeamFlag({ country }: { country: string }) {
  const code = country.toUpperCase();
  if (code === "USA") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 bg-white border border-white/20 rounded-xl overflow-hidden shadow-2xl relative flex flex-col justify-between shrink-0">
        {/* Stripes */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`h-[14%] w-full ${i % 2 === 0 ? "bg-red-600" : "bg-white"}`} />
          ))}
        </div>
        {/* Canton */}
        <div className="absolute top-0 left-0 w-1/2 h-[54%] bg-blue-900 flex flex-wrap p-1 gap-0.5 items-center justify-center">
          <div className="grid grid-cols-4 gap-0.5 text-[6px] md:text-[10px] text-white leading-none">
            <span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
      </div>
    );
  }
  if (code === "MEX" || code === "MEXICO") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex border border-white/20 shrink-0 animate-pulse" style={{ animationDuration: "10s" }}>
        <div className="w-1/3 h-full bg-emerald-700" />
        <div className="w-1/3 h-full bg-white flex items-center justify-center text-xl md:text-4xl">🦅</div>
        <div className="w-1/3 h-full bg-red-600" />
      </div>
    );
  }
  if (code === "POR" || code === "PORTUGAL") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex border border-white/20 shrink-0">
        <div className="w-[40%] h-full bg-emerald-700 flex items-center justify-end">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-500 -mr-3 z-10 flex items-center justify-center text-[10px] md:text-sm">🛡️</div>
        </div>
        <div className="w-[60%] h-full bg-red-600" />
      </div>
    );
  }
  if (code === "TUR" || code === "TURKEY") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 bg-red-600 rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-white/20 shrink-0">
        <div className="text-white text-2xl md:text-5xl font-bold">🌙⭐</div>
      </div>
    );
  }
  if (code === "BRA" || code === "BRAZIL") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 bg-emerald-600 rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-white/20 shrink-0">
        <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[80px] border-b-yellow-400 md:border-l-[75px] md:border-r-[75px] md:border-b-[120px] absolute rotate-180" />
        <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[80px] border-b-yellow-400 md:border-l-[75px] md:border-r-[75px] md:border-b-[120px] absolute" />
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-900 border border-yellow-300 z-10 flex items-center justify-center">
          <div className="w-full h-0.5 bg-white rotate-[-15deg]" />
        </div>
      </div>
    );
  }
  if (code === "ARG" || code === "ARGENTINA") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex flex-col border border-white/20 shrink-0">
        <div className="h-1/3 bg-sky-300" />
        <div className="h-1/3 bg-white flex items-center justify-center text-sm md:text-2xl text-amber-500">☀️</div>
        <div className="h-1/3 bg-sky-300" />
      </div>
    );
  }
  if (code === "FRA" || code === "FRANCE") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex border border-white/20 shrink-0">
        <div className="w-1/3 h-full bg-blue-800" />
        <div className="w-1/3 h-full bg-white" />
        <div className="w-1/3 h-full bg-red-600" />
      </div>
    );
  }
  if (code === "GER" || code === "GERMANY") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex flex-col border border-white/20 shrink-0">
        <div className="h-1/3 bg-black" />
        <div className="h-1/3 bg-red-600" />
        <div className="h-1/3 bg-yellow-500" />
      </div>
    );
  }
  if (code === "ESP" || code === "SPAIN") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 rounded-xl overflow-hidden shadow-2xl relative flex flex-col border border-white/20 shrink-0">
        <div className="h-1/4 bg-red-600" />
        <div className="h-1/2 bg-yellow-500 flex items-center pl-6 text-xs md:text-xl">🏰</div>
        <div className="h-1/4 bg-red-600" />
      </div>
    );
  }
  if (code === "MAR" || code === "MOROCCO") {
    return (
      <div className="w-28 h-18 md:w-44 md:h-28 bg-red-600 rounded-xl overflow-hidden shadow-2xl relative flex items-center justify-center border border-white/20 shrink-0">
        <div className="text-emerald-700 text-2xl md:text-4xl font-black">★</div>
      </div>
    );
  }
  // Fallback
  return (
    <div className="w-28 h-18 md:w-44 md:h-28 bg-neutral-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center text-white/50 text-base font-bold border border-white/20 shrink-0">
      {code}
    </div>
  );
}

export default function App() {
  // --- States ---
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [ticketData, setTicketData] = useState({
    match: "USA vs Mexico",
    stadium: "MetLife Stadium",
    location: "East Rutherford, NJ",
    sec: "104",
    row: "L",
    seat: "12",
    gate: "GATE 4",
    time: "20:00 EST"
  });

  // Main UI state
  const [gameTime, setGameTime] = useState<string>("74:22");
  const [gameTimeMinutes, setGameTimeMinutes] = useState<number>(74);
  const [gameTimeSeconds, setGameTimeSeconds] = useState<number>(22);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [homeScore, setHomeScore] = useState<number>(2);
  const [awayScore, setAwayScore] = useState<number>(1);
  const [matchStats, setMatchStats] = useState<MatchStats>({
    possession: { home: 54, away: 46 },
    shotsOnTarget: { home: 6, away: 4 },
    corners: { home: 5, away: 4 },
    yellowCards: { home: 1, away: 3 },
    redCards: { home: 0, away: 0 }
  });

  const [matchEvents, setMatchEvents] = useState<MatchEvent[]>([
    { id: "e1", time: "24'", type: "goal", title: "GOAL! USA 1-0 MEX", detail: "Christian Pulisic (Assisted by McKennie)", team: "USA" },
    { id: "e2", time: "41'", type: "card", title: "Yellow Card - MEX", detail: "Edson Álvarez (Tactical foul)", team: "MEX" },
    { id: "e3", time: "58'", type: "goal", title: "GOAL! USA 1-1 MEX", detail: "Raúl Jiménez (Direct Free Kick)", team: "MEX" },
    { id: "e4", time: "67'", type: "goal", title: "GOAL! USA 2-1 MEX", detail: "Folarin Balogun (Header)", team: "USA" },
    { id: "e5", time: "72'", type: "info", title: "Possession Peak", detail: "USA controlling tempo in middle third", team: "NEUTRAL" }
  ]);

  // Drawer States
  // 'left' drawer, 'right' drawer, or null
  const [activeDrawer, setActiveDrawer] = useState<"left" | "right" | null>(null);
  const [activeSubView, setActiveSubView] = useState<string>("seat"); // Left: seat, food, trans | Right: queue, exit, sos, profile

  // New Underlay Stadium Assistant states
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [activeSubViewDetail, setActiveSubViewDetail] = useState<string | null>(null);

  // Interactive menu choices
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [foodQuantity, setFoodQuantity] = useState<number>(1);
  const [isFoodOrderPlaced, setIsFoodOrderPlaced] = useState<boolean>(false);
  
  const [selectedWashroom, setSelectedWashroom] = useState<string | null>(null);
  
  // SOS State
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [isSosActive, setIsSosActive] = useState<boolean>(false);
  const [sosStewardLocation, setSosStewardLocation] = useState<string>("Navigating Ramp B");

  // Custom simulator
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [simulatorStatus, setSimulatorStatus] = useState<string>("");

  // --- Effects ---
  // Timer Simulation
  useEffect(() => {
    let interval: any;
    if (isGameActive) {
      interval = setInterval(() => {
        setGameTimeSeconds(prevSec => {
          if (prevSec >= 59) {
            setGameTimeMinutes(prevMin => prevMin + 1);
            return 0;
          }
          return prevSec + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    const minStr = gameTimeMinutes.toString().padStart(2, "0");
    const secStr = gameTimeSeconds.toString().padStart(2, "0");
    setGameTime(`${minStr}:${secStr}`);
  }, [gameTimeMinutes, gameTimeSeconds]);

  // SOS Countdown Timer
  useEffect(() => {
    let timer: any;
    if (sosCountdown !== null && sosCountdown > 0) {
      timer = setTimeout(() => {
        setSosCountdown(sosCountdown - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      setIsSosActive(true);
      setSosCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [sosCountdown]);

  // Simulated steward movement
  useEffect(() => {
    let timer: any;
    if (isSosActive) {
      const locations = [
        "Entering Section 104 Escalators",
        "Approaching Aisle L Entryway",
        "Arriving at Seat 12 Row L"
      ];
      let index = 0;
      timer = setInterval(() => {
        if (index < locations.length) {
          setSosStewardLocation(locations[index]);
          index++;
        } else {
          clearInterval(timer);
        }
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isSosActive]);

  // --- Ticket Scanner Functions ---
  const handleScanTicket = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs(["INITIALIZING CAMERA CAPTURE...", "LOCATING BARCODE & QR FIELD..."]);

    const logs = [
      "DECRYPTING FIFA 2026 DIGITAL SIGNATURE...",
      "OCR RUNNING ON REGION_3 (HEADER)...",
      "MATCH LOCATED: USA vs MEXICO",
      "STADIUM LOCATED: MetLife Stadium, NJ",
      "EXTRACTING SEAT SECTOR... SEC 104",
      "EXTRACTING ROW INFO... ROW L",
      "EXTRACTING SEAT NUMBER... SEAT 12",
      "EXTRACTING NEAREST GATE... GATE 4",
      "HOLOGRAPHIC VERIFICATION PASS: VALIDATED ✔"
    ];

    let logIdx = 0;
    const progressInterval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsScanning(false);
            setIsOnboarded(true);
          }, 8000000000); // Handled by standard flow
          return 100;
        }
        
        // Add log at certain milestones
        if (p % 12 === 0 && logIdx < logs.length) {
          setScanLogs(prev => [...prev, logs[logIdx]]);
          logIdx++;
        }
        return p + 1;
      });
    }, 40);
  };

  const skipScanner = () => {
    setIsOnboarded(true);
  };

  // --- Simulator Actions ---
  const triggerGoal = (team: "USA" | "MEX") => {
    const randomMinute = `${gameTimeMinutes}'`;
    if (team === "USA") {
      setHomeScore(prev => prev + 1);
      const newEvent: MatchEvent = {
        id: Math.random().toString(),
        time: randomMinute,
        type: "goal",
        title: "GOAL! USA SCORE!",
        detail: "Pulisic finishes a clinical cross into the top corner!",
        team: "USA"
      };
      setMatchEvents(prev => [newEvent, ...prev]);
      setMatchStats(prev => ({
        ...prev,
        shotsOnTarget: { ...prev.shotsOnTarget, home: prev.shotsOnTarget.home + 1 }
      }));
      setSimulatorStatus("Goal USA triggered!");
    } else {
      setAwayScore(prev => prev + 1);
      const newEvent: MatchEvent = {
        id: Math.random().toString(),
        time: randomMinute,
        type: "goal",
        title: "GOAL! MEXICO SCORE!",
        detail: "Lozano bangs a thunderous volley past the keeper!",
        team: "MEX"
      };
      setMatchEvents(prev => [newEvent, ...prev]);
      setMatchStats(prev => ({
        ...prev,
        shotsOnTarget: { ...prev.shotsOnTarget, away: prev.shotsOnTarget.away + 1 }
      }));
      setSimulatorStatus("Goal Mexico triggered!");
    }
    setTimeout(() => setSimulatorStatus(""), 4000);
  };

  const triggerRedCard = (team: "USA" | "MEX") => {
    const randomMinute = `${gameTimeMinutes}'`;
    const newEvent: MatchEvent = {
      id: Math.random().toString(),
      time: randomMinute,
      type: "card",
      title: `RED CARD - ${team}`,
      detail: "Dangerous studs-up challenge. Sent straight to the locker room.",
      team: team
    };
    setMatchEvents(prev => [newEvent, ...prev]);
    setMatchStats(prev => ({
      ...prev,
      redCards: {
        ...prev.redCards,
        home: team === "USA" ? prev.redCards.home + 1 : prev.redCards.home,
        away: team === "MEX" ? prev.redCards.away + 1 : prev.redCards.away
      }
    }));
    setSimulatorStatus(`Red Card ${team} triggered!`);
    setTimeout(() => setSimulatorStatus(""), 4000);
  };

  // --- Render Components ---

  // Onboarding Scan Screen
  if (!isOnboarded) {
    return (
      <div id="onboarding-root" className="w-full min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-lime-400 blur-[130px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600 blur-[160px] rounded-full"></div>
        </div>

        {/* Outer futuristic terminal container */}
        <div className="relative z-10 w-full max-w-lg bg-black/40 border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(163,230,53,0.15)] backdrop-blur-md flex flex-col">
          
          <header className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-lime-400">FIFA World Cup 2026</span>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mt-1 glow-lime">ArenaPilot AI</h1>
            <p className="text-white/60 text-xs mt-2 uppercase font-bold tracking-wider">Your Personal Stadium Co-Pilot</p>
          </header>

          {!isScanning ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center"
            >
              {/* Fake Ticket Graphic */}
              <div className="w-full bg-[#0d1527] border-2 border-dashed border-lime-400/40 rounded-2xl p-6 relative overflow-hidden group hover:border-lime-400 transition-colors cursor-pointer mb-6" onClick={handleScanTicket}>
                <div className="absolute top-0 right-0 bg-lime-400 text-black font-black text-[10px] uppercase px-3 py-1 rounded-bl-lg tracking-widest">
                  FIFA OFFICIAL
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-lime-400/20 p-3 rounded-xl border border-lime-400/30">
                    <Ticket className="w-8 h-8 text-lime-400" />
                  </div>
                  <div>
                    <h3 className="font-black italic text-lg uppercase tracking-tight">MATCH 42 TICKET</h3>
                    <p className="text-xs text-white/50 uppercase font-mono">USA vs MEXICO • METLIFE STADIUM</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-b border-white/10 py-3 my-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-white/40 block">SEC</span>
                    <span className="font-bold text-white text-sm">104</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">ROW</span>
                    <span className="font-bold text-white text-sm">L</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block">SEAT</span>
                    <span className="font-bold text-white text-sm">12</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-white/40 font-mono">CODE: #4829-W26</span>
                  <div className="flex items-center gap-1 text-lime-400 font-bold uppercase text-[10px]">
                    <QrCode className="w-4 h-4" /> Tap to Simulate OCR
                  </div>
                </div>
              </div>

              {/* Upload Drag Area */}
              <div 
                className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-2xl hover:bg-white/5 transition-all cursor-pointer mb-6"
                onClick={handleScanTicket}
              >
                <UploadCloud className="w-10 h-10 text-white/40 mb-2" />
                <span className="text-sm font-bold uppercase tracking-tight">Drag & Drop Ticket PDF or Image</span>
                <span className="text-[10px] text-white/40 mt-1 uppercase">Supports FIFA mobile screenshot, Wallet passes</span>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button 
                  id="scan-ticket-btn"
                  onClick={handleScanTicket}
                  className="w-full bg-lime-400 hover:bg-lime-300 text-black font-black uppercase italic tracking-tighter py-4 rounded-xl shadow-[0_4px_20px_rgba(163,230,53,0.3)] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
                >
                  <QrCode className="w-5 h-5" /> SCAN & PILOT MY SEAT
                </button>
                
                <button 
                  id="skip-onboard-btn"
                  onClick={skipScanner}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-bold uppercase text-xs tracking-widest py-3 rounded-xl transition-colors"
                >
                  Skip OCR Onboarding (Demo Mode)
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col"
            >
              {/* Laser OCR Scan Box */}
              <div className="w-full h-48 bg-black/60 border border-lime-400/40 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center mb-6">
                <div className="scanline"></div>
                <Ticket className="w-16 h-16 text-lime-400/20 animate-pulse" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-lime-400 font-bold">SCANNING TICKET DATA</span>
                  <span className="text-lime-400 font-bold">{scanProgress}%</span>
                </div>
              </div>

              {/* Real-time OCR Terminal Logs */}
              <div className="bg-[#02050b] border border-white/5 p-4 rounded-xl font-mono text-xs text-lime-400/80 h-44 overflow-y-auto mb-6 no-scrollbar flex flex-col gap-1.5">
                {scanLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-lime-400/40">[{idx+1}]</span>
                    <span className="text-white/90">{log}</span>
                  </div>
                ))}
                {scanProgress < 100 && (
                  <span className="inline-block w-2 h-4 bg-lime-400 animate-pulse">_</span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-lime-400 transition-all duration-75"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>

              <div className="flex justify-end gap-3">
                {scanProgress === 100 && (
                  <button 
                    onClick={skipScanner}
                    className="bg-lime-400 text-black font-black uppercase italic tracking-tighter px-6 py-3 rounded-lg flex items-center gap-1.5 animate-bounce"
                  >
                    ENTER STADIUM NOW <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          <footer className="text-center mt-6 text-[10px] text-white/40 uppercase tracking-widest font-mono">
            SECURE MATCH CO-PILOT SYSTEM • ISO-27001 COMPLIANT
          </footer>
        </div>
      </div>
    );
  }

  // Main Dynamic Companion Dashboard
  return (
    <div id="app-root" className="w-full min-h-screen bg-[#030712] text-white font-sans overflow-hidden relative flex flex-col select-none">
      
      {/* Stadium Assistant Underlay Panel */}
      <StadiumAssistant
        isAssistantOpen={isAssistantOpen}
        setIsAssistantOpen={setIsAssistantOpen}
        activeSubViewDetail={activeSubViewDetail}
        setActiveSubViewDetail={setActiveSubViewDetail}
        gameTimeMinutes={gameTimeMinutes}
        homeScore={homeScore}
        awayScore={awayScore}
        selectedFood={selectedFood}
        setSelectedFood={setSelectedFood}
        foodQuantity={foodQuantity}
        setFoodQuantity={setFoodQuantity}
        isFoodOrderPlaced={isFoodOrderPlaced}
        setIsFoodOrderPlaced={setIsFoodOrderPlaced}
        selectedWashroom={selectedWashroom}
        setSelectedWashroom={setSelectedWashroom}
        sosCountdown={sosCountdown}
        setSosCountdown={setSosCountdown}
        isSosActive={isSosActive}
        setIsSosActive={setIsSosActive}
        sosStewardLocation={sosStewardLocation}
      />

      {/* Main Sliding Dashboard Wrapper */}
      <motion.div
        animate={{ 
          x: isAssistantOpen ? "75%" : "0%",
          scale: isAssistantOpen ? 0.98 : 1,
          borderRadius: isAssistantOpen ? "24px" : "0px",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        style={{
          background: `linear-gradient(-45deg, ${getMatchColors(ticketData.match).left}, #050b18, ${getMatchColors(ticketData.match).right}, #020617)`,
          backgroundSize: "400% 400%",
          animation: "gradientBG 25s ease infinite",
          transition: "background 1.5s ease"
        }}
        className="absolute inset-0 z-20 overflow-hidden flex flex-col shadow-2xl border-l border-white/5"
      >
        {/* Subtle physical lighting overlay for live stadium feel */}
        <div className="absolute inset-0 pointer-events-none opacity-25 z-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent)] mix-blend-overlay" />

        {/* Faint football stadium pitch lines texture (less than 5% opacity, we use 2.5% for absolute premium subtle blend) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025] z-0 mix-blend-overlay flex items-center justify-center p-8">
          <div className="border-2 border-white w-full h-full rounded-3xl relative flex items-center justify-center">
            {/* Center Line */}
            <div className="absolute top-0 bottom-0 left-1/2 border-l-2 border-white border-dashed" />
            {/* Center Circle */}
            <div className="w-48 h-48 md:w-80 md:h-80 border-2 border-white rounded-full absolute" />
            <div className="w-3 h-3 bg-white rounded-full absolute" />
            {/* Penalty Area Left */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-[15%] border-t-2 border-b-2 border-r-2 border-white flex items-center justify-end">
              <div className="h-1/2 w-1/2 border-t-2 border-b-2 border-r-2 border-white relative">
                <div className="w-2 h-2 bg-white rounded-full absolute right-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            {/* Penalty Area Right */}
            <div className="absolute right-0 top-1/4 bottom-1/4 w-[15%] border-t-2 border-b-2 border-l-2 border-white flex items-center justify-start">
              <div className="h-1/2 w-1/2 border-t-2 border-b-2 border-l-2 border-white relative">
                <div className="w-2 h-2 bg-white rounded-full absolute left-2 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            {/* Corner Arcs */}
            <div className="absolute top-0 left-0 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-full" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-full" />
            <div className="absolute top-0 right-0 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-full" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-full" />
          </div>
        </div>

      {/* HEADER BAR */}
      <header className="relative z-10 flex justify-between items-center px-4 md:px-8 py-5 border-b border-white/10 bg-[#030712]/40 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-lime-400">FIFA World Cup 2026</span>
          <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase leading-none mt-1">ArenaPilot AI</span>
        </div>

        {/* Live timer module */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsGameActive(!isGameActive)}
            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-tight rounded flex items-center gap-1 ${
              isGameActive ? "bg-red-600 text-white animate-pulse" : "bg-white/10 text-white/50"
            }`}
            title="Click to pause/resume game timer"
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            {isGameActive ? "Live" : "Paused"}
          </button>
          <div className="text-2xl md:text-3xl font-black tracking-tighter leading-none tabular-nums font-display">
            {gameTime}
          </div>
        </div>

        <div className="hidden md:flex flex-col text-right">
          <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">METLIFE STADIUM</span>
          <span className="text-sm font-black uppercase">EAST RUTHERFORD, NJ</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-start pt-4 pb-12 md:pt-6 md:pb-16 px-4 md:px-20 overflow-y-auto w-full max-w-5xl mx-auto mt-0">
        
        {/* MATCH SCOREBOARD BOARD */}
        {(() => {
          const { home, away } = getTeamsFromMatch(ticketData.match);
          return (
            <div className="w-full grid grid-cols-3 items-center justify-between gap-4 md:gap-12 mb-12">
              
              {/* LEFT TEAM COLUMN */}
              <div className="flex flex-col items-center justify-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-4 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                >
                  <TeamFlag country={home} />
                </motion.div>
                <h2 className="text-sm sm:text-2xl md:text-4xl font-black tracking-tight uppercase text-white/95 leading-none">{home}</h2>
                <div className="flex flex-col text-center mt-1.5">
                  <p className="text-[8px] md:text-xs text-lime-400/85 uppercase font-bold tracking-wider">Group Stage</p>
                </div>
              </div>

              {/* CENTRAL SCORE & LIVE TIMER COLUMN */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <div className="flex items-center justify-center gap-1.5 sm:gap-4 md:gap-8">
                  <span className="text-3xl sm:text-6xl md:text-8xl font-black italic leading-none tracking-tighter tabular-nums text-white">
                    {homeScore}
                  </span>
                  <span className="text-lg sm:text-3xl md:text-5xl font-black text-lime-400 italic">—</span>
                  <span className="text-3xl sm:text-6xl md:text-8xl font-black italic leading-none tracking-tighter tabular-nums text-white">
                    {awayScore}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 bg-red-600/10 border border-red-500/20 px-3 sm:px-4.5 py-1 sm:py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black text-red-500 font-mono tracking-wider uppercase whitespace-nowrap">
                    LIVE • {gameTime}
                  </span>
                </div>
              </div>

              {/* RIGHT TEAM COLUMN */}
              <div className="flex flex-col items-center justify-center text-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="mb-4 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                >
                  <TeamFlag country={away} />
                </motion.div>
                <h2 className="text-sm sm:text-2xl md:text-4xl font-black tracking-tight uppercase text-white/95 leading-none">{away}</h2>
                <div className="flex flex-col text-center mt-1.5">
                  <p className="text-[8px] md:text-xs text-white/50 uppercase font-bold tracking-wider">MetLife Stadium</p>
                </div>
              </div>

            </div>
          );
        })()}

        {/* FIFA Live Stats & Timeline Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* STATS PANEL */}
          <div className="bg-[#090f1e]/85 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-lime-400 font-black uppercase text-[10px] tracking-wider mb-4 border-b border-white/5 pb-2">
                <Activity className="w-3.5 h-3.5" /> FIFA LIVE MATCH STATISTICS
              </div>
              
              <div className="flex flex-col gap-4">
                {/* Possession Stat */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-bold uppercase text-white/80">
                    <span>POSSESSION</span>
                    <span className="text-lime-400">{matchStats.possession.home}% vs {matchStats.possession.away}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-lime-400 h-full transition-all duration-500" style={{ width: `${matchStats.possession.home}%` }} />
                    <div className="bg-white/20 h-full flex-1" />
                  </div>
                </div>

                {/* Grid of details */}
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  {/* Shots */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-white/50 font-black uppercase tracking-wider block">Shots</span>
                    <span className="text-lg md:text-xl font-black italic mt-0.5 block">
                      {matchStats.shotsOnTarget.home} <span className="text-xs text-white/40 not-italic">-</span> {matchStats.shotsOnTarget.away}
                    </span>
                  </div>

                  {/* Corners */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-white/50 font-black uppercase tracking-wider block">Corners</span>
                    <span className="text-lg md:text-xl font-black italic mt-0.5 block">
                      {matchStats.corners.home} <span className="text-xs text-white/40 not-italic">-</span> {matchStats.corners.away}
                    </span>
                  </div>

                  {/* Yellow Cards */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-white/50 font-black uppercase tracking-wider block">Yellow Cards</span>
                    <span className="text-lg md:text-xl font-black italic mt-0.5 block text-yellow-400">
                      {matchStats.yellowCards.home} <span className="text-xs text-white/40 not-italic">-</span> {matchStats.yellowCards.away}
                    </span>
                  </div>

                  {/* Red Cards */}
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-[9px] text-white/50 font-black uppercase tracking-wider block">Red Cards</span>
                    <span className="text-lg md:text-xl font-black italic mt-0.5 block text-red-500">
                      {matchStats.redCards.home} <span className="text-xs text-white/40 not-italic">-</span> {matchStats.redCards.away}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono text-white/30 text-center mt-4">
              DATA SOURCES: METLIFE SMART ARENA PIEZO SENSORS & FIFA CLOUD FEED
            </div>
          </div>

          {/* TIMELINE PANEL */}
          <div className="bg-[#090f1e]/85 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-1.5 text-lime-400 font-black uppercase text-[10px] tracking-wider">
                  <Activity className="w-3.5 h-3.5" /> LIVE MATCH TIMELINE
                </div>
                <span className="text-[9px] text-white/40 uppercase font-mono tracking-wider">AUTOMATED FEED ACTIVE</span>
              </div>

              <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto no-scrollbar">
                {matchEvents.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-3 text-xs justify-between bg-white/2 p-2.5 rounded-lg border border-white/5 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-white/10 px-1.5 py-0.5 rounded text-lime-400 text-[10px]">
                        {ev.time}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${
                        ev.type === "goal" ? "bg-lime-400" : ev.type === "card" ? "bg-red-500" : "bg-blue-500"
                      }`}></span>
                      <p className="font-black uppercase tracking-tight text-white/90">{ev.title}</p>
                    </div>
                    <span className="text-white/50 text-[10px] italic max-w-[150px] truncate">{ev.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] font-mono text-white/30 text-center mt-4 uppercase">
              STADIUM ASSISTANT RECONCILING COMPANION STATE ON SWIPE
            </div>
          </div>

        </div>

      </main>

      {/* --- EDGE DRAWERS (STADIUM ASSISTANT TRIGGER BUTTONS - CONDITIONALLY RENDERED ONLY WHEN ASSISTANT IS OPENED) --- */}
      {isAssistantOpen && (
        <>
          {/* LEFT SWIPE ACTION BUTTON PANEL */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-start gap-3 z-35">
            {/* Navigation Tab */}
            <button 
              id="trigger-left-nav"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("seat");
              }}
              className="group flex items-center bg-lime-400 hover:bg-lime-300 text-black p-3.5 rounded-r-2xl shadow-[0_4px_15px_rgba(163,230,53,0.3)] transform transition-transform hover:translate-x-1.5 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none">Find my</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5">Seat</span>
              </div>
              <div className="w-8 h-8 ml-3 flex items-center justify-center border border-black rounded-full text-sm font-black font-mono">
                →
              </div>
            </button>

            {/* Food Menu Tab */}
            <button 
              id="trigger-left-food"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("food");
              }}
              className="group flex items-center bg-white hover:bg-neutral-100 text-black p-3.5 rounded-r-2xl shadow-lg transform transition-transform hover:translate-x-1.5 cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none">AI Smart</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5">Food</span>
              </div>
              <div className="w-8 h-8 ml-3 flex items-center justify-center border border-black rounded-full text-xs">
                ☕
              </div>
            </button>

            {/* Translation Tab */}
            <button 
              id="trigger-left-trans"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("trans");
              }}
              className="group flex items-center bg-[#1e293b] hover:bg-[#334155] text-white p-3.5 rounded-r-2xl shadow-lg transform transition-transform hover:translate-x-1.5 cursor-pointer border-t border-b border-r border-white/10"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none">Smart</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5">Translate</span>
              </div>
              <div className="w-8 h-8 ml-3 flex items-center justify-center border border-white/20 rounded-full text-xs text-lime-400 font-bold">
                EN
              </div>
            </button>
          </div>

          {/* RIGHT SWIPE ACTION BUTTON PANEL */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3 z-35">
            {/* WC Queue Tab */}
            <button 
              id="trigger-right-wc"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("queue");
              }}
              className="group flex items-center bg-pink-500 hover:bg-pink-400 text-white p-3.5 rounded-l-2xl shadow-[0_4px_15px_rgba(236,72,153,0.3)] transform transition-transform hover:-translate-x-1.5 cursor-pointer"
            >
              <div className="w-8 h-8 mr-3 flex items-center justify-center border border-white/30 rounded-full text-xs font-black">
                WC
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-white/80">AI Queue</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5">Washroom</span>
              </div>
            </button>

            {/* Exit Route Tab */}
            <button 
              id="trigger-right-exit"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("exit");
              }}
              className="group flex items-center bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-l-2xl shadow-lg transform transition-transform hover:-translate-x-1.5 cursor-pointer"
            >
              <div className="w-8 h-8 mr-3 flex items-center justify-center border border-white/30 rounded-full text-xs">
                🗺
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-white/80">AI Crowd</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5">Exit Planner</span>
              </div>
            </button>

            {/* SOS Panic Button */}
            <button 
              id="trigger-right-sos"
              onClick={() => {
                setIsAssistantOpen(true);
                setActiveSubViewDetail("sos");
              }}
              className="group flex items-center bg-black hover:bg-neutral-900 border border-red-600/50 text-white p-3.5 rounded-l-2xl shadow-lg transform transition-transform hover:-translate-x-1.5 cursor-pointer"
            >
              <div className="w-8 h-8 mr-3 flex items-center justify-center bg-red-600/20 border border-red-500 rounded-full text-red-500 text-xs font-black animate-pulse">
                🚨
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-black uppercase tracking-tighter leading-none text-red-500">Emergency</span>
                <span className="text-sm md:text-base font-black uppercase italic leading-none mt-0.5 text-red-400">Request SOS</span>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Floating Matchday Capsule Handle attached to the sliding dashboard */}
      <motion.div
        onClick={() => setIsAssistantOpen(!isAssistantOpen)}
        animate={{ 
          scale: [1, 1.05, 1],
          boxShadow: isAssistantOpen 
            ? "0 0 20px rgba(16, 185, 129, 0.4)" 
            : "0 0 15px rgba(239, 68, 68, 0.4)" 
        }}
        transition={{ 
          scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
        className="absolute top-1/2 -translate-y-1/2 left-[-22px] md:left-[-25px] w-12 h-28 rounded-full bg-gradient-to-b from-[#10B981] to-[#EF4444] z-50 flex flex-col items-center justify-center cursor-pointer border border-white/20 select-none group animate-pulse"
        style={{ animationDuration: "5s" }}
        title="Pull out Stadium Assistant"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-base select-none filter drop-shadow">⚽</span>
          <div className="flex flex-col gap-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></div>
            <div className="w-1 h-1 rounded-full bg-white/60"></div>
          </div>
          <span className="text-[7px] font-black text-white rotate-[-90deg] uppercase tracking-widest mt-1 select-none leading-none">
            {isAssistantOpen ? "CLOSE" : "PILOT"}
          </span>
        </div>
      </motion.div>

      {/* FOOTER BAR DETAILS & DYNAMIC PILOT ASSIST BUBBLE - CONDITIONAL RENDER ONLY WHEN STADIUM ASSISTANT IS OPENED */}
      {isAssistantOpen && (
        <footer className="relative z-10 px-4 md:px-8 py-5 border-t border-white/10 bg-[#030712]/90 backdrop-blur-md flex flex-col md:flex-row justify-between items-stretch md:items-end gap-4 mt-auto">
          <div className="flex gap-8 justify-around md:justify-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-lime-400 uppercase tracking-widest mb-1">Your Assumed Seat</span>
              <p className="text-xl md:text-3xl font-black italic tracking-tighter leading-none">
                SEC 104 <span className="text-white/40 text-lg md:text-2xl font-mono not-italic font-light">• ROW L • SEAT 12</span>
              </p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Nearest Gate</span>
              <p className="text-xl md:text-3xl font-black italic tracking-tighter leading-none text-white">
                GATE 4
              </p>
            </div>
          </div>

          {/* Dynamic AI Pilot Assistant Bubble */}
          <div className="bg-lime-400 text-black px-6 py-4 rounded-xl md:rounded-tl-[35px] md:rounded-tr-none md:rounded-bl-none md:rounded-br-none shadow-[4px_4px_0px_rgba(255,255,255,1)] flex flex-col max-w-sm md:max-w-md self-center md:self-end">
            <div className="flex items-center justify-between border-b border-black/10 pb-1.5 mb-1.5">
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Pilot Co-Pilot Engine
              </div>
              <span className="text-[9px] font-mono font-bold bg-black text-lime-400 px-1.5 py-0.2 rounded">AI CO-PILOT</span>
            </div>
            
            <p className="text-xs md:text-sm font-black italic uppercase leading-snug">
              {gameTimeMinutes >= 85 ? (
                "Traffic peaking at Exit B Shuttle Terminal. Recommended exit route: Gate C (Secaucus loop) leaves in 10m."
              ) : homeScore > awayScore ? (
                "USA leading! Arena crowd volume surging to 104dB. Ear-protection aid stands are located behind Sector 104 exit portal."
              ) : (
                "Halftime approaching in 15m. Order Tacos now at Section 104 Kiosk to skip the massive 25-minute walk-up queue."
              )}
            </p>
          </div>
        </footer>
      )}

      </motion.div>
    </div>
  );
}
