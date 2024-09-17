import LogoWhite from "./assets/logo-white.svg";
import LogoDark from "./assets/logo-dark.svg";

// import IconSearch from "./assets/icon-search.svg"

import octocat from "./assets/octocat.svg";
import UserStat from "./components/UserStat";
import UserMeta from "./components/UserMeta";
import IconLocation from "./components/icons/IconLocation";
import IconTwitter from "./components/icons/IconTwitter";
import IconWebsite from "./components/icons/IconWebsite";
import IconCompany from "./components/icons/IconCompany";
import IconSun from "./components/icons/IconSun";
import IconSearch from "./components/icons/IconSearch";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [currentusers, setCurrentUsers] = useState([]);
  // const API_URL = "https://api.github.com/users/username";
  const API_URL = "https://api.github.com/users/";
  const [search, setSearch] = useState("");
  // const [isloading, setIslaoding] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (search.trim() !== "") {
        try {
          const response = await fetch(`${API_URL}${search}`);
          if (response.ok) {
            const data = await response.json();
            setCurrentUsers([data]);
          } else {
            console.error("Error fetching user data");
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };

    if (search) {
      fetchUser();
    }
  }, [search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className=" bg-dark-primary-800 min-h-screen flex items-center justify-center text-light-secondary">
      <div className="w-full max-w-screen-md 2xl:max-w-[840px] mx-auto py-4 px-8">
        <div className="flex justify-between items-center">
          <h1>
            <img src={LogoWhite} alt="Logo" />
          </h1>

          <button className="inline-flex space-x-4">
            <span className="font-semibold uppercase text-sm tracking-wider">
              Light
            </span>

            <IconSun />
          </button>
        </div>
        <div className="w-full mt-10">
          <form onClick={handleSubmit}>
            <div className="w-full relative">
              <IconSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-primary-500" />

              <input
                type="text"
                className="w-full bg-dark-primary-600 border-0 leading-10 py-4 rounded-xl pl-20 text-lg tracking-wider placeholder:text-inherit"
                placeholder="Search GitHub username..."
                onChange={handleChange}
                value={search}
              />
              <button className="bg-primary-500 text-white leading-8 py-2.5 px-5 rounded-xl font-semibold tracking-wide absolute right-3.5 top-1/2 -translate-y-1/2">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="bg-dark-primary-600 rounded-xl mt-8 py-[3.25rem] px-12  grid grid-cols-4 gap-y-4 gap-x-10">
          <div className="col-span-1 relative">
            <img
              src={octocat}
              alt={"octocat"}
              className="absolute -top-[0.55rem] w-full rounded-full"
            />
          </div>
          {currentusers.map((user) => (
            <>
              <div
                key={user.name}
                className="col-span-3 flex items-start justify-between"
              >
                <div>
                  <h2 className="text-[1.65rem] font-semibold leading-5">
                    {user.name}
                  </h2>
                  <span className="text-primary-500 inline-block mt-2.5">
                    {user.name}
                  </span>
                </div>
                <div>
                  {/* <p>Joined 25 Jan 2011</p> */}
                  <p>{user.created_at}</p>
                </div>
              </div>
              <div className="col-span-3 col-start-2">
                <p>{user.bio}</p>
              </div>

              <div className="col-span-3 col-start-2 bg-dark-primary-800 py-4 px-6 grid grid-cols-3 gap-x-6 rounded-lg mt-6 shadow-lg">
                <UserStat label="Repos" number={user.public_repos} />
                <UserStat label="Followers" number={user.followers} />
                <UserStat label="Following" number={user.following} />
              </div>

              <div className="col-span-3 col-start-2 grid grid-cols-2 gap-y-5 gap-x-16 mt-6 text-white">
                <UserMeta
                  icon={<IconLocation />}
                  text={user.location}
                  className="space-x-5"
                />
                <UserMeta
                  icon={<IconTwitter />}
                  text={user.twitter_username}
                  link={null}
                />
                <UserMeta
                  icon={<IconWebsite />}
                  text={"https://github.blog"}
                  link={"https://github.blog"}
                  className="space-x-4"
                />
                <UserMeta icon={<IconCompany />} text={"@github"} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
