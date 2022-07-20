/** @format */

import * as React from "react";
import { SVGProps } from "react";
import styled from "styled-components";

interface SVGRProps {
  color?: string;
  transform?: string;
}

const Svg = styled.svg`
  transform: ${({ transform }) => (transform ? transform : undefined)};
`;

const Stadtverwaltung = ({
  color = "black",
  transform,
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <Svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="Stadtverwaltung"
    transform={transform}
  >
    <title>Stadtverwaltung</title>
    <g
      id="Icons"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="Stadtverwaltung" fill="#000000">
        <path
          d="M3.79384442,12.2832311 L4.00132309,12.3494789 L4.00132309,12.3694767 C4.08701738,12.411187 4.15049112,12.4879132 4.17540562,12.5799051 C4.20032011,12.6718971 4.18424158,12.7701687 4.13130876,12.8494238 C3.80517389,13.4661559 3.63038396,14.1516066 3.62136499,14.8492033 C3.62407021,14.9384344 3.59050424,15.0249538 3.52832843,15.0890138 C3.48169657,15.1370587 3.42195658,15.1693948 3.35733941,15.1825428 L3.29140138,15.1891658 L0.291732149,15.1891658 C0.110170615,15.1585174 -0.0165870866,14.9924211 0.00176412357,14.8092077 C0.0316224099,14.5982054 0.0818514968,14.3905918 0.151747585,14.1892761 C0.41436189,13.4319441 0.969161063,12.811222 1.69238213,12.4655787 C2.34985583,12.1513575 3.09679528,12.0882392 3.79384442,12.2832311 Z M8.59940149,6.89233497 C9.58562821,7.13602471 10.3276766,7.9502238 10.4790704,8.95476735 C10.6304641,9.95931091 10.1613396,10.9560447 9.29073983,11.4795749 C9.26270924,11.4991439 9.24168418,11.5271773 9.23074644,11.559566 C9.21057385,11.5991009 9.20773179,11.6452393 9.22289972,11.6869511 C9.23806765,11.7286629 9.26988221,11.7621989 9.31073762,11.7795418 C10.5459835,12.2963442 11.3447297,13.5102802 11.3305149,14.8492033 C11.3305845,15.010133 11.2186565,15.1455779 11.0675149,15.1805485 L11.0005513,15.1891658 L5.00121283,15.1891658 C4.81737838,15.1784227 4.67551836,15.0232633 4.68124812,14.8392044 C4.66774932,13.5087503 5.45701911,12.3011676 6.6810276,11.7795418 C6.71585632,11.7676349 6.74459396,11.7424894 6.76101878,11.7095495 C6.80684205,11.6293258 6.78019815,11.5271909 6.7010254,11.4795749 C6.35428196,11.2677452 6.06294881,10.976412 5.85111912,10.6296686 C5.32454507,9.76090648 5.37363748,8.66038572 5.97547419,7.84196015 C6.5773109,7.02353459 7.61317477,6.64864523 8.59940149,6.89233497 Z M12.6403705,12.1994955 C13.4323572,12.0977262 14.2322352,12.3159272 14.8628349,12.8057681 C15.4934347,13.2956089 15.902707,14.0166586 16,14.8092077 L16,14.8092077 L16,14.8292055 C15.9945906,15.0130456 15.8439571,15.1592487 15.6600375,15.1591691 L15.6600375,15.1591691 L12.6603683,15.1591691 C12.4726121,15.1591691 12.3204057,15.0069627 12.3204057,14.8192066 C12.3152395,14.1223307 12.143844,13.4367488 11.8204609,12.8194271 C11.8151194,12.8031903 11.8151194,12.7856694 11.8204609,12.7694326 C11.7603467,12.5982764 11.8496725,12.4106921 12.0204388,12.3494789 C12.2217546,12.2795829 12.4293681,12.2293538 12.6403705,12.1994955 Z M13.0003308,8.16990967 C13.6766034,8.16589021 14.2885409,8.57015018 14.5501501,9.19378607 C14.8117593,9.81742197 14.6713756,10.5372734 14.1946082,11.0169128 C13.7178409,11.4965522 12.9988456,11.6412568 12.3736497,11.3833979 C11.7484539,11.125539 11.3405138,10.5160405 11.3405138,9.83975569 C11.3405138,8.92143259 12.0820241,8.17543876 13.0003308,8.16990967 Z M3.00143335,8.16990967 C3.91973998,8.17543876 4.66125032,8.92143259 4.66125032,9.83975569 C4.66125032,10.5160405 4.25331025,11.125539 3.62811439,11.3833979 C3.00291853,11.6412568 2.28392326,11.4965522 1.80715591,11.0169128 C1.33038856,10.5372734 1.19000483,9.81742197 1.45161402,9.19378607 C1.7132232,8.57015018 2.3251607,8.16589021 3.00143335,8.16990967 Z M6.6810276,8.72987807 C6.63102457,8.75019581 6.59135747,8.78986291 6.57103973,8.83986594 C6.40269639,9.30167279 6.47296783,9.81679447 6.75885488,10.2166365 C7.04474192,10.6164785 7.50944908,10.8495787 8.00088206,10.8396454 C8.75547454,10.8404675 9.38508839,10.2826004 9.48774248,9.54926599 L9.50071668,9.4098031 L9.50071668,9.35980861 C9.48074418,9.26913619 9.39171114,9.21126472 9.30073873,9.22982294 C9.09311699,9.26959464 8.88220487,9.28968151 8.67080819,9.28981633 C8.01214308,9.2919806 7.3679032,9.09696745 6.82101217,8.72987807 C6.77651637,8.70977273 6.7255234,8.70977273 6.6810276,8.72987807 Z M9.53071337,0.000840622337 C9.81704662,0.00903991182 10.0861127,0.139649914 10.269682,0.359550559 C10.427027,0.548036827 10.5086046,0.786607243 10.5015691,1.02926014 L10.4906075,1.15071383 L10.4906075,1.69065429 C10.4930655,1.81362697 10.5457576,1.93023292 10.6364255,2.01334519 C10.7044264,2.0756794 10.7893425,2.11509759 10.8793238,2.12744113 L10.9705546,2.13060577 L11.6431844,2.13053989 C11.9065203,2.14792222 12.1544552,2.26908565 12.3304046,2.47056829 C12.5235885,2.66914192 12.6257265,2.93896609 12.6124589,3.21568885 C12.6010868,3.45287978 12.5058007,3.67691393 12.3457476,3.84891994 L12.2604124,3.93040731 L11.8604565,4.29036762 C11.7036014,4.4474823 11.6839946,4.68977232 11.8016358,4.86818084 L11.8604565,4.94029595 L12.2604124,5.33025295 C12.6536007,5.59641554 12.8053864,6.10238824 12.6236299,6.54102726 C12.4418734,6.97966629 11.9767034,7.22999441 11.5104951,7.14005338 C11.2299643,7.16213925 10.9478438,7.12814882 10.6805866,7.04006441 C10.4806086,6.94007543 10.2806307,6.7001019 9.96066596,6.47012725 C9.88127615,6.42461147 9.82435426,6.34816979 9.80350012,6.25906574 C9.78264598,6.16996168 9.79973276,6.07619882 9.85067808,6.00017908 C10.1471934,5.59403992 10.3049708,5.10317685 10.3006285,4.60033344 C10.3006285,3.33021857 9.27099693,2.30058703 8.00088206,2.30058703 C6.73076719,2.30058703 5.70113565,3.33021857 5.70113565,4.60033344 C5.69679329,5.10317685 5.8545707,5.59403992 6.15108604,6.00017908 C6.23039416,6.16313346 6.16343297,6.35955294 6.00110258,6.44013056 C5.78464472,6.63880991 5.55767642,6.82572498 5.32117755,7.00006882 C5.04376889,7.08882347 4.75104589,7.11945728 4.46127237,7.0900589 C3.99506402,7.17999993 3.52989407,6.9296718 3.34813757,6.49103278 C3.18152744,6.088947 3.29518535,5.63028224 3.61814052,5.35161741 L3.71135507,5.28025846 L4.11131096,4.92029815 C4.26816598,4.76318347 4.28777286,4.52089345 4.1701316,4.34248493 L4.11131096,4.27036982 L3.71135507,3.91040951 C3.50005965,3.73122872 3.37257602,3.4724138 3.35930849,3.19569105 C3.34604096,2.9189683 3.44817889,2.64914413 3.64136279,2.45057049 C3.81731224,2.24908786 4.06524717,2.12792443 4.32858301,2.1105421 L5.00121283,2.11060798 C5.12760276,2.11063659 5.24867656,2.05975413 5.33710209,1.96944721 C5.40342124,1.90171702 5.44718246,1.81609306 5.46378363,1.72420553 L5.47116101,1.6306609 L5.47116101,1.09072044 C5.44581975,0.810319394 5.53986774,0.532228143 5.73020001,0.324765968 C5.92053228,0.117303793 6.18950925,-0.000302158172 6.47105076,0.000840622337 C6.73919752,-0.00973773982 6.99996606,0.0798800239 7.20393618,0.249449486 L7.30095924,0.340803135 L7.66091955,0.740759032 C7.74734147,0.837395125 7.87124584,0.892058817 8.00088206,0.890742493 C8.10656488,0.890127024 8.20846618,0.855390471 8.29193084,0.792813604 L8.35084347,0.740759032 L8.70080488,0.340803135 C8.91508016,0.112535838 9.21787548,-0.0115008002 9.53071337,0.000840622337 Z"
          id="🎨-Icon-Color"
        ></path>
      </g>
    </g>
  </Svg>
);

export default Stadtverwaltung;
