import React from "react";

const LoadingMessenger = () => {
    const arr = [1, 2, 3, 4, 5, 6];

    const listRandom = (index) => {
        if (index === 2) {
            return (
                <div className="w-full bg-[#d1d4d5] rounded-lg flex items-center ">
                    <div className="w-10 h-10  shrink-0  bg-[#d1d4d5] rounded-full border border-[#fff] ml-2 my-3 z-[2] "></div>
                    <div className="w-10 h-10  shrink-0  bg-[#d1d4d5] rounded-full border border-[#fff] translate-x-[-15px] my-3 z-[1] "></div>
                    <div className=""></div>
                    <div className="md:flex flex-col hidden">
                        <div className=" rounded-lg bg-[#fff] dark:bg-[#fff] w-10 h-5 border border-[#fff] translate-x-[-10px] "></div>
                        <div className=" rounded-lg bg-[#fff] dark:bg-[#fff] w-40 h-4 border border-[#fff] translate-x-[-10px] mt-1 "></div>
                    </div>
                </div>
            );
        }
        return (
            <div className="w-full bg-[#d1d4d5] rounded-lg flex items-center ">
                <div className="w-10 h-10  shrink-0  bg-[#d1d4d5] rounded-full border border-[#fff] ml-2 my-3 z-[2] "></div>
                <div className="ml-1 md:flex flex-col hidden">
                    <div className=" rounded-lg bg-[#fff] dark:bg-[#fff] w-10 h-5 border border-[#fff] "></div>
                    <div className="rounded-lg bg-[#fff] dark:bg-[#fff] w-32 h-4 border border-[#fff] mt-1 "></div>
                </div>
            </div>
        );
    };
    return (
        <div className="w-screen h-[90vh] px-20 overflow-hidden ">
            <div className="w-full h-full grid grid-cols-4 mt-5 gap-x-3 ">
                <div className="col-span-1 ">
                    <div className="flex items-center mt-1 justify-between gap-x-1">
                        <div className="bg-[#d1d4d5] rounded-lg w-24 h-8 "></div>
                        <div className="bg-[#d1d4d5] rounded-lg w-8 h-8 "></div>
                    </div>
                    <div className="my-3 bg-[#d1d4d5] rounded-full w-full h-10 "></div>
                    <div className="flex flex-col gap-y-2 ">
                        {arr.map((v) => (
                            <div key={v + "random_loading_messenger"}>
                                {listRandom(Math.floor(Math.random() * 3))}
                            </div>
                        ))}
                        <div className="w-full bg-[#d1d4d5] rounded-lg hidden md:flex items-center ">
                            <div className="w-10 h-10  shrink-0  bg-[#d1d4d5] rounded-full border border-[#fff] ml-2 my-3 z-[2] "></div>
                            <div className="w-10 h-10  shrink-0  bg-[#d1d4d5] rounded-full border border-[#fff] translate-x-[-15px] my-3 z-[1] "></div>
                            <div className=""></div>
                            <div className="md:flex flex-col hidden">
                                <div className=" rounded-lg bg-[#fff] dark:bg-[#fff] w-10 h-5 border border-[#fff] translate-x-[-10px] "></div>
                                <div className=" rounded-lg bg-[#fff] dark:bg-[#fff] w-40 h-4 border border-[#fff] translate-x-[-10px] mt-1 "></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 ">
                    <div className="flex items-center gap-x-2 ">
                        <div className="bg-[#d1d4d5]  w-10 h-10  shrink-0  rounded-full "></div>
                        <div className="bg-[#d1d4d5] rounded-lg w-32 h-6 "></div>
                    </div>
                    <div className="dark:bg-[#242526] bg-[#fff] w-full h-[68vh] p-2 md:p-4 mt-2 rounded-lg ">
                        <div className="flex items-center gap-x-2">
                            <div className="bg-[#d1d4d5]  w-10 h-10  shrink-0  rounded-full border border-[#fff] "></div>
                            <div className="bg-[#d1d4d5] rounded-lg w-60 h-20 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <div className="bg-[#d1d4d5]  w-10 h-10  shrink-0  rounded-full border border-[#fff] "></div>
                            <div className="bg-[#d1d4d5] rounded-lg w-80 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-[#d1d4d5] rounded-lg w-40 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-[#d1d4d5] rounded-lg w-16 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-[#d1d4d5] rounded-lg w-80 h-10 "></div>
                        </div>
                    </div>
                    <div className="bg-[#d1d4d5]  w-full rounded-full h-10 mt-2 "></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingMessenger;