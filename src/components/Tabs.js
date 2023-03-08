import { useState } from "react";

export default function Tabs({currentTab, tabList, switcher}) {
    const [tab, setTab] = useState(currentTab);

    const changeTab = (e, eachTab) => {
        e.preventDefault()
        e.stopPropagation()
        setTab(eachTab)
        switcher(eachTab)
    }

    return (
        <div className="border-b border-gray-200">
            <ul className="flex flex-wrap mb-0 text-sm font-medium text-center text-gray-500">
                {tabList.map((eachTab) => (
                    <li className="mr-2" key={eachTab.key}>
                        <a href="/"
                            className={
                                `inline-flex font-bold p-4 border-b-2 rounded-t-lg hover:text-[#1d3329] group ${(eachTab.key !== tab.key) ? 'border-transparent' : 'border-[#1d3329] text-[#1d3329]'}`
                            }
                            onClick={(e) => changeTab(e, eachTab)}
                        >
                            <svg
                                aria-hidden="true"
                                className={`w-5 h-5 mr-2 group-hover:text-[#1d3329] ${(eachTab.key !== tab.key) ? 'text-gray-400' : 'text-[#1d3329]'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {
                                    eachTab.icon || (
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path>
                                    )
                                }
                            </svg>{eachTab.value}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}