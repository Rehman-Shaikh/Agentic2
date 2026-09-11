import React from 'react'
import { X, Code2 } from 'lucide-react'

function Artifact() {
  return (
    <div className='flex flex-col h-full bg-[#0d0f14]'>
      <div className='h-14 px-4 border-b border-white/[0.06] flex items-center gap-3 shrink-0'>
          <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0' >
              <X size={15}/>
          </button>

          <div className='flex items-center gap-2 flex-1 min-w-0'>
            <div className='flex items-center justify-center w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 shrink-0'>
                <Code2 className="text-indigo-400" size={12} />
            </div>

          </div>

      </div>
    </div>
  )
}

export default Artifact
