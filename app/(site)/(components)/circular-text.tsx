// const words = ["Rhythm", "Vision", "Reflection", "Ritual", "Routine", "Alchemy", "Magic", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Imagination", "Direction", "Goal", "Seeking", "Focus", "Dream", "Desire", "Upward", "Expansion", "Meditation", "Space", "Movement", "Epiphany", "Change", "Release", "Contemplation", "Inward", "Integration", "Earth", "Water", "Fire", "Air", "Quintessence", "Purpose", "Balance", "Embodiment", "System", "Body", "Mind", "Spirit"]

// function getRandomWord() {
//     return words[Math.floor(Math.random() * words.length)]
// }

// function generateRandomWordList(length: number) {
//     const list = []
//     for (let i = 0; i < length; i++) {
//         list.push(getRandomWord())
//     }
//     return list.join(" · ")
// }

// const textData: { radius: number, text: string, id: number }[]  = []
// const textDataRev: { radius: number, text: string, id: number }[] = []

// for (let i=1; i <= 16; i++) {
//     const radius = 100 + (i * 60)
//     const text = generateRandomWordList(2 + i * 2)
//     const id = i
//     if (i % 2 === 0) {
//         textData.push({ radius, text, id })
//     } else {
//         textDataRev.push({ radius, text, id })
//     }
// }

// interface CircularTextProps {
//     radius: number;
//     textSize: number;
//     text: string;
//     id: number;
//     center: number;
// }

// function CircularText({ radius, textSize, text, id, center }: CircularTextProps) {

//     return (
//         <g>
//             <defs>
//                 <path id={`${id}`} d={`M ${center - radius} ${center} A ${radius} ${radius} 0 1 1 ${center + radius} ${center} A ${radius} ${radius} 0 1 1 ${center - radius} ${center}`} />
//             </defs>
//             <text fontSize={textSize} className="fill-background pointer-events-none">
//                 <textPath 
//                     href={`#${id}`} 
//                     startOffset="50%" 
//                     textAnchor="middle" 
//                     dominantBaseline="middle"
                    
//                 >
//                     { text.toUpperCase() }
//                 </textPath>
//             </text>
//         </g>
//     )
// }

// export default function ConcentricCirclesOfText() {
//     const textSize = 64;
//     const centerSize = 2300;
//     const centerRevSize = 2450;

//     return (
//         <> 
//         <div className="absolute origin-center top-[calc(50%-1150px)] left-[calc(50%-1150px)] animate-logo-spin will-change-transform">
//             <svg width={centerSize} height={centerSize} viewBox={`0 0 ${centerSize} ${centerSize}`} xmlns="http://www.w3.org/2000/svg" overflow="visible">
//                 { textData.map(data => (
//                     <CircularText key={data.id} center={centerSize / 2} radius={data.radius} textSize={textSize} text={data.text} id={data.id} />
//                 )) }
//             </svg>
//         </div>
//         <div className="absolute origin-center top-[calc(50%-1225px)] left-[calc(50%-1225px)] animate-logo-spin-reverse will-change-transform">
//             <svg width={centerRevSize} height={centerRevSize} viewBox={`0 0 ${centerRevSize} ${centerRevSize}`} xmlns="http://www.w3.org/2000/svg" overflow="visible">
//                 { textDataRev.map(data => (
//                     <CircularText key={data.id} center={centerRevSize / 2} radius={data.radius} textSize={textSize} text={data.text} id={data.id} />
//                 )) }
//             </svg>
//         </div>    
//         </>
//     )

// }

'use client'

import React from 'react';



// function getRandomWord() {
//     return words[Math.floor(Math.random() * words.length)];
// }

// function generateRandomWordList(length: number) {
//     const list = [];
//     for (let i = 0; i < length; i++) {
//         list.push(getRandomWord());
//     }
//     return list.join(" · ");
// }

// type TextData = {   
//     radius: number;
//     text: string;
//     id: number;
// }

// const textData: TextData[] = [];
// const textDataRev: TextData[] = [];

// const textData1 = ["Rhythm", "Vision", "Reflection", ""].join(" · ")

// for (let i = 1; i <= 16; i++) {
//     const radius = 100 + (i * 60);
//     const text = generateRandomWordList(Math.floor(2 + i * 2.5)).slice(0, Math.floor(i*25));
//     const id = i;
//     if (i % 2 === 0) {
//         textData.push({ radius, text, id });
//     } else {
//         textDataRev.push({ radius, text, id });
//     }
// }

