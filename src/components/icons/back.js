import React from 'react'
import Svg, { Path, Defs, G, Use, Mask, ClipPath, LinearGradient, Stop, Rect } from 'react-native-svg'

export default function (props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" width={props.size} height={props.size} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id="clip-path">
          <Rect width="24" height="24" fill="none"/>
        </ClipPath>
        <ClipPath id="clip-path-2">
          <Path id="Mask" d="M9.61,14.883a1.212,1.212,0,0,1,.348,1.2,1.238,1.238,0,0,1-.9.875,1.26,1.26,0,0,1-1.2-.326L.371,9.371a1.211,1.211,0,0,1,0-1.745L7.857.366A1.261,1.261,0,0,1,9.9.743a1.208,1.208,0,0,1-.278,1.363L3.026,8.5Z" transform="translate(0.5 0.5)" fill="#fc3469"/>
        </ClipPath>
        <LinearGradient id="linear-gradient" x2="0.983" y2="0.983" gradientUnits="objectBoundingBox">
          <Stop offset="0" stop-color="#aa57e4"/>
          <Stop offset="1" stop-color="#8742ef"/>
        </LinearGradient>
      </Defs>
      <G id="_1_log_13" data-name="1_log_13" clip-path="url(#clip-path)">
        <G id="Group_25" data-name="Group 25">
          <Rect id="Rectangle" width="24" height="24" fill="none"/>
          <G id="color_primary" data-name="color/primary" transform="translate(0 3)">
            <Rect id="Mask-2" data-name="Mask" d="M9.61,14.883a1.212,1.212,0,0,1,.348,1.2,1.238,1.238,0,0,1-.9.875,1.26,1.26,0,0,1-1.2-.326L.371,9.371a1.211,1.211,0,0,1,0-1.745L7.857.366A1.261,1.261,0,0,1,9.9.743a1.208,1.208,0,0,1-.278,1.363L3.026,8.5Z" transform="translate(0.5 0.5)" fill="#fc3469"/>
            <G id="color_primary-2" data-name="color/primary" clip-path="url(#clip-path-2)">
              <G id="color_primary-3" data-name="color/primary" transform="translate(0 -3)" clip-path="url(#clip-path)">
                <Rect id="Rectangle-2" data-name="Rectangle" width="24" height="24" fill="url(#linear-gradient)"/>
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  )
}