<script>
    import axios from "axios";
    // import { onMount } from "svelte";
    import { Button } from "flowbite-svelte";
    let email = "";
    let password = "";
    let userType = "";

    function handleSubmit() {
        // Check if userType is selected
        if (!userType) {
            alert('Please select one of the "User" and "dealer"');
            return;
        }

        // Handle form submission here, e.g., send data to server
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("User Type:", userType);

        if (userType === "user") {
            const loginUser = async () => {
                try {
                    const response = await axios.post(
                        "https://indeed-assignment.vercel.app/user/login",
                        {
                            email: email,
                            password: password,
                        }
                    );
                    const responseData = response.data; // Capture response data
                    console.log("Response Data:", responseData);
                    if (responseData.token) {
                        localStorage.setItem("token", responseData.token); // Store token in localStorage
                        localStorage.setItem("role", "user");

                        window.location.href = "/";
                    }
                    // Handle the response data as needed
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            loginUser();
        }
        if (userType === "dealer") {
            const loginUser = async () => {
                try {
                    const response = await axios.post(
                        "https://indeed-assignment.vercel.app/dealer/login",
                        {
                            email: email,
                            password: password,
                        }
                    );
                    const responseData = response.data; // Capture response data
                    console.log("Response Data:", responseData);
                    if (responseData.token) {
                        localStorage.setItem("token", responseData.token); // Store token in localStorage
                        localStorage.setItem("role", "dealer");
                        window.location.href = "/";
                    }
                    // Handle the response data as needed
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            loginUser();
        }
    }
</script>

<div class=" h-full">
    <div
        class=" w-80 h-80 diffBorder absolute bg-red-200 top-10 rotate-90 -left-6"
    ></div>
    <div
        class=" w-96 h-96 diffBorder absolute bg-red-200 top-40 rotate-45 right-24"
    ></div>
    <div
        class=" w-40 h-40 diffBorder absolute bg-red-200 bottom-20 rotate-12 left-52"
    ></div>
    <div
        class="max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
        <div class="mb-6">
            <div class="block text-gray-700 text-sm font-bold mb-2">
                <h2 class="text-2xl font-semibold mb-4">Login as</h2>
            </div>
            <div class="flex items-center">
                <label class="block text-gray-500 font-bold">
                    <input
                        type="radio"
                        class="mr-2 leading-tight"
                        name="userType"
                        value="user"
                        required
                        bind:group={userType}
                    /> User
                </label>
                <label class="block text-gray-500 font-bold ml-4">
                    <input
                        type="radio"
                        class="mr-2 leading-tight"
                        name="userType"
                        value="dealer"
                        required
                        bind:group={userType}
                    /> Dealer
                </label>
            </div>
        </div>

        <form on:submit|preventDefault={handleSubmit}>
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="email"
                >
                    Email
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    bind:value={email}
                />
            </div>
            <div class="mb-2">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                >
                    Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    bind:value={password}
                />
            </div>
            <div class=" mb-4">
                if you have not account then please <a
                    href="./signin"
                    class=" text-blue-500"
                >
                    signup
                </a>
            </div>
            <div class="flex items-center justify-between">
                <Button type="submit">Login</Button>
            </div>
        </form>
    </div>
</div>
