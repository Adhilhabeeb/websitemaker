import React from "react";

function CustemRight({ addbbutton ,setshowpanel}: { addbbutton: Function ,setshowpanel:Function}) {
  const elements = [
    { label: "Button", type: "button" },
    { label: "Div", type: "div" },
    { label: "Input", type: "input" },
    { label: "Paragraph", type: "p" },
  ];

  return (
    <div className="h-screen flex ">
      <div className="w-full max-w-sm bg-white shadow-2xl border-l p-6 overflow-y-auto">

        {/* Header */}
        <h2 className="text-xl font-bold text-slate-700 mb-6">
          Add Elements
        </h2>

        {/* Add Element Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {elements.map((el) => (
            <button
              key={el.type}
              onClick={() =>{ 
                
                setshowpanel(false)
                addbbutton(el.type, null)}}
              className="
                flex items-center justify-center
                h-16 rounded-xl
                bg-slate-100 hover:bg-blue-500
                text-slate-700 hover:text-white
                font-medium
                shadow-sm hover:shadow-md
                transition-all duration-200
                active:scale-95
              "
            >
              {el.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* Future Section */}
        <div className="space-y-3 text-sm text-slate-500">
          <p>More components coming soon...</p>
        </div>

      </div>
    </div>
  );
}

export default CustemRight;
