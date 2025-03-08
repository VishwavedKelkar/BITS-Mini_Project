import { Box, Button, Card, CardHeader, Heading, Text, Spinner, useToast, Image, Stack, StackDivider, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import EditUser from "./EditUser";

// Fetch User Details
const fetchUserDetails = async (user_id: number) => {
    const response = await axios.get(`https://json-placeholder.mock.beeceptor.com/users/${user_id}`);
    return response.data;
};

const deleteUser = async (user_id: number) => {
    await axios.delete(`https://json-placeholder.mock.beeceptor.com/users/${user_id}`);
};

const UserDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<HTMLButtonElement>(null);
    const toast = useToast();

    const { data: userDetails, isLoading, isError } = useQuery({
        queryKey: ["userDetails", id],
        queryFn: () => fetchUserDetails(Number(id)),
    });

    const mutation = useMutation({
        mutationFn: () => deleteUser(Number(id)),
        onSuccess: () => {
            navigate("/users");
        },
    });

    const handleDelete = () => {
        mutation.mutate();
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (isError || !userDetails) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="red.500">
                    Failed to fetch user details.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Button
                onClick={() => navigate("/users")}
                position="absolute"
                top={4}
                left={4}
                size="sm"
                colorScheme="blue"
            >
                Back
            </Button>

            <Card mt={12} mx="auto" maxW="md" p={5} borderColor="cyan.100" borderWidth="2px">
                <CardHeader textAlign="center">
                    <Image
                        borderRadius="full"
                        boxSize="100px"
                        src={userDetails.photo}
                        alt={userDetails.name}
                        mb={4}
                        mx="auto"
                    />
                    <Heading size="md">{userDetails.name}</Heading>
                    <Text fontSize="sm" color="gray.500">{userDetails.company}</Text>
                </CardHeader>

                <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                        <Heading size="sm">Username</Heading>
                        <Text>{userDetails.username}</Text>
                    </Box>
                    <Box>
                        <Heading size="sm">Email</Heading>
                        <Text>{userDetails.email}</Text>
                    </Box>
                    <Box>
                        <Heading size="sm">Phone</Heading>
                        <Text>{userDetails.phone}</Text>
                    </Box>
                </Stack>

                <Button colorScheme="teal" mt={6} ml={4} onClick={() => setIsEditOpen(true)}>
                    Edit User
                </Button>

                <Button colorScheme="red" mt={6} ml={4} onClick={onOpen}>
                    Delete User
                </Button>


                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete User
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You want to delete this user?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                    Yes, Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

            </Card>

            <EditUser isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} userData={userDetails} />
        </>
    );
};

export default UserDetails;
