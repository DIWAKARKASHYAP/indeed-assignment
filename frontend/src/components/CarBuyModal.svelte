<script>
    import { Button, Modal, Label, Input } from "flowbite-svelte";
    import axios from "axios";
    import { onMount } from "svelte";
    export let carId;
    export let dealerId;

    // console.log(carId, dealerId);
    let formModal = false;

    let token;

    let role;

    onMount(() => {
        if (typeof localStorage !== "undefined") {
            token = localStorage.getItem("token");
            role = localStorage.getItem("role");
            console.log(token);
        }
    });
    const handleClick = async () => {
        // Handle form submission here

        // console.log("hello");

        try {
            const response = await axios.post(
                "https://indeed-assignment.vercel.app/user/order",
                {
                    token,
                    carId,
                    dealerId,
                }
            );
            const responseData = response.data;
            console.log("Form submitted!");
            alert("Order Successful");
        } catch {}
        // Close the modal after form submission if needed
        formModal = false;
    };
</script>

<Button on:click={() => (formModal = true)}>Order NOw</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    {#if token && role == "user"}
        <Button on:click={handleClick}>order Now</Button>
    {:else if token && role == "dealer"}
        <div>sorry you are a Dealer and dealer have no access to buy</div>
    {:else}
        <Button href="./login">please Login</Button>
    {/if}
</Modal>
