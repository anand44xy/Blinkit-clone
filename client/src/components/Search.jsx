import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearchPage = () => {
        navigate('/search');
    };

    return (
        <div
            className={`w-full md:w-[35rem] py-3 my-3 md:my-0 rounded-lg border overflow-hidden flex items-center group transition-all ${
                isSearchPage
                    ? 'bg-white shadow-md shadow-gray-200 xl:w-[50rem] h-11 mx-auto'
                    : 'bg-gray-50'
            }`}
        >
            {/* Search Icon */}
            <button className="pl-4">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <div className="pl-4 w-full">
                {!isSearchPage ? (
                    // Not on the search page
                    <div onClick={redirectToSearchPage}>
                        <TypeAnimation
                            sequence={[
                                `search for "milk"`,
                                1000,
                                `search for "bread"`,
                                1000,
                                `search for "sugar"`,
                                1000,
                                `search for "butter"`,
                                1000,
                                `search for "paneer"`,
                                1000,
                                `search for "rice"`,
                                1000,
                                `search for "egg"`,
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    // When on the search page
                    <div className="w-full h-full flex items-center">
                        <input
                            type="text"
                            className="w-full  bg-transparent outline-none text-gray-700 placeholder-gray-400 transition-all "
                            placeholder="Search for atta, dal, and more"
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
