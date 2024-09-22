<template>
    <div class="listener__circles">
        <div class="listener__circle" />
        <div class="listener__circle" />
        <div class="listener__circle" />
        <div class="listener__circle" />
    </div>
</template>
<script>
export default {
    name: 'ListenerComponent'
}
</script>

<style>
.listener__circles {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.listener__circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(119, 119, 119);
    position: relative;

    transition: top 0.5s;
}

.listener__circle:nth-child(1) {
    background-color: #1e88e5;
    animation-name: listening;
    animation-timing-function: ease-in-out, ease-in-out, ease-in-out, linear;
    animation-duration: 1.8s, 1.8s, 0.8s, 3s;
    animation-delay: 0s, 5.4s, 7.3s, 7.6s;
    animation-iteration-count: infinite;
    animation-fill-mode: none, none, forwards, none;
}

.listener__circle:nth-child(2) {
    background-color: #e53935;
    animation-name: listening;
    animation-timing-function: ease-in-out, ease-in-out, ease-in-out, linear;
    animation-duration: 1.8s, 1.8s, 0.7s, 3s;
    animation-delay: 0.3s, 5.5s, 7.4s, 7.6s;
    animation-iteration-count: infinite;
    animation-fill-mode: none, none, forwards, none;
}

.listener__circle:nth-child(3) {
    background-color: #ffb300;
    animation-name: listening;
    animation-timing-function: ease-in-out, ease-in-out, ease-in-out, linear;
    animation-duration: 1.8s, 1.8s, 0.8s, 3s;
    animation-delay: 0.6s, 5.6s, 7.4s, 7.6s;
    animation-iteration-count: infinite;
    animation-fill-mode: none, none, forwards, none;
}

.listener__circle:nth-child(4) {
    background-color: #4caf50;
    animation-name: listening;
    animation-timing-function: ease-in-out, ease-in-out, ease-in-out, linear;
    animation-duration: 1.8s, 1.8s, 0.8s, 3s;
    animation-delay: 0.9s, 5.7s, 7.2s, 7.6s;
    animation-iteration-count: infinite;
    animation-fill-mode: none, none, forwards, none;
}

@keyframes listening {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(25px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>
