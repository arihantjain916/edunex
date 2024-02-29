import { LinkedinIcon, GithubIcon, TwitterIcon } from "../../utils/SVGIcon";

export interface Team {
  name: string;
  role: string;
  image: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  skills: string;
}

const team = [
  {
    name: "Anshu Priya",
    role: "UI Developer",
    image: "https://dummyimage.com/200x200",
    githubUrl: "https://github.com/anshupriya20",
    linkedinUrl: "https://www.linkedin.com/in/anshu-priya-49806a246/",
    twitterUrl: "https://twitter.com/AnshuPriya20",
    skills:
      "DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
  {
    name: "Arihant Jain",
    role: "Full Stack Developer",
    image: "https://dummyimage.com/200x200",
    githubUrl: "https://github.com/arihantjain916",
    linkedinUrl: "https://www.linkedin.com/in/arihantjain916",
    twitterUrl: "https://twitter.com/arihantjain916",
    skills: "MERN Stack, NextJs, Django-Rest-Framework, SQL, MongoDB, Git",
  },
  {
    name: "Sarthak Sethi",
    role: "Database Engineer/Flutter Developer",
    image: "https://dummyimage.com/200x200",
    githubUrl: "https://github.com/sarthakj7792",
    linkedinUrl: "https://www.linkedin.com/in/sarthaksethi5",
    twitterUrl: "https://twitter.com/sethi_5",
    skills:
      "DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.",
  },
];

const TeamMember = ({
  name,
  role,
  image,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  skills,
}: Team) => (
  <div className="p-4 lg:w-1/2">
    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
      <img
        alt="team"
        className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
        src={image}
      />
      <div className="flex-grow sm:pl-8">
        <h2 className="title-font font-medium text-lg text-gray-900">{name}</h2>
        <h3 className="text-gray-500 mb-3">{role}</h3>
        <p className="mb-4">{skills}</p>
        <span className="inline-flex gap-3">
          <LinkedinIcon link={linkedinUrl} />
          <GithubIcon link={githubUrl} />
          <TwitterIcon link={twitterUrl} />
        </span>
      </div>
    </div>
  </div>
);
export const TeamPage = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
            OUR TEAM
          </h1>
        </div>
        <div className="flex flex-wrap -m-4 ">
          {team.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};