function drawCircularText(ctx: CanvasRenderingContext2D, text: string, radius: number, centerX: number, centerY: number, textSize: number, id: number) {
    ctx.font = `${textSize}px Philosopher`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = `rgba(255, 255, 255, ${0.6 / (id+2)})`;
    
    // Save the current state
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // The circumference of the circle
    const circumference = 2 * Math.PI * radius;

    let textUpperCase = text.toUpperCase().slice(0, Math.floor(circumference / 24)).concat(" · ");
    
    // Measure the text width to properly center it
    const textWidth = ctx.measureText(textUpperCase).width;
    if (textWidth > circumference) {
        textUpperCase = textUpperCase.slice(0, textUpperCase.length - Math.floor((circumference - textWidth) / 24));
    }

    console.log(textWidth, textUpperCase.length)
    
    // Calculate the angle spacing for each character
    const totalAngle = textWidth / circumference;
    
    // Start drawing from this angle (to center the text)
    const startAngle = -totalAngle / 2;
    
    // Loop through each character in the text
    let currentAngle = startAngle;
    for (let i = 0; i < textUpperCase.length; i++) {
        const char = textUpperCase[i];
        const charWidth = ctx.measureText(char).width;
        
        // Calculate angle for this character
        const charAngle = (charWidth / 2) / radius;
        
        // Adjust current position
        ctx.save();
        ctx.rotate(currentAngle + charAngle);
        ctx.translate(0, -radius);
        // ctx.rotate(Math.PI * 2);
        
        // Draw the character
        ctx.fillText(char, 0, 0);
        
        // Restore to the center position
        ctx.restore();
        
        // Move to the next character position
        currentAngle += (charWidth / radius);
    }
    
    // Restore the original state
    ctx.restore();
}

