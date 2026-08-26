interface GreetingProps {
  hide: boolean;
}

function Greeting({ hide }: GreetingProps) {
  return (
    <div className="bg-white fixed flex flex-col justify-center items-center inset-0 overflow-hidden z-99 pointer-events-none">
      <p className="text-[5svh]">Hi! I'm Amel.</p>
      <p className="absolute text-[1.4svh] bottom-[5%]">Loading files..</p>
    </div>
  );
}

export default Greeting;
