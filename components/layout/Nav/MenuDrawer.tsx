import { ProductCategoryDocument } from "@/prismicio-types";
import { navLinks } from "@/utils/contants";
import { Add, ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
    Box,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SwipeableDrawer,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

interface Props {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categories: ProductCategoryDocument<string>[];
}
const MenuDrawer = ({ isMenuOpen, setIsMenuOpen, categories }: Props) => {
    const router = useRouter();
    const handleOpen = () => {
        setIsMenuOpen(true);
    };
    const handleClose = () => {
        setIsMenuOpen(false);
    };
    return (
        <SwipeableDrawer
            anchor='left'
            open={isMenuOpen}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <Box className='bg-white w-[80vw] max-w-[350px] h-screen relative'>
                <List disablePadding>
                    <ListItem className='bg-c2b text-c1f'>
                        <ListItemButton
                            onClick={() => {
                                router.push("/");
                                handleClose();
                            }}
                        >
                            <ListItemText
                                primary='Digital Gadget'
                                classes={{
                                    primary: "font-bold text-xl",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>

                    {navLinks?.map((item) => (
                        <ListItem className='justify-start' key={item.name}>
                            <ListItemButton
                                onClick={() => {
                                    router.push(item.link);
                                    handleClose();
                                }}
                            >
                                {/* <ListItemButton className='w-fit'>
                                    <item.icon />
                                </ListItemButton> */}
                                <ListItemText
                                    className=' font-poppins text-c2a'
                                    primary={item.name}
                                    classes={{
                                        primary: "",
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List disablePadding className=''>
                    {categories.map((category) => {
                        return (
                            // <></>
                            <CollapsableList
                                key={category.id}
                                category={category}
                            />
                        );
                    })}
                </List>
            </Box>
        </SwipeableDrawer>
    );
};

interface CollapsableListProps {
    category: ProductCategoryDocument<string>;
}
const CollapsableList = ({ category }: CollapsableListProps) => {
    const [showMore, setShowMore] = useState(false);
    const subCategory = category.data
        .sub_category as unknown as ProductCategoryDocument[];

    const router = useRouter();

    const handleClick = () => {
        setShowMore((prev) => !prev);
    };
    return (
        <ListItem
            className=' hover:bg-c1d block justify-start'
            key={category.id}
        >
            <ListItemButton
                className=''
                onClick={() => {
                    category.data.sub_category.length > 0
                        ? handleClick()
                        : router.push(`/category/${category.uid}`);
                }}
            >
                <ListItemText primary={category.data.title} />
                {category.data.sub_category.length > 0 ? (
                    <>{showMore ? <ExpandLess /> : <ExpandMore />}</>
                ) : (
                    <></>
                )}
            </ListItemButton>
            <Collapse in={showMore} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {category.data.sub_category.map((cat) => {
                        const sub =
                            cat.category as unknown as ProductCategoryDocument;

                        return (
                            <ListItem className=' text-c2a ml-3' key={sub.id}>
                                <Link
                                    href={`/category/${category.uid}/${sub.uid}`}
                                >
                                    <ListItemText primary={sub.data.title} />
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Collapse>
        </ListItem>
    );
};

export default memo(MenuDrawer);
