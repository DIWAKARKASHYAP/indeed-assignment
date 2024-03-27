<script>
    import { Button, Modal, Label, Input } from "flowbite-svelte";
    import axios from "axios";

    let formModal = false;
    let type, name, model, car_info;
    const handleSubmit = async () => {
        // Handle form submission here

        try {
            const response = await axios.post(
                "http://localhost:3000/dealer/car",
                {
                    type,
                    name,
                    model,
                    car_info,
                    token: localStorage.getItem("token"),
                }
            );
            const responseData = response.data;
            console.log("Form submitted!");
        } catch {}
        // Close the modal after form submission if needed
        formModal = false;
    };
</script>

<Button size="xs" on:click={() => (formModal = true)}
    ><svg
        class="w-4 h-4 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
        />
    </svg>
    New Vehicle</Button
>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form on:submit|preventDefault={handleSubmit}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Add Vehicle Details
        </h3>

        <Label class="space-y-2">
            <span>Vehicle Type</span>
            <Input
                type="text"
                placeholder="Car, Truck, Motorcycle, etc."
                bind:value={type}
            />
        </Label>

        <Label class="space-y-2">
            <span>Vehicle Name </span>
            <Input
                type="text"
                placeholder="e.g., Lightning McQueen"
                bind:value={name}
            />
        </Label>

        <Label class="space-y-2">
            <span>Model</span>
            <Input
                type="text"
                placeholder="e.g., 2024 Tesla Model S"
                required
                bind:value={model}
            />
        </Label>

        <Label class="space-y-2">
            <span>Car Info </span>
            <Input
                type="text"
                placeholder="e.g., Mileage, Color, VIN"
                bind:value={car_info}
            />
        </Label>

        <Button type="submit" class="w-full">Save Vehicle Details</Button>
    </form>
</Modal>
