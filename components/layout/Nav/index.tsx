"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Top from "./Top";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
    PermIdentityOutlined,
    ShoppingCart,
    ShoppingCartOutlined,
    Menu as MenuIcon,
} from "@mui/icons-material";
import {
    Badge,
    BadgeProps,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import MenuDrawer from "./MenuDrawer";
import { ProductCategoryDocument } from "@/prismicio-types";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
        background: "#E5704B",
        fontWeight: "bold",
        color: "white",
    },
}));

interface Props {
    categories: ProductCategoryDocument<string>[];
}

const Nav = ({ categories }: Props) => {
    const { status, data } = useSession();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <header>
            <Top />
            <div className='bg-c2a px-5 py-7'>
                <div className='container mx-auto gap-5 text-c1f items-center flex justify-between'>
                    <Link href={"/"}>
                        <h5 className='font-semibold text-lg lg:text-2xl'>
                            Digital Gadgets
                        </h5>
                    </Link>
                    <form
                        method='post'
                        className='lg:flex hidden px-2 w-full max-w-[550px] gap-2 '
                    >
                        <input
                            type='text'
                            placeholder='Search Products...'
                            className='flex-1 flex-shrink text-c1b px-3 focus:outline-none   h-[36px] rounded-md '
                        />
                        <Button
                            variant='contained'
                            className='bg-c2b font-semibold'
                        >
                            Search
                        </Button>
                    </form>
                    <div className='flex items-center gap-3'>
                        <IconButton
                            id='basic-button'
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup='true'
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                            className='bg-c1f'
                        >
                            <PermIdentityOutlined className='text-c2a' />
                        </IconButton>
                        <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {status == "authenticated" ? (
                                <div>
                                    {/* <MenuItem>Profile</MenuItem> */}
                                    <MenuItem>
                                        <Link href={"/user"}>My account</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={"/order"}>Orders</Link>
                                    </MenuItem>
                                    {/* {data?.user?.role == "INSTALLER" && (
                                        <MenuItem> My Installations</MenuItem>
                                    )} */}
                                    <Divider />
                                    <MenuItem onClick={() => signOut()}>
                                        <Button>Logout</Button>
                                    </MenuItem>
                                </div>
                            ) : (
                                <div>
                                    <MenuItem>
                                        <Link href={"/auth/login"}>Sigin</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link href={"/auth/signup"}>
                                            Register
                                        </Link>
                                    </MenuItem>
                                    {/* <MenuItem>Logout</MenuItem> */}
                                </div>
                            )}
                        </Menu>
                        <IconButton className='bg-c1f'>
                            <StyledBadge badgeContent={5}>
                                <ShoppingCartOutlined />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className='block lg:hidden text-c1f cursor-pointer'
                    >
                        <MenuIcon />
                    </div>
                </div>
            </div>
            <div className='lg:hidden py-4 container px-5 mx-auto'>
                <form
                    method='post'
                    className=' flex items-center justify-between w-full gap-2 '
                >
                    <input
                        type='text'
                        placeholder='Search Products...'
                        className='flex-1 border-c1b border-2 text-c1b px-3 focus:outline-none   h-[36px] rounded-md '
                    />
                    <Button
                        variant='contained'
                        className='bg-c2b font-semibold'
                    >
                        Search
                    </Button>
                </form>
            </div>
            <MenuDrawer
                categories={categories}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />
        </header>
    );
};

export default Nav;
