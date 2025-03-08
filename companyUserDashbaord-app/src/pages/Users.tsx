import { Box, Button, Heading, SimpleGrid, Spinner, Text, Input, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import AddUser from "./AddUser";
import Navbar from "../components/Navbar";

const fetchUsers = async () => {
    const response = await axios.get("https://json-placeholder.mock.beeceptor.com/users");
    return response.data;
};

const Users = () => {
    const navigate = useNavigate();
    const { setSelectedUser } = useUserContext();
    const [search, setSearch] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { data: users, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const filteredUsers = users?.filter((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="red.500">
                    Failed to fetch users.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Button onClick={() => navigate("/dashboard")} position="absolute" top={4} left={4} colorScheme="blue">
                Back
            </Button>


            <Button colorScheme="green" position="absolute" mb={4} top={4} right={4} onClick={onOpen}>Add User</Button>
            <Navbar />
            <Box p={10}>
                <Heading mb={6}>All Users</Heading>


                <Input
                    placeholder="Search users by name..."
                    mb={6}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredUsers?.map((user: any) => (
                        <Box
                            key={user.id}
                            p={5}
                            bg="gray.100"
                            rounded="md"
                            shadow="md"
                            cursor="pointer"
                            _hover={{ transform: "translateY(-2px) translateX(-2px)", boxShadow: "2xl" }}
                            transition="all 0.3s ease"
                            onClick={() => {
                                setSelectedUser(user);
                                navigate(`/user-details/${user.id}`);
                            }}
                        >
                            <Text fontWeight="bold">Name : {user.name}</Text>
                            <Text>Email : {user.email}</Text>
                            <Text>Phone No. : {user.phone}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            <AddUser isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Users;
