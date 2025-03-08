import { Box, Button, Heading, SimpleGrid, Spinner, Text, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const fetchPosts = async () => {
    const response = await axios.get("https://json-placeholder.mock.beeceptor.com/posts");
    return response.data;
};

const Posts = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const { data: posts, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const filteredPosts = posts?.filter((post: any) =>
        post.title.toLowerCase().includes(search.toLowerCase())
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
                    Failed to fetch posts.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Button onClick={() => navigate("/dashboard")} position="absolute" top={4} left={4} colorScheme="blue">
                Back
            </Button>

            <Navbar />
            <Box p={10}>
                <Heading mb={6}>All Posts</Heading>

                <Input
                    placeholder="Search posts by title..."
                    mb={6}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredPosts?.map((post: any) => (
                        <Box
                            key={post.id}
                            p={5}
                            bg="gray.100"
                            rounded="md"
                            shadow="md"
                            cursor="pointer"
                            _hover={{ transform: "translateY(-2px) translateX(-2px)", boxShadow: "2xl" }}
                            transition="all 0.3s ease"
                            onClick={() => navigate(`/post-details/${post.id}`)}
                        >
                            <Text fontWeight="bold">Title: {post.title}</Text>
                            <Text>{post.body.slice(0, 100)}...</Text>
                            <Text>Comments: {post.comment_count}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </>
    );
};

export default Posts;
