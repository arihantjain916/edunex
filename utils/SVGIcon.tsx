import Link from "next/link";
import Image from "next/image";

export interface Link {
  link: string;
}
export const LinkedinIcon = (props: Link) => {
  return (
    <>
      <Link href={props.link} target="_blank">
        <svg
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5 h-5"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M503.983,92.994c4.428,0,8.017-3.589,8.017-8.017V42.221C512,18.941,493.059,0,469.779,0H42.221 C18.941,0,0,18.941,0,42.221v427.557C0,493.059,18.941,512,42.221,512h427.557C493.059,512,512,493.059,512,469.779V119.182 c0-4.427-3.588-8.017-8.017-8.017c-4.428,0-8.017,3.589-8.017,8.017v350.597c0,14.44-11.747,26.188-26.188,26.188H42.221 c-14.44,0-26.188-11.748-26.188-26.188V42.221c0-14.44,11.748-26.188,26.188-26.188h427.557c14.441,0,26.188,11.748,26.188,26.188 v42.756C495.967,89.405,499.555,92.994,503.983,92.994z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M153.386,238.898c4.427,0,8.017-3.589,8.017-8.017v-34.739c0-4.427-3.589-8.017-8.017-8.017H84.977 c-4.427,0-8.017,3.589-8.017,8.017v230.881c0,4.427,3.589,8.017,8.017,8.017h68.409c4.427,0,8.017-3.589,8.017-8.017V266.154 c0-4.427-3.589-8.017-8.017-8.017s-8.017,3.589-8.017,8.017v152.852H92.994V204.159h52.376v26.722 C145.37,235.308,148.959,238.898,153.386,238.898z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M408.05,210.086c-16.319-13.956-37.454-21.96-57.987-21.96c-33.891,0-55.359,11.268-68.944,25.151v-17.134 c0-4.427-3.588-8.017-8.017-8.017h-68.409c-4.427,0-8.017,3.589-8.017,8.017v230.881c0,4.427,3.589,8.017,8.017,8.017h68.409 c4.428,0,8.017-3.589,8.017-8.017V315.858c0-21.457,18.032-34.739,34.739-34.739c20.129,0,34.739,14.61,34.739,34.739v111.165 c0,4.427,3.588,8.017,8.017,8.017h68.409c4.428,0,8.017-3.589,8.017-8.017V264.551C435.04,244.315,425.454,224.972,408.05,210.086 z M419.006,419.006H366.63V315.858c0-28.946-21.828-50.772-50.772-50.772c-24.418,0-50.772,19.412-50.772,50.772v103.148H212.71 V204.159h52.376v34.739c0,3.656,2.573,6.926,6.125,7.789c3.66,0.888,7.55-0.973,9.15-4.385 c11.871-25.31,35.323-38.143,69.703-38.143c32.545,0,68.944,25.828,68.944,60.392V419.006z"></path>{" "}
              </g>{" "}
            </g>{" "}
            <g>
              {" "}
              <g>
                {" "}
                <path d="M119.182,76.96c-23.281,0-42.221,18.941-42.221,42.221s18.941,42.221,42.221,42.221s42.221-18.941,42.221-42.221 S142.462,76.96,119.182,76.96z M119.182,145.37c-14.44,0-26.188-11.748-26.188-26.188s11.748-26.188,26.188-26.188 s26.188,11.748,26.188,26.188S133.621,145.37,119.182,145.37z"></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </Link>
    </>
  );
};

export const GithubIcon = (props: Link) => {
  return (
    <>
      <Link href={props.link} target="_blank">
        <svg
          // xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
          // stroke="currentColor"
          stroke-linecap="round"
          fill="#000000"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-5 h-5"
        >
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      </Link>
    </>
  );
};

export const TwitterIcon = (props: Link) => {
  return (
    <>
      <Link href={props.link} target="_blank">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </Link>
    </>
  );
};

export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      width="24"
      height="24"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

export const UpdateProfileIcon = () => {
  return (
    <svg
      className="w-5 h-7"
      viewBox="0 0 20 20"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Dribbble-Light-Preview"
          transform="translate(-140.000000, -2159.000000)"
          fill="#000000"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path
              d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598"
              id="profile_round-[#1342]"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const ThreedotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-roledescription="more menu"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-black dark:text-white"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
};

export const CloseMenuIcon = () => {
  return (
    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
      />
    </svg>
  );
};

export const OpenMenuButton = () => {
  return (
    <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
      />
      <path
        fill="currentColor"
        d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
      />
      <path
        fill="currentColor"
        d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
      />
    </svg>
  );
};

export const QuizIcon = ({ style }: { style: any }) => {
  return (
    <Image
      src={"/quiz.png"}
      alt="quiz"
      width={40}
      height={40}
      className={style}
    />
  );
};
