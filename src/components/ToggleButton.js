import { useState } from "react";

export default function ToggleButton({switcher, initialState, full}) {
    const [enabled, setEnabled] = useState(initialState || false);

    return (
        <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="flex">
                <label className="inline-flex relative items-center mr-0 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const val = enabled
                            setEnabled(!val);
                            switcher(!val);
                        }}
                        className={`w-11 ${full ? 'h-6' : 'h-5'} bg-gray-100 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full ${full ? 'after:h-5' : 'after:h-4'} after:w-5 after:transition-all peer-checked:bg-toggle`}
                    ></div>
                    {/* <span className="ml-2 text-sm font-medium text-gray-900">
                        {enabled ? 'Priority' : ''}
                    </span> */}
                </label>
            </div>
        </div>
    );
}