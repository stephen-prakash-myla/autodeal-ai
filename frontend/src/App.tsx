// import { useState } from "react"

// function App() {
//   const [goal, setGoal] = useState("")
//   const [contractText, setContractText] = useState("")
//   const [file, setFile] = useState<File | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState<any>(null)

//   const runAgent = async () => {
//     if (!goal) {
//       alert("Please enter a goal")
//       return
//     }

//     if (!contractText && !file) {
//       alert("Provide contract text or upload a file")
//       return
//     }

//     setLoading(true)
//     setResult(null)

//     const formData = new FormData()
//     formData.append("goal", goal)

//     if (contractText) {
//       formData.append("text_input", contractText)
//     }

//     if (file) {
//       formData.append("file", file)
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/run-agent", {
//         method: "POST",
//         body: formData,
//       })

//       const data = await response.json()
//       setResult(data.analysis)
//     } catch (error) {
//       alert("Backend not running")
//     }

//     setLoading(false)
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-10">
//       <div className="max-w-4xl mx-auto space-y-8">

//         <div className="text-center">
//           <h1 className="text-5xl font-bold text-cyan-400">
//             AutoDeal AI
//           </h1>
//           <p className="mt-2 text-gray-400">
//             Autonomous Lease Contract Intelligence
//           </p>
//         </div>

//         <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">

//           <input
//             type="text"
//             placeholder="Enter your negotiation goal..."
//             className="w-full p-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
//             value={goal}
//             onChange={(e) => setGoal(e.target.value)}
//           />

//           <textarea
//             placeholder="Paste contract text here..."
//             className="w-full p-3 h-40 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
//             value={contractText}
//             onChange={(e) => setContractText(e.target.value)}
//           />

//           <div className="border-2 border-dashed border-white/20 rounded-xl p-4 text-center">
//             <p className="text-gray-400 mb-2">
//               Or Upload Contract (PDF / Image)
//             </p>
//             <input
//               type="file"
//               accept=".pdf,.png,.jpg,.jpeg"
//               onChange={(e) => {
//                 if (e.target.files) {
//                   setFile(e.target.files[0])
//                 }
//               }}
//               className="text-sm"
//             />
//           </div>

//           <button
//             onClick={runAgent}
//             className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold transition"
//           >
//             Analyze Contract
//           </button>

//           {loading && (
//             <div className="text-center text-cyan-400 animate-pulse">
//               Analyzing with AI...
//             </div>
//           )}
//         </div>

//         {result && (
//           <div className="space-y-6">

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Contract Summary
//               </h2>
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 {Object.entries(result.contract_summary || {}).map(([key, value]) => (
//                   <div key={key} className="bg-black/40 p-3 rounded-xl">
//                     <div className="text-gray-400 text-xs uppercase">{key}</div>
//                     <div className="text-white font-medium">{String(value)}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Fairness Score
//               </h2>
//               <div className="text-6xl font-bold text-green-400">
//                 {result.fairness_score}/100
//               </div>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Risk Flags
//               </h2>
//               <ul className="list-disc pl-6 space-y-2">
//                 {(result.risk_flags || []).map((risk: string, index: number) => (
//                   <li key={index} className="text-red-400">{risk}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Negotiation Strategy
//               </h2>
//               <p className="text-gray-300 whitespace-pre-line">
//                 {result.negotiation_strategy}
//               </p>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
//               <h2 className="text-xl font-semibold text-cyan-400 mb-4">
//                 Email Draft
//               </h2>
//               <pre className="text-gray-300 whitespace-pre-wrap bg-black/40 p-4 rounded-xl">
//                 {result.email_draft}
//               </pre>
//             </div>

//           </div>
//         )}

//       </div>
//     </div>
//   )
// }

// export default App


import { useState } from "react"
import { motion } from "framer-motion"

function App() {
  const [goal, setGoal] = useState("")
  const [contractText, setContractText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const runAgent = async () => {
    if (!goal) {
      alert("Please enter a goal")
      return
    }

    if (!contractText && !file) {
      alert("Provide contract text or upload a file")
      return
    }

    setLoading(true)
    setResult(null)

    const formData = new FormData()
    formData.append("goal", goal)

    if (contractText) {
      formData.append("text_input", contractText)
    }

    if (file) {
      formData.append("file", file)
    }

    try {
      const response = await fetch(
  "https://automatic-spoon-4jpvp5x6q9gr37qx5-8000.app.github.dev/run-agent",
  {
    method: "POST",
    body: formData,
  }
);

      const data = await response.json()
      setResult(data.analysis)
    } catch (error) {
      alert("Backend not running or error occurred")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-10">

      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold text-cyan-400">
            AutoDeal AI
          </h1>
          <p className="text-gray-400 text-lg">
            Autonomous Lease Contract Intelligence Platform
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6">

          <input
            type="text"
            placeholder="Enter your negotiation goal..."
            className="w-full p-4 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400 transition"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <textarea
            placeholder="Paste lease contract text here..."
            className="w-full p-4 h-40 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400 transition"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
          />

          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center bg-black/30">
            <p className="text-gray-400 mb-3">
              Or Upload Contract (PDF / Image)
            </p>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0])
                }
              }}
              className="text-sm"
            />
          </div>

          <button
            onClick={runAgent}
            className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Analyze Contract
          </button>

          {loading && (
            <div className="text-center text-cyan-400 animate-pulse">
              Analyzing with AI...
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
{result.currency_detected && (
  <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-400/30 text-center text-cyan-300 font-medium">
    Currency Detected: {result.currency_detected}
  </div>
)}
            {/* Contract Summary */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
                Contract Summary
              </h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                {Object.entries(result.contract_summary || {}).map(([key, value]) => (
                  <div key={key} className="bg-black/40 p-4 rounded-xl">
                    <div className="text-gray-400 text-xs uppercase mb-1">{key}</div>
                    <div className="text-white font-medium">{String(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fairness Score Ring */}
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 text-center">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-8">
                Fairness Score
              </h2>

              <div className="flex justify-center">
                <div className="relative w-48 h-48">

                  <svg className="transform -rotate-90" width="192" height="192">
                    <circle
                      cx="96"
                      cy="96"
                      r="85"
                      stroke="#1f2937"
                      strokeWidth="14"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="85"
                      stroke="#06b6d4"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray={535}
                      strokeDashoffset={535 - (535 * (result.fairness_score || 0)) / 100}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 535 }}
                      animate={{                        
                        strokeDashoffset:
                          535 - (535 * (result.fairness_score || 0)) / 100,
                      }}
                      transition={{ duration: 1.2 }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-cyan-400">
                      {result.fairness_score}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Flags */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
                Risk Flags
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                {(result.risk_flags || []).map((risk: string, index: number) => (
                  <li key={index} className="text-red-400">
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategy */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
                Negotiation Strategy
              </h2>
              <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                {result.negotiation_strategy}
              </p>
            </div>

            {/* Email Draft */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">
                Email Draft
              </h2>
              <pre className="text-gray-300 whitespace-pre-wrap bg-black/40 p-6 rounded-xl leading-relaxed">
                {result.email_draft}
              </pre>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  )
}

export default App