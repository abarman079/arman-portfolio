import styles from "./hero-foundation.module.css";

/** Original vector artwork. The three planes are an abstract systems metaphor,
 * not a product screenshot or a live architecture visualization. */
export function SignatureScene() {
  return (
    <svg className={styles.art} data-signature-scene viewBox="0 0 640 540" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sig-paper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e9e4d8"/><stop offset="1" stopColor="#c7c2b5"/></linearGradient>
        <linearGradient id="sig-steel" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#faf8f1"/><stop offset=".43" stopColor="#c6cece"/><stop offset="1" stopColor="#849297"/></linearGradient>
        <linearGradient id="sig-edge" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#acb7b7"/><stop offset="1" stopColor="#52636a"/></linearGradient>
        <linearGradient id="sig-copper" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#de8c69"/><stop offset=".52" stopColor="#b65c40"/><stop offset="1" stopColor="#833a29"/></linearGradient>
        <linearGradient id="sig-petrol" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#66808a"/><stop offset=".52" stopColor="#2c4955"/><stop offset="1" stopColor="#172c36"/></linearGradient>
        <radialGradient id="sig-shadow"><stop stopColor="#252721" stopOpacity=".28"/><stop offset="1" stopColor="#252721" stopOpacity="0"/></radialGradient>
        <pattern id="sig-grain" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 1H5M0 4H5" stroke="#6f7b7b" strokeOpacity=".17" strokeWidth=".5"/></pattern>
      </defs>
      <rect width="640" height="540" fill="url(#sig-paper)"/>
      <g fill="none" stroke="#4d5758" strokeWidth=".7" opacity=".22">
        <path d="M40 70H600M40 470H600M80 30V510M560 30V510" strokeDasharray="3 6"/>
        <path d="M40 84V40H84M556 40H600V84M40 456V500H84M556 500H600V456"/>
        <circle cx="320" cy="270" r="205"/><circle cx="320" cy="270" r="156" strokeDasharray="2 8"/>
        <path d="M320 35V505M85 270H555" strokeDasharray="2 9"/>
      </g>
      <ellipse cx="327" cy="454" rx="228" ry="61" fill="url(#sig-shadow)"/>
      <g data-signature-layer="data">
        <path d="M100 353 320 251 540 353 320 455Z" fill="url(#sig-petrol)" stroke="#4f6770" strokeWidth="1.2"/>
        <path d="M100 353V371L320 473V455Z" fill="#203a46"/>
        <path d="M540 353V371L320 473V455Z" fill="#142831"/>
        <path d="M112 354 320 258 528 354 320 450Z" fill="none" stroke="#a7b8b6" strokeOpacity=".58"/>
        <g fill="none" stroke="#91adb3" strokeOpacity=".6" strokeWidth="1.3">
          <path d="M166 353 320 282 474 353 320 424Z"/><path d="M210 353 320 302 430 353 320 404Z"/>
          <path d="M265 327 376 378M376 327 265 378"/>
        </g>
        <path d="M319 319 391 353 319 386 247 353Z" fill="#122b36" stroke="#75929b"/>
        <g fill="#bbcbcb"><circle cx="320" cy="268" r="3"/><circle cx="500" cy="353" r="3"/><circle cx="320" cy="438" r="3"/><circle cx="140" cy="353" r="3"/></g>
      </g>
      <g data-signature-layer="logic">
        <path d="M100 264 320 162 540 264 320 366Z" fill="url(#sig-copper)" stroke="#b15b44" strokeWidth="1.2"/>
        <path d="M100 264V281L320 383V366Z" fill="#98432f"/>
        <path d="M540 264V281L320 383V366Z" fill="#683326"/>
        <path d="M113 264 320 169 527 264 320 359Z" fill="none" stroke="#ffccaa" strokeOpacity=".7"/>
        <g fill="none" stroke="#ffe1c1" strokeOpacity=".65" strokeWidth="1.5">
          <path d="M155 264 229 230 278 253 320 233 362 253 410 230 485 264"/>
          <path d="M155 264 229 298 278 275 320 295 362 275 410 298 485 264"/>
          <path d="M320 192V233M320 295V337"/>
        </g>
        <path d="M320 232 389 264 320 296 251 264Z" fill="#713c30" stroke="#ffe1c1" strokeWidth="1.2"/>
        <path d="M320 242 367 264 320 286 273 264Z" fill="#d78c67" stroke="#f9b691"/>
        <g fill="#f8c5a0"><circle cx="155" cy="264" r="3"/><circle cx="485" cy="264" r="3"/><circle cx="320" cy="192" r="3"/><circle cx="320" cy="337" r="3"/></g>
      </g>
      <g data-signature-layer="interface">
        <path d="M100 174 320 72 540 174 320 276Z" fill="url(#sig-steel)" stroke="#9ca7a7" strokeWidth="1.2"/>
        <path d="M100 174V194L320 296V276Z" fill="url(#sig-edge)"/>
        <path d="M540 174V194L320 296V276Z" fill="#78898d"/>
        <path d="M100 174 320 72 540 174 320 276Z" fill="url(#sig-grain)" opacity=".45"/>
        <path d="M113 174 320 79 527 174 320 269Z" fill="none" stroke="#fffdf3" strokeWidth="1.3"/>
        <path d="M161 174 320 100 479 174 320 248Z" fill="#a0adad" stroke="#f5f4e9" strokeWidth="1.4"/>
        <path d="M179 174 320 109 461 174 320 239Z" fill="#293e48"/>
        <g transform="matrix(1 .46 -1 .46 320 174)">
          <rect x="-74" y="-74" width="148" height="148" fill="#e9e7de" stroke="#eff5f3"/>
          <rect x="-62" y="-62" width="124" height="21" fill="#263b45"/>
          <rect x="-62" y="-29" width="73" height="79" fill="#c3cecd"/>
          <rect x="21" y="-29" width="41" height="34" fill="#b65c40"/>
          <rect x="21" y="15" width="41" height="35" fill="#8f9f9f"/>
          <path d="M-53 -14H-1M-53 0H-13M-53 14H1M-53 28H-22" stroke="#53636b" strokeWidth="3"/>
        </g>
        <g fill="#526469" stroke="#f8f6ed" strokeWidth="1"><circle cx="137" cy="174" r="4"/><circle cx="503" cy="174" r="4"/><circle cx="320" cy="89" r="4"/><circle cx="320" cy="259" r="4"/></g>
      </g>
      <g fill="none" stroke="#4c595d" strokeWidth=".9" opacity=".7"><path d="M55 113H93M585 225H557M55 411H93"/></g>
      <g fill="#425054" fontSize="10" fontFamily="monospace" letterSpacing="1"><text x="55" y="105">01</text><text x="566" y="216">02</text><text x="55" y="427">03</text></g>
    </svg>
  );
}
