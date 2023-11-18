import React, {useState} from "react";

const Description = ({title, text}) => {
    const [onHover, setOnHover] = useState(false)
  return (
    <div onMouseEnter={()=>setOnHover(true)} onMouseLeave={()=>setOnHover(false)} className="ml-2 relative rounded-full text-[9px] font-serif font-semibold text-white w-3 h-3 bg-[#82A0CE] inline-flex justify-center items-center active:scale-95">
      i
      {onHover && <div className="absolute text-black text-sm font-sans left-full bg-white rounded-lg border border-blue-100 p-3 ml-2 w-52">
        <h3 className="w-full pb-1 font-medium border-b">{title}</h3>
        <p className="w-fit text-[#82A0CE] font-normal pt-1">{text}</p>
      </div>}
    </div>
  );
};

export default Description;
