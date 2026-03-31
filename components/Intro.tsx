const homeTexts = [
    "Write your intro text here",
    "Write your intro text here",
    "Write your intro text here",
  ];

  export default function Intro() {
    return (
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="w-full md:w-[40%]">
          <img
            src="/caveman.jpg"
            alt="Profile photo"
            className="w-full rounded-xl object-cover aspect-square"
          />
        </div>
  
        <div className="flex w-full flex-col md:w-[60%]">
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-4">
            Unreal Engine Systems Programmer
          </h2>
          <div className="flex flex-col gap-3">
            {homeTexts.map((text, index) => (
              <p key={index} className="text-base leading-relaxed text-neutral-600">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }