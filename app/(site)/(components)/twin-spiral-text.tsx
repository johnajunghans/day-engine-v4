"use client"

import { useMemo } from "react";

function generateSpiral(a: number, b: number, turns: number, steps: number, invert = false) {
    let path = "M 0 0 ";
    for (let i = 0; i <= turns * Math.PI * 2; i += (Math.PI * 2) / steps) {
      const r = a + b * i; // Spiral equation
      let x = r * Math.cos(i);
      let y = r * Math.sin(i);
      if (invert) {
        x = -x;
        y = -y;
      }
      path += `L ${x} ${y} `;
    }
    return path;
}

const words = ["Rhythm", "Vision", "Reflection", "Ritual", "Routine", "Alchemy", "Magic", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Imagination", "Direction", "Goal", "Seeking", "Focus", "Dream", "Desire", "Upward", "Expansion", "Meditation", "Space", "Movement", "Epiphany", "Change", "Release", "Contemplation", "Inward", "Integration", "Earth", "Water", "Fire", "Air", "Quintessence", "Purpose", "Balance", "Embodiment", "System", "Body", "Mind", "Spirit"]
//  const yinWords =["Rhythm", "Ritual", "Routine", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Discipline", "Consistency "]

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}

function generateRandomWordList(length: number) {
    const list = []
    for (let i = 0; i < length; i++) {
        list.push(getRandomWord())
    }
    return list.join(" · ").toUpperCase()
}

// function generateSemiRandomString(length: number) {
//     const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     let result = "";
//     for (let i = 0; i < length; i++) {
//         const rn = Math.random()
//         if (rn < 0.4) {
//             result += getRandomWord().toUpperCase()
//         } else {
//             result += characters.charAt(Math.floor(rn * characters.length));
//         }
//     }
//     return result;
// }


export default function TwinSpiralText() {

    const textData = useMemo(() => generateRandomWordList(150), [])
    const textDataRev = useMemo(() => generateRandomWordList(150), [])


    return (
        <div className="absolute top-1/2 left-1/2">
            <svg overflow="visible" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="spiral" d={generateSpiral(25, 25, 7, 100)} fill="none" stroke="black" />
                    <path id="rev-spiral" d={generateSpiral(25, 25, 7, 100, true)} fill="none" stroke="black" />
                </defs>
                <text fontSize={48} className="fill-white/10 pointer-events-none noselect">
                    <textPath 
                        href="#spiral"
                        startOffset="50%"
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        
                    >
                        { textData}
                    </textPath>
                </text>
                <text fontSize={48} className="fill-black/40 pointer-events-none noselect">
                    <textPath 
                        href="#rev-spiral"
                        startOffset="50%" 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className="text-animation"
                    >
                       { textDataRev }
                    </textPath>
                </text>
            </svg>
        </div>
    )
}