const Hero = ({ title, description }) => (
  <div className="flex flex-col justify-start items-center   py:2 md:py-12  ">
    <h1 className=" uppercase font-bold  text-3xl sm:text-5xl py-2 text-primary-color text-center mb-4">
      {title}
      <br />
    </h1>
    <p
      className="text-center my-2 text-white font-light md:w-9/12 w-11/12 text-base "
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </div>
);

export default Hero;
