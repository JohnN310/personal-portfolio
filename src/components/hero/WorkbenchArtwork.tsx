import { useId } from "react";
export function WorkbenchArtwork({ kind }: { kind: "product" | "agents" | "research" }) {
  const uid = useId().replaceAll(":", "");
  if (kind === "product") return <svg className="object-art" aria-hidden="true" viewBox="0 0 300 240" fill="none">
    <defs><linearGradient id={`${uid}-bag`} x1="70" y1="70" x2="230" y2="240" gradientUnits="userSpaceOnUse"><stop stopColor="#F19C70"/><stop offset="1" stopColor="#D95B37"/></linearGradient></defs>
    <ellipse cx="154" cy="212" rx="96" ry="12" fill="#302F24" opacity=".09"/>
    <g transform="rotate(-10 150 120)"><path d="M73 78 215 73l20 131-157 9Z" fill="#B94229"/><path d="m73 78 142-5-7 132-145-3Z" fill={`url(#${uid}-bag)`}/><path d="m63 202 15 11 157-9-27 1Z" fill="#BB482C"/><path d="M112 92V66c0-42 63-43 64-2v26" stroke="#813B29" strokeWidth="9" strokeLinecap="round"/><path d="M113 89V65c0-39 61-40 62-1v24" stroke="#F9C9A6" strokeWidth="5" strokeLinecap="round"/>
    <path d="M118 131c7-15 26-13 32-4 10-14 31-8 31 8 0 19-28 34-31 36-4-2-32-19-32-40Z" fill="#FFF0CE"/>
    <path d="M150 124c-1-13 8-21 20-19 0 13-9 21-20 19Z" fill="#567251"/><text x="105" y="190" fill="#672F21" fontSize="17" fontWeight="700" letterSpacing="-.5">remeli</text></g>
    <g transform="rotate(13 236 69)"><rect x="200" y="48" width="56" height="35" rx="7" fill="#FFFDF8" stroke="#D7C7AF"/><text x="210" y="70" fontSize="13" fill="#4D5D43" fontWeight="700">−waste</text></g>
  </svg>;
  if (kind === "agents") return <svg className="object-art" aria-hidden="true" viewBox="0 0 300 240" fill="none">
    <ellipse cx="150" cy="214" rx="103" ry="12" fill="#302F24" opacity=".09"/>
    <g stroke="#7C8978" strokeWidth="2" strokeDasharray="3 5"><path d="m74 88 76 42 80-45M150 130v66M80 167l70-37 77 40M151 46v84"/></g>
    <g fill="#BECBB3" stroke="#76866C" strokeWidth="1.2"><path d="m104 103 47-26 46 26v52l-46 27-47-27Z"/></g>
    <path d="m104 103 47 27 46-27-46-26Z" fill="#DFE7D4"/><path d="m151 130 46-27v52l-46 27Z" fill="#8EA17F"/>
    <path d="M123 108v-9m28 24v-9m27-6v-9" stroke="#5D7350" strokeWidth="3" strokeLinecap="round"/>
    <g fill="#FDFCF6" stroke="#9AAB8B" strokeWidth="1.5"><rect x="53" y="68" width="42" height="39" rx="10"/><rect x="208" y="65" width="42" height="39" rx="10"/><rect x="130" y="25" width="42" height="39" rx="10"/><rect x="54" y="150" width="42" height="39" rx="10"/><rect x="207" y="151" width="42" height="39" rx="10"/><rect x="130" y="182" width="42" height="39" rx="10"/></g>
    <g stroke="#60764F" strokeWidth="2" strokeLinecap="round"><path d="m65 88 6 6 12-13m136 4h19m-14-6-6 6 6 6M144 45h14m-7-7v14M65 169h19m-19-5h9m142 4 5 5 10-10m-92 38h14"/></g>
    <circle cx="244" cy="39" r="5" fill="#B4C698"/><path d="m41 121 5 5m0-5-5 5" stroke="#76866C" strokeWidth="2"/>
  </svg>;
  return <svg className="object-art" aria-hidden="true" viewBox="0 0 300 240" fill="none">
    <defs><linearGradient id={`${uid}-lens`} x1="82" y1="65" x2="200" y2="178" gradientUnits="userSpaceOnUse"><stop stopColor="#EEF0E1"/><stop offset="1" stopColor="#C1C8B4"/></linearGradient></defs>
    <ellipse cx="151" cy="214" rx="94" ry="12" fill="#302F24" opacity=".09"/>
    <g transform="rotate(18 149 120)"><rect x="67" y="42" width="156" height="157" rx="19" fill="#DFDED1" stroke="#B8B9AC"/><rect x="61" y="35" width="156" height="157" rx="19" fill="#FFFDF7" stroke="#D5D5C8"/>
    <path d="M78 66h36m-36 9h20" stroke="#9A9F8E" strokeWidth="2"/>
    <g fill="#B4BCAA">{[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => <circle key={`${row}-${col}`} cx={92+col*23} cy={94+row*17} r="2.3"/>))}</g>
    <circle cx="157" cy="119" r="43" fill={`url(#${uid}-lens)`} fillOpacity=".8" stroke="#728069" strokeWidth="9"/><circle cx="157" cy="119" r="35" stroke="#FBFDF5" strokeWidth="3"/>
    <path d="m190 153 28 29" stroke="#65725D" strokeWidth="16" strokeLinecap="round"/>
    <path d="m138 128 10-20 13 15 14-27" stroke="#C35F3E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="175" cy="96" r="4" fill="#C35F3E"/>
    </g><path d="m58 58 2-10m-7 5 11 1" stroke="#A88A59" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