export default function ConcentricCirclesOfText() {
    const textSize = 48;
    const centerSize = 2400;
    // const centerRevSize = 2450;
    
    const circle1Ref = React.useRef<HTMLCanvasElement | null>(null);
    const circle2Ref = React.useRef<HTMLCanvasElement | null>(null);
    const circle3Ref = React.useRef<HTMLCanvasElement | null>(null);
    const circle4Ref = React.useRef<HTMLCanvasElement | null>(null);
    const circle5Ref = React.useRef<HTMLCanvasElement | null>(null);
    const circle6Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle7Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle8Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle9Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle10Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle11Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle12Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle13Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle14Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle15Ref = React.useRef<HTMLCanvasElement | null>(null);
    // const circle16Ref = React.useRef<HTMLCanvasElement | null>(null);

    // const words = ["Rhythm", "Vision", "Reflection", "Ritual", "Routine", "Alchemy", "Magic", "Accumulation", "Pattern", "Stability", "Solidity", "Structure", "Downward", "Relaxation", "Imagination", "Direction", "Goal", "Seeking", "Focus", "Dream", "Desire", "Upward", "Expansion", "Meditation", "Space", "Movement", "Epiphany", "Change", "Release", "Contemplation", "Inward", "Integration", "Earth", "Water", "Fire", "Air", "Quintessence", "Purpose", "Balance", "Embodiment", "System", "Body", "Mind", "Spirit"];

    const circleData = React.useMemo(() => ({
        circle1: {
            id: 1,
            ref: circle1Ref,
            radius: 200,
            text: ["Rhythm", "Vision", "Reflection", "Integration"]
        },
        circle2: {
            id: 2,
            ref: circle2Ref,
            radius: 260,
            text: ["Integration", "Accumulation", "Balance", "Stability", "Magic"]
        },
        circle3: {
            id: 3,
            ref: circle3Ref,
            radius: 320,
            text: ["Alchemy", "Expansion", "Quintessence", "Pattern", "Epiphany", "Solidity", "Body"]
        },
        circle4: {
            id: 4,
            ref: circle4Ref,
            radius: 380,
            text: ["Structure", "Downward", "Relaxation", "Imagination", "Direction", "Dream", "Seeking", "Inward"]
        },
        circle5: {
            id: 5,
            ref: circle5Ref,
            radius: 440,
            text: ["Goal", "Desire", "Upward", "Expansion", "Meditation", "Space", "Movement", "Epiphany", "Change", "Release", "Magic"]
        },
        circle6: {
            id: 6,
            ref: circle6Ref,
            radius: 500,
            text: ["Spirit", "Earth", "Fire", "Air", "Water", "Quintessence", "Purpose", "Balance", "Embodiment", "Pattern", "Routine", "Alchemy", "Rhythm"]
        },
        // circle7: {
        //     id: 7,
        //     ref: circle7Ref,
        //     radius: 520,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle8: {
        //     id: 8,
        //     ref: circle8Ref,
        //     radius: 580,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle9: {
        //     id: 9,
        //     ref: circle9Ref,
        //     radius: 640,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle10: {
        //     id: 10,
        //     ref: circle10Ref,
        //     radius: 700,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle11: {
        //     id: 11,
        //     ref: circle11Ref,
        //     radius: 760,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle12: {
        //     id: 12,
        //     ref: circle12Ref,
        //     radius: 820,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle13: {
        //     id: 13,
        //     ref: circle13Ref,
        //     radius: 880,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle14: {
        //     id: 14,
        //     ref: circle14Ref,
        //     radius: 940,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle15: {
        //     id: 15,
        //     ref: circle15Ref,
        //     radius: 1000,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // },
        // circle16: {
        //     id: 16,
        //     ref: circle16Ref,
        //     radius: 1060,
        //     text: ["Rhythm", "Vision", "Reflection", "Direction"]
        // }
    }), []);
    

    // const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    // const canvasRevRef = React.useRef<HTMLCanvasElement | null>(null);
    
    React.useEffect(() => {
        Object.values(circleData).forEach((circle) => {
            const canvas = circle.ref.current;
            console.log(canvas)
            if (canvas) {
                console.log("canvas exists")
                const ctx = canvas.getContext('2d');
                console.log(circle)
                if (ctx) {
                    ctx.clearRect(0, 0, centerSize, centerSize);
                    const text = circle.text.join(" · ");
                    drawCircularText(
                        ctx, 
                        text, 
                        circle.radius - 30,
                        circle.radius, 
                        circle.radius, 
                        textSize,
                        circle.id
                    );
                }
            }
        })

        // // First canvas (clockwise rotation)
        // const canvas = canvasRef.current;
        // if (canvas) {
        //     const ctx = canvas.getContext('2d');
        //     if (ctx) {
        //         ctx.clearRect(0, 0, centerSize, centerSize);
                
        //         textData.forEach(data => {
        //             drawCircularText(
        //                 ctx, 
        //                 data.text, 
        //                 data.radius, 
        //                 centerSize / 2, 
        //                 centerSize / 2, 
        //                 textSize
        //             );
        //         });
        //     }
        
        //     // Second canvas (counter-clockwise rotation)
        //     const canvasRev = canvasRevRef.current;
        //     if (canvasRev) {
        //         const ctxRev = canvasRev.getContext('2d');
        //         if (ctxRev) {
        //             ctxRev.clearRect(0, 0, centerRevSize, centerRevSize);
                    
        //             textDataRev.forEach(data => {
        //                 drawCircularText(
        //                     ctxRev, 
        //                     data.text, 
        //                     data.radius, 
        //                     centerRevSize / 2, 
        //                     centerRevSize / 2, 
        //                     textSize
        //                 );
        //             });
        //         }
        //     }
        // }
    }, [circleData]);
    
    return (
        <div className={` relative w-full h-screen overflow-visible`}>
            <div className="absolute origin-center h-[280px] w-[280px] rounded-full shadow-[0_0px_8px_1px_rgba(255,255,255,0.25)] top-[calc(50%-140px)] left-[calc(50%-140px)] will-change-transform z-10"></div>
                {Object.values(circleData).map((circle) => (
                    <div 
                        key={circle.id} 
                    className={`absolute origin-center bg-[rgba(255,255,255,0.01)] w-[${circle.radius*2 + 50}px] h-[${circle.radius*2 + 50}px] pointer-events-none will-change-transform overflow-visible rounded-full shadow-[0_0px_8px_1px_rgba(255,255,255,0.25)]`}
                    style={{ 
                        animation: `spin linear infinite ${180 + circle.id*180}s ${circle.id % 2 === 0 ? '' : 'reverse'}`,
                        left:  `calc(50% - ${circle.radius}px)`,
                        top: `calc(50% - ${circle.radius}px)`,
                        overflow: 'visible',
                        zIndex: 10 - circle.id
                    }}
                >
                    <canvas 
                        ref={circle.ref}
                        width={circle.radius * 2}
                        height={circle.radius * 2}
                        style={{ overflow: 'visible' }}
                    />
                </div>
            ))}
            {/* <div className="absolute origin-center top-[160px] left-[160px] animate-logo-spin">
                <canvas 
                    ref={circle1Ref} 
                    width={320} 
                    height={320} 
                    style={{ overflow: 'visible' }}
                />
            </div> */}
            {/* <div className="absolute origin-center top-[calc(50%-1150px)] left-[calc(50%-1150px)] animate-logo-spin">
                <canvas 
                    ref={canvasRef} 
                    width={centerSize} 
                    height={centerSize} 
                    style={{ overflow: 'visible' }}
                />
            </div>
            <div className="absolute origin-center top-[calc(50%-1225px)] left-[calc(50%-1225px)] animate-logo-spin-reverse">
                <canvas 
                    ref={canvasRevRef} 
                    width={centerRevSize} 
                    height={centerRevSize} 
                    style={{ overflow: 'visible' }}
                />
            </div> */}
        </div>
    );
}