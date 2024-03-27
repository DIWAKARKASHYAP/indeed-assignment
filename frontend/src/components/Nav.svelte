<script>
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
    } from "flowbite-svelte";
    import { Button, Modal } from "flowbite-svelte";
    import { onMount } from "svelte";
    import CarCreateModal from "./CarCreateModal.svelte";
    import { GradientButton } from "flowbite-svelte";

    let token;

    let role;

    onMount(() => {
        if (typeof localStorage !== "undefined") {
            token = localStorage.getItem("token");
            role = localStorage.getItem("role");
            console.log(token);
        }
    });
</script>

<Navbar>
    <NavBrand href="/" class=" font-bold">DEAL</NavBrand>
    <NavHamburger />
    <NavUl>
        <div class=" sm:flex items-center justify-between gap-7">
            <NavLi href="/">Home</NavLi>
            <NavLi href="/car">Cars</NavLi>

            {#if token && role == "dealer"}
                <Button size="xs" color="light" href="/sold-vehicle"
                    >Sold Vehicle</Button
                >
                <CarCreateModal />
                <!-- <Button size="xs" color="blue" href="/view-order"
                    >View Order</Button
                > -->
                <GradientButton
                    outline
                    color="pinkToOrange"
                    size="xs"
                    href="/view-order">View Order</GradientButton
                >
            {:else if token && role == "user"}
                <Button size="xs" href="/order">Order</Button>
                <GradientButton
                    outline
                    color="pinkToOrange"
                    size="xs"
                    href="/bought-vehicle">Bought Vehicle</GradientButton
                >
            {/if}

            {#if !token}
                <NavLi href="/signin">Signin</NavLi>
                <NavLi href="/login">Login</NavLi>
            {:else}
                <Button
                    size="xs"
                    on:click={() => {
                        window.localStorage.clear();
                        window.location.href = "./";
                    }}
                >
                    Logout</Button
                >
            {/if}
        </div>
    </NavUl>
</Navbar>
