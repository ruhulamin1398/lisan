import React from 'react';
import ProjectSlider from './ProjectSlider';

import demo from "../../images/demo.png";


const ProjectModal = ({ project, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center  ">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p className="mt-2">{project.description}</p>
                <a href={project.link} className="text-blue-500 mt-4 inline-block">View Project</a>
                <button
                    onClick={closeModal}
                    className="mt-4 text-red-500 hover:text-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Projects = () => {
    const [modalProject, setModalProject] = React.useState(null);

    const openModal = (project) => setModalProject(project);
    const closeModal = () => setModalProject(null);

    return (
        <>


            <div id="Logos" className="flex w-full justify-center items-center   mt-5" >
                <div className="flex  flex-col  items-center justify-between   px-4">
                    <div className="flex flex-col justify-start items-center    pt-2 pb-6 w-full">
                        <h1 className=" uppercase font-bold   text-3xl sm:text-5xl py-2  text-primary-color    ">

                            Feature Projects
                            <br />

                        </h1>

                        <p className="text-left my-2   text-white font-light md:w-9/12 w-11/12 text-base text-center text-justify md:text-center ">
                            Explore a selection of my standout projects as a Full Stack Blockchain Developer and Researcher. With expertise in DApps, DeFi, NFTs, and private blockchain solutions, I’ve built secure systems, smart contracts, and full-stack applications using technologies like Ethereum, Hyperledger Fabric, Node.js, and Next.js. These projects reflect my commitment to creating innovative, scalable solutions in blockchain and web development. Dive in to discover how I leverage technology to address real-world challenges.
                        </p>

                    </div>

                    <div className=" grid grid-cols-1  justify-start items-start gap-4 mb-[100px] w-full  ">



                        <ProjectSlider />
                    </div>

                </div>
            </div>

            {/* <div id="Logos" className="flex w-full justify-center items-center gradient-bg-services " >
            <div className="flex  flex-col  items-center justify-between   px-4">
                <div className="flex flex-col justify-start items-center    py-6 w-100">
                    <h1 className=" uppercase font-bold   text-3xl sm:text-5xl py-2  text-primary-color    ">

                        Feature Projects
                        <br />

                    </h1>

                    <p className="text-left my-2 mb-6 text-white font-light md:w-9/12 w-11/12 text-base text-center ">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum eveniet numquam commodi odit possimus hic, ad, autem ratione laboriosam soluta necessitatibus quas dignissimos praesentium consectetur! Nemo a, explicabo repudiandae culpa ipsum velit dolorem deleniti illum qui architecto cupiditate similique corrupti nisi impedi r laboriosam voluptas eius ducimus commodi mollitia eveniet magni repellendus vero incidunt id ex alias, dolores provident quos nemo repudiandae vitae numq p liquam. Delectus, nobis. Sit dolorem fugit tenetur eos magni qui, reprehenderit similique eveniet maiores.
                    </p>

                </div>

                <div className=" grid grid-cols-2 col-span-2 justify-start items-start gap-4 mb-[500px]">
                    {projects.map((project) => (
                        <div className='flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl w-[300px]'>

                            <div
                                key={project.id}
                                className="relative w-full  h-96 perspective m-1 flex flex-col flex-1"
                            >
                                 <div className="flip-card w-full h-full transform transition-transform duration-500">
                                    
                                    <div className="flip-front absolute w-full h-full bg-white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl flex flex-col">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                        <h3 className="mt-2 text-primary-color text-lg">
                                            {project.title}
                                        </h3>
                                        <h4 className="mt-2 text-primary-color text-sm">
                                            {project.category}
                                        </h4>
                                        <p className="mt-1 text-white text-sm md:w-full">
                                            {project.description}
                                        </p>
                                    </div>

                                    
                                    <div className="flip-back absolute w-full h-full bg-gray-800 p-4 rounded-2xl flex items-center justify-center">
                                        <button
                                            className="px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-primary-dark"
                                            onClick={() => alert(`Read more about ${project.title}`)}
                                        >
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        // <div  key={project.id} class="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl ">

                        //     <div class="m-1 flex flex-col flex-1">
                        //     <img src={project.image} alt={project.title} className="w-full h-96 object-cover rounded-2xl" />

                        //         <h3 class="mt-2 text-primary-color text-lg ">{project.title}</h3>
                        //         <h4 class="mt-2 text-primary-color text-sm ">{project.category}</h4>
                        //         <p class="mt-1 text-white text-sm md:w-full">{project.description} </p>
                        //     </div>
                        // </div>




                    ))}



                </div>

                {modalProject && <ProjectModal project={modalProject} closeModal={closeModal} />}
            </div>
        </div> */}

        </>
    );
};

export default Projects;
