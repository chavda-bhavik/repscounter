import{R as e,c as i}from"./vendor.7550ee5a.js";import{B as d}from"./index.1ad9e1d6.js";const o=({show:s,onClose:m,onSelect:t,exercises:r,selectedExerciseId:l})=>e.createElement(d,{show:s,onClose:m},e.createElement("ul",{className:"pb-7 sm:pb-0 divide-y-2 divide-gray-300"},r&&r.slice().map(a=>e.createElement("li",{"data-cy":"exercise-item",key:a.id,onClick:()=>t&&t(a.id),className:i("flex items-center p-2 hover:bg-primary-highlight bg-opacity-20 transition-colors duration-300 rounded-sm cursor-pointer",{"bg-success":a.id===l})},e.createElement("div",{className:"flex-shrink-0"},e.createElement("div",{className:"w-10 h-10 bg-green-500 rounded-full mr-2"})),e.createElement("div",{className:"ml-4"},e.createElement("h3",{className:"text-lg leading-6 font-medium text-gray-900"},a.name))))));export{o as default};
