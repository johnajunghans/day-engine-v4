'use client'

import { useMemo } from "react";

function generateTriskelion(a: number, b: number, turns: number, steps: number) {
    const spirals: string[] = [];
    const angles = [0, 120, 240]; // Three evenly spaced starting angles in degrees

    angles.forEach((angle) => {
        spirals.push(generateSpiralWithRotation(a, b, turns, steps, angle));
        spirals.push(generateSpiralWithRotation(a, b, turns, steps, angle, true)); // Mirrored twin spiral
    });

    return spirals;
}

function generateSpiralWithRotation(
    a: number,
    b: number,
    turns: number,
    steps: number,
    rotation: number,
    invert = false
) {
    let path = "M 0 0 ";
    const angleRad = (rotation * Math.PI) / 180; // Convert degrees to radians

    for (let i = 0; i <= turns * Math.PI * 2; i += (Math.PI * 2) / steps) {
        const r = a + b * i; // Spiral equation
        let x = r * Math.cos(i);
        let y = r * Math.sin(i);

        if (invert) {
            x = -x;
            y = -y;
        }

        // Rotate around center
        const rotatedX = x * Math.cos(angleRad) - y * Math.sin(angleRad);
        const rotatedY = x * Math.sin(angleRad) + y * Math.cos(angleRad);

        path += `L ${rotatedX} ${rotatedY} `;
    }
    
    return path;
}

const words = ["Rhythm", "Vision", "Reflection", "Ritual", "Routine", "Alchemy", "Magic", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Imagination", "Direction", "Goal", "Seeking", "Focus", "Dream", "Desire", "Upward", "Expansion", "Meditation", "Space", "Movement", "Epiphany", "Change", "Release", "Contemplation", "Inward", "Integration", "Earth", "Water", "Fire", "Air", "Quintessence", "Purpose", "Balance", "Embodiment", "System", "Body", "Mind", "Spirit"]
const yinWords =["Rhythm", "Ritual", "Routine", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Discipline", "Consistency "]

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

export default function TriskelionText() {
    const spirals = useMemo(() => generateTriskelion(25, 25, 7, 100), []);

    return (
        <div className="absolute top-1/2 left-1/2">
            <svg overflow="visible" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {spirals.map((spiral, i) => (
                        <path key={i} id={`spiral-${i}`} d={spiral} fill="none" stroke="black" />
                    ))}
                </defs>
                {spirals.map((_, i) => (
                    // <use key={i} href={`#spiral-${i}`} />
                    <text fontSize={16} key={i} className="fill-background pointer-events-none noselect">
                        <textPath href={`#spiral-${i}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                            { generateRandomWordList(400) }
                        </textPath>
                    </text>
                ))}
            </svg>
        </div>
    );
}