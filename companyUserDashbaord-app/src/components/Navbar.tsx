import { Box, Flex, Link, Spacer, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <Box bg="cyan.400" px={8} py={4} color="white" boxShadow="md">
            <Flex alignItems="center">
                <Heading size="lg">Admin Panel</Heading>
                <Spacer />
                <Flex gap={4}>
                    <Link as={NavLink} to="/dashboard" _hover={{ textDecoration: "none" }} _activeLink={{ fontWeight: "bold" }}>
                        Dashboard
                    </Link>
                    <Link as={NavLink} to="/users" _hover={{ textDecoration: "none" }} _activeLink={{ fontWeight: "bold" }}>
                        Users
                    </Link>
                    <Link as={NavLink} to="/companies" _hover={{ textDecoration: "none" }} _activeLink={{ fontWeight: "bold" }}>
                        Companies
                    </Link>
                    <Link as={NavLink} to="/posts" _hover={{ textDecoration: "none" }} _activeLink={{ fontWeight: "bold" }}>
                        Posts
                    </Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
