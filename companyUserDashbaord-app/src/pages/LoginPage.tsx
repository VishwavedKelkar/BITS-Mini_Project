import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { LoginPageSchema } from "./LoginPageSchema";
import toast from "react-hot-toast";
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Heading } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";

type LoginFormValues = z.infer<typeof LoginPageSchema>;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { setUsername, setToken } = useAuthStore();
    const [loginError, setLoginError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginPageSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setLoginError(null);
        try {
            const response = await axios.post(
                "https://json-placeholder.mock.beeceptor.com/login",
                data
            );
            console.log(data);
            setUsername(data.username);
            setToken(response.data.token);

            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error: any) {
            if (error.response?.status === 401) {
                setLoginError("Invalid username or password");
                toast.error("Invalid username or password ❌");
            } else {
                setLoginError("Something went wrong. Please try again later.");
                toast.error("Something went wrong. Please try again later. ⚠️");
            }
        }
    };

    return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.100">
            <Box w="full" maxW="sm" p={8} bg="white" rounded="2xl" shadow="lg" position="relative">
                <Heading as="h2" size="lg" textAlign="center" mb={6}>
                    Login
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mb={5} isInvalid={!!errors.username} isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            {...register("username")}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl mb={5} isInvalid={!!errors.password} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password")}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    {loginError && (
                        <Box color="red.500" textAlign="center" mb={3}>
                            {loginError}
                        </Box>
                    )}
                    <Box textAlign="right">
                        <Button
                            variant="link"
                            colorScheme="blue"
                            size="sm"
                            onClick={() => navigate('/forgot-password')}
                        >
                            Forgot Password?
                        </Button>
                    </Box>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        width="full"
                        isLoading={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default LoginPage;
