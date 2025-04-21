import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Avatar, AvatarBadge } from '@chakra-ui/react'

import {
    IoPersonCircleOutline as PersonOutline,
    IoPersonCircleSharp as PersonSharp,
    IoSettingsOutline as SettingsOutline,
} from "react-icons/io5";

import { CiSettings } from "react-icons/ci";

import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
export default function ProfileDropDown({ user, SignOutPressed }) {



    return (
        <div className="flex">
            <Menu as="div" className="relative z-50" >
                <div className="xl:mr-6">
                    <MenuButton className=" w-7 h-7 rounded-full  cursor-pointer">

                        <Avatar referrerPolicy="no-referrer" size="sm" color="white" background="blue.500" className="outline-3  outline-white" name={`${user?.detail?.firstname} ${user?.detail?.lastname}`} src={user?.detail?.profileImage} />


                    </MenuButton>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                        <div className="px-1 py-1 ">
                            <MenuItem as="div" className="w-full text-left">
                                <div className="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm">
                                    <p className="font-semibold">สวัสดี คุณ {user?.detail?.firstname}</p>
                                </div>
                            </MenuItem>
                            <MenuItem as="div" className="w-full text-left">
                                {({ focus }) => (
                                    <Link to="/profile">
                                        <div className={`${focus ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                            <PersonOutline className="mr-2 h-5 w-5" aria-hidden="true" />
                                            Profile
                                        </div>
                                    </Link>
                                )}
                            </MenuItem>

                            <MenuItem as="div" className="w-full text-left">
                                {({ focus }) => (
                                    <Link to="/setting">
                                        <div className={`${focus ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                            <CiSettings className="mr-2 h-5 w-5" aria-hidden="true" />
                                            Setting
                                        </div>
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem as="div" className="w-full text-left">
                                {({ focus }) => (
                                    <Link to="/trash-posts">
                                        <div className={`${focus ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                            <BsTrash className="mr-2 h-5 w-5" aria-hidden="true" />
                                            ถังขยะ
                                        </div>
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem
                                as="button"
                                className="w-full text-left cursor-pointer"
                                onClick={SignOutPressed}
                            >
                                {({ focus }) => (
                                    <div className={`${focus ? "bg-blue-500 text-white" : "text-gray-900"} group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                        <CiLogout className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Logout
                                    </div>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Transition>

            </Menu>
        </div>
    );
}
