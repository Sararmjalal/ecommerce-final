const Loading = () => {

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-white z-[9998]">
    <svg xmlns="http://www.w3.org/2000/svg"
      className="m-auto bg-[rgb(241, 242, 243)] block shape-auto"
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
    <g>
      <circle cx="60" cy="50" r="4" fill="#000000">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.67s" />
          <animate
            attributeName="fill-opacity"
            repeatCount="indefinite"
            dur="1s"
            values="0;1;1"
            keyTimes="0;0.2;1"
            begin="-0.67s" />
      </circle>
        <circle
          cx="60"
          cy="50"
          r="4"
          fill="#000000">
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="1s"
            values="95;35"
            keyTimes="0;1"
            begin="-0.33s" />
        <animate
        attributeName="fill-opacity"
        repeatCount="indefinite"
        dur="1s"
        values="0;1;1"
        keyTimes="0;0.2;1"
        begin="-0.33s" />
      </circle>
      <circle
      cx="60"
      cy="50"
      r="4"
      fill="#000000">
        <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        values="95;35"
        keyTimes="0;1"
        begin="0s" />
       <animate
       attributeName="fill-opacity"
       repeatCount="indefinite"
       dur="1s"
       values="0;1;1"
       keyTimes="0;0.2;1"
       begin="0s" />
      </circle>
    </g><g transform="translate(-15 0)">
      <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#fbb03b" transform="rotate(90 50 50)" />
      <path d="M50 50L20 50A30 30 0 0 0 80 50Z" fill="#fbb03b">
            <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;45 50 50;0 50 50"
            keyTimes="0;0.5;1" />
      </path>
        <path
          d="M50 50L20 50A30 30 0 0 1 80 50Z"
          fill="#fbb03b">
            <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;-45 50 50;0 50 50"
            keyTimes="0;0.5;1" />
        </path>
    </g>
  </svg>
    </div>
  )
}

export default Loading