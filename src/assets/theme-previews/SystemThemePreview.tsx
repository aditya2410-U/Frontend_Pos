interface SystemThemePreviewProps {
  accentColor?: string;
  className?: string;
}

export function SystemThemePreviewLight({
  accentColor = "#F97514",
  className,
}: SystemThemePreviewProps) {
  const accentColorLight = `${accentColor}0A`; // 4% opacity version

  return (
    <svg
      width="110"
      height="112"
      viewBox="0 0 110 112"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16"
        y="16"
        width="221"
        height="128"
        rx="14"
        fill="#F8F9FA"
        stroke="#EEEFF1"
      />
      <rect
        x="18"
        y="18"
        width="221"
        height="128"
        rx="12"
        fill="#FFFFFF"
        stroke="#EEEFF1"
      />
      <path
        d="m 18.5,36.9 c 0,-6.4406 0,-9.6609 1.2534,-12.1209 1.1026,-2.1639 2.8618,-3.9231 5.0257,-5.0257 C 27.2391,18.5 30.4594,18.5 36.9,18.5 h 32.6 v 128 H 36.9 c -6.4406,0 -9.6609,0 -12.1209,-1.253 -2.1639,-1.103 -3.9231,-2.862 -5.0257,-5.026 C 18.5,137.761 18.5,134.541 18.5,128.1 Z"
        fill="#FBFBFB"
      />
      <path
        d="m 29.805,29.0915 -0.5638,-0.9024 c 0,0 -0.0021,-0.0038 -0.0034,-0.0055 l -0.0445,-0.0709 c -0.0839,-0.1346 -0.229,-0.2152 -0.3876,-0.2156 l -0.9083,-0.0029 -0.0634,0.1015 -1.0853,1.7369 -0.06,0.0961 0.4547,0.7266 c 0.084,0.1351 0.2291,0.2157 0.389,0.2157 h 1.2728 c 0.157,0 0.3055,-0.0827 0.3885,-0.2153 l 0.0449,-0.0717 c 0,0 0.0017,-0.0021 0.0021,-0.0029 l 0.5647,-0.9037 c 0.0928,-0.1477 0.0928,-0.3386 0,-0.4859 z"
        fill="#CDCFD1"
      />
      <rect x="32" y="26" width="16" height="4" rx="2" fill="#EEEFF1" />
      <rect x="76" y="26" width="24" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="45" width="21" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="45" width="6" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="56" width="27" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="56" width="6" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="67" width="25" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="67" width="6" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="78" width="30" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="78" width="6" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="89" width="21" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="89" width="6" height="4" rx="2" fill="#EEEFF1" />
      <rect x="32" y="100" width="25" height="4" rx="2" fill="#EEEFF1" />
      <rect x="24" y="100" width="6" height="4" rx="2" fill="#EEEFF1" />
      <path d="M 18,38 H 222" stroke="#EEEFF1" />
      <path d="M 76,56 H 223" stroke="#EEEFF1" />
      <path d="M 76,70 H 223" stroke="#EEEFF1" />
      <path d="M 76,84 H 223" stroke="#EEEFF1" />
      <path d="M 76,98 H 223" stroke="#EEEFF1" />
      {/* Accent colored elements */}
      <g opacity="0.6">
        <path
          d="M 69,55.6 V 56 h 4 V 55.6 C 73,55.0399 73,54.7599 72.891,54.546 72.7951,54.3578 72.6422,54.2049 72.454,54.109 72.2401,54 71.9601,54 71.4,54 h -0.8 c -0.5601,0 -0.8401,0 -1.054,0.109 -0.1882,0.0959 -0.3411,0.2488 -0.437,0.437 C 69,54.7599 69,55.0399 69,55.6 Z"
          fill={accentColor}
          stroke={accentColor}
        />
        <path
          d="M 69,68.4 V 56 h 33.4 c 0.56,0 0.84,0 1.054,0.109 0.188,0.0959 0.341,0.2488 0.437,0.437 C 104,56.7599 104,57.0399 104,57.6 v 10.8 c 0,0.5601 0,0.8401 -0.109,1.054 -0.096,0.1882 -0.249,0.3411 -0.437,0.437 C 103.24,70 102.96,70 102.4,70 H 70.6 C 70.0399,70 69.7599,70 69.546,69.891 69.3578,69.7951 69.2049,69.6422 69.109,69.454 69,69.2401 69,68.9601 69,68.4 Z"
          fill={accentColorLight}
          stroke={accentColor}
        />
        <rect x="74" y="61" width="19" height="4" rx="2" fill={accentColor} />
      </g>
      <rect x="76" y="45" width="20" height="4" rx="2" fill="#EEEFF1" />
      <rect x="100" y="45" width="20" height="4" rx="2" fill="#EEEFF1" />
    </svg>
  );
}

export function SystemThemePreviewDark({
  accentColor = "#C95908",
  className,
}: SystemThemePreviewProps) {
  const accentColorDark = `${accentColor}1A`; // 10% opacity version for dark theme

  return (
    <svg
      width="110"
      height="112"
      viewBox="110 0 110 112"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="16"
        y="16"
        width="221"
        height="128"
        rx="14"
        fill="#15181C"
        stroke="#27282B"
      />
      <rect
        x="18"
        y="18"
        width="221"
        height="128"
        rx="12"
        fill="#1A1D21"
        stroke="#27282B"
      />
      <path d="M 76,56 H 223" stroke="#27282B" />
      <path d="M 76,70 H 223" stroke="#27282B" />
      <path d="M 76,84 H 223" stroke="#27282B" />
      <path d="M 76,98 H 223" stroke="#27282B" />
      <path d="M 76,112 H 223" stroke="#27282B" />
      <path d="m 138,56 v 72" stroke="#27282B" />
      <path d="m 178,56 v 72" stroke="#27282B" />
      {/* Accent colored elements for dark theme */}
      <rect
        x="143"
        y="61"
        width="17"
        height="4"
        rx="2"
        fill={accentColorDark}
      />
      <rect x="184" y="61" width="22" height="4" rx="2" fill="#242529" />
      <rect x="143" y="75" width="28" height="4" rx="2" fill="#242529" />
      <rect x="184" y="75" width="28" height="4" rx="2" fill="#242529" />
      <rect x="143" y="89" width="25" height="4" rx="2" fill="#242529" />
      <rect x="184" y="89" width="22" height="4" rx="2" fill="#242529" />
      <rect x="143" y="103" width="22" height="4" rx="2" fill="#242529" />
      <rect x="184" y="103" width="28" height="4" rx="2" fill="#242529" />
      <rect x="124" y="45" width="20" height="4" rx="2" fill={accentColor} />
      <rect x="185" y="45" width="15" height="4" rx="2" fill="#242529" />
      <rect x="204" y="45" width="15" height="4" rx="2" fill="#242529" />
      <rect x="205" y="26" width="14" height="4" rx="2" fill="#242529" />
    </svg>
  );
}
